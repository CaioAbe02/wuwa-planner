import { defineStore } from 'pinia'
import { supabase } from '@/supabase'
import IFamilyForgeryMaterial from '@/interfaces/Materials/Forgery/IFamilyForgeryMaterial'

export const useFamilyMaterialStore = defineStore('family_material', {
  state: () => ({
    families: [] as IFamilyForgeryMaterial[]
  }),
  getters: {
    getFamily(state) {
      return (family_id: string) => {
        const family = state.families.find(family => family.id === family_id)

        if (family) {
          return family
        }
        throw new Error(`Family with ID ${family_id} not found.`)
      }
    }
  },
  actions: {
    async fetchFamilies() {
      const { data } = await supabase
      .from('family_material')
      .select(`
        *,
        two_stars:materials!two_stars_id("*"),
        three_stars:materials!three_stars_id("*"),
        four_stars:materials!four_stars_id("*"),
        five_stars:materials!five_stars_id("*")
      `)
      .returns<IFamilyForgeryMaterial[]>()

      if (data) {
        this.families = data
      }
      return true
    },
  }
})
