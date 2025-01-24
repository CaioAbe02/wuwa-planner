import { defineStore } from 'pinia'
import IInventoryMaterial from '@/interfaces/Materials/IInventoryMaterial'
import { useMaterialStore } from './material'

export const useInventoryStore = defineStore('inventory', {
  state: () => {
    return {
      inventory: [] as IInventoryMaterial[],
      forged_inventory: [] as IInventoryMaterial[]
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

        this.inventory.push(inv_material)
      }
      this.forged_inventory = JSON.parse(JSON.stringify(this.inventory))
    },
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
          let inventory_local: { id: string, quantity: number }[] = JSON.parse(localStorage.getItem('inventory') || '[]')

          material = this.inventory.find(material => material.id === id)
          const material_local = inventory_local.find(material => material.id === id)

          if (material_local) {
            material_local.quantity = parseInt(new_quantity)
          }
          else {
            inventory_local.push({id: id, quantity: parseInt(new_quantity)})
          }
          localStorage.setItem('inventory', JSON.stringify(inventory_local))

        }

        if (material) {
          material.quantity = parseInt(new_quantity)
        }
      }
    },
    resetForgedInventory() {
      this.forged_inventory = JSON.parse(JSON.stringify(this.inventory))
    }
  }
});
