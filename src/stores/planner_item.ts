// Utilities
import { defineStore } from 'pinia'
import IPlannerWeapon from '@/interfaces/Weapon/IPlannerWeapon'
import IPlannerResonator from '@/interfaces/Resonator/IPlannerResonator'
import { getArrayFromLocalStorage, saveArrayToLocalStorage } from '@/utils/local_storage'

export const usePlannerItemStore = defineStore('planner_item', {
  state: () => {
    return {
      planner_items: [] as (IPlannerResonator | IPlannerWeapon)[],
      key: 'planner_items'
    }
  },
  getters: {
      getPlannerResonator(state) {
        return (planner_resonator_id: string) => {
          const planner_resonator = state.planner_items.find((item): item is IPlannerResonator =>
            item.type === 0 &&
            'resonator_id' in item &&
            item.resonator_id === planner_resonator_id
          )

          if (planner_resonator) {
            return planner_resonator
          }
          throw new Error(`Planner Resonator with ID ${planner_resonator_id} not found.`)
        }
      },
      getPlannerWeapon(state) {
        return (planner_weapon_id: string) => {
          const planner_weapon = state.planner_items.find((item): item is IPlannerWeapon =>
            item.type === 1 &&
            'weapon_id' in item &&
            item.weapon_id === planner_weapon_id
          )

          if (planner_weapon) {
            return planner_weapon
          }
          throw new Error(`Planner weapon with ID ${planner_weapon_id} not found.`)
        }
      },
    },
    actions: {
      fetchPlannerItems() {
        this.planner_items = getArrayFromLocalStorage<IPlannerResonator | IPlannerWeapon>('planner_items')
      },
      addItem(item: IPlannerResonator | IPlannerWeapon) {
        for (const planner_item of this.planner_items) {
          planner_item.position += 1
        }
        this.planner_items.unshift(item)
        saveArrayToLocalStorage(this.key, this.planner_items)
      },
      removeResonator(resonator_id: string, resonator_position: number) {
        this.removePlannerItemFromLocalStorage(resonator_id, 0, resonator_position)
      },
      removeWeapon(weapon_id: string, weapon_position: number) {
        this.removePlannerItemFromLocalStorage(weapon_id, 1, weapon_position)
      },
      removePlannerItemFromLocalStorage(item_id: string, item_type: number, item_position: number) {
        if (item_type === 0) {
          this.planner_items = this.planner_items.filter((item): item is IPlannerResonator => {
            return (item as IPlannerResonator).resonator_id !== item_id
          })
        }
        else if (item_type === 1) {
          this.planner_items = this.planner_items.filter((item): item is IPlannerWeapon => {
            return (item as IPlannerWeapon).weapon_id !== item_id
          })
        }

        for (const item of this.planner_items) {
          if (item_position < item.position) {
            item.position -= 1
          }
        }
        saveArrayToLocalStorage(this.key, this.planner_items)
      },
      changeItemVisibility(item_id: string, item_type: number) {
        let item = {} as IPlannerResonator | IPlannerWeapon

        if (item_type === 0) item = this.getPlannerResonator(item_id)
        else if (item_type === 1) item = this.getPlannerWeapon(item_id)

        item.visible = !item.visible
        saveArrayToLocalStorage(this.key, this.planner_items)
      }
    }
})
