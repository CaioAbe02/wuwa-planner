import { defineStore } from 'pinia'
import IResonator from '@/interfaces/Resonator/IResonator'

export const useResonatorStore = defineStore('resonatorStore', {
  state: () => ({
    resonators: [
      {
        id: '0',
        name: 'Changli',
        rarity: 5,
        resonator_ascention_material: {
          id: '0',
          name: 'Rage Tacet Core',
          rarity: 4
        },
        ascention_material: {
          id: '0',
          name: 'Pavo Plum',
          rarity: 1
        },
        ascention_family_forgery_material: {
          id: '0',
          name: 'Ring',
          forgery_materials: {
            two_stars: {
              id: '0',
              name: 'Crude Ring',
              rarity: 2
            },
            three_stars: {
              id: '1',
              name: 'Basic Ring',
              rarity: 3
            },
            four_stars: {
              id: '2',
              name: 'Improved Ring',
              rarity: 4
            },
            five_stars: {
              id: '3',
              name: 'Tailored Ring',
              rarity: 5
            }
          }
        },
        forte_family_forgery_material: {
          id: '1',
          name: 'Metallic Drip',
          forgery_materials: {
            two_stars: {
              id: '0',
              name: 'Inert Metallic Drip',
              rarity: 2
            },
            three_stars: {
              id: '1',
              name: 'Reactive Metallic Drip',
              rarity: 3
            },
            four_stars: {
              id: '2',
              name: 'Polarized Metallic Drip',
              rarity: 4
            },
            five_stars: {
              id: '3',
              name: 'Heterized Metallic Drip',
              rarity: 5
            }
          }
        }
      },
    ] as IResonator[]
  }),
})
