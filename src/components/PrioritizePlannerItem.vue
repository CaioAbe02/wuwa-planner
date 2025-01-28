<template>
  <v-sheet class="pa-6">
    <draggable
      v-model="planner_items_local"
      v-bind="{ animation: 200, ghostClass: 'ghost' }"
      @start="drag = true"
      @end="drag = false"
      item-key="position"
    >
      <template #item="{element}">
        <div>
          <v-card class="cursor-grab" v-if="element.type === 0 && 'resonator_id' in element">
            {{ element.position }}
            <v-avatar size="large">
              <v-img
                :src="`src/assets/Resonators/Icons/${getPlannerItemName(element.resonator_id, element.type)}_Icon.webp`"
              ></v-img>
            </v-avatar>
            {{ getPlannerItemName(element.resonator_id, element.type) }}
          </v-card>
          <v-card class="cursor-pointer" v-if="element.type === 1 && 'weapon_id' in element">
            {{ element.position }}
            <v-avatar size="large">
              <v-img
                :src="`src/assets/Weapons/Icons/${getPlannerItemName(element.weapon_id, element.type).replace(' ', '_')}_Icon.webp`"
              ></v-img>
            </v-avatar>
            {{ getPlannerItemName(element.weapon_id, element.type) }}
          </v-card>
        </div>
      </template>
    </draggable>
    <div>
      <v-btn @click="saveItems">Save</v-btn>
    </div>
  </v-sheet>
</template>

<script lang="ts">
//components
import draggable from 'vuedraggable'

// stores
import { useResonatorStore } from '@/stores/resonator'
import { useWeaponStore } from '@/stores/weapon'

// interfaces
import IPlannerResonator from '@/interfaces/Resonator/IPlannerResonator'
import IPlannerWeapon from '@/interfaces/Weapon/IPlannerWeapon'

//utils
import { saveArrayToLocalStorage } from '@/utils/local_storage'

export default defineComponent({
  name: 'PriotizePlannerItem',
  components: {
    draggable,
  },
  props: {
    planner_items: {
      type: Array as PropType<(IPlannerResonator | IPlannerWeapon)[]>,
      required: true
    }
  },
  data() {
    return {
      planner_items_local: [...this.planner_items],
      drag: false,
    }
  },
  setup() {
    const resonator_store = useResonatorStore()
    const weapon_store = useWeaponStore()

    return {
      resonator_store,
      weapon_store
    }
  },
  methods: {
    getPlannerItemName(item_id: string, item_type: number): string {
      if (item_type === 0) {
        return this.resonator_store.getResonator(item_id).name
      }
      if (item_type === 1) {
        return this.weapon_store.getWeapon(item_id).name
      }

      return ''
    },
    saveItems() {
      this.planner_items_local = this.planner_items_local.map((item, index) => ({
        ...item,
        position: index,
      }))
      saveArrayToLocalStorage('planner_items', this.planner_items_local)
      this.$emit('emit_close_priotize_planner_item')
    }
  }
})
</script>

<style>
.ghost {
  opacity: 0;
}
</style>
