const fs = require('fs');
const path = require('path');

// Read the links.js file
const filePath = path.join(__dirname, 'links.js');
const fileContent = fs.readFileSync(filePath, 'utf8');

// Create a function to extract the base name from an upgrade
function getBaseName(name) {
  // Remove prefixes like "Improved", "Advanced", etc.
  return name
    .replace(/^(Improved|Advanced|Imbued)\s+/, '')
    .trim();
}

// Parse the links from the file content
const linksMatch = fileContent.match(/export const links = \[([\s\S]*)\];/);
const linksContent = linksMatch ? linksMatch[1] : '';

// Create an array of link objects from the parsed content
const linkObjects = [];
const regex = /{[\s\S]*?name: ['"](.+?)['"][\s\S]*?href: ['"](.+?)['"][\s\S]*?}/g;
let match;

while ((match = regex.exec(linksContent)) !== null) {
  linkObjects.push({
    name: match[1],
    href: match[2]
  });
}

// Group the links by their base name
const groupedByBase = {};

linkObjects.forEach(link => {
  const baseName = getBaseName(link.name);
  if (!groupedByBase[baseName]) {
    groupedByBase[baseName] = [];
  }
  groupedByBase[baseName].push(link);
});

// Create the final grouped links
const groupedLinks = [];

Object.values(groupedByBase).forEach(group => {
  // Only include groups with multiple related upgrades
  if (group.length > 1) {
    // Sort the group by progression: base -> improved -> advanced
    group.sort((a, b) => {
      if (a.name.includes('Advanced')) return 1;
      if (b.name.includes('Advanced')) return -1;
      if (a.name.includes('Improved') || a.name.includes('Imbued')) return 1;
      if (b.name.includes('Improved') || b.name.includes('Imbued')) return -1;
      return 0;
    });
    
    // Create the group object
    groupedLinks.push({
      upgrades: group.map(item => item.name),
      href: group[group.length - 1].href // Use the href of the most advanced upgrade
    });
  } else {
    // For single upgrades, add them individually
    groupedLinks.push({
      upgrades: [group[0].name],
      href: group[0].href
    });
  }
});

// Generate the output file content
const outputContent = `export const groupedLinks = ${JSON.stringify(groupedLinks, null, 2)};`;

let upgrades = 0;
groupedLinks.forEach(v => {
    upgrades += v.upgrades.length;
});
console.log('total upgrades: ', upgrades);


// Write the output to grouped-links.js
const outputPath = path.join(__dirname, 'grouped-links.js');
fs.writeFileSync(outputPath, outputContent);

console.log(`Successfully created grouped-links.js with ${groupedLinks.length} grouped upgrades.`);