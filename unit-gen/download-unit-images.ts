import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as url from 'url';

// Define interface for Card based on the structure in your file
interface Card {
  id: string;
  name: string;
  race: string;
  type: string;
  goldCost: number;
  woodCost: number;
  imagePath: string;
  difficulty: string[];
}

// Function to download an image
function downloadImage(imageUrl: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Make sure URL is valid
    if (!imageUrl.startsWith('http')) {
      return reject(new Error(`Invalid URL: ${imageUrl}`));
    }
    
    // Clean up the URL to just get the image 
    // Remove everything after .png if it exists
    const cleanImageUrl = imageUrl.replace(/(.+\.png)\/.*/, '$1');
    console.log(`Using URL: ${cleanImageUrl}`);

    // Parse the URL
    const parsedUrl = url.parse(cleanImageUrl);
    
    // Create directory if it doesn't exist
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Make the request
    const req = https.get(cleanImageUrl, (res) => {
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        if (res.headers.location) {
          return downloadImage(res.headers.location, outputPath)
            .then(resolve)
            .catch(reject);
        } else {
          return reject(new Error('Redirect with no location'));
        }
      }
      
      // Check for successful response
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download image: ${res.statusCode}`));
      }
      
      // Create write stream
      const fileStream = fs.createWriteStream(outputPath);
      res.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(outputPath, () => {}); // Delete the file if there's an error
        reject(err);
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    // Set a timeout
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
    
    req.end();
  });
}

// Extract an image URL from an object string in the file
function extractImagePath(objString: string): string | null {
  const match = objString.match(/imagePath:\s*['"]([^'"]+)['"]/);
  return match ? match[1] : null;
}

// Extract an object ID from an object string in the file
function extractId(objString: string): string | null {
  const match = objString.match(/id:\s*['"]([^'"]+)['"]/);
  return match ? match[1] : null;
}

// Extract a unit name from an object string in the file
function extractName(objString: string): string | null {
  const match = objString.match(/name:\s*['"]([^'"]+)['"]/);
  return match ? match[1] : null;
}

// Main function to process the file and download images
async function main() {
  try {
    // Create output directory if it doesn't exist
    const outputDir = './units_images';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Read the units.constants.ts file
    const filePath = './units.constants.ts';
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Regular expression to find unit objects
    const unitRegex = /{\s*id:\s*['"][^'"]+['"],[\s\S]*?difficulty:[\s\S]*?},/g;
    const unitMatches = fileContent.match(unitRegex) || [];
    
    console.log(`Found ${unitMatches.length} unit objects in the file.`);
    
    // Stats tracking
    let totalImages = 0;
    let successfulDownloads = 0;
    const failedDownloads: { unit: string, url: string, error: string }[] = [];
    
    // Map to store unit ID to new image path
    const imagePathMap: Record<string, string> = {};
    
    // Process each unit object
    for (const unitMatch of unitMatches) {
      const imagePath = extractImagePath(unitMatch);
      const id = extractId(unitMatch);
      const name = extractName(unitMatch);
      
      if (imagePath && id && name) {
        totalImages++;
        
        // Extract filename from URL - looking for the BTN*.png filename pattern
        const btnMatch = imagePath.match(/\/(BTN[^\/]+\.png)/);
        const filename = btnMatch ? btnMatch[1] : path.basename(imagePath).split('?')[0];
        
        // Output path
        const outputPath = path.join(outputDir, filename);
        
        try {
          // Download the image
          console.log(`Downloading: ${name} (${filename})...`);
          await downloadImage(imagePath, outputPath);
          console.log(`✅ Downloaded: ${name} (${filename})`);
          successfulDownloads++;
          
          // Store the new image path
          imagePathMap[id] = `assets/images/units/${filename}`;
          
        } catch (error) {
          console.error(`❌ Failed to download: ${name} (${imagePath})`);
          console.error(`   Error: ${error instanceof Error ? error.message : String(error)}`);
          failedDownloads.push({ 
            unit: name, 
            url: imagePath, 
            error: error instanceof Error ? error.message : String(error)
          });
        }
      } else {
        console.warn(`⚠️ Could not extract required information from unit object:\n${unitMatch}`);
      }
    }
    
    // Update the file with new image paths
    let updatedFileContent = fileContent;
    for (const [id, newPath] of Object.entries(imagePathMap)) {
      const regex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?imagePath:\\s*['"])[^'"]+(['"])`, 'g');
      updatedFileContent = updatedFileContent.replace(regex, `$1${newPath}$2`);
    }
    
    // Write the updated file
    fs.writeFileSync('./units.constants.updated.ts', updatedFileContent);
    
    // Print summary
    console.log('\n======= DOWNLOAD SUMMARY =======');
    console.log(`Total images: ${totalImages}`);
    console.log(`Successfully downloaded: ${successfulDownloads}`);
    console.log(`Failed downloads: ${failedDownloads.length}`);
    
    if (failedDownloads.length > 0) {
      console.log('\nFailed Downloads:');
      failedDownloads.forEach((fail, index) => {
        console.log(`${index + 1}. ${fail.unit} - ${fail.url}\n   Error: ${fail.error}`);
      });
    }
    
    console.log('\n======= INSTRUCTIONS =======');
    console.log('1. A new file "units.constants.updated.ts" has been created with updated image paths');
    console.log('2. Downloaded images are stored in the "./units_images" directory');
    console.log('3. For failed downloads, the original URLs have been preserved');
    console.log('4. Review and rename "units.constants.updated.ts" to "units.constants.ts" if satisfied');
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Run the main function
main().catch(console.error);