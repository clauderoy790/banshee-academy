import { cards } from './cards.js';
import { writeFileSync } from 'fs';

const cardNames = cards.map((card) => card.name);

// Format as JS export
const output = `export const cardNames = ${JSON.stringify(
  cardNames,
  null,
  2
)};\n`;

writeFileSync('./names.js', output);

console.log('✅ names.js created with cardNames.');
