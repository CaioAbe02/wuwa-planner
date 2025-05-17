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
        v-for="weapon_type in weapon_types"
        icon
        rounded="lg"
        variant="outlined"
        size="sm"
        :color="filter_weapon_type === weapon_type ? 'white' : 'grey-darken-1'"
        @click="selectWeaponTypeFilter(weapon_type)"
      >
        <v-img :src="`/icons/weapon_types/${weapon_type}.webp`" :aspect-ratio="1" :alt="`${weapon_type} Icon`" cover width="35" />
      </v-btn>
    </div>
    <div class="d-flex flex-column ga-2">
      <template v-for="weapon in filteredWeapons">
        <div class="d-flex align-center ga-2 cursor-pointer" @click="selectWeapon(weapon.id)">
          <v-avatar size="large">
            <v-img
              :src="getWeaponIconUrl(weapon.name)"
            ></v-img>
          </v-avatar>
          <span :class="weaponNameColor(weapon.rarity)">
            {{ weapon.name }}
          </span>
        </div>
      </template>
    </div>
  </v-sheet>
</template>

<script lang="ts">
// stores
import { useWeaponStore } from '@/stores/weapon'

//utils
import { getWeaponIconUrl } from '@/utils/supabase'

//enums
import { WeaponType } from '@/enums/WeaponType'

export default defineComponent({
  name: 'SelectWeapon',
  data() {
    return {
      weapon_types: Object.values(WeaponType),
      search_text: '',
      filter_rarity: 0,
      filter_weapon_type: '',
    }
  },
  setup() {
    const weapon_store = useWeaponStore()

    return {
      weapons: weapon_store.weapons
    }
  },
  methods: {
    getWeaponIconUrl,
    weaponNameColor(rarity: number) {
      switch (rarity) {
        case 4: return 'text-purple'
        case 5: return 'text-yellow-lighten-2'
      }
    },
    selectWeapon(weapon_id: string) {
      this.$emit('selected_weapon', weapon_id, false)
    },
    selectRarityFilter(rarity: number) {
      if (rarity !== this.filter_rarity) {
        this.filter_rarity = rarity
      }
      else {
        this.filter_rarity = 0
      }
    },
    selectWeaponTypeFilter(weapon_type: string) {
      if (weapon_type !== this.filter_weapon_type) {
        this.filter_weapon_type = weapon_type
      }
      else {
        this.filter_weapon_type = ''
      }
    },
  },
  computed: {
    filteredWeapons() {
      return this.weapons.filter(weapon => {
        const matches_name = weapon.name.toLowerCase().includes(this.search_text.toLowerCase())
        const matches_rarity = this.filter_rarity === 0 || weapon.rarity === this.filter_rarity
        const matches_weapon_type = this.filter_weapon_type === '' || weapon.type === this.filter_weapon_type
        return matches_name && matches_rarity && matches_weapon_type
      })
    }
  }
})
</script>
