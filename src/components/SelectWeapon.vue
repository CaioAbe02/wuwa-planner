<template>
  <v-sheet class="pa-6">
    <div class="d-flex flex-column ga-2">
      <template v-for="weapon in weapons">
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
import { getWeaponIconUrl } from '@/utils/supabase';

export default defineComponent({
  name: 'SelectWeapon',
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
    }
  },
})
</script>
