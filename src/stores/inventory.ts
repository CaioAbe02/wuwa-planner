import { defineStore } from 'pinia'
import IInventoryMaterial from '@/interfaces/Materials/IInventoryMaterial'

export const useInventoryStore = defineStore('inventory', {
  state: () => {
    const inventory = [
      {
        id: '14',
        name: 'LF Whisperin Core',
        rarity: 2,
        quantity: 10,
        family_id: '2',
      },
      {
        id: '15',
        name: 'MF Whisperin Core',
        rarity: 3,
        quantity: 10,
        family_id: '2',
      },
      {
        id: '16',
        name: 'HF Whisperin Core',
        rarity: 4,
        quantity: 10,
        family_id: '2',
      },
      {
        id: '17',
        name: 'FF Whisperin Core',
        rarity: 5,
        quantity: 10,
        family_id: '2',
      },
      {
        id: '6',
        name: 'Inert Metallic Drip',
        rarity: 2,
        quantity: 1000,
        family_id: '1',
      },
      {
        id: '7',
        name: 'Reactive Metallic Drip',
        rarity: 3,
        quantity: 10,
        family_id: '1',
      },
      {
        id: '8',
        name: 'Polarized Metallic Drip',
        rarity: 4,
        quantity: 0,
        family_id: '1',
      },
      {
        id: '9',
        name: 'Heterized Metallic Drip',
        rarity: 5,
        quantity: 0,
        family_id: '1',
      },
      {
        id: '2',
        name: 'Crude Ring',
        rarity: 2,
        quantity: 100,
        family_id: '0',
      },
      {
        id: '3',
        name: 'Basic Ring',
        rarity: 3,
        quantity: 10,
        family_id: '0',
      },
    ] as IInventoryMaterial[];

    return {
      inventory: inventory,
      forged_inventory: [...inventory]
    }
  },
  getters: {
    getForgedInventory(state) {
      return state.forged_inventory
    },
    getInvMaterial(state) {
      return (material_id: string) => state.inventory.find((material) => material.id === material_id)
    },
    getForgedInvMaterial(state) {
      return (material_id: string) => state.forged_inventory.find((material) => material.id === material_id)
    },
  },
  actions: {
    updateMaterialQuantity(material_id: string, new_quantity: number, forged_inv: boolean) {
      let material

      if (forged_inv) {
        material = this.forged_inventory.find(material => material.id === material_id)
      }
      else {
        material = this.inventory.find(material => material.id === material_id)
      }

      if (material) {
        material.quantity = new_quantity
      }
    },
    updateMaterialsQuantity(materials: object, forged_inv: boolean) {
      let material

      for (const [id, new_quantity] of Object.entries(materials)) {
        if (forged_inv) {
          material = this.forged_inventory.find(material => material.id === id)
        }
        else {
          material = this.inventory.find(material => material.id === id)
        }

        if (material) {
          material.quantity = new_quantity
        }
      }
    },
    addMaterialQuantity(material_id: string, quantity: number, forged_inv: boolean) {
      let material

      if (forged_inv) {
        material = this.forged_inventory.find(material => material.id === material_id)
      }
      else {
        material = this.inventory.find(material => material.id === material_id)
      }

      if (material) {
        material.quantity += quantity
      }
    }
  }
});
