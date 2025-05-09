<template>
  <v-sheet class="rounded-lg h-100" :class="!planner_weapon.visible ? 'planner_item_invisible' : ''">
    <v-sheet class="d-flex align-center justify-space-between rounded-t-lg pa-2" :class="getRarityClass(weapon.rarity)">
      <div class="d-flex align-center ga-2">
        <v-avatar size="large">
          <v-img
            :src="getWeaponIconUrl(weapon.name)"
          ></v-img>
        </v-avatar>
        <p class="text-sm-h6 text-xs-subtitle-1">{{ weapon.name }}</p>
      </div>
      <div class="d-flex ga-1">
        <v-btn icon="mdi-pencil" size="x-small" @click="editPlannerWeapon()"></v-btn>
        <v-btn icon="mdi-arrow-up-right" size="x-small"></v-btn>
        <v-btn :icon="!planner_weapon.visible ? 'mdi-eye' : 'mdi-eye-off'" size="x-small" @click="changeVisibility()"></v-btn>
        <v-btn icon="mdi-delete" size="x-small" @click="removeWeapon()"></v-btn>
      </div>
    </v-sheet>
    <div class="d-flex pa-4">
      <div class="d-flex flex-column" style="width: 100%">
        <p class="item-info-title">Levels</p>
        <LevelDifference
          :level="planner_weapon.level"
          :new_level="planner_weapon.new_level"
        />
      </div>
    </div>
    <v-divider></v-divider>
    <div class="materials_container ga-2 pa-4">
      <template v-for="necessary_material in necessary_materials" :key="necessary_material.id">
        <div v-if="necessary_material.show">
          <v-hover v-slot="{ isHovering, props: hoverProps }">
            <v-sheet class="material_card d-flex flex-column align-center" v-bind="hoverProps" @click="selectMaterial(necessary_material.family_id, necessary_material.id)">
              <v-sheet class="rounded-t" :class="getRarityClass(necessary_material.rarity)">
                <v-sheet class="forged_quantity d-flex text-caption px-1 rounded-be" v-if="getForgedMaterialQuantity(weapon_inv, necessary_material.id) > 0">
                  <v-img
                    :src="getIconUrl('synthesize')"
                    :width="15"
                  ></v-img>
                  {{ getForgedMaterialQuantity(weapon_inv, necessary_material.id) }}
                </v-sheet>
                <v-img
                  :src="getMaterialIconUrl(necessary_material.name)"
                  :width="50"
                >
                  <v-overlay
                    :model-value="!isHovering"
                    contained
                    scrim="#000000"
                    opacity-20
                    class="align-center justify-center rounded-t"
                    v-if="isMaterialCompleted(weapon_inv, necessary_material.id)"
                  >
                    <v-icon
                      color="green-lighten-1"
                      icon="mdi-check-circle"
                    ></v-icon>
                  </v-overlay>
                </v-img>
              </v-sheet>
              <v-sheet class="rounded-b" width="50px" color="black">
                <p class="text-caption text-center">{{ getInitialMaterialQuantity(initial_materials, necessary_material.id) }}/{{ necessary_material.quantity }}</p>
              </v-sheet>
            </v-sheet>
          </v-hover>
          <v-tooltip location="bottom center" origin="auto" activator="parent">
            <p>{{ necessary_material.name }}</p>
          </v-tooltip>
        </div>
      </template>
    </div>
  </v-sheet>
</template>

<script lang="ts">
//stores
import { useInventoryStore } from '@/stores/inventory'
import { useFamilyMaterialStore } from '@/stores/family_material'
import { useWeaponStore } from '@/stores/weapon'
import { usePlannerItemStore } from '@/stores/planner_item'

// interfaces
import IPlannerWeapon from '@/interfaces/Weapon/IPlannerWeapon'
import IMaterial from '@/interfaces/Materials/IInventoryMaterial'

// utils
import WeaponMaterials from '@/utils/weapon_materials'
import getRarityClass from '@/utils/rarity_class'
import {
  FiveStarsWeaponAscentionMaterials,
  FourStarsWeaponAscentionMaterials,
} from '@/utils/weapon_ascention_materials'
import {
  addMaterialFromMatrix,
  getForgedMaterialQuantity,
  getMaterialFileName,
  isMaterialCompleted,
  getInitialMaterialQuantity,
  getInvMaterialQuantity,
  forgeMaterial,
} from '@/utils/planner_materials'
import { getWeaponIconUrl, getMaterialIconUrl, getIconUrl } from '@/utils/supabase'

export default defineComponent({
  name: 'PlannerWeaponCard',
  props: {
    planner_weapon: {
      required: true,
      type: Object as ()=>IPlannerWeapon
    }
  },
  data() {
    return {
      weapon_inv: [] as any[],
      initial_materials: [] as any[],
      materials_to_change: {} as any,
    }
  },
  setup(props) {
    const inventory_store = useInventoryStore()
    const family_material_store = useFamilyMaterialStore()
    const weapon_store = useWeaponStore()
    const planner_item_store = usePlannerItemStore()

    const weapon = weapon_store.getWeapon(props.planner_weapon.weapon_id)

    if (!weapon) {
      throw new Error(`Weapon with ID ${props.planner_weapon.weapon_id} not found.`)
    }

    return {
      inventory_store,
      family_material_store,
      planner_item_store,
      weapon,
      necessary_materials: WeaponMaterials(weapon),
      family_material: family_material_store.$state.families,
    }
  },
  beforeMount() {
    this.getNecessaryMaterials()
  },
  methods: {
    getRarityClass,
    addMaterialFromMatrix,
    getForgedMaterialQuantity,
    getMaterialFileName,
    isMaterialCompleted,
    getInitialMaterialQuantity,
    getInvMaterialQuantity,
    forgeMaterial,
    getWeaponIconUrl,
    getMaterialIconUrl,
    getIconUrl,
    getNecessaryMaterials(): IMaterial[] {
      if (this.planner_weapon.ascention_level !== this.planner_weapon.new_ascention_level) {
        this.getAscentionMaterials()
      }

      for (const material of this.necessary_materials) {
        getInvMaterialQuantity(this.inventory_store, this.weapon_inv, this.initial_materials, material.id, material.quantity)
      }

      if (this.planner_weapon.visible) {
        for (const material of this.necessary_materials) {
          forgeMaterial(this.inventory_store, this.weapon_inv, this.family_material, this.materials_to_change, material.id)
        }
      }

      this.inventory_store.updateMaterialsQuantity(this.materials_to_change, true)

      return this.necessary_materials
    },
    getAscentionMaterials() {
      const ascention_level = this.planner_weapon.ascention_level
      const new_ascention_level = this.planner_weapon.new_ascention_level
      let ascention_materials
      switch (this.weapon.rarity) {
        case 5: ascention_materials = FiveStarsWeaponAscentionMaterials(this.weapon); break
        case 4: ascention_materials = FourStarsWeaponAscentionMaterials(this.weapon); break
        default: ascention_materials = FiveStarsWeaponAscentionMaterials(this.weapon)
      }

      for (let i = ascention_level; i < new_ascention_level; i++) {
        for (const j in ascention_materials[i]) {
          addMaterialFromMatrix(this.necessary_materials, ascention_materials, i, parseInt(j))
        }
      }
    },
    selectMaterial(family_material_id: string, material_id: string) {
      if (family_material_id) {
        this.$emit('emit_open_family_material_qty_form', family_material_id)
      }
      else {
        this.$emit('emit_open_material_qty_form', material_id)
      }
    },
    editPlannerWeapon() {
      this.$emit('emit_open_planner_weapon_form', this.planner_weapon.weapon_id, true)
    },
    changeVisibility() {
      this.planner_item_store.changeItemVisibility(this.planner_weapon.weapon_id, this.planner_weapon.type)
      this.$emit('emit_refresh_materials')
    },
    removeWeapon() {
      this.planner_item_store.removeWeapon(this.weapon.id, this.planner_weapon.position)
      this.$emit('emit_removed_planner_item')
    }
  },
})
</script>

<style>
.materials_container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45px, 1fr));
}

.forged_quantity {
  position: absolute;
  z-index: 1;
}

.material_card {
  position: relative;
  cursor: pointer;
}
</style>
