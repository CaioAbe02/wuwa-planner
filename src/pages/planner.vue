<template>
  <v-container max-width="90%">
    <div>
      <v-row no-gutters>
        <v-col
          v-for="planner_resonator in planner_resonators"
          cols="12"
          sm="12"
          md="4"
          lg="3"
        >
          <PlannerResonatorCard :planner_resonator="planner_resonator"/>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import { usePlannerResonatorStore } from '@/stores/planner_resonator';

export default defineComponent({
  name: 'PlannerPage',
  setup() {
    const planner_resonator_store = usePlannerResonatorStore()

    return {
      planner_resonators: planner_resonator_store.$state.planner_resonators
    }
  },
})
</script>
