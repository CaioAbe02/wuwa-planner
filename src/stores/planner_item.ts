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
        let planner_items_local = getArrayFromLocalStorage<IPlannerResonator | IPlannerWeapon>(this.key)
        planner_items_local.unshift(item)
        saveArrayToLocalStorage(this.key, planner_items_local)
        this.fetchPlannerItems()
      },
      removeResonator(resonator_id: string, resonator_position: number) {
        this.removePlannerItemFromLocalStorage(resonator_id, 0, resonator_position)
        this.fetchPlannerItems()
      },
      removeWeapon(weapon_id: string, weapon_position: number) {
        this.removePlannerItemFromLocalStorage(weapon_id, 1, weapon_position)
        this.fetchPlannerItems()
      },
      removePlannerItemFromLocalStorage(item_id: string, item_type: number, item_position: number) {
        let planner_items_local = getArrayFromLocalStorage<IPlannerResonator | IPlannerWeapon>(this.key)

        if (item_type === 0) {
          planner_items_local = planner_items_local.filter((item): item is IPlannerResonator => {
            return (item as IPlannerResonator).resonator_id !== item_id
          })
        }
        else if (item_type === 1) {
          planner_items_local = planner_items_local.filter((item): item is IPlannerWeapon => {
            return (item as IPlannerWeapon).weapon_id !== item_id
          })
        }

        for (const item of planner_items_local) {
          if (item_position < item.position) {
            item.position -= 1
          }
        }

        saveArrayToLocalStorage(this.key, planner_items_local)
      }
    }
})
