const fs = require('fs');
const path = require('path');

// Configuration
const constantsFilePath = './buildings.constants.ts';
const buildingFilesFolder = './buildings_files';

// Function to extract image paths from the constants file
function extractImagePaths(constantsContent) {
  const imagePathRegex = /imagePath: 'assets\/images\/buildings\/(.*?)'/g;
  const imagePaths = [];
  let match;

  while ((match = imagePathRegex.exec(constantsContent)) !== null) {
    // Extract just the filename without path
    const fullPath = match[1];
    // Get just the filename part (after the last slash if there is one)
    const filename = fullPath.split('/').pop();
    imagePaths.push(filename);
  }

  return imagePaths;
}

// Function to get all files in the building_files directory
function getExistingFiles(directory) {
  try {
    return fs.readdirSync(directory);
  } catch (error) {
    console.error(`Error reading directory ${directory}: ${error.message}`);
    return [];
  }
}

// Function to check if needed images exist and delete unneeded images
function cleanupImages(neededImages, existingFiles) {
  console.log('Starting image cleanup process...');

  // Track statistics
  const stats = {
    needed: neededImages.length,
    existing: 0,
    missing: [],
    deleted: [],
  };

  // Check if needed images exist
  for (const imageName of neededImages) {
    if (!existingFiles.includes(imageName)) {
      console.error(`❌ ERROR: Required image not found: ${imageName}`);
      stats.missing.push(imageName);
    } else {
      stats.existing++;
    }
  }

  // Delete unneeded images
  for (const fileName of existingFiles) {
    // Skip directories and non-image files
    const filePath = path.join(buildingFilesFolder, fileName);
    let isDirectory = false;

    try {
      isDirectory = fs.statSync(filePath).isDirectory();
    } catch (error) {
      console.error(`Error checking file ${filePath}: ${error.message}`);
      continue;
    }

    const isImage = /\.(jpg|jpeg|png|gif|svg)$/i.test(fileName);

    if (isDirectory || !isImage) {
      continue;
    }

    if (!neededImages.includes(fileName)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted unneeded image: ${fileName}`);
        stats.deleted.push(fileName);
      } catch (error) {
        console.error(`❌ Error deleting ${fileName}: ${error.message}`);
      }
    }
  }

  return stats;
}

/**
 * Building Images Cleanup Script
 *
 * This script:
 * 1. Reads the buildings.constants.ts file to extract required image filenames
 * 2. Checks if each required image exists in the building_files folder
 * 3. Deletes unneeded images from the building_files folder
 * 4. Logs errors for missing images
 *
 * Usage:
 * - Put this script in the same directory as the buildings.constants.ts file
 * - Make sure the building_files folder is in the same directory
 * - Run: node cleanup-images.js
 */

// Main execution
try {
  console.log('======== Building Images Cleanup Tool ========');
  console.log(`Constants file: ${constantsFilePath}`);
  console.log(`Images folder: ${buildingFilesFolder}`);
  console.log('=============================================\n');

  // Check if directories and files exist
  if (!fs.existsSync(constantsFilePath)) {
    throw new Error(`Constants file not found at ${constantsFilePath}`);
  }

  if (!fs.existsSync(buildingFilesFolder)) {
    throw new Error(
      `Building files folder not found at ${buildingFilesFolder}`
    );
  }

  // Read the constants file
  const constantsContent = fs.readFileSync(constantsFilePath, 'utf8');
  console.log('Successfully read constants file.');

  // Extract needed image paths
  const neededImagePaths = extractImagePaths(constantsContent);
  console.log(
    `Found ${neededImagePaths.length} image references in constants file.`
  );

  if (neededImagePaths.length > 0) {
    console.log('Sample image paths:');
    neededImagePaths.slice(0, 3).forEach((path) => console.log(` - ${path}`));
    if (neededImagePaths.length > 3) {
      console.log(` ... and ${neededImagePaths.length - 3} more`);
    }
  }

  // Get list of existing files
  const existingFiles = getExistingFiles(buildingFilesFolder);
  console.log(`Found ${existingFiles.length} files in building_files folder.`);

  // Cleanup images
  const stats = cleanupImages(neededImagePaths, existingFiles);

  // Summary
  console.log('\n============== Summary ==============');
  console.log(`Total images needed: ${stats.needed}`);
  console.log(`Images found: ${stats.existing}`);
  console.log(`Missing images: ${stats.missing.length}`);
  console.log(`Deleted unneeded images: ${stats.deleted.length}`);

  if (stats.missing.length > 0) {
    console.log('\n📋 List of missing images:');
    stats.missing.forEach((img) => console.log(` - ${img}`));
  }

  if (stats.deleted.length > 0) {
    console.log('\n🗑️ List of deleted images:');
    stats.deleted.forEach((img) => console.log(` - ${img}`));
  }

  console.log('\nImage cleanup process completed!');
} catch (error) {
  console.error(`❌ Error: ${error.message}`);
  process.exit(1);
}
