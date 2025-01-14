// Utilities
import { defineStore } from 'pinia'
import IPlannerResonator from '@/interfaces/Resonator/IPlannerResonator'

export const usePlannerResonatorStore = defineStore('planner_resonator', {
  state: () => ({
    planner_resonators: [
      {
        id: '0',
        visible: true,
        resonator: {
          id: '0',
          name: 'Changli',
          rarity: 5,
          resonator_ascention_material: {
            id: '0',
            name: 'Rage Tacet Core',
            rarity: 4,
            family_id: ''
          },
          ascention_material: {
            id: '1',
            name: 'Pavo Plum',
            rarity: 1,
            family_id: ''
          },
          skill_upgrade_material: {
            id: '10',
            name: "Sentinel's Dagger",
            rarity: 4,
            family_id: ''
          },
          ascention_family_forgery_material: {
            id: '0',
            name: 'Ring',
            forgery_materials: {
              two_stars: {
                id: '2',
                name: 'Crude Ring',
                rarity: 2,
                family_id: '0'
              },
              three_stars: {
                id: '3',
                name: 'Basic Ring',
                rarity: 3,
                family_id: '0'
              },
              four_stars: {
                id: '4',
                name: 'Improved Ring',
                rarity: 4,
                family_id: '0'
              },
              five_stars: {
                id: '5',
                name: 'Tailored Ring',
                rarity: 5,
                family_id: '0'
              }
            }
          },
          forte_family_forgery_material: {
            id: '1',
            name: 'Metallic Drip',
            forgery_materials: {
              two_stars: {
                id: '6',
                name: 'Inert Metallic Drip',
                rarity: 2,
                family_id: '1'
              },
              three_stars: {
                id: '7',
                name: 'Reactive Metallic Drip',
                rarity: 3,
                family_id: '1'
              },
              four_stars: {
                id: '8',
                name: 'Polarized Metallic Drip',
                rarity: 4,
                family_id: '1'
              },
              five_stars: {
                id: '9',
                name: 'Heterized Metallic Drip',
                rarity: 5,
                family_id: '1'
              }
            }
          },
          forte: {
            inherent_skills: ['Secret Strategist', 'Sweeping Force'],
            stats_bonus: [
              {
                name: 'Crit. Rate+',
                value: '1.20%'
              },
              {
                name: 'Crit. Rate+',
                value: '2.80%'
              },
              {
                name: 'ATK+',
                value: '1.80%'
              },
              {
                name: 'ATK+',
                value: '4.20%'
              },
              {
                name: 'ATK+',
                value: '1.80%'
              },
              {
                name: 'ATK+',
                value: '4.20%'
              },
              {
                name: 'Crit. Rate+',
                value: '1.20%'
              },
              {
                name: 'Crit. Rate+',
                value: '2.80%'
              },
            ]
          }
        },
        level: 1,
        new_level: 90,
        ascention_level: 0,
        new_ascention_level: 6,
        forte: {
          normal_attack_level: 1,
          new_normal_attack_level: 10,
          ressonance_skill_level: 1,
          new_ressonance_skill_level: 10,
          forte_circuit_level: 1,
          new_forte_circuit_level: 10,
          ressonance_liberation_level: 1,
          new_ressonance_liberation_level: 10,
          intro_skill_level: 1,
          new_intro_skill_level: 10,
          inherent_skills: [false , false],
          stats_bonus: [false, false, false, false, false, false, false, false]
        }
      },
      {
        id: '1',
        visible: true,
        resonator: {
          id: '1',
          name: 'Camellya',
          rarity: 5,
          resonator_ascention_material: {
            id: '11',
            name: 'Topological Confinement',
            rarity: 4,
            family_id: ''
          },
          ascention_material: {
            id: '12',
            name: 'Nova',
            rarity: 1,
            family_id: ''
          },
          skill_upgrade_material: {
            id: '13',
            name: "Dreamless Feather",
            rarity: 4,
            family_id: ''
          },
          ascention_family_forgery_material: {
            id: '2',
            name: 'Whispering Core',
            forgery_materials: {
              two_stars: {
                id: '14',
                name: 'LF Whisperin Core',
                rarity: 2,
                family_id: '2'
              },
              three_stars: {
                id: '15',
                name: 'MF Whisperin Core',
                rarity: 3,
                family_id: '2'
              },
              four_stars: {
                id: '16',
                name: 'HF Whisperin Core',
                rarity: 4,
                family_id: '2'
              },
              five_stars: {
                id: '17',
                name: 'FF Whisperin Core',
                rarity: 5,
                family_id: '2'
              }
            }
          },
          forte_family_forgery_material: {
            id: '1',
            name: 'Metallic Drip',
            forgery_materials: {
              two_stars: {
                id: '6',
                name: 'Inert Metallic Drip',
                rarity: 2,
                family_id: '1'
              },
              three_stars: {
                id: '7',
                name: 'Reactive Metallic Drip',
                rarity: 3,
                family_id: '1'
              },
              four_stars: {
                id: '8',
                name: 'Polarized Metallic Drip',
                rarity: 4,
                family_id: '1'
              },
              five_stars: {
                id: '9',
                name: 'Heterized Metallic Drip',
                rarity: 5,
                family_id: '1'
              }
            }
          },
          forte: {
            inherent_skills: ['Seedbed', 'Epiphyte'],
            stats_bonus: [
              {
                name: 'Crit. DMG+',
                value: '2.40%'
              },
              {
                name: 'Crit. DMG+',
                value: '5.60%'
              },
              {
                name: 'ATK+',
                value: '1.80%'
              },
              {
                name: 'ATK+',
                value: '4.20%'
              },
              {
                name: 'ATK+',
                value: '1.80%'
              },
              {
                name: 'ATK+',
                value: '4.20%'
              },
              {
                name: 'Crit. DMG+',
                value: '2.40%'
              },
              {
                name: 'Crit. DMG+',
                value: '5.60%'
              },
            ]
          }
        },
        level: 1,
        new_level: 20,
        ascention_level: 0,
        new_ascention_level: 1,
        forte: {
          normal_attack_level: 1,
          new_normal_attack_level: 1,
          ressonance_skill_level: 1,
          new_ressonance_skill_level: 1,
          forte_circuit_level: 1,
          new_forte_circuit_level: 1,
          ressonance_liberation_level: 1,
          new_ressonance_liberation_level: 1,
          intro_skill_level: 9,
          new_intro_skill_level: 10,
          inherent_skills: [false , false],
          stats_bonus: [false, false, false, false, false, false, false, false]
        }
      },
    ] as IPlannerResonator[]
  }),
})
