<template>
  <v-sheet class="rounded-lg h-100" :class="!planner_resonator.visible ? 'planner_item_invisible' : ''">
    <v-sheet class="five-stars-gradient d-flex align-center justify-space-between rounded-t-lg pa-2">
      <div class="d-flex align-center ga-2">
        <v-avatar size="large">
          <v-img
            :src="getResonatorIconUrl(resonator.name)"
          ></v-img>
        </v-avatar>
        <p class="text-sm-h6 text-xs-subtitle-1">{{ resonator.name }}</p>
      </div>
      <div class="d-flex ga-1">
        <v-btn icon="mdi-pencil" size="x-small" @click=editPlannerResonator()></v-btn>
        <v-btn icon="mdi-arrow-up-right" size="x-small"></v-btn>
        <v-btn :icon="!planner_resonator.visible ? 'mdi-eye' : 'mdi-eye-off'" size="x-small" @click="changeVisibility()"></v-btn>
        <v-btn icon="mdi-delete" size="x-small" @click=removeResonator()></v-btn>
      </div>
    </v-sheet>
    <div class="d-flex pa-4">
      <div class="d-flex flex-column" style="width: 100%;">
        <p class="item-info-title">Levels</p>
        <LevelDifference
          :level="planner_resonator.level"
          :new_level="planner_resonator.new_level"
        />
        <p class="item-info-title mb-1">Forte</p>
        <div class="char-forte ga-1">
          <span class="item-info-text text-disabled">Normal Attack</span>
          <LevelDifference
            :level="planner_resonator.forte.normal_attack_level"
            :new_level="planner_resonator.forte.new_normal_attack_level"
          />
          <span class="item-info-text text-disabled">Resonance Skill</span>
          <LevelDifference
            :level="planner_resonator.forte.ressonance_skill_level"
            :new_level="planner_resonator.forte.new_ressonance_skill_level"
          />
          <span class="item-info-text text-disabled">Forte Circuit</span>
          <LevelDifference
            :level="planner_resonator.forte.forte_circuit_level"
            :new_level="planner_resonator.forte.new_forte_circuit_level"
          />
          <span class="item-info-text text-disabled">Ressonance Liberation</span>
          <LevelDifference
            :level="planner_resonator.forte.ressonance_liberation_level"
            :new_level="planner_resonator.forte.new_ressonance_liberation_level"
          />
          <span class="item-info-text text-disabled">Intro Skill</span>
          <LevelDifference
            :level="planner_resonator.forte.intro_skill_level"
            :new_level="planner_resonator.forte.new_intro_skill_level"
          />
        </div>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="stats_bonus_container ga-1 pa-4">
      <v-tooltip v-for="(inherent_skill, index) in planner_resonator.forte.inherent_skills" location="bottom center" origin="auto" class="tooltip">
        <template v-slot:activator="{ props }">
          <div v-if="!inherent_skill" v-bind="props">
            <v-img
              :src="`src/assets/Forte/${resonator.name}/inherent_skill_${index}.webp`"
            ></v-img>
          </div>
        </template>
        <p>{{ resonator.inherent_skills[index] }}</p>
      </v-tooltip>
      <v-tooltip v-for="(stat_bonus, index) in planner_resonator.forte.stats_bonus" location="bottom center" origin="auto">
        <template v-slot:activator="{ props }">
          <div v-if="!stat_bonus" v-bind="props">
            <v-img
              :src="`src/assets/Forte/StatsBonus/${getStatBonusIconName(resonator.stats_bonus[index].name)}`"
            ></v-img>
          </div>
        </template>
        <p>{{ getStatBonusTooltipText(resonator.stats_bonus[index]) }}</p>
      </v-tooltip>
    </div>
    <v-divider></v-divider>
    <div class="materials_container ga-2 pa-4">
      <template v-for="necessary_material in necessary_materials" :key="necessary_material.id">
        <div v-if="necessary_material.show">
          <v-hover v-slot="{ isHovering, props: hoverProps }">
            <v-sheet class="material_card d-flex flex-column align-center" v-bind="hoverProps" @click="selectMaterial(necessary_material.family_id, necessary_material.id)">
              <v-sheet class="rounded-t" :class="getRarityClass(necessary_material.rarity)">
                <v-sheet class="forged_quantity d-flex text-caption px-1 rounded-be" v-if="getForgedMaterialQuantity(resonator_inv, necessary_material.id) > 0">
                  <v-img
                    :src="`src/assets/Icon_Synthesize.webp`"
                    :width="15"
                  ></v-img>
                  {{ getForgedMaterialQuantity(resonator_inv, necessary_material.id) }}
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
                    v-if="isMaterialCompleted(resonator_inv, necessary_material.id)"
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
import { useResonatorStore } from '@/stores/resonator'
import { usePlannerItemStore } from '@/stores/planner_item'

// interfaces
import IStatBonus from '@/interfaces/Forte/IStatBonus'
import IMaterial from '@/interfaces/Materials/INecessaryMaterial'

// utils
import AscentionMaterials from '@/utils/ascention_materials'
import { InherentSkill0Material, InherentSkill1Material } from '@/utils/inherent_skills_materials'
import { StatBonus0Material, StatBonus1Material } from '@/utils/stat_bonus_materials'
import SkillsMaterials from '@/utils/skills_materials'
import ResonatorMaterials from '@/utils/resonator_materials'
import getRarityClass from '@/utils/rarity_class'
import {
  addMaterialFromMatrix,
  getForgedMaterialQuantity,
  getMaterialFileName,
  isMaterialCompleted,
  getInitialMaterialQuantity,
  getInvMaterialQuantity,
  forgeMaterial,
} from '@/utils/planner_materials'
import { getResonatorIconUrl, getMaterialIconUrl } from '@/utils/supabase'

export default defineComponent({
  name: 'PlannerResonatorCard',
  props: {
    resonator_id: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      resonator_inv: [] as any[],
      initial_materials: [] as any[],
      materials_to_change: {} as any,
    }
  },
  setup(props) {
    const inventory_store = useInventoryStore()
    const family_material_store = useFamilyMaterialStore()
    const resonator_store = useResonatorStore()
    const planner_item_store = usePlannerItemStore()

    const resonator = resonator_store.getResonator(props.resonator_id)
    const planner_resonator = planner_item_store.getPlannerResonator(props.resonator_id)

    return {
      inventory_store,
      planner_item_store,
      resonator,
      planner_resonator,
      family_material: family_material_store.families,
      necessary_materials: ResonatorMaterials(resonator),
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
    getResonatorIconUrl,
    getMaterialIconUrl,
    getStatBonusIconName(stat_bonus_name: string): string {
      switch (stat_bonus_name) {
        case 'ATK+': return 'atk.webp'
        case 'Crit. Rate+': return 'crit_rate.webp'
        case 'Crit. DMG+': return 'crit_dmg.webp'
        default: return 'atk.webp'
      }
    },
    getStatBonusTooltipText(stat_bonus: IStatBonus): string {
      return (`${stat_bonus.name} ${stat_bonus.value}`)
    },
    getNecessaryMaterials(): IMaterial[] {
      if (this.planner_resonator.ascention_level !== this.planner_resonator.new_ascention_level) {
        this.getAscentionMaterials()
      }
      if (this.planner_resonator.forte.inherent_skills.some(skill => skill === false)) {
        this.getInherentSkillsMaterials()
      }
      if (this.planner_resonator.forte.stats_bonus.some(stat_bonus => stat_bonus === false)) {
        this.getStatsBonusMaterial()
      }
      this.getSkillsMaterials()

      for (const material of this.necessary_materials) {
        getInvMaterialQuantity(this.inventory_store, this.resonator_inv, this.initial_materials, material.id, material.quantity)
      }

      if (this.planner_resonator.visible) {
        for (const material of this.necessary_materials) {
          forgeMaterial(this.inventory_store, this.resonator_inv, this.family_material, this.materials_to_change, material.id)
        }
      }
      this.inventory_store.updateMaterialsQuantity(this.materials_to_change, true)

      return this.necessary_materials
    },
    getAscentionMaterials() {
      const ascention_level = this.planner_resonator.ascention_level
      const new_ascention_level = this.planner_resonator.new_ascention_level
      const ascention_materials = AscentionMaterials(this.resonator!)

      for (let i = ascention_level; i < (new_ascention_level - ascention_level); i++) {
        for (const j in ascention_materials[i]) {
          addMaterialFromMatrix(this.necessary_materials, ascention_materials, i, parseInt(j))
        }
      }
    },
    getSkillsMaterials() {
      const normal_attack_level = this.planner_resonator.forte.normal_attack_level
      const new_normal_attack_level = this.planner_resonator.forte.new_normal_attack_level
      const ressonance_skill_level = this.planner_resonator.forte.ressonance_skill_level
      const new_ressonance_skill_level = this.planner_resonator.forte.new_ressonance_skill_level
      const forte_circuit_level = this.planner_resonator.forte.forte_circuit_level
      const new_forte_circuit_level = this.planner_resonator.forte.new_forte_circuit_level
      const ressonance_liberation_level = this.planner_resonator.forte.ressonance_liberation_level
      const new_ressonance_liberation_level = this.planner_resonator.forte.new_ressonance_liberation_level
      const intro_skill_level = this.planner_resonator.forte.intro_skill_level
      const new_intro_skill_level = this.planner_resonator.forte.new_intro_skill_level
      const skills_materials = SkillsMaterials(this.resonator!)

      if (normal_attack_level !== new_normal_attack_level) {
        for (let i = normal_attack_level - 1; i < (new_normal_attack_level - normal_attack_level); i++) {
          for (const j in skills_materials[i]) {
            addMaterialFromMatrix(this.necessary_materials, skills_materials, i, parseInt(j))
          }
        }
      }
      if (ressonance_skill_level !== new_ressonance_skill_level) {
        for (let i = ressonance_skill_level - 1; i < (new_ressonance_skill_level - ressonance_skill_level); i++) {
          for (const j in skills_materials[i]) {
            addMaterialFromMatrix(this.necessary_materials, skills_materials, i, parseInt(j))
          }
        }
      }
      if (forte_circuit_level !== new_forte_circuit_level) {
        for (let i = forte_circuit_level - 1; i < (new_forte_circuit_level - forte_circuit_level); i++) {
          for (const j in skills_materials[i]) {
            addMaterialFromMatrix(this.necessary_materials, skills_materials, i, parseInt(j))
          }
        }
      }
      if (ressonance_liberation_level !== new_ressonance_liberation_level) {
        for (let i = ressonance_liberation_level - 1; i < (new_ressonance_liberation_level - ressonance_liberation_level); i++) {
          for (const j in skills_materials[i]) {
            addMaterialFromMatrix(this.necessary_materials, skills_materials, i, parseInt(j))
          }
        }
      }
      if (intro_skill_level !== new_intro_skill_level) {
        for (let i = intro_skill_level - 1; i < (new_intro_skill_level - intro_skill_level); i++) {
          for (const j in skills_materials[i]) {
            addMaterialFromMatrix(this.necessary_materials, skills_materials, i, parseInt(j))
          }
        }
      }
    },
    getInherentSkillsMaterials() {
      const inherent_skill_0 = this.planner_resonator.forte.inherent_skills[0]
      const inherent_skill_1 = this.planner_resonator.forte.inherent_skills[1]

      const inherent_skill_0_materials = InherentSkill0Material(this.resonator!)
      const inherent_skill_1_materials = InherentSkill1Material(this.resonator!)

      if (!inherent_skill_0) {
        for (const inherent_skill_material of inherent_skill_0_materials) {
          this.addMaterial(inherent_skill_material)
        }
      }
      if (!inherent_skill_1) {
        for (const inherent_skill_material of inherent_skill_1_materials) {
          this.addMaterial(inherent_skill_material)
        }
      }
    },
    getStatsBonusMaterial() {
      const stat_bonus_0_materials = StatBonus0Material(this.resonator!)
      const stat_bonus_1_materials = StatBonus1Material(this.resonator!)
      const stats_bonus = this.planner_resonator.forte.stats_bonus

      for (const i in stats_bonus) {
        const stat_bonus = stats_bonus[i]

        if(!stat_bonus) {
          if (i === '0' || parseInt(i) % 2 == 0) {
            for (const stat_bonus_material of stat_bonus_0_materials) {
              this.addMaterial(stat_bonus_material)
            }
          }
          else {
            for (const stat_bonus_material of stat_bonus_1_materials) {
              this.addMaterial(stat_bonus_material)
            }
          }
        }
      }
    },
    addMaterial(material: any) {
      const existing_material = this.necessary_materials.find(necessary_material => necessary_material.id === material.id)
      if (existing_material) {
        existing_material.quantity += material.quantity
        existing_material.show = true
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
    editPlannerResonator() {
      this.$emit('emit_open_planner_resonator_form', this.resonator_id, true)
    },
    changeVisibility() {
      this.planner_item_store.changeItemVisibility(this.resonator_id, this.planner_resonator.type)
      this.$emit('emit_refresh_materials')
    },
    removeResonator() {
      this.planner_item_store.removeResonator(this.resonator_id, this.planner_resonator.position)
      this.$emit('emit_refresh_materials')
    }
  },
})
</script>

<style scoped>
.char-forte {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
.stats_bonus_container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
}

.materials_container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45px, 1fr));
}

.material_card {
  position: relative;
  cursor: pointer;
}
</style>
