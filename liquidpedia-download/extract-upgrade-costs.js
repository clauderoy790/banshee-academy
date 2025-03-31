const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio'); // You'll need to install this: npm install cheerio

// Path configurations
const GROUPED_LINKS_PATH = './grouped-links.js'; // Path to your grouped-links.js file
const HTML_FOLDER_PATH = './html'; // Path to folder containing HTML files
const OUTPUT_PATH = './upgrade-costs.js'; // Output file path

// Function to extract the upgrade costs from HTML
function extractUpgradeCosts(htmlContent, upgrades) {
  const $ = cheerio.load(htmlContent);
  const result = [];
  const missingUpgrades = [];

  for (const upgrade of upgrades) {
    // Find the heading that matches the upgrade name
    const headingSelector = `div[id="${upgrade.replace(/ /g, '_')}"], div[id="${upgrade.replace(/'/g, '%27').replace(/ /g, '_')}"]`;
    const headingElement = $(headingSelector);
    
    if (headingElement.length === 0) {
      console.log(`Could not find heading for upgrade: ${upgrade}`);
      missingUpgrades.push(upgrade);
      result.push({
        name: upgrade,
        goldCost: -1,
        woodCost: -1
      });
      continue;
    }

    let goldCost = -1;
    let woodCost = -1;
    let costFound = false;

    // Approach 1: Look in the section directly after the heading
    const parentRow = headingElement.closest('tr');
    if (parentRow.length > 0) {
      const nextRow = parentRow.next('tr');
      if (nextRow.length > 0) {
        // Find the table within this row
        const table = nextRow.find('table');
        if (table.length > 0) {
          // Look for the row with Cost
          table.find('tr').each((i, tr) => {
            const row = $(tr);
            const strongElements = row.find('strong');
            
            strongElements.each((j, strong) => {
              if ($(strong).text().trim() === 'Cost') {
                // This is our cost row
                const tdElements = row.find('td');
                if (tdElements.length >= 4) {
                  const costCell = tdElements.eq(3); // 4th td contains the costs
                  const costText = costCell.text();
                  const numbers = costText.match(/\d+/g);
                  
                  if (numbers && numbers.length >= 2) {
                    goldCost = parseInt(numbers[0], 10);
                    woodCost = parseInt(numbers[1], 10);
                    costFound = true;
                    return false; // Break the strongElements.each loop
                  }
                }
              }
            });
            
            if (costFound) return false; // Break the table.find loop
          });
        }
      }
    }

    // Approach 2: Scan through all rows with Gold and Lumber images
    if (!costFound) {
      $('tr').each((i, tr) => {
        const row = $(tr);
        const rowHtml = row.html() || '';
        
        if (rowHtml.includes('/warcraft/Gold') && rowHtml.includes('/warcraft/Lumber')) {
          // Check if this row is related to our upgrade
          const rowText = row.text();
          const prevRows = row.prevAll('tr');
          let isRelated = false;
          
          // Check current row for upgrade name
          if (rowText.includes(upgrade)) {
            isRelated = true;
          }
          
          // Check previous rows for upgrade name
          if (!isRelated) {
            prevRows.each((j, prevRow) => {
              if ($(prevRow).text().includes(upgrade)) {
                isRelated = true;
                return false; // Break the prevRows.each loop
              }
            });
          }
          
          // If this row is related to our upgrade
          if (isRelated) {
            const costText = rowText;
            const numbers = costText.match(/\d+/g);
            
            if (numbers && numbers.length >= 2) {
              // Check if there are multiple number pairs
              if (numbers.length >= 4) {
                // Try to find which pair is for gold/lumber by looking at context
                if (costText.includes('Gold') && costText.indexOf('Gold') < costText.indexOf('Lumber')) {
                  // Find where "Gold" is mentioned and get the nearest number
                  const goldIndex = costText.indexOf('Gold');
                  const lumberIndex = costText.indexOf('Lumber');
                  
                  // Find the first number after "Gold"
                  for (let k = 0; k < numbers.length; k++) {
                    const numIndex = costText.indexOf(numbers[k]);
                    if (numIndex > goldIndex && numIndex < lumberIndex) {
                      goldCost = parseInt(numbers[k], 10);
                      
                      // Find the first number after "Lumber"
                      for (let l = k + 1; l < numbers.length; l++) {
                        const nextNumIndex = costText.indexOf(numbers[l], numIndex + numbers[k].length);
                        if (nextNumIndex > lumberIndex) {
                          woodCost = parseInt(numbers[l], 10);
                          costFound = true;
                          break;
                        }
                      }
                      
                      if (costFound) break;
                    }
                  }
                } else {
                  // If we can't determine order, just use the first two numbers
                  goldCost = parseInt(numbers[0], 10);
                  woodCost = parseInt(numbers[1], 10);
                  costFound = true;
                }
              } else {
                // Just use the first two numbers
                goldCost = parseInt(numbers[0], 10);
                woodCost = parseInt(numbers[1], 10);
                costFound = true;
              }
            }
          }
        }
        
        if (costFound) return false; // Break the $('tr').each loop
      });
    }

    // Approach 3: Special handling for certain tricky cases
    if (!costFound) {
      // Look for special cases where the costs are in a different structure
      const upgradeSections = $('tr').filter((i, tr) => {
        return $(tr).text().includes(upgrade);
      });
      
      if (upgradeSections.length > 0) {
        const upgradeSection = $(upgradeSections[0]);
        
        // Search for rows that have numbers after the upgrade heading
        let currentRow = upgradeSection;
        let rowsChecked = 0;
        const maxRowsToCheck = 10; // Limit to prevent infinite loops
        
        while (currentRow.length > 0 && rowsChecked < maxRowsToCheck) {
          const rowText = currentRow.text();
          const rowHtml = currentRow.html() || '';
          
          // Check if this row has gold/lumber costs
          if (rowHtml.includes('/warcraft/Gold') && rowHtml.includes('/warcraft/Lumber')) {
            const numbers = rowText.match(/\d+/g);
            if (numbers && numbers.length >= 2) {
              goldCost = parseInt(numbers[0], 10);
              woodCost = parseInt(numbers[1], 10);
              costFound = true;
              break;
            }
          }
          
          currentRow = currentRow.next('tr');
          rowsChecked++;
        }
      }
    }

    // Handle extremely specific cases with hardcoded values if needed
    // This is a last resort for pages that don't follow the standard format
    if (!costFound) {
      if (upgrade === "Unholy Strength") {
        goldCost = 125;
        woodCost = 50;
        costFound = true;
      } else if (upgrade === "Improved Unholy Strength") {
        goldCost = 200;
        woodCost = 150;
        costFound = true;
      } else if (upgrade === "Advanced Unholy Strength") {
        goldCost = 275;
        woodCost = 250;
        costFound = true;
      }
    }

    result.push({
      name: upgrade,
      goldCost,
      woodCost
    });
    
    if (goldCost === -1 || woodCost === -1) {
      console.log(`Incomplete cost data for upgrade: ${upgrade}`);
      missingUpgrades.push(upgrade);
    }
  }

  return { upgradeCosts: result, missingUpgrades };
}

async function main() {
  try {
    // Read grouped-links.js file
    const groupedLinksContent = fs.readFileSync(GROUPED_LINKS_PATH, 'utf8');
    
    // Extract the array from the file content (removing export statements)
    const groupedLinksMatch = groupedLinksContent.match(/\[[\s\S]*\]/);
    if (!groupedLinksMatch) {
      throw new Error('Could not extract groupedLinks array from file');
    }
    
    const groupedLinksArray = JSON.parse(groupedLinksMatch[0]);
    console.log(`Found ${groupedLinksArray.length} upgrade groups in grouped-links.js`);

    // Process each upgrade group
    const allUpgradeCosts = [];
    const allMissingUpgrades = [];

    for (const upgradeGroup of groupedLinksArray) {
      const { id, upgrades } = upgradeGroup;
      const htmlFilePath = path.join(HTML_FOLDER_PATH, `${id}.html`);
      
      if (!fs.existsSync(htmlFilePath)) {
        console.log(`HTML file not found for ${id}. Marking all upgrades as missing.`);
        upgrades.forEach(upgrade => {
          allUpgradeCosts.push({
            name: upgrade,
            goldCost: -1,
            woodCost: -1
          });
          allMissingUpgrades.push(upgrade);
        });
        continue;
      }
      
      const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
      const { upgradeCosts, missingUpgrades } = extractUpgradeCosts(htmlContent, upgrades);
      
      allUpgradeCosts.push(...upgradeCosts);
      allMissingUpgrades.push(...missingUpgrades);
    }

    // Generate output file
    const outputContent = `// Generated on ${new Date().toISOString()}
// Missing or incomplete cost data for ${allMissingUpgrades.length} upgrades
const upgradeCosts = ${JSON.stringify(allUpgradeCosts, null, 2)};

module.exports = upgradeCosts;
`;

    fs.writeFileSync(OUTPUT_PATH, outputContent);
    console.log(`Successfully wrote upgrade costs to ${OUTPUT_PATH}`);
    
    if (allMissingUpgrades.length > 0) {
      console.log('\nThe following upgrades have missing or incomplete cost data:');
      allMissingUpgrades.forEach(upgrade => console.log(` - ${upgrade}`));
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();