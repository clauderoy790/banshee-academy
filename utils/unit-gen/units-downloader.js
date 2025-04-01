const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);
const existsAsync = promisify(fs.exists);

// Function to extract unit information from TypeScript file
function extractUnitsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find sections for each race's units
  const racePatterns = {
    UD_UNITS: /export const UD_UNITS[\s\S]*?;/,
    HU_UNITS: /export const HU_UNITS[\s\S]*?;/,
    NE_UNITS: /export const NE_UNITS[\s\S]*?;/,
    OC_UNITS: /export const OC_UNITS[\s\S]*?;/
  };
  
  const allUnits = [];
  
  // Process each race section
  for (const [raceName, pattern] of Object.entries(racePatterns)) {
    const match = content.match(pattern);
    if (!match) continue;
    
    const raceSection = match[0];
    
    // Extract ids
    const idMatches = raceSection.match(/id:\s*'([^']+)'/g) || [];
    const nameMatches = raceSection.match(/name:\s*'([^']+)'/g) || [];
    const imagePathMatches = raceSection.match(/imagePath:\s*'([^']+)'/g) || [];
    
    for (let i = 0; i < idMatches.length; i++) {
      const id = idMatches[i].match(/id:\s*'([^']+)'/)[1];
      const name = nameMatches[i].match(/name:\s*'([^']+)'/)[1];
      const imagePath = imagePathMatches[i].match(/imagePath:\s*'([^']+)'/)[1];
      
      allUnits.push({ id, name, imagePath, race: raceName });
    }
  }
  
  return allUnits;
}

// Function to pause execution
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to download a web page
async function downloadPage(url, filePath) {
  try {
    // Check if the file already exists
    const fileExists = await existsAsync(filePath);
    if (fileExists) {
      console.log(`File already exists: ${filePath}, skipping...`);
      return { success: true, path: filePath };
    }
    
    // Make the request to download the page
    const response = await axios.get(url);
    
    // Write the content to a file
    await writeFileAsync(filePath, response.data);
    
    console.log(`Successfully downloaded: ${url} to ${filePath}`);
    return { success: true, path: filePath };
  } catch (error) {
    console.error(`Error downloading ${url}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Function to update the units constants file
async function updateUnitsConstantsFile(allUnits) {
  try {
    // Read the current file
    const filePath = path.resolve('./units.constants.ts');
    let fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Update the imagePath for each unit
    for (const unit of allUnits) {
      if (unit.downloaded) {
        const oldPath = `imagePath: '${unit.originalPath}'`;
        const newPath = `imagePath: './units/${unit.id}.html'`;
        fileContent = fileContent.replace(oldPath, newPath);
      }
    }
    
    // Write the updated content back to the file
    await writeFileAsync(filePath, fileContent);
    console.log('Successfully updated units.constants.ts');
    return true;
  } catch (error) {
    console.error(`Error updating units.constants.ts: ${error.message}`);
    return false;
  }
}

// Main function to process all units
async function processAllUnits() {
  // Create units directory if it doesn't exist
  const unitsDir = path.resolve('./units');
  if (!await existsAsync(unitsDir)) {
    await mkdirAsync(unitsDir, { recursive: true });
    console.log('Created units directory');
  }
  
  // Get units from the TypeScript file
  const filePath = path.resolve('./units.constants.ts');
  const allUnits = extractUnitsFromFile(filePath);
  
  console.log(`Found ${allUnits.length} units to process`);
  
  const processedUnits = [];
  
  // Download each unit's page
  for (const unit of allUnits) {
    const unitId = unit.id;
    const url = unit.imagePath;
    const filePath = path.resolve(`./units/${unitId}.html`);
    
    console.log(`Processing ${unit.name} (${unitId})...`);
    
    const result = await downloadPage(url, filePath);
    
    processedUnits.push({
      ...unit,
      downloaded: result.success,
      originalPath: unit.imagePath
    });
    
    // Pause between downloads
    console.log('Pausing for 3 seconds...');
    await sleep(3000);
  }
  
  // Update the constants file with new paths
  await updateUnitsConstantsFile(processedUnits);
  
  // Summary
  const successCount = processedUnits.filter(u => u.downloaded).length;
  const failCount = processedUnits.length - successCount;
  
  console.log('\n=== Download Summary ===');
  console.log(`Total units: ${processedUnits.length}`);
  console.log(`Successfully downloaded: ${successCount}`);
  console.log(`Failed downloads: ${failCount}`);
  
  if (failCount > 0) {
    console.log('\nFailed downloads:');
    processedUnits
      .filter(u => !u.downloaded)
      .forEach(u => console.log(`- ${u.name} (${u.id}): ${u.originalPath}`));
  }
}

// Run the main function
processAllUnits()
  .then(() => console.log('Script completed'))
  .catch(error => console.error(`Script failed: ${error.message}`));