<template>
  <v-card class="pa-6" width="400px">
    <v-card-title class="pa-0 pb-6">
      <v-avatar size="large">
        <v-img
          :src="`src/assets/Weapons/Icons/${weapon.name.replace(' ', '_')}_Icon.webp`"
        ></v-img>
      </v-avatar>
      {{ weapon.name }}
    </v-card-title>
    <v-form class="custom-scrollbar overflow-auto pr-2" @submit.prevent>
      <div>
        <span>Ascention Level</span>
        <div class="d-flex align-center pt-1">
          <v-text-field
            v-model="ascention_level"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.ascention_level]"
          ></v-text-field>
          <v-text-field
            v-model="new_ascention_level"
            density="compact"
            variant="outlined"
            class="ml-5"
            :rules="[rules.required, rules.ascention_level, rules.new_ascention_level]"
          ></v-text-field>
        </div>
      </div>
      <div>
        <span>Level</span>
        <div class="d-flex align-center pt-1">
          <v-text-field
            v-model="level"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.level]"
          ></v-text-field>
          <v-text-field
            v-model="new_level"
            density="compact"
            variant="outlined"
            class="ml-4"
            :rules="[rules.required, rules.level, rules.new_level]"
          ></v-text-field>
        </div>
      </div>
    </v-form>
    <v-card-actions class="pt-6">
      <v-btn
        variant="outlined"
        prepend-icon="mdi-plus"
        text="Add Weapon"
        type="submit"
        @click="addWeapon()"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
//stores
import { useWeaponStore } from '@/stores/weapon'
import { usePlannerWeaponStore } from '@/stores/planner_weapon'
import { usePlannerResonatorStore } from '@/stores/planner_resonator'

// utils
import { getArrayFromLocalStorage, saveArrayToLocalStorage } from '@/utils/local_storage'

// interfaces
import IPlannerWeapon from '@/interfaces/Weapon/IPlannerWeapon'
import IPlannerResonator from '@/interfaces/Resonator/IPlannerResonator'

export default defineComponent({
  name: 'AddPlannerWeaponForm',
  props: {
    weapon_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ascention_level: 0,
      new_ascention_level: 6,
      level: 1,
      new_level: 90,
      rules: {
        required: (value: any) => !!value || '',
        ascention_level: (value: any) => (value >= 0 && value <= 6) || '',
        new_ascention_level: (value: any) => (value >= this.ascention_level) || '',
        level: (value: any) => (value >= 1 && value <= 90) || '',
        new_level: (value: any) => (value >= this.level) || ''
      },
    }
  },
  setup(props) {
    const weapon_store = useWeaponStore()
    const planner_weapon_store = usePlannerWeaponStore()
    const planner_resonator_store = usePlannerResonatorStore()

    return {
      weapon: weapon_store.getWeapon(props.weapon_id),
      planner_weapon_store,
      planner_resonator_store,
    }
  },
  methods: {
    addWeapon() {
      let planner_weapons_local = getArrayFromLocalStorage<IPlannerWeapon>('planner_weapons')
      let planner_resonators_local = getArrayFromLocalStorage<IPlannerResonator>('planner_resonators')
      const new_weapon: IPlannerWeapon = {
        weapon_id: this.weapon.id,
        type: 1,
        position: 0,
        visible: true,
        ascention_level: this.ascention_level,
        new_ascention_level: this.new_ascention_level,
        level: this.level,
        new_level: this.new_level
      }

      if (planner_weapons_local.length > 0) {
        for (const weapon of planner_weapons_local) {
          weapon.position += 1
        }
      }

      if (planner_resonators_local.length > 0) {
        for (const resonator of planner_resonators_local) {
          resonator.position += 1
        }
      }

      planner_weapons_local.unshift(new_weapon)
      saveArrayToLocalStorage('planner_weapons', planner_weapons_local)
      saveArrayToLocalStorage('planner_resonators', planner_resonators_local)

      this.planner_weapon_store.addWeapon(new_weapon)
      this.planner_resonator_store.fetchPlannerResonators()

      this.$emit('added_weapon', true)
    }
  },
})
</script>