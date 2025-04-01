import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import { JSDOM } from 'jsdom';

// Paths
const CONSTANTS_PATH = './buildings.constants.ts';
const HTML_PATH = './buildings.html';
const HIGH_RES_DIR = './high_res';

// Ensure target directory exists
if (!fs.existsSync(HIGH_RES_DIR)) {
  fs.mkdirSync(HIGH_RES_DIR, { recursive: true });
}

// Read files
const constantsContent = fs.readFileSync(CONSTANTS_PATH, 'utf-8');
const htmlContent = fs.readFileSync(HTML_PATH, 'utf-8');

// Parse HTML
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

// Parse constants file to get buildings data
// This is a naive approach using regex to extract building objects
const buildingRegex = /{\s*id:\s*['"]([^'"]+)['"]\s*,\s*name:\s*['"]([^'"]+)['"]\s*,[\s\S]*?imagePath:\s*['"]([^'"]+)['"]\s*,[\s\S]*?},/g;
let match;
const buildings: { id: string; name: string; currentImagePath: string; newImagePath?: string }[] = [];

while ((match = buildingRegex.exec(constantsContent)) !== null) {
  buildings.push({
    id: match[1],
    name: match[2],
    currentImagePath: match[3],
  });
}

console.log(`Found ${buildings.length} buildings in constants file.`);

// Function to download a file from a URL
function downloadFile(url: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destination, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

// Function to find high-res image for a building
function findHighResImageForBuilding(buildingName: string): { imageUrl: string; fileName: string } | null {
  // Try to find anchor with title or text matching the building name
  const anchors = Array.from(document.querySelectorAll('a'));
  
  // Try different matching approaches
  let matchingAnchor = anchors.find(a => 
    a.getAttribute('title')?.toLowerCase() === buildingName.toLowerCase() ||
    a.textContent?.trim().toLowerCase() === buildingName.toLowerCase()
  );
  
  if (!matchingAnchor) {
    // Try a more flexible approach if no exact match
    matchingAnchor = anchors.find(a => 
      a.getAttribute('title')?.toLowerCase().includes(buildingName.toLowerCase()) || 
      a.textContent?.trim().toLowerCase().includes(buildingName.toLowerCase())
    );
  }
  
  if (matchingAnchor) {
    // Look for img inside the anchor or nearby
    const img = matchingAnchor.querySelector('img');
    if (img && img.getAttribute('srcset')) {
      const srcset = img.getAttribute('srcset');
      const match = srcset.match(/\/commons\/images\/[^\/]+\/[^\/]+\/([^\/\s]+)\s/);
      
      if (match && match[1]) {
        const fileName = match[1];
        // Extract the path parts from srcset
        const pathMatch = srcset.match(/\/commons\/images\/([^\/]+)\/([^\/]+)\/([^\/\s]+)/);
        
        if (pathMatch) {
          const [, folder1, folder2, file] = pathMatch;
          const imageUrl = `https://liquipedia.net/commons/images/${folder1}/${folder2}/${file}`;
          return { imageUrl, fileName: file };
        }
      }
    }
  }

  return null;
}

// Process each building
const errors: string[] = [];
const updates: { id: string; name: string; oldPath: string; newPath: string }[] = [];

// Process buildings sequentially to avoid overwhelming the server
async function processBuildings() {
  for (const building of buildings) {
    console.log(`Processing ${building.name}...`);
    
    const imageInfo = findHighResImageForBuilding(building.name);
    
    if (!imageInfo) {
      console.error(`Error: Could not find high-res image for building "${building.name}"`);
      errors.push(building.name);
      building.newImagePath = 'error';
      continue;
    }
    
    const { imageUrl, fileName } = imageInfo;
    const targetPath = path.join(HIGH_RES_DIR, fileName);
    
    // Download high-res image
    try {
      await downloadFile(imageUrl, targetPath);
      console.log(`Downloaded high-res image for ${building.name}: ${fileName}`);
      
      // Update image path
      building.newImagePath = `assets/images/buildings/${fileName}`;
      updates.push({
        id: building.id,
        name: building.name,
        oldPath: building.currentImagePath,
        newPath: building.newImagePath,
      });
    } catch (error) {
      console.error(`Error downloading image for ${building.name}:`, error);
      errors.push(building.name);
      building.newImagePath = 'error';
    }
    
    // Add a small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Update constants file
  let updatedConstantsContent = constantsContent;
  for (const building of buildings) {
    if (building.newImagePath) {
      const regex = new RegExp(`(imagePath:\\s*['"])${escapeRegExp(building.currentImagePath)}(['"])`, 'g');
      updatedConstantsContent = updatedConstantsContent.replace(regex, `$1${building.newImagePath}$2`);
    }
  }
  
  // Write updated constants file
  fs.writeFileSync(CONSTANTS_PATH + '.updated', updatedConstantsContent);
  
  // Summary
  console.log('\n--- SUMMARY ---');
  console.log(`Total buildings: ${buildings.length}`);
  console.log(`Updated successfully: ${updates.length}`);
  console.log(`Errors: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log('\nBuildings with errors:');
    errors.forEach(name => console.log(`- ${name}`));
  }
  
  console.log('\nUpdated constants file written to: ' + CONSTANTS_PATH + '.updated');
  console.log('Review the changes and rename the file to replace the original if they look good.');
}

// Function to escape special characters in regular expressions
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Run the process
processBuildings().catch(error => console.error('Error:', error));