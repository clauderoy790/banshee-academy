// src/app/services/game-data.service.ts
import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { CardType, Difficulty, Race } from '../models/race.model';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private cards: Card[] = [
    // Undead Upgrades
    {
      id: 'ud_unholy_strength',
      name: 'Unholy Strength',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_unholy_strength.png',
      difficulty: []
    },
    {
      id: 'ud_improved_unholy_strength',
      name: 'Improved Unholy Strength',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_improved_unholy_strength.png',
      difficulty: []
    },
    {
      id: 'ud_advanced_unholy_strength',
      name: 'Advanced Unholy Strength',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_advanced_unholy_strength.png',
      difficulty: []
    },
    {
      id: 'ud_creature_attack',
      name: 'Creature Attack',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_creature_attack.png',
      difficulty: []
    },
    {
      id: 'ud_improved_creature_attack',
      name: 'Improved Creature Attack',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_improved_creature_attack.png',
      difficulty: []
    },
    {
      id: 'ud_advanced_creature_attack',
      name: 'Advanced Creature Attack',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_advanced_creature_attack.png',
      difficulty: []
    },
    {
      id: 'ud_unholy_armor',
      name: 'Unholy Armor',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_unholy_armor.png',
      difficulty: []
    },
    {
      id: 'ud_improved_unholy_armor',
      name: 'Improved Unholy Armor',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_improved_unholy_armor.png',
      difficulty: []
    },
    {
      id: 'ud_advanced_unholy_armor',
      name: 'Advanced Unholy Armor',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_advanced_unholy_armor.png',
      difficulty: []
    },
    {
      id: 'ud_creature_carapace',
      name: 'Creature Carapace',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_creature_carapace.png',
      difficulty: []
    },
    {
      id: 'ud_improved_creature_carapace',
      name: 'Improved Creature Carapace',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_improved_creature_carapace.png',
      difficulty: []
    },
    {
      id: 'ud_advanced_creature_carapace',
      name: 'Advanced Creature Carapace',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_advanced_creature_carapace.png',
      difficulty: []
    },
    {
      id: 'ud_necromancer_adept_training',
      name: 'Necromancer Adept Training',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_necromancer_adept_training.png',
      difficulty: []
    },
    {
      id: 'ud_necromancer_master_training',
      name: 'Necromancer Master Training',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_necromancer_master_training.png',
      difficulty: []
    },
    {
      id: 'ud_banshee_adept_training',
      name: 'Banshee Adept Training',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_banshee_adept_training.png',
      difficulty: []
    },
    {
      id: 'ud_banshee_master_training',
      name: 'Banshee Master Training',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_banshee_master_training.png',
      difficulty: []
    },
    {
      id: 'ud_cannibalize',
      name: 'Cannibalize',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_cannibalize.png',
      difficulty: []
    },
    {
      id: 'ud_ghoul_frenzy',
      name: 'Ghoul Frenzy',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_ghoul_frenzy.png',
      difficulty: []
    },
    {
      id: 'ud_web',
      name: 'Web',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_web.png',
      difficulty: []
    },
    {
      id: 'ud_burrow',
      name: 'Burrow',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_burrow.png',
      difficulty: []
    },
    {
      id: 'ud_stone_form',
      name: 'Stone Form',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_stone_form.png',
      difficulty: []
    },
    {
      id: 'ud_skeletal_mastery',
      name: 'Skeletal Mastery',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_skeletal_mastery.png',
      difficulty: []
    },
    {
      id: 'ud_disease_cloud',
      name: 'Disease Cloud',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_disease_cloud.png',
      difficulty: []
    },
    {
      id: 'ud_exhume_corpses',
      name: 'Exhume Corpses',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_exhume_corpses.png',
      difficulty: []
    },
    {
      id: 'ud_destroyer_form',
      name: 'Destroyer Form',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_destroyer_form.png',
      difficulty: []
    },
    {
      id: 'ud_freezing_breath',
      name: 'Freezing Breath',
      race: Race.Undead,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ud_freezing_breath.png',
      difficulty: []
    },
    
    // Human Upgrades
    {
      id: 'hu_improved_masonry',
      name: 'Improved Masonry',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_improved_masonry.png',
      difficulty: []
    },
    {
      id: 'hu_advanced_masonry',
      name: 'Advanced Masonry',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_advanced_masonry.png',
      difficulty: []
    },
    {
      id: 'hu_imbued_masonry',
      name: 'Imbued Masonry',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_imbued_masonry.png',
      difficulty: []
    },
    {
      id: 'hu_magic_sentry',
      name: 'Magic Sentry',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_magic_sentry.png',
      difficulty: []
    },
    {
      id: 'hu_fragmentation_shards',
      name: 'Fragmentation Shards',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_fragmentation_shards.png',
      difficulty: []
    },
    {
      id: 'hu_iron_forged_swords',
      name: 'Iron Forged Swords',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_iron_forged_swords.png',
      difficulty: []
    },
    {
      id: 'hu_steel_forged_swords',
      name: 'Steel Forged Swords',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_steel_forged_swords.png',
      difficulty: []
    },
    {
      id: 'hu_mithril_forged_swords',
      name: 'Mithril Forged Swords',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_mithril_forged_swords.png',
      difficulty: []
    },
    {
      id: 'hu_black_gunpowder',
      name: 'Black Gunpowder',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_black_gunpowder.png',
      difficulty: []
    },
    {
      id: 'hu_refined_gunpowder',
      name: 'Refined Gunpowder',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_refined_gunpowder.png',
      difficulty: []
    },
    {
      id: 'hu_imbued_gunpowder',
      name: 'Imbued Gunpowder',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_imbued_gunpowder.png',
      difficulty: []
    },
    {
      id: 'hu_iron_plating',
      name: 'Iron Plating',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_iron_plating.png',
      difficulty: []
    },
    {
      id: 'hu_steel_plating',
      name: 'Steel Plating',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_steel_plating.png',
      difficulty: []
    },
    {
      id: 'hu_mithril_plating',
      name: 'Mithril Plating',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_mithril_plating.png',
      difficulty: []
    },
    {
      id: 'hu_studded_leather_armor',
      name: 'Studded Leather Armor',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_studded_leather_armor.png',
      difficulty: []
    },
    {
      id: 'hu_reinforced_leather_armor',
      name: 'Reinforced Leather Armor',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_reinforced_leather_armor.png',
      difficulty: []
    },
    {
      id: 'hu_dragonhide_armor',
      name: 'Dragonhide Armor',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_dragonhide_armor.png',
      difficulty: []
    },
    {
      id: 'hu_priest_adept_training',
      name: 'Priest Adept Training',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_priest_adept_training.png',
      difficulty: []
    },
    {
      id: 'hu_priest_master_training',
      name: 'Priest Master Training',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_priest_master_training.png',
      difficulty: []
    },
    {
      id: 'hu_sorceress_adept_training',
      name: 'Sorceress Adept Training',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_sorceress_adept_training.png',
      difficulty: []
    },
    {
      id: 'hu_sorceress_master_training',
      name: 'Sorceress Master Training',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_sorceress_master_training.png',
      difficulty: []
    },
    {
      id: 'hu_defend',
      name: 'Defend',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_defend.png',
      difficulty: []
    },
    {
      id: 'hu_long_rifles',
      name: 'Long Rifles',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_long_rifles.png',
      difficulty: []
    },
    {
      id: 'hu_control_magic',
      name: 'Control Magic',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_control_magic.png',
      difficulty: []
    },
    {
      id: 'hu_flak_cannons',
      name: 'Flak Cannons',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_flak_cannons.png',
      difficulty: []
    },
    {
      id: 'hu_flying_machine_bombs',
      name: 'Flying Machine Bombs',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_flying_machine_bombs.png',
      difficulty: []
    },
    {
      id: 'hu_flare',
      name: 'Flare',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_flare.png',
      difficulty: []
    },
    {
      id: 'hu_animal_war_training',
      name: 'Animal War Training',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_animal_war_training.png',
      difficulty: []
    },
    {
      id: 'hu_cloud',
      name: 'Cloud',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_cloud.png',
      difficulty: []
    },
    {
      id: 'hu_sundering_blades',
      name: 'Sundering Blades',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_sundering_blades.png',
      difficulty: []
    },
    {
      id: 'hu_barrage',
      name: 'Barrage',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_barrage.png',
      difficulty: []
    },
    {
      id: 'hu_storm_hammers',
      name: 'Storm Hammers',
      race: Race.Human,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/hu_storm_hammers.png',
      difficulty: []
    },
    
    // Night Elf Upgrades
    {
      id: 'ne_natures_blessing',
      name: 'Nature\'s Blessing',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_natures_blessing.png',
      difficulty: []
    },
    {
      id: 'ne_well_spring',
      name: 'Well Spring',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_well_spring.png',
      difficulty: []
    },
    {
      id: 'ne_strength_of_the_moon',
      name: 'Strength of the Moon',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_strength_of_the_moon.png',
      difficulty: []
    },
    {
      id: 'ne_improved_strength_of_the_moon',
      name: 'Improved Strength of the Moon',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_improved_strength_of_the_moon.png',
      difficulty: []
    },
    {
      id: 'ne_advanced_strength_of_the_moon',
      name: 'Advanced Strength of the Moon',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_advanced_strength_of_the_moon.png',
      difficulty: []
    },
    {
      id: 'ne_strength_of_the_wild',
      name: 'Strength of the Wild',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_strength_of_the_wild.png',
      difficulty: []
    },
    {
      id: 'ne_improved_strength_of_the_wild',
      name: 'Improved Strength of the Wild',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_improved_strength_of_the_wild.png',
      difficulty: []
    },
    {
      id: 'ne_advanced_strength_of_the_wild',
      name: 'Advanced Strength of the Wild',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_advanced_strength_of_the_wild.png',
      difficulty: []
    },
    {
      id: 'ne_moon_armor',
      name: 'Moon Armor',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_moon_armor.png',
      difficulty: []
    },
    {
      id: 'ne_improved_moon_armor',
      name: 'Improved Moon Armor',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_improved_moon_armor.png',
      difficulty: []
    },
    {
      id: 'ne_advanced_moon_armor',
      name: 'Advanced Moon Armor',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_advanced_moon_armor.png',
      difficulty: []
    },
    {
      id: 'ne_reinforced_hides',
      name: 'Reinforced Hides',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_reinforced_hides.png',
      difficulty: []
    },
    {
      id: 'ne_improved_reinforced_hides',
      name: 'Improved Reinforced Hides',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_improved_reinforced_hides.png',
      difficulty: []
    },
    {
      id: 'ne_advanced_reinforced_hides',
      name: 'Advanced Reinforced Hides',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_advanced_reinforced_hides.png',
      difficulty: []
    },
    {
      id: 'ne_druid_of_the_talon_adept_training',
      name: 'Druid of the Talon Adept Training',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_druid_of_the_talon_adept_training.png',
      difficulty: []
    },
    {
      id: 'ne_druid_of_the_talon_master_training',
      name: 'Druid of the Talon Master Training',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_druid_of_the_talon_master_training.png',
      difficulty: []
    },
    {
      id: 'ne_druid_of_the_claw_adept_training',
      name: 'Druid of the Claw Adept Training',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_druid_of_the_claw_adept_training.png',
      difficulty: []
    },
    {
      id: 'ne_druid_of_the_claw_master_training',
      name: 'Druid of the Claw Master Training',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_druid_of_the_claw_master_training.png',
      difficulty: []
    },
    {
      id: 'ne_improved_bows',
      name: 'Improved Bows',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_improved_bows.png',
      difficulty: []
    },
    {
      id: 'ne_marksmanship',
      name: 'Marksmanship',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_marksmanship.png',
      difficulty: []
    },
    {
      id: 'ne_sentinel',
      name: 'Sentinel',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_sentinel.png',
      difficulty: []
    },
    {
      id: 'ne_moon_glaive',
      name: 'Moon Glaive',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_moon_glaive.png',
      difficulty: []
    },
    {
      id: 'ne_vorpal_blades',
      name: 'Vorpal Blades',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_vorpal_blades.png',
      difficulty: []
    },
    {
      id: 'ne_mark_of_the_talon',
      name: 'Mark of the Talon',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_mark_of_the_talon.png',
      difficulty: []
    },
    {
      id: 'ne_abolish_magic',
      name: 'Abolish Magic',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_abolish_magic.png',
      difficulty: []
    },
    {
      id: 'ne_mark_of_the_claw',
      name: 'Mark of the Claw',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_mark_of_the_claw.png',
      difficulty: []
    },
    {
      id: 'ne_resistant_skin',
      name: 'Resistant Skin',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_resistant_skin.png',
      difficulty: []
    },
    {
      id: 'ne_hardened_skin',
      name: 'Hardened Skin',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_hardened_skin.png',
      difficulty: []
    },
    {
      id: 'ne_corrosive_breath',
      name: 'Corrosive Breath',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_corrosive_breath.png',
      difficulty: []
    },
    {
      id: 'ne_ultravision',
      name: 'Ultravision',
      race: Race.NightElf,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/ne_ultravision.png',
      difficulty: []
    },
    
    // Orc Upgrades
    {
      id: 'orc_spiked_barricades',
      name: 'Spiked Barricades',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_spiked_barricades.png',
      difficulty: []
    },
    {
      id: 'orc_improved_spiked_barricades',
      name: 'Improved Spiked Barricades',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_improved_spiked_barricades.png',
      difficulty: []
    },
    {
      id: 'orc_reinforced_defenses',
      name: 'Reinforced Defenses',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_reinforced_defenses.png',
      difficulty: []
    },
    {
      id: 'orc_steel_melee_weapons',
      name: 'Steel Melee Weapons',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_steel_melee_weapons.png',
      difficulty: []
    },
    {
      id: 'orc_thorium_melee_weapons',
      name: 'Thorium Melee Weapons',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_thorium_melee_weapons.png',
      difficulty: []
    },
    {
      id: 'orc_arcanite_melee_weapons',
      name: 'Arcanite Melee Weapons',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_arcanite_melee_weapons.png',
      difficulty: []
    },
    {
      id: 'orc_steel_ranged_weapons',
      name: 'Steel Ranged Weapons',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_steel_ranged_weapons.png',
      difficulty: []
    },
    {
      id: 'orc_thorium_ranged_weapons',
      name: 'Thorium Ranged Weapons',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_thorium_ranged_weapons.png',
      difficulty: []
    },
    {
      id: 'orc_arcanite_ranged_weapons',
      name: 'Arcanite Ranged Weapons',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_arcanite_ranged_weapons.png',
      difficulty: []
    },
    {
      id: 'orc_steel_armor',
      name: 'Steel Armor',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_steel_armor.png',
      difficulty: []
    },
    {
      id: 'orc_thorium_armor',
      name: 'Thorium Armor',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_thorium_armor.png',
      difficulty: []
    },
    {
      id: 'orc_arcanite_armor',
      name: 'Arcanite Armor',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_arcanite_armor.png',
      difficulty: []
    },
    {
      id: 'orc_shaman_adept_training',
      name: 'Shaman Adept Training',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_shaman_adept_training.png',
      difficulty: []
    },
    {
      id: 'orc_shaman_master_training',
      name: 'Shaman Master Training',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_shaman_master_training.png',
      difficulty: []
    },
    {
      id: 'orc_witch_doctor_adept_training',
      name: 'Witch Doctor Adept Training',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_witch_doctor_adept_training.png',
      difficulty: []
    },
    {
      id: 'orc_witch_doctor_master_training',
      name: 'Witch Doctor Master Training',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_witch_doctor_master_training.png',
      difficulty: []
    },
    {
      id: 'orc_spirit_walker_adept_training',
      name: 'Spirit Walker Adept Training',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_spirit_walker_adept_training.png',
      difficulty: []
    },
    {
      id: 'orc_spirit_walker_master_training',
      name: 'Spirit Walker Master Training',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_spirit_walker_master_training.png',
      difficulty: []
    },
    {
      id: 'orc_pillage',
      name: 'Pillage',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_pillage.png',
      difficulty: []
    },
    {
      id: 'orc_brute_strength',
      name: 'Brute Strength',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_brute_strength.png',
      difficulty: []
    },
    {
      id: 'orc_troll_regeneration',
      name: 'Troll Regeneration',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_troll_regeneration.png',
      difficulty: []
    },
    {
      id: 'orc_berserker_upgrade',
      name: 'Berserker Upgrade',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_berserker_upgrade.png',
      difficulty: []
    },
    {
      id: 'orc_burning_oil',
      name: 'Burning Oil',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_burning_oil.png',
      difficulty: []
    },
    {
      id: 'orc_ensnare',
      name: 'Ensnare',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_ensnare.png',
      difficulty: []
    },
    {
      id: 'orc_envenomed_spears',
      name: 'Envenomed Spears',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_envenomed_spears.png',
      difficulty: []
    },
    {
      id: 'orc_war_drums_damage_increase',
      name: 'War Drums Damage Increase',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_war_drums_damage_increase.png',
      difficulty: []
    },
    {
      id: 'orc_liquid_fire',
      name: 'Liquid Fire',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_liquid_fire.png',
      difficulty: []
    },
    {
      id: 'orc_pulverize_damage_increase',
      name: 'Pulverize Damage Increase',
      race: Race.Orc,
      type: CardType.Upgrade,
      goldCost: 0,
      woodCost: 0,
      imagePath: 'assets/images/cards/orc_pulverize_damage_increase.png',
      difficulty: []
    },
  ];

  constructor() { }

  getCardsByRace(race: Race): Card[] {
    return this.cards.filter(card => card.race === race);
  }

  getCardsByRaceAndDifficulty(race: Race, difficulty: Difficulty): Card[] {
    return this.cards.filter(
      card => card.race === race && card.difficulty.includes(difficulty)
    );
  }

  getCardsByRaceAndType(race: Race, type: CardType): Card[] {
    return this.cards.filter(
      card => card.race === race && card.type === type
    );
  }
}