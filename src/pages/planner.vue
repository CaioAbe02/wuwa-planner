<template>
  <v-container max-width="90%" v-if="!is_loading">
    <v-dialog width="auto" v-model="material_family_qty_form">
      <FamilyMaterialQtyForm
        :material_family_id="selected_family_material_id"
        @close_family_material_qty_form="material_family_qty_form = false"
        @add_n_updates="refreshMaterials()"
      />
    </v-dialog>
    <v-dialog width="auto" v-model="material_qty_form">
      <MaterialQtyForm
        :material_id="selected_material_id"
        @close_material_qty_form="material_qty_form = false"
        @add_n_updates="refreshMaterials()"
      />
    </v-dialog>
    <v-dialog width="auto" v-model="resonator_selection">
      <SelectResonator @selected_resonator="openAddPlannerResonatorForm" />
    </v-dialog>
    <v-dialog width="auto" v-model="weapon_selection">
      <SelectWeapon @selected_weapon="openPlannerWeaponForm" />
    </v-dialog>
    <v-dialog class="h-75" width="auto" v-model="add_planner_resonator_form">
      <AddPlannerResonatorForm
        :resonator_id="selected_resonator_id"
        @added_resonator="closeAddPlannerResonatorForm"
      />
    </v-dialog>
    <v-dialog class="h-75" width="auto" v-model="planner_weapon_form">
      <PlannerWeaponForm
        :weapon_id="selected_weapon_id"
        :edit="edit_planner_weapon"
        @emit_close_planner_weapon_form="closePlannerWeaponForm"
      />
    </v-dialog>
    <v-dialog class="h-75" width="auto" v-model="prioritize_planner_item">
      <PrioritizePlannerItem
        :planner_items="planner_items"
        @emit_close_priotize_planner_item="closePriotizePlannerItem"
      />
    </v-dialog>
    <v-dialog class="h-75" width="auto" v-model="edit_planner_resonator_form">
      <EditPlannerResonatorForm
        :resonator_id="selected_resonator_id"
      />
    </v-dialog>
    <div class="d-flex pb-4">
      <v-btn @click="resonator_selection = true">Add Resonator</v-btn>
      <v-btn @click="weapon_selection = true">Add Weapon</v-btn>
      <v-btn @click="prioritize_planner_item = true">Prioritize</v-btn>
    </div>
    <div class="planner_cards ga-2">
      <template v-for="planner_item in planner_items">
        <PlannerResonatorCard
          v-if="planner_item.type === 0 && 'resonator_id' in planner_item"
          :key="planner_item.resonator_id + '-' + n_updates"
          :resonator_id="planner_item.resonator_id"
          @emit_open_family_material_qty_form="openFamilyMaterialQtyForm"
          @emit_open_material_qty_form="openMaterialQtyForm"
          @emit_refresh_materials="refreshMaterials"
        />
        <PlannerWeaponCard
          v-else-if="planner_item.type === 1 && 'weapon_id' in planner_item"
          :key="planner_item.weapon_id + '-' + n_updates"
          :planner_weapon="planner_item"
          @emit_open_family_material_qty_form="openFamilyMaterialQtyForm"
          @emit_open_material_qty_form="openMaterialQtyForm"
          @emit_open_planner_weapon_form="openPlannerWeaponForm"
          @emit_refresh_materials="refreshMaterials"
        />
      </template>
    </div>
  </v-container>
</template>

<script lang="ts">
import { useFamilyMaterialStore } from '@/stores/family_material'
import { useMaterialStore } from '@/stores/material'
import { useResonatorStore } from '@/stores/resonator'
import { useWeaponStore } from '@/stores/weapon'
import { useInventoryStore } from '@/stores/inventory'
import { usePlannerItemStore } from '@/stores/planner_item'

export default defineComponent({
  name: 'PlannerPage',
  data() {
    return {
      material_family_qty_form: false,
      material_qty_form: false,
      resonator_selection: false,
      weapon_selection: false,
      add_planner_resonator_form: false,
      planner_weapon_form: false,
      prioritize_planner_item: false,
      edit_planner_resonator_form: false,
      edit_planner_weapon: false,
      selected_family_material_id: '',
      selected_material_id: '',
      selected_resonator_id: '',
      selected_weapon_id: '',
      n_updates: 0
    }
  },
  setup() {
    const planner_item_store = usePlannerItemStore()
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
      planner_item_store.fetchPlannerItems()
      is_loading.value = false
    })

    return {
      family_material_store,
      inventory_store,
      planner_item_store,
      planner_items: computed(() => planner_item_store.planner_items),
      is_loading,
    }
  },
  methods: {
    refreshMaterials() {
      this.inventory_store.resetForgedInventory()
      this.n_updates += 1
    },
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
    openAddPlannerResonatorForm(resonator_id: string) {
      this.resonator_selection = false
      this.selected_resonator_id = resonator_id
      this.add_planner_resonator_form = true
    },
    closeAddPlannerResonatorForm(update: boolean) {
      this.refreshMaterials()
      this.add_planner_resonator_form = false
    },
    openPlannerWeaponForm(weapon_id: string, edit_planner_weapon: boolean) {
      this.weapon_selection = false
      this.selected_weapon_id = weapon_id
      this.edit_planner_weapon = edit_planner_weapon
      this.planner_weapon_form = true
    },
    closePlannerWeaponForm(update: boolean) {
      if (update) {
        this.refreshMaterials()
      }
      this.planner_weapon_form = false
    },
    closePriotizePlannerItem() {
      this.planner_item_store.fetchPlannerItems()
      this.refreshMaterials()
      this.prioritize_planner_item = false
    },
  },
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
