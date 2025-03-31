const fs = require('fs');

// Read the upgrade costs data
const upgradeCostsRaw = fs.readFileSync('./upgrade-costs.js', 'utf8');
const upgradeCostsString = upgradeCostsRaw.match(/const upgradeCosts = (\[[\s\S]*?\]);/)[1];
const upgradeCosts = JSON.parse(upgradeCostsString);

// Read the cards data
const cardsRaw = fs.readFileSync('./cards.ts', 'utf8');
const cardsData = cardsRaw.match(/private cards: Card\[\] = (\[[\s\S]*?\]);/)[1];

// Create a map of upgrade costs by name for quick lookup
const costsByName = {};
upgradeCosts.forEach(upgrade => {
  costsByName[upgrade.name] = {
    goldCost: upgrade.goldCost,
    woodCost: upgrade.woodCost
  };
});

// Regular expression to match each card object
const cardObjectRegex = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',[\s\S]*?woodCost:\s*(\d+)[\s\S]*?\}/g;

// Process the cards data with RegExp
let updatedCardsData = cardsData;
let match;

while ((match = cardObjectRegex.exec(cardsData)) !== null) {
  const fullMatch = match[0];
  const cardName = match[2];
  
  // Find if there's a matching upgrade cost
  if (costsByName[cardName]) {
    const costs = costsByName[cardName];
    
    // Replace the goldCost and woodCost in the card object
    const updatedCard = fullMatch
      .replace(/goldCost:\s*\d+/, `goldCost: ${costs.goldCost}`)
      .replace(/woodCost:\s*\d+/, `woodCost: ${costs.woodCost}`);
    
    // Replace the original card object with the updated one
    updatedCardsData = updatedCardsData.replace(fullMatch, updatedCard);
  }
}

// Create the final output
const output = `private cards: Card[] = ${updatedCardsData};`;

// Write the result to a new file
fs.writeFileSync('./updated-cards.ts', output, 'utf8');

console.log('Done! Updated cards written to updated-cards.ts');