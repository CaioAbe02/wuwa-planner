<template>
  <v-card class="pa-6" width="400px">
    <v-card-title class="pa-0 pb-6">
      <v-avatar size="large">
        <v-img
          :src="getWeaponIconUrl(weapon.name)"
        ></v-img>
      </v-avatar>
      {{ weapon.name }}
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
    </v-form>
    <v-card-actions class="pt-6">
      <v-btn
        variant="outlined"
        :prepend-icon="edit ? '' : 'mdi-plus'"
        :text="edit ? 'Save' : 'Add Weapon'"
        type="submit"
        @click="edit ? editWeapon() : addWeapon()"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
//stores
import { useWeaponStore } from '@/stores/weapon'
import { usePlannerItemStore } from '@/stores/planner_item'

// interfaces
import IPlannerWeapon from '@/interfaces/Weapon/IPlannerWeapon'

//utils
import { getWeaponIconUrl } from '@/utils/supabase';

export default defineComponent({
  name: 'AddPlannerWeaponForm',
  props: {
    weapon_id: {
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
    const planner_item_store = usePlannerItemStore()
    let planner_weapon = {} as IPlannerWeapon
    let ascention_level = ref(0)
    let new_ascention_level = ref(6)
    let level = ref(1)
    let new_level = ref(90)

    if (props.edit) {
      planner_weapon = planner_item_store.getPlannerWeapon(props.weapon_id)
      ascention_level.value = planner_weapon.ascention_level
      new_ascention_level.value = planner_weapon.new_ascention_level
      level.value = planner_weapon.level
      new_level.value = planner_weapon.new_level
    }

    return {
      weapon: weapon_store.getWeapon(props.weapon_id),
      planner_weapon,
      planner_item_store,
      ascention_level,
      new_ascention_level,
      level,
      new_level,
    }
  },
  methods: {
    getWeaponIconUrl,
    addWeapon() {
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
      this.planner_item_store.addItem(new_weapon)
      this.$emit('emit_close_planner_weapon_form', true)
    },
    editWeapon() {
      const edited_weapon: IPlannerWeapon = {
        weapon_id: this.weapon.id,
        type: 1,
        position: this.planner_weapon.position,
        visible: this.planner_weapon.visible,
        ascention_level: this.ascention_level,
        new_ascention_level: this.new_ascention_level,
        level: this.level,
        new_level: this.new_level
      }
      this.planner_item_store.editItem(edited_weapon)
      this.$emit('emit_close_planner_weapon_form', true)
    },
  },
})
</script>