<template>
  <v-sheet class="pa-6">
    <v-text-field
      label="Search"
      variant="outlined"
      prepend-inner-icon="mdi-magnify"
      clearable
      v-model="search_text"
      @click:clear="search_text = ''"
    ></v-text-field>
    <div class="d-flex mb-5 ga-2">
      <v-btn
        icon
        rounded="lg"
        variant="outlined"
        size="sm"
        min-width="37"
        :color="filter_rarity === 4 ? 'white' : 'grey-darken-1'"
        @click="selectRarityFilter(4)"
      >
        <v-icon color="purple">mdi-rhombus</v-icon>
      </v-btn>
      <v-btn
        icon
        rounded="lg"
        variant="outlined"
        size="sm"
        min-width="37"
        :color="filter_rarity === 5 ? 'white' : 'grey-darken-1'"
        @click="selectRarityFilter(5)">
        <v-icon color="yellow">mdi-rhombus</v-icon>
      </v-btn>
      <v-btn
        v-for="element in elements"
        icon
        rounded="lg"
        variant="outlined"
        size="sm"
        :color="filter_element === element ? 'white' : 'grey-darken-1'"
        @click="selectElementFilter(element)"
      >
        <v-img :src="`/icons/elements/${element}.webp`" :aspect-ratio="1" :alt="`${element} Icon`" cover width="35" />
      </v-btn>
    </div>
    <v-sheet class="d-flex flex-column ga-2 overflow-y-auto custom-scrollbar" max-height="50vh">
      <template v-for="resonator in filteredResonators" :key="resonator.id">
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
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
//stores
import { useResonatorStore } from '@/stores/resonator'

//utils
import { getResonatorIconUrl } from '@/utils/supabase'

//enums
import { Element } from '@/enums/Element'

export default defineComponent({
  name: 'SelectResonator',
  data() {
    return {
      Element,
      elements: Object.values(Element),
      search_text: '',
      filter_element: '',
      filter_rarity: 0
    }
  },
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
      this.$emit('selected_resonator', resonator_id, false)
    },
    selectRarityFilter(rarity: number) {
      if (rarity !== this.filter_rarity) {
        this.filter_rarity = rarity
      }
      else {
        this.filter_rarity = 0
      }
    },
    selectElementFilter(element: string) {
      if (element !== this.filter_element) {
        this.filter_element = element
      }
      else {
        this.filter_element = ''
      }
    },
  },
  computed: {
    filteredResonators() {
      return this.resonators.filter(resonator => {
        const matches_name = resonator.name.toLowerCase().includes(this.search_text.toLowerCase())
        const matches_rarity = this.filter_rarity === 0 || resonator.rarity === this.filter_rarity
        const matches_element = this.filter_element === '' || resonator.element === this.filter_element
        return matches_name && matches_rarity && matches_element
      })
    }
  }
})
</script>
