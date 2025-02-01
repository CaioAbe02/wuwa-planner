<template>
  <v-sheet class="pa-6">
    <div class="d-flex flex-column ga-2">
      <template v-for="resonator in resonators">
        <div class="d-flex align-center ga-2 cursor-pointer" @click="selectResonator(resonator.id)">
          <v-avatar size="large">
            <v-img
              :src="getResonatorIconUrl(resonator.name)"
            ></v-img>
          </v-avatar>
          <span :class="resonatorNameColor(resonator.rarity)">
            {{ resonator.name }}
          </span>
        </div>
      </template>
    </div>
  </v-sheet>
</template>

<script lang="ts">
//stores
import { useResonatorStore } from '@/stores/resonator'

//utils
import { getResonatorIconUrl } from '@/utils/supabase';

export default defineComponent({
  name: 'SelectResonator',
  setup() {
    const resonator_store = useResonatorStore()

    return {
      resonators: resonator_store.resonators
    }
  },
  methods: {
    getResonatorIconUrl,
    resonatorNameColor(rarity: number) {
      switch (rarity) {
        case 4: return 'text-purple'
        case 5: return 'text-yellow-lighten-2'
      }
    },
    selectResonator(resonator_id: string) {
      this.$emit('selected_resonator', resonator_id)
    }
  },
})
</script>
