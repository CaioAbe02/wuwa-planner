<template>
  <v-card class="pa-6" width="400px">
    <v-card-title class="pa-0 pb-6">
      <v-avatar size="large">
        <v-img
          :src="`src/assets/Resonators/Icons/${resonator.name}_Icon.webp`"
        ></v-img>
      </v-avatar>
      {{ resonator.name }}
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
      <p class="text-h6 pb-2">Forte</p>
      <div>
        <span>Normal Attack</span>
        <div class="d-flex align-center pt-1">
          <v-text-field
            v-model="normal_attack"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.forte]"
          ></v-text-field>
          <v-text-field
            v-model="new_normal_attack"
            density="compact"
            variant="outlined"
            class="ml-4"
            :rules="[rules.required, rules.forte, rules.new_normal_attack]"
          ></v-text-field>
        </div>
      </div>
      <div>
        <span>Resonance Skill</span>
        <div class="d-flex align-center pt-1">
          <v-text-field
            v-model="resonance_skill"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.forte]"
          ></v-text-field>
          <v-text-field
            v-model="new_resonance_skill"
            density="compact"
            variant="outlined"
            class="ml-4"
            :rules="[rules.required, rules.forte, rules.new_resonance_skill]"
          ></v-text-field>
        </div>
      </div>
      <div>
        <span>Forte Circuit</span>
        <div class="d-flex align-center pt-1">
          <v-text-field
            v-model="forte_circuit"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.forte]"
          ></v-text-field>
          <v-text-field
            v-model="new_forte_circuit"
            density="compact"
            variant="outlined"
            class="ml-4"
            :rules="[rules.required, rules.forte, rules.new_forte_circuit]"
          ></v-text-field>
        </div>
      </div>
      <div>
        <span>Resonance Liberation</span>
        <div class="d-flex align-center pt-1">
          <v-text-field
            v-model="resonance_liberation"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.forte]"
          ></v-text-field>
          <v-text-field
            v-model="new_resonance_liberation"
            density="compact"
            variant="outlined"
            class="ml-4"
            :rules="[rules.required, rules.forte, rules.new_resonance_liberation]"
          ></v-text-field>
        </div>
      </div>
      <div>
        <span>Intro Skill</span>
        <div class="d-flex align-center pt-1">
          <v-text-field
            v-model="intro_skill"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.forte]"
          ></v-text-field>
          <v-text-field
            v-model="new_intro_skill"
            density="compact"
            variant="outlined"
            class="ml-4"
            :rules="[rules.required, rules.forte, rules.new_intro_skill]"
          ></v-text-field>
        </div>
      </div>
      <p class="text-h6 pb-2">Inherent Skills</p>
      <div>
        <v-checkbox
          v-for="(inherent_skill, index) in resonator.inherent_skills"
          v-model="inherent_skills[index]"
          :label="inherent_skill"
          hide-details
          density="compact"
        >
          <template v-slot:label>
            <span class="text-body-2">{{ resonator.inherent_skills[0] }}</span>
          </template>
        </v-checkbox>
      </div>
      <p class="text-h6 pb-2 pt-4">Stat Bonuses</p>
      <div>
        <v-checkbox
          v-for="(stat_bonus, index) in resonator.stats_bonus"
          v-model="stat_bonuses[index]"
          hide-details
          density="compact"
        >
          <template v-slot:label>
            <span class="text-body-2">{{ `${stat_bonus.name.replace('+', '')} increased by ${stat_bonus.value}` }}</span>
          </template>
        </v-checkbox>
      </div>
    </v-form>
    <v-card-actions class="pt-6">
      <v-btn
        variant="outlined"
        prepend-icon="mdi-plus"
        text="Add Resonator"
        type="submit"
        @click=addResonator()
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
//stores
import { useResonatorStore } from '@/stores/resonator'
import { usePlannerResonatorStore } from '@/stores/planner_resonator'
import { usePlannerWeaponStore } from '@/stores/planner_weapon'

// utils
import { getArrayFromLocalStorage, saveArrayToLocalStorage } from '../utils/local_storage'

// interfaces
import IPlannerResonator from '@/interfaces/Resonator/IPlannerResonator'
import IPlannerWeapon from '@/interfaces/Weapon/IPlannerWeapon'

export default defineComponent({
  name: 'AddPlannerResonatorForm',
  props: {
    resonator_id: {
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
      normal_attack: 1,
      new_normal_attack: 10,
      resonance_skill: 1,
      new_resonance_skill: 10,
      forte_circuit: 1,
      new_forte_circuit: 10,
      resonance_liberation: 1,
      new_resonance_liberation: 10,
      intro_skill: 1,
      new_intro_skill: 10,
      inherent_skills: [false, false],
      stat_bonuses: [false, false, false, false, false, false, false, false],
      rules: {
        required: (value: any) => !!value || '',
        ascention_level: (value: any) => (value >= 0 && value <= 6) || '',
        new_ascention_level: (value: any) => (value >= this.ascention_level) || '',
        level: (value: any) => (value >= 1 && value <= 90) || '',
        new_level: (value: any) => (value >= this.level) || '',
        forte: (value: any) => (value >= 1 && value <= 10) || '',
        new_normal_attack: (value: any) => (value >= this.new_normal_attack) || '',
        new_resonance_skill: (value: any) => (value >= this.new_resonance_skill) || '',
        new_forte_circuit: (value: any) => (value >= this.new_forte_circuit) || '',
        new_resonance_liberation: (value: any) => (value >= this.new_resonance_liberation) || '',
        new_intro_skill: (value: any) => (value >= this.new_intro_skill) || '',
      },
    }
  },
  setup(props) {
    const resonator_store = useResonatorStore()
    const planner_resonator_store = usePlannerResonatorStore()
    const planner_weapon_store = usePlannerWeaponStore()

    return {
      resonator: resonator_store.getResonator(props.resonator_id),
      planner_resonator_store,
      planner_weapon_store
    }
  },
  methods: {
    addResonator() {
      let planner_resonators_local = getArrayFromLocalStorage<IPlannerResonator>('planner_resonators')
      let planner_weapons_local = getArrayFromLocalStorage<IPlannerWeapon>('planner_weapons')
      const new_resonator: IPlannerResonator = {
        resonator_id: this.resonator.id,
        type: 0,
        position: 0,
        visible: true,
        ascention_level: this.ascention_level,
        new_ascention_level: this.new_ascention_level,
        level: this.level,
        new_level: this.new_level,
        forte: {
          normal_attack_level: this.normal_attack,
          new_normal_attack_level: this.new_normal_attack,
          ressonance_skill_level: this.normal_attack,
          new_ressonance_skill_level: this.new_normal_attack,
          forte_circuit_level: this.normal_attack,
          new_forte_circuit_level: this.new_normal_attack,
          ressonance_liberation_level: this.normal_attack,
          new_ressonance_liberation_level: this.new_normal_attack,
          intro_skill_level: this.normal_attack,
          new_intro_skill_level: this.new_normal_attack,
          inherent_skills: this.inherent_skills,
          stats_bonus: this.stat_bonuses
        }
      }

      if (planner_resonators_local.length > 0) {
        for (const resonator of planner_resonators_local) {
          resonator.position += 1
        }
      }

      if (planner_weapons_local.length > 0) {
        for (const weapon of planner_weapons_local) {
          weapon.position += 1
        }
      }

      planner_resonators_local.unshift(new_resonator)
      saveArrayToLocalStorage('planner_resonators', planner_resonators_local)
      saveArrayToLocalStorage('planner_weapons', planner_weapons_local)

      this.planner_resonator_store.addResonator(new_resonator)
      this.planner_weapon_store.fetchPlannerWeapons()

      this.$emit('added_resonator', true)
    }
  },
})
</script>