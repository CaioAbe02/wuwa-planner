import { defineStore } from 'pinia'
import { supabase } from '@/supabase'
import IForgeryMaterial from '@/interfaces/Materials/Forgery/IForgeryMaterial'

export const useMaterialStore = defineStore('material', {
  state: () => ({
    materials: [] as IForgeryMaterial[]
  }),
  actions: {
    async fetchMaterials() {
      const { data } = await supabase
      .from('materials')
      .select()
      .returns<IForgeryMaterial[]>()

      if (data) {
        this.materials = data
      }
      return true
    }
  }
})
