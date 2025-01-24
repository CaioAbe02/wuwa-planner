import { defineStore } from 'pinia'
import IWeapon from '@/interfaces/Weapon/IWeapon'
import { supabase } from '@/supabase'

export const useWeaponStore = defineStore('weaponStore', {
  state: () => ({
    weapons: [] as IWeapon[]
  }),
  getters: {
    getWeapon(state) {
      return (weapon_id: string) => state.weapons.find((weapon) => weapon.id === weapon_id)
    },
  },
  actions: {
    async fetchWeapons() {
      const { data } = await supabase
      .from('weapons')
      .select(`
        *,
        ascention_family_forgery_material:family_material!ascention_family_forgery_material_id(
          *,
          two_stars:materials!two_stars_id("*"),
          three_stars:materials!three_stars_id("*"),
          four_stars:materials!four_stars_id("*"),
          five_stars:materials!five_stars_id("*")
        ),
        ascention_family_forgery_material_2:family_material!ascention_family_forgery_material_2_id(
          *,
          two_stars:materials!two_stars_id("*"),
          three_stars:materials!three_stars_id("*"),
          four_stars:materials!four_stars_id("*"),
          five_stars:materials!five_stars_id("*")
        )
      `)
      .returns<IWeapon[]>()

      if (data) {
        this.weapons = data
      }
    }
  }
})
