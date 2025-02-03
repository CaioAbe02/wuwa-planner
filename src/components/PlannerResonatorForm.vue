<template>
  <v-card class="pa-6" width="400px">
    <v-card-title class="pa-0 pb-6">
      <v-avatar size="large">
        <v-img
          :src="getResonatorIconUrl(resonator.name)"
        ></v-img>
      </v-avatar>
      {{ resonator.name }}
    </v-card-title>
    <v-form class="custom-scrollbar overflow-auto pr-2" @submit.prevent>
      <div>
        <span>Ascention Level</span>
        <div class="d-flex align-center pt-1">
          <v-text-field
            v-model.number="ascention_level"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.ascention_level]"
          ></v-text-field>
          <v-text-field
            v-model.number="new_ascention_level"
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
            v-model.number="level"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.level]"
          ></v-text-field>
          <v-text-field
            v-model.number="new_level"
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
            v-model.number="normal_attack"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.forte]"
          ></v-text-field>
          <v-text-field
            v-model.number="new_normal_attack"
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
            v-model.number="resonance_skill"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.forte]"
          ></v-text-field>
          <v-text-field
            v-model.number="new_resonance_skill"
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
            v-model.number="forte_circuit"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.forte]"
          ></v-text-field>
          <v-text-field
            v-model.number="new_forte_circuit"
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
            v-model.number="resonance_liberation"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.forte]"
          ></v-text-field>
          <v-text-field
            v-model.number="new_resonance_liberation"
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
            v-model.number="intro_skill"
            density="compact"
            variant="outlined"
            append-icon="mdi-arrow-right-thin"
            :rules="[rules.required, rules.forte]"
          ></v-text-field>
          <v-text-field
            v-model.number="new_intro_skill"
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
            <span class="text-body-2">{{ resonator.inherent_skills[index] }}</span>
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
        :prepend-icon="edit ? '' : 'mdi-plus'"
        :text="edit ? 'Save' : 'Add Resonator'"
        type="submit"
        @click="edit ? editResonator() : addResonator()"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
//stores
import { useResonatorStore } from '@/stores/resonator'
import { usePlannerItemStore } from '@/stores/planner_item'

// interfaces
import IPlannerResonator from '@/interfaces/Resonator/IPlannerResonator'

//utils
import { getResonatorIconUrl } from '@/utils/supabase';

export default defineComponent({
  name: 'PlannerResonatorForm',
  props: {
    resonator_id: {
      type: String,
      required: true
    },
    edit: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      rules: {
        required: (value: any) => (value !== null && value !== undefined && value !== '') || '',
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
    const planner_item_store = usePlannerItemStore()
    let planner_resonator = {} as IPlannerResonator
    let ascention_level = ref(0)
    let new_ascention_level = ref(6)
    let level = ref(1)
    let new_level = ref(90)
    let normal_attack = ref(1)
    let new_normal_attack = ref(10)
    let resonance_skill = ref(1)
    let new_resonance_skill = ref(10)
    let forte_circuit = ref(1)
    let new_forte_circuit = ref(10)
    let resonance_liberation = ref(1)
    let new_resonance_liberation = ref(10)
    let intro_skill = ref(1)
    let new_intro_skill = ref(10)
    let inherent_skills = ref([false, false])
    let stat_bonuses = ref([false, false, false, false, false, false, false, false])

    if (props.edit) {
      planner_resonator = planner_item_store.getPlannerResonator(props.resonator_id)
      ascention_level.value = planner_resonator.ascention_level
      new_ascention_level.value = planner_resonator.new_ascention_level
      level.value = planner_resonator.level
      new_level.value = planner_resonator.new_level
      normal_attack.value = planner_resonator.forte.normal_attack_level
      new_normal_attack.value = planner_resonator.forte.new_normal_attack_level
      resonance_skill.value = planner_resonator.forte.ressonance_skill_level
      new_resonance_skill.value = planner_resonator.forte.new_ressonance_skill_level
      forte_circuit.value = planner_resonator.forte.forte_circuit_level
      new_forte_circuit.value = planner_resonator.forte.new_forte_circuit_level
      resonance_liberation.value = planner_resonator.forte.ressonance_liberation_level
      new_resonance_liberation.value = planner_resonator.forte.new_ressonance_liberation_level
      intro_skill.value = planner_resonator.forte.intro_skill_level
      new_intro_skill.value = planner_resonator.forte.new_intro_skill_level
      inherent_skills.value = planner_resonator.forte.inherent_skills
      stat_bonuses.value = planner_resonator.forte.stats_bonus
    }

    return {
      resonator: resonator_store.getResonator(props.resonator_id),
      planner_resonator,
      planner_item_store,
      ascention_level,
      new_ascention_level,
      level,
      new_level,
      normal_attack,
      new_normal_attack,
      resonance_skill,
      new_resonance_skill,
      forte_circuit,
      new_forte_circuit,
      resonance_liberation,
      new_resonance_liberation,
      intro_skill,
      new_intro_skill,
      inherent_skills,
      stat_bonuses,
      }
  },
  methods: {
    getResonatorIconUrl,
    addResonator() {
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
          ressonance_skill_level: this.resonance_skill,
          new_ressonance_skill_level: this.new_resonance_skill,
          forte_circuit_level: this.forte_circuit,
          new_forte_circuit_level: this.new_forte_circuit,
          ressonance_liberation_level: this.resonance_liberation,
          new_ressonance_liberation_level: this.new_resonance_liberation,
          intro_skill_level: this.intro_skill,
          new_intro_skill_level: this.new_intro_skill,
          inherent_skills: this.inherent_skills,
          stats_bonus: this.stat_bonuses
        }
      }
      this.planner_item_store.addItem(new_resonator)
      this.$emit('emit_close_resonator_form', true)
    },
    editResonator() {
      const edited_resonator: IPlannerResonator = {
        resonator_id: this.resonator.id,
        type: 0,
        position: this.planner_resonator.position,
        visible: this.planner_resonator.visible,
        ascention_level: this.ascention_level,
        new_ascention_level: this.new_ascention_level,
        level: this.level,
        new_level: this.new_level,
        forte: {
          normal_attack_level: this.normal_attack,
          new_normal_attack_level: this.new_normal_attack,
          ressonance_skill_level: this.resonance_skill,
          new_ressonance_skill_level: this.new_resonance_skill,
          forte_circuit_level: this.forte_circuit,
          new_forte_circuit_level: this.new_forte_circuit,
          ressonance_liberation_level: this.resonance_liberation,
          new_ressonance_liberation_level: this.new_resonance_liberation,
          intro_skill_level: this.intro_skill,
          new_intro_skill_level: this.new_intro_skill,
          inherent_skills: this.inherent_skills,
          stats_bonus: this.stat_bonuses
        }
      }
      this.planner_item_store.editItem(edited_resonator)
      this.$emit('emit_close_resonator_form', true)
    },
  },
})
</script>