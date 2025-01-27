<template>
  <v-sheet class="pa-6">
    <div class="d-flex flex-column ga-2">
      <template v-for="weapon in weapons">
        <div class="d-flex align-center ga-2 cursor-pointer" @click="selectWeapon(weapon.id)">
          <v-avatar size="large">
            <v-img
              :src="`src/assets/Weapons/Icons/${weapon.name.replace(' ', '_')}_Icon.webp`"
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
import { useWeaponStore } from '@/stores/weapon'

export default defineComponent({
  name: 'SelectWeapon',
  setup() {
    const weapon_store = useWeaponStore()

    return {
      weapons: weapon_store.weapons
    }
  },
  methods: {
    weaponNameColor(rarity: number) {
      switch (rarity) {
        case 4: return 'text-purple'
        case 5: return 'text-yellow-lighten-2'
      }
    },
    selectWeapon(Weapon_id: string) {
      this.$emit('selected_weapon', Weapon_id)
    }
  },
})
</script>
