// Import required modules
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const axios = require('axios');

// Path to store state and results
const STATE_FILE = path.join(__dirname, 'scraper-state.json');
const UPGRADES_FILE = path.join(__dirname, 'upgrades.js');

// Load state from file or initialize with defaults
function loadState() {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
      console.log(`Loaded previous state with ${state.processedUrls.length} processed URLs and ${state.allUpgrades.length} upgrades`);
      return state;
    }
  } catch (error) {
    console.error('Error loading state file:', error.message);
  }
  
  // Default state
  return {
    allUpgrades: [],
    processedUrls: [],
    pendingUrls: [],
    lastRun: null
  };
}

// Save current state to file
function saveState(state) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
    console.log(`State saved with ${state.processedUrls.length} processed URLs and ${state.allUpgrades.length} upgrades`);
  } catch (error) {
    console.error('Error saving state file:', error.message);
  }
}

// Save upgrades to JavaScript file
function saveUpgradesToFile(upgrades) {
  // Sort upgrades by name for consistency
  const sortedUpgrades = [...upgrades].sort((a, b) => a.name.localeCompare(b.name));

  const content = `// Warcraft Upgrades - Generated on ${new Date().toISOString()}
const warcraftUpgrades = ${JSON.stringify(sortedUpgrades, null, 2)};

// Export as module for Node.js
if (typeof module !== 'undefined') {
  module.exports = warcraftUpgrades;
}
`;

  fs.writeFileSync(UPGRADES_FILE, content, 'utf8');
  console.log(`Saved ${upgrades.length} upgrades to ${UPGRADES_FILE}`);
}

/**
 * Process an HTML file and extract all Warcraft wiki links
 * @param {string} filePath - Path to the HTML file
 * @param {object} state - Current scraper state
 * @returns {string[]} Array of new links to process
 */
function processInitialFile(filePath, state) {
  console.log(`Processing initial file: ${filePath}`);
  const html = fs.readFileSync(filePath, 'utf8');
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  // Process any upgrades in the initial file
  processImprovedMasonryStylePage(document, state);
  processUpgradesCatalogPage(document, state);
  
  // Find links to other Warcraft pages
  const allLinks = findWarcraftLinks(document);
  console.log('all links count: ', allLinks.length);
  
  
  // Filter out already processed URLs
  const newLinks = allLinks.filter(link => !state.processedUrls.includes(link));
  
  console.log(`Found ${allLinks.length} total links, ${newLinks.length} are new`);
  
  // Add all new links to pending URLs
  state.pendingUrls.push(...newLinks);
  
  // Mark the initial file as processed
  if (!state.processedUrls.includes(filePath)) {
    state.processedUrls.push(filePath);
  }
  
  // Save state after processing initial file
  saveState(state);
  saveUpgradesToFile(state.allUpgrades);
  
  return newLinks;
}

/**
 * Process a single URL and update state
 * @param {string} url - URL to process
 * @param {object} state - Current scraper state
 * @returns {boolean} Success status
 */
async function processSingleUrl(url, state) {
  if (state.processedUrls.includes(url)) {
    console.log(`URL already processed, skipping: ${url}`);
    return true;
  }

  console.log(`Fetching: ${url}`);
  
  try {
    // Fetch the page
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      timeout: 15000,
    });

    // Create DOM from the response
    const dom = new JSDOM(response.data);
    const document = dom.window.document;
    
    // Process upgrades from this page
    processImprovedMasonryStylePage(document, state);
    processUpgradesCatalogPage(document, state);
    
    // Find new links (but don't add them to pending yet - we'll do that separately if needed)
    const newLinks = findWarcraftLinks(document).filter(
      link => !state.processedUrls.includes(link) && !state.pendingUrls.includes(link)
    );
    console.log('new links count: ', newLinks.length);
    
    
    if (newLinks.length > 0) {
      console.log(`Found ${newLinks.length} new links on ${url}`);
      state.pendingUrls.push(...newLinks);
    }
    
    // Mark as processed
    state.processedUrls.push(url);
    
    // Remove from pending if it's there
    const pendingIndex = state.pendingUrls.indexOf(url);
    if (pendingIndex !== -1) {
      state.pendingUrls.splice(pendingIndex, 1);
    }
    
    // Save state and upgrades after each successful page
    saveState(state);
    saveUpgradesToFile(state.allUpgrades);
    
    return true;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error(`Rate limited (429) when fetching ${url}. Pausing...`);
      // Don't mark as processed, keep in pending
      return false;
    } else {
      console.error(`Error fetching ${url}:`, error.message);
      // For other errors, we'll mark as processed to avoid retry loops
      state.processedUrls.push(url);
      
      // Remove from pending if it's there
      const pendingIndex = state.pendingUrls.indexOf(url);
      if (pendingIndex !== -1) {
        state.pendingUrls.splice(pendingIndex, 1);
      }
      
      saveState(state);
      return true; // Consider it handled
    }
  }
}

/**
 * Process pages that follow the Improved Masonry style
 * @param {Document} document - DOM document
 * @param {object} state - Current scraper state
 */
function processImprovedMasonryStylePage(document, state) {
  // Get all sections with class wiki-backgroundcolor-light (upgrade titles)
  const titleElements = document.querySelectorAll(
    'div.wiki-backgroundcolor-light'
  );

  titleElements.forEach((titleElement) => {
    const name = titleElement.textContent.trim();

    // Skip if it's just "Contents" or empty
    if (!name || name === 'Contents') return;

    // Find the cost row in the table after this title
    let costRow = null;
    let parent = titleElement.parentElement;

    // Walk through siblings to find cost information
    while (parent) {
      const rows = parent.querySelectorAll('tr');

      for (const row of rows) {
        if (row.textContent.includes('Cost')) {
          costRow = row;
          break;
        }
      }

      if (costRow) break;
      parent = parent.nextElementSibling;
    }

    if (costRow) {
      // Extract gold and wood costs
      const rowText = costRow.textContent;

      // Find gold cost
      let goldCost = 0;
      const goldMatch = rowText.match(/(\d+)\s*(?:Gold|gold)/);
      if (goldMatch && goldMatch[1]) {
        goldCost = parseInt(goldMatch[1], 10);
      }

      // Find wood cost
      let woodCost = 0;
      const woodMatch = rowText.match(/(\d+)\s*(?:Lumber|Wood|wood|lumber)/);
      if (woodMatch && woodMatch[1]) {
        woodCost = parseInt(woodMatch[1], 10);
      }

      if (name && (goldCost > 0 || woodCost > 0)) {
        addUpgrade(name, goldCost, woodCost, state);
      }
    }
  });
}

/**
 * Process pages that list multiple upgrades in various formats
 * @param {Document} document - DOM document
 * @param {object} state - Current scraper state
 */
function processUpgradesCatalogPage(document, state) {
  // Find all title elements with class wiki-backgroundcolor-light that contain a <b> tag
  const titleElements = document.querySelectorAll('.wiki-backgroundcolor-light');
  
  // Find all TD cells that contain both Gold and Lumber links
  const costCells = [];
  const allTds = document.querySelectorAll('td:has(> a[title="Gold"]):has(> a[title="Lumber"])');
  
  for (const td of allTds) {
    const hasGoldLink = td.querySelector('a[href="/warcraft/Gold"], a[title="Gold"]');
    const hasLumberLink = td.querySelector('a[href="/warcraft/Lumber"], a[title="Lumber"]');
    
    if (hasGoldLink && hasLumberLink) {
      costCells.push(td);
    }
  }
  
  console.log(`Found ${titleElements.length} potential upgrade titles and ${costCells.length} cost cells`);
  
  // Check if we have a matching number of titles and cost cells
  if (titleElements.length > 0 && costCells.length > 0) {
    // Extract upgrade names from titles
    const upgradeNames = [];
    
    for (const title of titleElements) {
      const boldElement = title.querySelector('b');
      const name = boldElement ? boldElement.textContent.trim() : title.textContent.trim();
      
      if (name && name !== 'Contents') {
        upgradeNames.push(name);
      }
    }
    
    console.log(`Extracted ${upgradeNames.length} valid upgrade names`);
    
    // If we have the same number of costs as upgrades, we can match them directly
    if (upgradeNames.length === costCells.length) {
      console.log('Number of upgrades matches number of cost cells, using direct mapping');
      
      // Process each upgrade with its corresponding cost cell
      for (let i = 0; i < upgradeNames.length; i++) {
        const name = upgradeNames[i];
        const costCell = costCells[i];
        
        // Extract costs from the cell
        const cellText = costCell.textContent.trim();
        const numbers = cellText.match(/\d+/g);
        
        let goldCost = 0;
        let woodCost = 0;
        
        if (numbers && numbers.length >= 2) {
          goldCost = parseInt(numbers[0], 10);
          woodCost = parseInt(numbers[1], 10);
          
          console.log(`Direct match: "${name}" with costs Gold: ${goldCost}, Wood: ${woodCost}`);
          addUpgrade(name, goldCost, woodCost, state);
        }
      }
    } else {
      // If counts don't match, we need a more complex matching strategy
      console.log('Number of upgrades does not match cost cells, using proximity matching');
      
      // Create a mapping from titles to cost cells based on proximity in the document
      const mapping = [];
      
      for (const name of upgradeNames) {
        // Find the corresponding title element
        let titleElement = null;
        for (const title of titleElements) {
          const boldText = title.querySelector('b') ? title.querySelector('b').textContent.trim() : '';
          const titleText = title.textContent.trim();
          
          if (name === boldText || name === titleText) {
            titleElement = title;
            break;
          }
        }
        
        if (!titleElement) continue;
        
        // Find the closest cost cell after this title
        let closestCell = null;
        let minDistance = Infinity;
        
        for (const cell of costCells) {
          // Skip cells that have already been assigned
          if (mapping.some(m => m.cell === cell)) continue;
          
          // Check if this cell is after the title in the document
          if (isElementAfter(titleElement, cell)) {
            const distance = getElementDistance(titleElement, cell);
            if (distance < minDistance) {
              minDistance = distance;
              closestCell = cell;
            }
          }
        }
        
        if (closestCell) {
          mapping.push({
            name: name,
            cell: closestCell
          });
        }
      }
      
      console.log(`Created ${mapping.length} title-to-cost mappings based on proximity`);
      
      // Process the mappings
      for (const map of mapping) {
        const name = map.name;
        const costCell = map.cell;
        
        // Extract costs from the cell
        const cellText = costCell.textContent.trim();
        const numbers = cellText.match(/\d+/g);
        
        let goldCost = 0;
        let woodCost = 0;
        
        if (numbers && numbers.length >= 2) {
          goldCost = parseInt(numbers[0], 10);
          woodCost = parseInt(numbers[1], 10);
          
          console.log(`Proximity match: "${name}" with costs Gold: ${goldCost}, Wood: ${woodCost}`);
          addUpgrade(name, goldCost, woodCost, state);
        }
      }
    }
  } else {
    console.log('Could not find matching titles and cost cells');
  }
}

/**
 * Determines if element2 is after element1 in the DOM
 * @param {Element} element1 - First element
 * @param {Element} element2 - Second element
 * @return {boolean} - Whether element2 appears after element1
 */
function isElementAfter(element1, element2) {
  // Convert elements to arrays and compare their positions
  const all = Array.from(document.querySelectorAll('*'));
  const pos1 = all.indexOf(element1);
  const pos2 = all.indexOf(element2);
  
  return pos1 < pos2 && pos1 !== -1 && pos2 !== -1;
}

/**
 * Calculates the "distance" between two elements in the DOM
 * @param {Element} element1 - First element
 * @param {Element} element2 - Second element
 * @return {number} - Distance (lower is closer)
 */
function getElementDistance(element1, element2) {
  // Convert elements to arrays and calculate distance
  const all = Array.from(document.querySelectorAll('*'));
  const pos1 = all.indexOf(element1);
  const pos2 = all.indexOf(element2);
  
  if (pos1 === -1 || pos2 === -1) return Infinity;
  return Math.abs(pos2 - pos1);
}

/**
 * Find all links to Warcraft wiki pages
 * @param {Document} document - DOM document
 * @returns {string[]} Array of URLs
 */
function findWarcraftLinks(document) {
  return Array.from(document.querySelectorAll('a'))
    .filter((a) => {
      const href = a.getAttribute('href');
      const title = a.getAttribute('title');
      const text = a.textContent.trim();
      return (
        href &&
        // Remove your temporary filter for production
        // href === 'https://liquipedia.net/warcraft/Improved_Masonry' &&
        // href === 'https://liquipedia.net/warcraft/Ultravision' &&
        href.startsWith('https://liquipedia.net/warcraft/') &&
        title &&
        title.trim() === text
      );
    })
    .map((a) => a.getAttribute('href'));
}

/**
 * Add an upgrade to our collection
 * @param {string} name - Upgrade name
 * @param {number} goldCost - Gold cost
 * @param {number} woodCost - Wood cost
 * @param {object} state - Current scraper state
 */
function addUpgrade(name, goldCost, woodCost, state) {
  // Clean the name
  const cleanName = name.replace(/\s+/g, ' ').trim();

  // Check if this upgrade already exists
  const existingIndex = state.allUpgrades.findIndex((u) => u.name === cleanName);

  if (existingIndex === -1) {
    // Add new upgrade
    state.allUpgrades.push({
      name: cleanName,
      gold: goldCost,
      wood: woodCost,
    });
    console.log(`Added upgrade: ${cleanName} (Gold: ${goldCost}, Wood: ${woodCost})`);
  }
}

/**
 * Main function - entry point
 */
async function main() {
  // Check if file path is provided
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Please provide the path to the HTML file as a command-line argument');
    process.exit(1);
  }

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  console.log('Starting Warcraft upgrades scraper...');
  
  // Load or initialize state
  const state = loadState();
  state.lastRun = new Date().toISOString();
  
  // Process the initial file if not already done
  if (!state.processedUrls.includes(filePath)) {
    processInitialFile(filePath, state);
  }
  
  // Process one URL at a time with proper delay
  while (state.pendingUrls.length > 0) {
    const url = state.pendingUrls[0]; // Get the first pending URL
    
    const success = await processSingleUrl(url, state);
    
    if (!success) {
      // If we got rate limited, wait longer before trying the next URL
      console.log('Rate limited, pausing for 2 minutes...');
      await new Promise(resolve => setTimeout(resolve, 120000)); // 2 minutes
    } else {
      // Normal delay between requests
      console.log('Waiting 2 seconds before next request...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  console.log('Scraping complete! All URLs processed.');
  console.log(`Total upgrades collected: ${state.allUpgrades.length}`);
  console.log(`Total URLs processed: ${state.processedUrls.length}`);
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}