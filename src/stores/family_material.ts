import { defineStore } from 'pinia'

export const useFamilyMaterialStore = defineStore('family_material', {
  state: () => ({
    families: [
      {
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
      {
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
      {
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
    ]
  }),
})
