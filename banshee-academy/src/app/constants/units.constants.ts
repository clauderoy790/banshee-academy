// from https://wowpedia.fandom.com/wiki/Warcraft_III_units
import { Card } from "../models/card.model";
import { CardType, Difficulty, Race } from "../models/race.model";

export const UD_UNITS: Card[] = [
  {
    id: 'ud_obsidian_statue',
    name: 'Obsidian Statue',
    race: Race.Undead,
    type: CardType.Unit,
    goldCost: -1,
    woodCost: -1,
    imagePath: 'todo',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
];

export const HU_UNITS: Card[] = [
  {
    id: 'todo',
    name: 'todo',
    race: Race.Human,
    type: CardType.Unit,
    goldCost: -1,
    woodCost: -1,
    imagePath: 'https://wowpedia.fandom.com/wiki/Obsidian_Statue_(Warcraft_III)',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
];

export const NE_UNITS: Card[] = [
  {
    id: 'todo',
    name: 'todo',
    race: Race.NightElf,
    type: CardType.Unit,
    goldCost: -1,
    woodCost: -1,
    imagePath: 'todo',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
];

export const OC_UNITS: Card[] = [
  {
    id: 'todo',
    name: 'todo',
    race: Race.Orc,
    type: CardType.Unit,
    goldCost: -1,
    woodCost: -1,
    imagePath: 'todo',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
];
