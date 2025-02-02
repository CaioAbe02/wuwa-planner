import { defineStore } from 'pinia'
import IResonator from '@/interfaces/Resonator/IResonator'
import { supabase } from '@/supabase'

export const useResonatorStore = defineStore('resonator_store', {
  state: () => ({
    resonators: [] as IResonator[]
  }),
  getters: {
    getResonator(state) {
      return (resonator_id: string) => {
        const resonator = state.resonators.find((resonator) => resonator.id === resonator_id)

        if (resonator) {
          return resonator
        }

        throw new Error(`Resonator with ID ${resonator_id} not found.`)
      }
    },
  },
  actions: {
    async fetchResonators() {
      const { data } = await supabase
      .from('resonators')
      .select(`
        *,
        resonator_ascention_material:materials!resonator_ascention_material_id("*"),
        ascention_material:materials!ascention_material_id("*"),
        ascention_family_forgery_material:family_material!ascention_family_forgery_material_id(
          *,
          two_stars:materials!two_stars_id("*"),
          three_stars:materials!three_stars_id("*"),
          four_stars:materials!four_stars_id("*"),
          five_stars:materials!five_stars_id("*")
        ),
        forte_family_forgery_material:family_material!forte_family_forgery_material_id(
          *,
          two_stars:materials!two_stars_id("*"),
          three_stars:materials!three_stars_id("*"),
          four_stars:materials!four_stars_id("*"),
          five_stars:materials!five_stars_id("*")
        ),
        skill_upgrade_material:materials!skill_upgrade_material_id("*")
      `)
      .order('name')
      .returns<IResonator[]>()

      if (data) {
        this.resonators = data
      }
    }
  }
})
