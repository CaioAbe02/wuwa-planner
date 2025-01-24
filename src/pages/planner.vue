<template>
  <v-container max-width="90%">
    <v-dialog width="auto" v-model="material_family_qty_form" v-if="material_family_qty_form">
      <FamilyMaterialQtyForm
        :material_family_id="selected_family_material_id"
        @close_family_material_qty_form="material_family_qty_form = false"
        @add_n_updates="n_updates += 1"
      />
    </v-dialog>
    <v-dialog width="auto" v-model="material_qty_form" v-if="material_qty_form">
      <MaterialQtyForm
        :material_id="selected_material_id"
        @close_material_qty_form="material_qty_form = false"
        @add_n_updates="n_updates += 1"
      />
    </v-dialog>
    <div class="planner_cards ga-2" v-if="!is_loading">
      <template v-for="planner_resonator in planner_resonators" :key="n_updates">
        <PlannerResonatorCard
          :planner_resonator="planner_resonator"
          :style="{ order: planner_resonator.position }"
          @emit_open_family_material_qty_form="openFamilyMaterialQtyForm"
          @emit_open_material_qty_form="openMaterialQtyForm"
        />
      </template>
      <template v-for="planner_weapon in planner_weapons">
        <PlannerWeaponCard
          :planner_weapon="planner_weapon"
          :style="{ order: planner_weapon.position }"
        />
      </template>
    </div>
  </v-container>
</template>

<script lang="ts">
import { useFamilyMaterialStore } from '@/stores/family_material'
import { useMaterialStore } from '@/stores/material'
import { usePlannerResonatorStore } from '@/stores/planner_resonator'
import { usePlannerWeaponStore } from '@/stores/planner_weapon'
import { useResonatorStore } from '@/stores/resonator'
import { useWeaponStore } from '@/stores/weapons'
import { useInventoryStore } from '@/stores/inventory'

export default defineComponent({
  name: 'PlannerPage',
  data() {
    return {
      material_family_qty_form: false,
      material_qty_form: false,
      selected_family_material_id: '',
      selected_material_id: '',
      n_updates: 0,
    }
  },
  setup() {
    const planner_resonator_store = usePlannerResonatorStore()
    const planner_weapon_store = usePlannerWeaponStore()
    const material_store = useMaterialStore()
    const family_material_store = useFamilyMaterialStore()
    const resonator_store = useResonatorStore()
    const weapons_store = useWeaponStore()
    const inventory_store = useInventoryStore()
    const is_loading = ref(true)

    onBeforeMount(async () => {
      await material_store.fetchMaterials()
      await family_material_store.fetchFamilies()
      await resonator_store.fetchResonators()
      await weapons_store.fetchWeapons()
      inventory_store.setInventory()
      is_loading.value = false
    })

    return {
      family_material_store,
      planner_resonators: planner_resonator_store.$state.planner_resonators,
      planner_weapons: planner_weapon_store.$state.planner_weapons,
      is_loading,
    }
  },
  methods: {
    openFamilyMaterialQtyForm(family_material_id: string) {
      this.selected_family_material_id = family_material_id
      this.selected_material_id = ''
      this.material_family_qty_form = true
    },
    openMaterialQtyForm(material_id: string) {
      this.selected_material_id = material_id
      this.selected_family_material_id = ''
      this.material_qty_form = true
    },
  }
})
</script>

<style>
@media (min-width: 1500px) {
  .planner_cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

@media (min-width: 1200px) and (max-width: 1500px) {
  .planner_cards {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (min-width: 0px) and (max-width: 1200px) {
  .planner_cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 0px) and (max-width: 750px) {
  .planner_cards {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
