import { defineStore } from 'pinia'
import IInventoryMaterial from '@/interfaces/Materials/IInventoryMaterial'
import IForgedInventoryMaterial from '@/interfaces/Materials/IForgedInventoryMaterial';
import { useMaterialStore } from './material'

export const useInventoryStore = defineStore('inventory', {
  state: () => {
    return {
      inventory: [] as IInventoryMaterial[],
      forged_inventory: [] as IForgedInventoryMaterial[]
    }
  },
  getters: {
    getInvMaterial(state) {
      return (material_id: string) => {
        const material = state.inventory.find((material) => material.id === material_id)

        if (material) {
          return material
        }

        throw new Error(`Material with ID ${material_id} not found.`)
      }
    },
    getForgedInvMaterial(state) {
      return (material_id: string) => state.forged_inventory.find((material) => material.id === material_id)
    },
  },
  actions: {
    setInventory() {
      const material_store  = useMaterialStore()
      const inventory_local: { id: string, quantity: number }[] = JSON.parse(localStorage.getItem('inventory') || '[]')
      const materials = material_store.materials

      for (const material of materials) {
        const material_local = inventory_local.find(material_inv_local => material_inv_local.id === material.id)
        const inv_material: IInventoryMaterial = {
          ...material,
          quantity: material_local?.quantity || 0,
        }
        const forged_inv_material: IForgedInventoryMaterial = {
          id: material.id,
          forged_quantity: 0,
        }

        this.inventory.push(inv_material)
        this.forged_inventory.push(forged_inv_material)
      }
    },
    updateMaterialQuantity(material_id: string, new_quantity: number) {
      const material = this.getInvMaterial(material_id)

      if (material) {
        material.quantity = new_quantity
      }
    },
    updateMaterialsQuantity(materials: object) {
      let material

      for (const [id, new_quantity] of Object.entries(materials)) {
        let inventory_local: { id: string, quantity: number }[] = JSON.parse(localStorage.getItem('inventory') || '[]')

        material = this.getInvMaterial(id)
        const material_local = inventory_local.find(material => material.id === id)

        if (material_local) {
          material_local.quantity = parseInt(new_quantity)
        }
        else {
          inventory_local.push({id: id, quantity: parseInt(new_quantity)})
        }
        localStorage.setItem('inventory', JSON.stringify(inventory_local))
        material.quantity = parseInt(new_quantity)
      }
    },
    resetForgedInventory() {
      this.forged_inventory = JSON.parse(JSON.stringify(this.inventory))
    }
  }
});
