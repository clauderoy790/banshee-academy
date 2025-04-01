import * as fs from 'fs';
import * as path from 'path';

// Function to extract image paths from the constants file
function extractImagePathsFromConstantsFile(filePath: string): string[] {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    // Use regex to extract all imagePath values
    const imagePathRegex = /imagePath:\s*['"]([^'"]+)['"]/g;
    const matches = [...fileContent.matchAll(imagePathRegex)];
    
    return matches.map(match => match[1]);
  } catch (error) {
    console.error(`Error reading or parsing constants file: ${error}`);
    return [];
  }
}

// Function to extract the filename from the imagePath
function extractFilename(imagePath: string): string {
  return path.basename(imagePath);
}

// Main function to check for missing images
function findMissingImages() {
  const constantsFilePath = './upgrades.constants.ts';
  const highResFolder = './upgrades_high_res';
  
  // Ensure the files and directories exist
  if (!fs.existsSync(constantsFilePath)) {
    console.error(`Error: The file ${constantsFilePath} does not exist.`);
    process.exit(1);
  }
  
  if (!fs.existsSync(highResFolder)) {
    console.error(`Error: The directory ${highResFolder} does not exist.`);
    process.exit(1);
  }
  
  // Extract image paths from the constants file
  const imagePaths = extractImagePathsFromConstantsFile(constantsFilePath);
  console.log(`Total number of upgrade cards: ${imagePaths.length}`);
  
  // Extract filenames from paths
  const imageFilenames = imagePaths.map(extractFilename);
  
  // Get a list of all files in the high-res folder
  const highResFiles = fs.readdirSync(highResFolder);
  console.log(`Total number of image files in ${highResFolder}: ${highResFiles.length}`);
  
  // Check for missing files
  const missingImages: { filename: string; path: string }[] = [];
  
  imageFilenames.forEach((filename, index) => {
    if (!highResFiles.includes(filename)) {
      missingImages.push({
        filename,
        path: imagePaths[index]
      });
    }
  });
  
  // Output results
  if (missingImages.length === 0) {
    console.log('All images are present in the high-res folder!');
  } else {
    console.log(`Found ${missingImages.length} missing images:`);
    missingImages.forEach(missing => {
      console.log(`- ${missing.filename} (Original path: ${missing.path})`);
    });
  }
  
  // Check for extra files in the high-res folder
  const extraFiles = highResFiles.filter(file => !imageFilenames.includes(file));
  
  if (extraFiles.length > 0) {
    console.log(`\nFound ${extraFiles.length} extra files in the high-res folder that aren't referenced in the constants:`);
    extraFiles.forEach(file => {
      console.log(`- ${file}`);
    });
  }
}

// Run the main function
findMissingImages();