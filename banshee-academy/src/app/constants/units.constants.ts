// from https://liquipedia.net/warcraft/Units
import { Card } from '../models/card.model';
import { CardType, Difficulty, Race } from '../models/race.model';

export const UD_UNITS: Card[] = [
  {
    id: 'ud_acolyte',
    name: 'Acolyte',
    race: Race.Undead,
    type: CardType.Unit,
    goldCost: 75,
    woodCost: 0,
    imagePath: 'assets/images/units/BTNAcolyte.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ud_ghoul',
    name: 'Ghoul',
    race: Race.Undead,
    type: CardType.Unit,
    goldCost: 120,
    woodCost: 0,
    imagePath: 'assets/images/units/BTNGhoul.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ud_abomination',
    name: 'Abomination',
    race: Race.Undead,
    type: CardType.Unit,
    goldCost: 240,
    woodCost: 70,
    imagePath: 'assets/images/units/BTNAbomination.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ud_meat_wagon',
    name: 'Meat Wagon',
    race: Race.Undead,
    type: CardType.Unit,
    goldCost: 230,
    woodCost: 50,
    imagePath: 'assets/images/units/BTNMeatWagon.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ud_crypt_fiend',
    name: 'Crypt Fiend',
    race: Race.Undead,
    type: CardType.Unit,
    goldCost: 215,
    woodCost: 40,
    imagePath: 'assets/images/units/BTNCryptFiend.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ud_gargoyle',
    name: 'Gargoyle',
    race: Race.Undead,
    type: CardType.Unit,
    goldCost: 175,
    woodCost: 30,
    imagePath: 'assets/images/units/BTNGargoyle.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ud_banshee',
    name: 'Banshee',
    race: Race.Undead,
    type: CardType.Unit,
    goldCost: 155,
    woodCost: 30,
    imagePath: 'assets/images/units/BTNBanshee.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ud_necromancer',
    name: 'Necromancer',
    race: Race.Undead,
    type: CardType.Unit,
    goldCost: 145,
    woodCost: 20,
    imagePath: 'assets/images/units/BTNNecromancer.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ud_obsidian_statue',
    name: 'Obsidian Statue',
    race: Race.Undead,
    type: CardType.Unit,
    goldCost: 200,
    woodCost: 35,
    imagePath: 'assets/images/units/BTNObsidianStatue.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ud_frost_wyrm',
    name: 'Frost Wyrm',
    race: Race.Undead,
    type: CardType.Unit,
    goldCost: 385,
    woodCost: 120,
    imagePath: 'assets/images/units/BTNFrostWyrm.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
];

export const HU_UNITS: Card[] = [
  {
    id: 'hu_peasant',
    name: 'Peasant',
    race: Race.Human,
    type: CardType.Unit,
    goldCost: 75,
    woodCost: 0,
    imagePath: 'assets/images/units/BTNPeasant.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'hu_footman',
    name: 'Footman',
    race: Race.Human,
    type: CardType.Unit,
    goldCost: 135,
    woodCost: 0,
    imagePath: 'assets/images/units/BTNFootman.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'hu_knight',
    name: 'Knight',
    race: Race.Human,
    type: CardType.Unit,
    goldCost: 245,
    woodCost: 60,
    imagePath: 'assets/images/units/BTNKnight.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'hu_rifleman',
    name: 'Rifleman',
    race: Race.Human,
    type: CardType.Unit,
    goldCost: 205,
    woodCost: 30,
    imagePath: 'assets/images/units/BTNRifleman.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'hu_mortar_team',
    name: 'Mortar Team',
    race: Race.Human,
    type: CardType.Unit,
    goldCost: 180,
    woodCost: 70,
    imagePath: 'assets/images/units/BTNMortarTeam.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'hu_flying_machine',
    name: 'Flying Machine',
    race: Race.Human,
    type: CardType.Unit,
    goldCost: 100,
    woodCost: 30,
    imagePath: 'assets/images/units/BTNFlyingMachine.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'hu_gryphon_rider',
    name: 'Gryphon Rider',
    race: Race.Human,
    type: CardType.Unit,
    goldCost: 280,
    woodCost: 70,
    imagePath: 'assets/images/units/BTNGryphonRider.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'hu_priest',
    name: 'Priest',
    race: Race.Human,
    type: CardType.Unit,
    goldCost: 135,
    woodCost: 10,
    imagePath: 'assets/images/units/BTNPriest.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'hu_sorceress',
    name: 'Sorceress',
    race: Race.Human,
    type: CardType.Unit,
    goldCost: 155,
    woodCost: 20,
    imagePath: 'assets/images/units/BTNSorceress.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'hu_siege_engine',
    name: 'Siege Engine',
    race: Race.Human,
    type: CardType.Unit,
    goldCost: 195,
    woodCost: 60,
    imagePath: 'assets/images/units/BTNSeigeEngine.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'hu_spell_breaker',
    name: 'Spell Breaker',
    race: Race.Human,
    type: CardType.Unit,
    goldCost: 215,
    woodCost: 30,
    imagePath: 'assets/images/units/BTNSpellBreaker.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'hu_dragonhawk_rider',
    name: 'Dragonhawk Rider',
    race: Race.Human,
    type: CardType.Unit,
    goldCost: 200,
    woodCost: 30,
    imagePath: 'assets/images/units/BTNDragonHawk.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
];

export const NE_UNITS: Card[] = [
  {
    id: 'ne_wisp',
    name: 'Wisp',
    race: Race.NightElf,
    type: CardType.Unit,
    goldCost: 60,
    woodCost: 0,
    imagePath: 'assets/images/units/BTNWisp.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ne_archer',
    name: 'Archer',
    race: Race.NightElf,
    type: CardType.Unit,
    goldCost: 130,
    woodCost: 10,
    imagePath: 'assets/images/units/BTNArcher.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ne_huntress',
    name: 'Huntress',
    race: Race.NightElf,
    type: CardType.Unit,
    goldCost: 195,
    woodCost: 20,
    imagePath: 'assets/images/units/BTNHuntress.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ne_dryad',
    name: 'Dryad',
    race: Race.NightElf,
    type: CardType.Unit,
    goldCost: 145,
    woodCost: 60,
    imagePath: 'assets/images/units/BTNDryad.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ne_glaive_thrower',
    name: 'Glaive Thrower',
    race: Race.NightElf,
    type: CardType.Unit,
    goldCost: 210,
    woodCost: 65,
    imagePath: 'assets/images/units/BTNGlaiveThrower.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ne_hippogryph',
    name: 'Hippogryph',
    race: Race.NightElf,
    type: CardType.Unit,
    goldCost: 160,
    woodCost: 20,
    imagePath: 'assets/images/units/BTNHippogriff.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ne_chimaera',
    name: 'Chimaera',
    race: Race.NightElf,
    type: CardType.Unit,
    goldCost: 330,
    woodCost: 70,
    imagePath: 'assets/images/units/BTNChimaera.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ne_druid_of_the_talon',
    name: 'Druid of the Talon',
    race: Race.NightElf,
    type: CardType.Unit,
    goldCost: 135,
    woodCost: 20,
    imagePath: 'assets/images/units/BTNDruidOfTheTalon.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ne_druid_of_the_claw',
    name: 'Druid of the Claw',
    race: Race.NightElf,
    type: CardType.Unit,
    goldCost: 255,
    woodCost: 80,
    imagePath: 'assets/images/units/BTNDruidOfTheClaw.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ne_mountain_giant',
    name: 'Mountain Giant',
    race: Race.NightElf,
    type: CardType.Unit,
    goldCost: 350,
    woodCost: 100,
    imagePath: 'assets/images/units/BTNMountainGiant.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'ne_faerie_dragon',
    name: 'Faerie Dragon',
    race: Race.NightElf,
    type: CardType.Unit,
    goldCost: 155,
    woodCost: 25,
    imagePath: 'assets/images/units/BTNFaerieDragon.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
];

export const OC_UNITS: Card[] = [
  {
    id: 'oc_peon',
    name: 'Peon',
    race: Race.Orc,
    type: CardType.Unit,
    goldCost: 75,
    woodCost: 0,
    imagePath: 'assets/images/units/BTNPeon.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'oc_grunt',
    name: 'Grunt',
    race: Race.Orc,
    type: CardType.Unit,
    goldCost: 200,
    woodCost: 0,
    imagePath: 'assets/images/units/BTNGrunt.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'oc_raider',
    name: 'Raider',
    race: Race.Orc,
    type: CardType.Unit,
    goldCost: 180,
    woodCost: 40,
    imagePath: 'assets/images/units/BTNRaider.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'oc_tauren_warrior',
    name: 'Tauren Warrior',
    race: Race.Orc,
    type: CardType.Unit,
    goldCost: 280,
    woodCost: 80,
    imagePath: 'assets/images/units/BTNTauren.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'oc_troll_headhunter',
    name: 'Troll Headhunter',
    race: Race.Orc,
    type: CardType.Unit,
    goldCost: 140,
    woodCost: 20,
    imagePath: 'assets/images/units/BTNHeadhunter.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'oc_demolisher',
    name: 'Demolisher',
    race: Race.Orc,
    type: CardType.Unit,
    goldCost: 220,
    woodCost: 50,
    imagePath: 'assets/images/units/BTNDemolisher.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'oc_kodo_beast',
    name: 'Kodo Beast',
    race: Race.Orc,
    type: CardType.Unit,
    goldCost: 255,
    woodCost: 60,
    imagePath: 'assets/images/units/BTNKotoBeast.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'oc_wind_rider',
    name: 'Wind Rider',
    race: Race.Orc,
    type: CardType.Unit,
    goldCost: 265,
    woodCost: 40,
    imagePath: 'assets/images/units/BTNWyvernRider.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'oc_troll_batrider',
    name: 'Troll Batrider',
    race: Race.Orc,
    type: CardType.Unit,
    goldCost: 160,
    woodCost: 40,
    imagePath: 'assets/images/units/BTNTrollBatRider.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'oc_troll_witch_doctor',
    name: 'Troll Witch Doctor',
    race: Race.Orc,
    type: CardType.Unit,
    goldCost: 145,
    woodCost: 25,
    imagePath: 'assets/images/units/BTNWitchDoctor.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'oc_shaman',
    name: 'Shaman',
    race: Race.Orc,
    type: CardType.Unit,
    goldCost: 130,
    woodCost: 20,
    imagePath: 'assets/images/units/BTNShaman.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
  {
    id: 'oc_spirit_walker',
    name: 'Spirit Walker',
    race: Race.Orc,
    type: CardType.Unit,
    goldCost: 195,
    woodCost: 35,
    imagePath: 'assets/images/units/BTNSpiritWalker.png',
    difficulty: [Difficulty.Medium, Difficulty.Hard],
  },
];
