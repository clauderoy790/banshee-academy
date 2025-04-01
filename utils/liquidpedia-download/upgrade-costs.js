const upgradeCosts = [
  {
    "name": "Unholy Strength",
    "goldCost": 125,
    "woodCost": 50
  },
  {
    "name": "Improved Unholy Strength",
    "goldCost": 200,
    "woodCost": 150
  },
  {
    "name": "Advanced Unholy Strength",
    "goldCost": 275,
    "woodCost": 250
  },
  {
    "name": "Creature Attack",
    "goldCost": 150,
    "woodCost": 50
  },
  {
    "name": "Improved Creature Attack",
    "goldCost": 200,
    "woodCost": 125
  },
  {
    "name": "Advanced Creature Attack",
    "goldCost": 250,
    "woodCost": 200
  },
  {
    "name": "Unholy Armor",
    "goldCost": 125,
    "woodCost": 50
  },
  {
    "name": "Improved Unholy Armor",
    "goldCost": 200,
    "woodCost": 150
  },
  {
    "name": "Advanced Unholy Armor",
    "goldCost": 275,
    "woodCost": 250
  },
  {
    "name": "Creature Carapace",
    "goldCost": 150,
    "woodCost": 75
  },
  {
    "name": "Improved Creature Carapace",
    "goldCost": 200,
    "woodCost": 200
  },
  {
    "name": "Advanced Creature Carapace",
    "goldCost": 250,
    "woodCost": 325
  },
  {
    "name": "Necromancer Adept Training",
    "goldCost": 100,
    "woodCost": 50
  },
  {
    "name": "Necromancer Master Training",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Banshee Adept Training",
    "goldCost": 100,
    "woodCost": 50
  },
  {
    "name": "Banshee Master Training",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Cannibalize",
    "goldCost": 50,
    "woodCost": 0
  },
  {
    "name": "Ghoul Frenzy",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Web",
    "goldCost": 100,
    "woodCost": 100
  },
  {
    "name": "Burrow",
    "goldCost": 75,
    "woodCost": 75
  },
  {
    "name": "Stone Form",
    "goldCost": 75,
    "woodCost": 150
  },
  {
    "name": "Skeletal Mastery",
    "goldCost": 150,
    "woodCost": 100
  },
  {
    "name": "Disease Cloud",
    "goldCost": 100,
    "woodCost": 200
  },
  {
    "name": "Exhume Corpses",
    "goldCost": 75,
    "woodCost": 50
  },
  {
    "name": "Destroyer Form",
    "goldCost": 75,
    "woodCost": 150
  },
  {
    "name": "Freezing Breath",
    "goldCost": 150,
    "woodCost": 225
  },
  {
    "name": "Improved Masonry",
    "goldCost": 125,
    "woodCost": 50
  },
  {
    "name": "Imbued Masonry",
    "goldCost": 175,
    "woodCost": 100
  },
  {
    "name": "Advanced Masonry",
    "goldCost": 150,
    "woodCost": 75
  },
  {
    "name": "Magic Sentry",
    "goldCost": 50,
    "woodCost": 50
  },
  {
    "name": "Fragmentation Shards",
    "goldCost": 50,
    "woodCost": 100
  },
  {
    "name": "Iron Forged Swords",
    "goldCost": 100,
    "woodCost": 50
  },
  {
    "name": "Steel Forged Swords",
    "goldCost": 175,
    "woodCost": 175
  },
  {
    "name": "Mithril Forged Swords",
    "goldCost": 250,
    "woodCost": 300
  },
  {
    "name": "Black Gunpowder",
    "goldCost": 100,
    "woodCost": 50
  },
  {
    "name": "Refined Gunpowder",
    "goldCost": 175,
    "woodCost": 175
  },
  {
    "name": "Imbued Gunpowder",
    "goldCost": 250,
    "woodCost": 300
  },
  {
    "name": "Iron Plating",
    "goldCost": 125,
    "woodCost": 75
  },
  {
    "name": "Steel Plating",
    "goldCost": 150,
    "woodCost": 175
  },
  {
    "name": "Mithril Plating",
    "goldCost": 175,
    "woodCost": 275
  },
  {
    "name": "Studded Leather Armor",
    "goldCost": 100,
    "woodCost": 100
  },
  {
    "name": "Reinforced Leather Armor",
    "goldCost": 150,
    "woodCost": 175
  },
  {
    "name": "Dragonhide Armor",
    "goldCost": 200,
    "woodCost": 250
  },
  {
    "name": "Priest Adept Training",
    "goldCost": 100,
    "woodCost": 50
  },
  {
    "name": "Priest Master Training",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Sorceress Adept Training",
    "goldCost": 100,
    "woodCost": 50
  },
  {
    "name": "Sorceress Master Training",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Defend",
    "goldCost": 150,
    "woodCost": 100
  },
  {
    "name": "Long Rifles",
    "goldCost": 75,
    "woodCost": 125
  },
  {
    "name": "Control Magic",
    "goldCost": 75,
    "woodCost": 75
  },
  {
    "name": "Flak Cannons",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Flying Machine Bombs",
    "goldCost": 150,
    "woodCost": 100
  },
  {
    "name": "Flare",
    "goldCost": 50,
    "woodCost": 50
  },
  {
    "name": "Animal War Training",
    "goldCost": 125,
    "woodCost": 125
  },
  {
    "name": "Cloud",
    "goldCost": 50,
    "woodCost": 100
  },
  {
    "name": "Sundering Blades",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Barrage",
    "goldCost": 50,
    "woodCost": 150
  },
  {
    "name": "Storm Hammers",
    "goldCost": 125,
    "woodCost": 225
  },
  {
    "name": "Nature's Blessing",
    "goldCost": 150,
    "woodCost": 200
  },
  {
    "name": "Well Spring",
    "goldCost": 75,
    "woodCost": 150
  },
  {
    "name": "Strength of the Moon",
    "goldCost": 125,
    "woodCost": 75
  },
  {
    "name": "Improved Strength of the Moon",
    "goldCost": 175,
    "woodCost": 175
  },
  {
    "name": "Advanced Strength of the Moon",
    "goldCost": 225,
    "woodCost": 275
  },
  {
    "name": "Strength of the Wild",
    "goldCost": 100,
    "woodCost": 75
  },
  {
    "name": "Improved Strength of the Wild",
    "goldCost": 175,
    "woodCost": 175
  },
  {
    "name": "Advanced Strength of the Wild",
    "goldCost": 250,
    "woodCost": 275
  },
  {
    "name": "Moon Armor",
    "goldCost": 150,
    "woodCost": 75
  },
  {
    "name": "Improved Moon Armor",
    "goldCost": 200,
    "woodCost": 150
  },
  {
    "name": "Advanced Moon Armor",
    "goldCost": 250,
    "woodCost": 225
  },
  {
    "name": "Reinforced Hides",
    "goldCost": 150,
    "woodCost": 50
  },
  {
    "name": "Improved Reinforced Hides",
    "goldCost": 200,
    "woodCost": 150
  },
  {
    "name": "Advanced Reinforced Hides",
    "goldCost": 250,
    "woodCost": 250
  },
  {
    "name": "Druid of the Talon Adept Training",
    "goldCost": 100,
    "woodCost": 50
  },
  {
    "name": "Druid of the Talon Master Training",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Druid of the Claw Adept Training",
    "goldCost": 100,
    "woodCost": 50
  },
  {
    "name": "Druid of the Claw Master Training",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Improved Bows",
    "goldCost": 50,
    "woodCost": 100
  },
  {
    "name": "Marksmanship",
    "goldCost": 100,
    "woodCost": 175
  },
  {
    "name": "Sentinel",
    "goldCost": 50,
    "woodCost": 50
  },
  {
    "name": "Moon Glaive",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Vorpal Blades",
    "goldCost": 125,
    "woodCost": 100
  },
  {
    "name": "Mark of the Talon",
    "goldCost": 25,
    "woodCost": 100
  },
  {
    "name": "Abolish Magic",
    "goldCost": 50,
    "woodCost": 50
  },
  {
    "name": "Mark of the Claw",
    "goldCost": 25,
    "woodCost": 100
  },
  {
    "name": "Resistant Skin",
    "goldCost": 50,
    "woodCost": 100
  },
  {
    "name": "Hardened Skin",
    "goldCost": 100,
    "woodCost": 175
  },
  {
    "name": "Corrosive Breath",
    "goldCost": 125,
    "woodCost": 225
  },
  {
    "name": "Ultravision",
    "goldCost": 50,
    "woodCost": 50
  },
  {
    "name": "Spiked Barricades",
    "goldCost": 25,
    "woodCost": 75
  },
  {
    "name": "Improved Spiked Barricades",
    "goldCost": 50,
    "woodCost": 100
  },
  {
    "name": "Reinforced Defenses",
    "goldCost": 75,
    "woodCost": 175
  },
  {
    "name": "Steel Melee Weapons",
    "goldCost": 100,
    "woodCost": 75
  },
  {
    "name": "Thorium Melee Weapons",
    "goldCost": 150,
    "woodCost": 150
  },
  {
    "name": "Arcanite Melee Weapons",
    "goldCost": 200,
    "woodCost": 225
  },
  {
    "name": "Steel Ranged Weapons",
    "goldCost": 100,
    "woodCost": 100
  },
  {
    "name": "Thorium Ranged Weapons",
    "goldCost": 150,
    "woodCost": 175
  },
  {
    "name": "Arcanite Ranged Weapons",
    "goldCost": 200,
    "woodCost": 250
  },
  {
    "name": "Steel Armor",
    "goldCost": 150,
    "woodCost": 75
  },
  {
    "name": "Thorium Armor",
    "goldCost": 225,
    "woodCost": 200
  },
  {
    "name": "Arcanite Armor",
    "goldCost": 300,
    "woodCost": 325
  },
  {
    "name": "Shaman Adept Training",
    "goldCost": 100,
    "woodCost": 50
  },
  {
    "name": "Shaman Master Training",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Witch Doctor Adept Training",
    "goldCost": 100,
    "woodCost": 50
  },
  {
    "name": "Witch Doctor Master Training",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Spirit Walker Adept Training",
    "goldCost": 100,
    "woodCost": 50
  },
  {
    "name": "Spirit Walker Master Training",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Pillage",
    "goldCost": 75,
    "woodCost": 25
  },
  {
    "name": "Brute Strength",
    "goldCost": 50,
    "woodCost": 150
  },
  {
    "name": "Troll Regeneration",
    "goldCost": 100,
    "woodCost": 100
  },
  {
    "name": "Berserker Upgrade",
    "goldCost": 75,
    "woodCost": 175
  },
  {
    "name": "Burning Oil",
    "goldCost": 50,
    "woodCost": 150
  },
  {
    "name": "Ensnare",
    "goldCost": 50,
    "woodCost": 75
  },
  {
    "name": "Envenomed Spears",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "War Drums Damage Increase",
    "goldCost": 100,
    "woodCost": 150
  },
  {
    "name": "Liquid Fire",
    "goldCost": 75,
    "woodCost": 125
  },
  {
    "name": "Pulverize Damage Increase",
    "goldCost": 100,
    "woodCost": 175
  }
];