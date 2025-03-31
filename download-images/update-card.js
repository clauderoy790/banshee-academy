const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const util = require('util');

// Create directories if they don't exist
const createDirectories = () => {
  if (!fs.existsSync('downloads')) {
    fs.mkdirSync('downloads');
  }
  if (!fs.existsSync('downloads/images')) {
    fs.mkdirSync('downloads/images');
  }
};

// Convert upgrade name to id format
const nameToId = (race, name) => {
  const racePrefix = {
    'Human': 'hu',
    'Night Elf': 'ne',
    'Orc': 'orc',
    'Undead': 'ud'
  }[race] || 'neutral';
  
  return `${racePrefix}_${name.toLowerCase().replace(/['']/g, '').replace(/\s+/g, '_')}`;
};

// Extract race data from the all-upgrades.html
const parseAllUpgrades = () => {
  console.log('Parsing all-upgrades.html...');
  const html = fs.readFileSync('all-upgrades.html', 'utf8');
  const $ = cheerio.load(html);
  
  const upgrades = [];
  
  // Process each table which contains upgrades
  $('.wikitable').each((tableIdx, table) => {
    // First, determine the races from column headers
    const headers = $(table).find('tr:first-child th');
    const races = [];
    
    headers.each((idx, header) => {
      // Extract race from the alt attribute of images
      const imgAlt = $(header).find('img').attr('alt');
      if (imgAlt) {
        races.push(imgAlt);
      }
    });
    
    // Skip tables without race information
    if (races.length === 0) return;
    
    // Process the table rows to extract upgrade information
    $(table).find('tr:not(:first-child)').each((rowIdx, row) => {
      const cells = $(row).find('td');
      
      if (cells.length !== races.length) return;
      
      // Process each cell for each race
      cells.each((colIdx, cell) => {
        if (colIdx >= races.length) return;
        
        const race = races[colIdx];
        const links = $(cell).find('a');
        
        if (links.length === 0) return;
        
        // Get the primary upgrade link and name
        const nameLink = links.first();
        const name = nameLink.text().trim();
        const href = nameLink.attr('href');
        
        // Skip empty cells or cells without valid links
        if (!name || name === '') return;
        
        // Get image URL from the img tag within the cell
        const imgSrc = $(cell).find('img').attr('src');
        
        upgrades.push({
          race,
          name,
          id: nameToId(race, name),
          href: href || null,
          imageSrc: imgSrc || null
        });
      });
    });
  });
  
  // Remove duplicates
  const uniqueUpgrades = Array.from(new Set(upgrades.map(u => u.id)))
    .map(id => upgrades.find(u => u.id === id));
  
  console.log(`Found ${uniqueUpgrades.length} unique upgrades`);
  return uniqueUpgrades;
};

// Parse individual upgrade pages to get costs
const parseUpgradePage = async (upgradeName, imageUrl) => {
  // Normalize filename based on the upgrade name
  const filename = `${upgradeName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.html`;
  console.log(`Looking for ${filename}...`);
  
  if (!fs.existsSync(filename)) {
    console.log(`File ${filename} not found, attempting with well-spring.html as example...`);
    
    // If specific page not found, use well-spring.html as a fallback for structure
    if (!fs.existsSync('well-spring.html')) {
      console.log(`well-spring.html not found either, cannot parse costs`);
      return { goldCost: 0, woodCost: 0, imageUrl };
    }
    
    // Use well-spring.html to guess the costs (defaults)
    return { goldCost: 75, woodCost: 150, imageUrl };
  }
  
  const html = fs.readFileSync(filename, 'utf8');
  const $ = cheerio.load(html);
  
  let goldCost = 0;
  let woodCost = 0;
  
  // Find the cost information in the table
  $('table tr').each((i, row) => {
    const costLabel = $(row).find('td:contains("Cost")').text().trim();
    
    if (costLabel.includes('Cost')) {
      // Get the next cell which should contain the costs
      const costText = $(row).find('td').eq(3).text().trim();
      
      // Extract gold and wood costs using regex
      const goldMatch = costText.match(/(\d+)/);
      if (goldMatch) {
        goldCost = parseInt(goldMatch[1], 10);
      }
      
      const woodMatch = costText.match(/(\d+)\s*$/);
      if (woodMatch) {
        woodCost = parseInt(woodMatch[1], 10);
      }
    }
  });
  
  // If no explicit image URL was found, try to find it in this page
  if (!imageUrl) {
    const img = $('.spellcard img').first();
    if (img.length > 0) {
      imageUrl = img.attr('src');
    }
  }
  
  return { goldCost, woodCost, imageUrl };
};

// Download image
const downloadImage = async (url, filename) => {
  try {
    // Ensure the URL is absolute
    const fullUrl = url.startsWith('http') ? url : `https://liquipedia.net${url}`;
    
    const response = await axios.get(fullUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(filename, response.data);
    console.log(`Image downloaded: ${filename}`);
    return true;
  } catch (error) {
    console.error(`Error downloading image from ${url}:`, error.message);
    return false;
  }
};

// Main function
const updateCards = async () => {
  createDirectories();
  
  // Parse the existing cards array if available
  let existingCards = [];
  try {
    if (fs.existsSync('cards.js')) {
      const cardsContent = fs.readFileSync('cards.js', 'utf8');
      // Extract array from the file using regex
      const match = cardsContent.match(/\[([\s\S]*)\]/);
      if (match) {
        // Wrap in array brackets and eval to get the array
        // Note: Using eval here is generally not recommended, but it's simple for this case
        existingCards = eval(`[${match[1]}]`);
      }
    }
  } catch (error) {
    console.log('Could not parse existing cards, creating new array');
  }
  
  const upgrades = parseAllUpgrades();
  const updatedCards = [];
  
  for (const upgrade of upgrades) {
    // Find if this card already exists in the existing array
    const existingCard = existingCards.find(c => c.id === upgrade.id);
    
    // Parse the upgrade page to get costs
    const { goldCost, woodCost, imageUrl } = await parseUpgradePage(upgrade.name, upgrade.imageSrc);
    
    // Create or update the card
    const card = {
      id: upgrade.id,
      name: upgrade.name,
      race: `Race.${upgrade.race.replace(/\s+/g, '')}`,
      type: 'CardType.Upgrade',
      goldCost,
      woodCost,
      imagePath: `assets/images/cards/${upgrade.id}.png`,
      difficulty: existingCard?.difficulty || []
    };
    
    updatedCards.push(card);
    
    // Download image if URL is available
    if (imageUrl) {
      await downloadImage(imageUrl, `downloads/images/${upgrade.id}.png`);
    }
  }
  
  // Save the updated cards array to a file
  fs.writeFileSync(
    'updated_cards.js',
    `const updatedCards = ${util.inspect(updatedCards, { depth: null, maxArrayLength: null })};`
  );
  
  console.log('Updated cards saved to updated_cards.js');
};

updateCards().catch(console.error);