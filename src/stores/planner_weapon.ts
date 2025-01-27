// Utilities
import { defineStore } from 'pinia'
import IPlannerWeapon from '@/interfaces/Weapon/IPlannerWeapon'
import { getArrayFromLocalStorage } from '@/utils/local_storage'

export const usePlannerWeaponStore = defineStore('planner_weapon', {
  state: () => {
    // planner_weapons: [
    //   {
    //     weapon_id: 'c72e01f9-501f-4974-b6f9-76ea669e913d',
    //     type: 1,
    //     position: 2,
    //     visible: true,
    //     level: 1,
    //     new_level: 90,
    //     ascention_level: 0,
    //     new_ascention_level: 6,
    //   },
    //   {
    //     weapon_id: 'c72e01f9-501f-4974-b6f9-76ea669e913d',
    //     type: 1,
    //     position: 3,
    //     visible: true,
    //     level: 1,
    //     new_level: 90,
    //     ascention_level: 0,
    //     new_ascention_level: 6,
    //   },
    // ] as IPlannerWeapon[]
    return {
      planner_weapons: [] as IPlannerWeapon[]
    }
  },
  getters: {
      getPlannerWeapon(state) {
        return (planner_weapon_id: string) => {
          const planner_weapon = state.planner_weapons.find(planner_weapon => planner_weapon.weapon_id === planner_weapon_id)

          if (planner_weapon) {
            return planner_weapon
          }
          throw new Error(`Planner weapon with ID ${planner_weapon_id} not found.`)
        }
      }
    },
    actions: {
      fetchPlannerWeapons() {
        this.planner_weapons = getArrayFromLocalStorage<IPlannerWeapon>('planner_weapons')
      },
      addWeapon(weapon: IPlannerWeapon) {
        this.planner_weapons.unshift(weapon)
      },
      removeWeapon(weapon_id: string) {
        this.planner_weapons = this.planner_weapons.filter(weapon => weapon.weapon_id !== weapon_id)
      }
    }
})
