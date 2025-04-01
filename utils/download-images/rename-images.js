/**
 * Warcraft Upgrades Image Renamer
 * 
 * This script reads the card data array from paste.txt and copies images from the 
 * all-upgrades_files directory to a new location with proper naming according to card IDs.
 */

const fs = require('fs');
const path = require('path');

// Define the source directory (where image files are located)
const sourceDir = path.join(__dirname, 'all-upgrades_files');
// Define the target directory (where renamed images will be saved)
const targetDir = path.join(__dirname, 'renamed_images');

// Create the target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Read the card data file
const cardData = fs.readFileSync(path.join(__dirname, 'paste.txt'), 'utf8');

// Define the enums used in the data
const Race = {
  Undead: 'Undead',
  Human: 'Human',
  NightElf: 'NightElf',
  Orc: 'Orc'
};

const CardType = {
  Upgrade: 'Upgrade'
};

// Extract and parse the array
const arrayStart = cardData.indexOf('[');
const arrayEnd = cardData.lastIndexOf(']');
const cardsArrayText = cardData.substring(arrayStart, arrayEnd + 1);
const cards = new Function('Race', 'CardType', 'return ' + cardsArrayText)(Race, CardType);

console.log(`Found ${cards.length} cards in the data`);

// Define special mappings for filenames that might be hard to match automatically
const specialMappings = {
  'AbolishMagic.gif': 'ne_abolish_magic',
  'Barrage.gif': 'hu_barrage',
  'Cannibalize.gif': 'ud_cannibalize',
  'Cloud.gif': 'hu_cloud',
  'Controlmagic.gif': 'hu_control_magic',
  'Corrosivebreath2.gif': 'ne_corrosive_breath',
  'Cryptfiendburrow.gif': 'ud_burrow',
  'Defend.gif': 'hu_defend',
  'Destroyer.gif': 'ud_destroyer_form',
  'Ensnareability.gif': 'orc_ensnare',
  'Envenomedspears.gif': 'orc_envenomed_spears',
  'Faeriefire.gif': 'ne_mark_of_the_talon',
  'Flare.gif': 'hu_flare',
  'Fragmentationshards.gif': 'hu_fragmentation_shards',
  'Freezingbreath2.gif': 'ud_freezing_breath',
  'Liquidfire.gif': 'orc_liquid_fire',
  'Moonglaive.gif': 'ne_moon_glaive',
  'Naphtha.gif': 'orc_burning_oil',
  'Pillage.gif': 'orc_pillage',
  'Plaguecloud.gif': 'ud_disease_cloud',
  'Sentinelability.gif': 'ne_sentinel',
  'Stoneform.gif': 'ud_stone_form',
  'Stormhammer.gif': 'hu_storm_hammers',
  'Vorpalblades.gif': 'ne_vorpal_blades',
  'Web.gif': 'ud_web'
};

// Get all files in the source directory
const sourceFiles = fs.readdirSync(sourceDir);
console.log(`Found ${sourceFiles.length} files in source directory`);

// Function to find the best match for a card ID
function findBestMatchingFile(cardId, cardName, sourceFiles) {
  // Check special mappings first
  for (const [filename, mappedId] of Object.entries(specialMappings)) {
    if (mappedId === cardId) {
      // Look for this filename with any prefix
      const match = sourceFiles.find(file => file.endsWith(filename));
      if (match) return match;
    }
  }

  // Extract the race prefix and ability name from the card ID
  const [racePrefix, ...abilityParts] = cardId.split('_');
  const ability = abilityParts.join('_');
  
  // Normalize the card name (remove spaces, apostrophes, etc.)
  const normalizedName = cardName.toLowerCase().replace(/[\s']/g, '');
  
  // Try to find an exact match by ID pattern in the filename
  let match = sourceFiles.find(file => 
    file.toLowerCase().includes(ability) && 
    file.toLowerCase().includes(racePrefix)
  );
  if (match) return match;
  
  // Try to find a match by card name
  match = sourceFiles.find(file => 
    file.toLowerCase().includes(normalizedName) ||
    normalizedName.includes(file.toLowerCase().replace(/\..*$/, '').replace(/^\d+px-/, ''))
  );
  if (match) return match;
  
  // Try to find a match by the ability part only
  match = sourceFiles.find(file => 
    file.toLowerCase().includes(ability) ||
    file.toLowerCase().includes(ability.replace(/_/g, ''))
  );
  if (match) return match;
  
  // For BTN format files, try different patterns
  match = sourceFiles.find(file => 
    file.includes('BTN') && 
    (file.toLowerCase().includes(ability) ||
     file.toLowerCase().includes(normalizedName))
  );
  if (match) return match;
  
  // Try to find any file that contains key parts of the ability name
  const keyParts = ability.split('_').filter(part => part.length > 3);
  for (const part of keyParts) {
    match = sourceFiles.find(file => 
      file.toLowerCase().includes(part)
    );
    if (match) return match;
  }
  
  return null;
}

// Process each card and copy its image
let successCount = 0;
let failCount = 0;

cards.forEach(card => {
  const matchingFile = findBestMatchingFile(card.id, card.name, sourceFiles);
  
  if (matchingFile) {
    try {
      const sourcePath = path.join(sourceDir, matchingFile);
      const targetPath = path.join(targetDir, `${card.id}.png`);
      
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied: ${matchingFile} → ${card.id}.png`);
      successCount++;
    } catch (error) {
      console.error(`Error copying file for ${card.id}: ${error.message}`);
      failCount++;
    }
  } else {
    console.warn(`No matching file found for: ${card.id} (${card.name})`);
    failCount++;
  }
});

console.log(`
Processing complete:
- Successfully copied: ${successCount} files
- Failed: ${failCount} files
`);