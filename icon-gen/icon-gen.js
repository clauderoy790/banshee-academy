const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Base image path 
const baseImage = 'banshee-academy-logo.png';

// Define the icon sizes needed based on your manifest
const iconSizes = [
  { width: 72, height: 72, name: 'icon-72x72.png' },
  { width: 96, height: 96, name: 'icon-96x96.png' },
  { width: 128, height: 128, name: 'icon-128x128.png' },
  { width: 144, height: 144, name: 'icon-144x144.png' },
  { width: 152, height: 152, name: 'icon-152x152.png' },
  { width: 192, height: 192, name: 'manifest-icon-192.maskable.png' },
  { width: 384, height: 384, name: 'icon-384x384.png' },
  { width: 512, height: 512, name: 'manifest-icon-512.maskable.png' }
];

// Create output directory if it doesn't exist
const outputDirAssets = path.join('src', 'assets', 'icons');
if (!fs.existsSync(outputDirAssets)) {
  fs.mkdirSync(outputDirAssets, { recursive: true });
}

// Generate icons
async function generateIcons() {
  try {
    for (const size of iconSizes) {
      const outputPath = path.join(outputDirAssets, size.name);
      
      await sharp(baseImage)
        .resize(size.width, size.height)
        .toFile(outputPath);
      
      console.log(`Generated: ${outputPath}`);
    }
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();