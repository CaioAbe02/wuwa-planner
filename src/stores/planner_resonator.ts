import { defineStore } from 'pinia'
import IPlannerResonator from '@/interfaces/Resonator/IPlannerResonator'
import { getArrayFromLocalStorage } from '@/utils/local_storage'

export const usePlannerResonatorStore = defineStore('planner_resonator', {
  state: () => {
    return {
      planner_resonators: [] as IPlannerResonator[]
    }
  },
  getters: {
    getPlannerResonator(state) {
      return (planner_resonator_id: string) => {
        const planner_resonator = state.planner_resonators.find(planner_resonator => planner_resonator.resonator_id === planner_resonator_id)

        if (planner_resonator) {
          return planner_resonator
        }
        throw new Error(`Planner Resonator with ID ${planner_resonator_id} not found.`)
      }
    }
  },
  actions: {
    fetchPlannerResonators() {
      this.planner_resonators = getArrayFromLocalStorage<IPlannerResonator>('planner_resonators')
    },
    addResonator(resonator: IPlannerResonator) {
      this.planner_resonators.unshift(resonator)
    },
    removeResonator(resonator_id: string) {
      this.planner_resonators = this.planner_resonators.filter(resonator => resonator.resonator_id !== resonator_id)
    }
  }
})
