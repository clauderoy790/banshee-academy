import * as fs from 'fs';
import * as path from 'path';
import * as cheerio from 'cheerio';

// Define the interface for a unit card
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

function readUnitPage(unitId: string): string {
  try {
    // Construct the path to the local HTML file
    const filePath = path.join('./units', `${unitId}.html`);
    
    // Read the file
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error(`Error reading file for ${unitId}:`, error);
    return '';
  }
}

function extractUnitData(html: string): { goldCost: number, woodCost: number, iconUrl: string } {
  const $ = cheerio.load(html);
  
  // Default values if extraction fails
  let goldCost = -1;
  let woodCost = -1;
  let iconUrl = '';
  
  // Extract Gold cost
  // Look for the table row with "Gold" in the th
  const goldRow = $('th:contains("Gold")').closest('tr');
  if (goldRow.length) {
    const goldText = goldRow.find('td').text().trim();
    const goldMatch = goldText.match(/(\d+)/);
    if (goldMatch) {
      goldCost = parseInt(goldMatch[1], 10);
    }
  }
  
  // Extract Lumber cost
  // Look for the table row with "Lumber" in the th
  const lumberRow = $('th:contains("Lumber")').closest('tr');
  if (lumberRow.length) {
    const lumberText = lumberRow.find('td').text().trim();
    const lumberMatch = lumberText.match(/(\d+)/);
    if (lumberMatch) {
      woodCost = parseInt(lumberMatch[1], 10);
    }
  }
  
  // Extract icon URL
  // This is usually in the tabber content or directly in the infobox
  // First try the Classic tab
  let iconElement = $('.tabber img').first();
  if (!iconElement.length) {
    // If not found in tabber, try the first image in the infobox
    iconElement = $('table.infobox img').first();
  }
  
  if (iconElement.length) {
    iconUrl = iconElement.attr('src') || '';
    
    // Handle data-src attribute (for lazy-loaded images)
    if ((!iconUrl || iconUrl.includes('data:image/gif')) && iconElement.attr('data-src')) {
      iconUrl = iconElement.attr('data-src') || '';
    }
    
    // Fix URLs that are relative
    if (iconUrl && !iconUrl.startsWith('http')) {
      iconUrl = 'https:' + iconUrl;
    }
  }
  
  return { goldCost, woodCost, iconUrl };
}

function updateConstantsFile(filePath: string, unitsWithData: Record<string, { goldCost: number, woodCost: number, iconUrl: string }>): void {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // For each unit that we have data for
  Object.entries(unitsWithData).forEach(([unitId, { goldCost, woodCost, iconUrl }]) => {
    // Create a RegExp pattern that matches the unit's entry in the constants file
    const unitPattern = new RegExp(`({\\s*id:\\s*['"]${unitId}['"][^}]*})`, 's');
    const unitMatch = content.match(unitPattern);
    
    if (unitMatch) {
      let unitEntry = unitMatch[1];
      
      // Update goldCost if valid
      if (goldCost !== -1) {
        unitEntry = unitEntry.replace(
          /(goldCost:\s*)-?\d+/,
          `$1${goldCost}`
        );
      }
      
      // Update woodCost if valid
      if (woodCost !== -1) {
        unitEntry = unitEntry.replace(
          /(woodCost:\s*)-?\d+/,
          `$1${woodCost}`
        );
      }
      
      // Update imagePath if valid
      if (iconUrl) {
        unitEntry = unitEntry.replace(
          /(imagePath:\s*['"]).*?(['"])/,
          `$1${iconUrl}$2`
        );
      }
      
      // Replace the old unit entry with the updated one
      content = content.replace(unitPattern, unitEntry);
    }
  });
  
  // Write the updated content back to the file
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${Object.keys(unitsWithData).length} units in ${filePath}`);
}

async function main() {
  // Path to your constants file
  const constantsFilePath = './units.constants.ts';
  
  // Read the constants file
  const content = fs.readFileSync(constantsFilePath, 'utf8');
  
  // Extract unit IDs using regex
  const unitIdRegex = /id:\s*['"]([^'"]+)['"]/g;
  let match;
  const unitIds = [];
  
  while ((match = unitIdRegex.exec(content)) !== null) {
    unitIds.push(match[1]);
  }
  
  console.log(`Found ${unitIds.length} units in constants file`);
  
  // Process each unit
  const unitsData: Record<string, { goldCost: number, woodCost: number, iconUrl: string }> = {};
  
  for (const unitId of unitIds) {
    console.log(`Processing unit: ${unitId}`);
    
    // Read the local HTML file
    const html = readUnitPage(unitId);
    
    if (html) {
      // Extract data from the HTML
      const { goldCost, woodCost, iconUrl } = extractUnitData(html);
      
      console.log(`- Gold cost: ${goldCost}`);
      console.log(`- Wood cost: ${woodCost}`);
      console.log(`- Icon URL: ${iconUrl}`);
      
      if (goldCost !== -1 || woodCost !== -1 || iconUrl) {
        unitsData[unitId] = { goldCost, woodCost, iconUrl };
      }
    }
  }
  
  // Update the constants file with the new data
  updateConstantsFile(constantsFilePath, unitsData);
}

main().catch(console.error);