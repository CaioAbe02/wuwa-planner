<template>
  <v-sheet class="rounded-lg ma-2">
    <v-sheet class="five-stars-gradient d-flex align-center justify-space-between rounded-t-lg pa-2">
      <div class="d-flex align-center ga-2">
        <v-avatar size="large">
          <v-img
            :src="`src/assets/Resonators/Icons/${planner_resonator.resonator.name}_Icon.webp`"
          ></v-img>
        </v-avatar>
        <p class="text-sm-h6 text-xs-subtitle-1">{{ planner_resonator.resonator.name }}</p>
      </div>
      <div class="d-flex ga-1">
        <v-btn icon="mdi-pencil" size="x-small"></v-btn>
        <v-btn icon="mdi-arrow-up-right" size="x-small"></v-btn>
        <v-btn icon="mdi-eye-off" size="x-small"></v-btn>
        <v-btn icon="mdi-delete" size="x-small"></v-btn>
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
              :src="`src/assets/Forte/${planner_resonator.resonator.name}/inherent_skill_${index}.webp`"
            ></v-img>
          </div>
        </template>
        <p>{{ planner_resonator.resonator.forte.inherent_skills[index] }}</p>
      </v-tooltip>
      <v-tooltip v-for="(stat_bonus, index) in planner_resonator.forte.stats_bonus" location="bottom center" origin="auto">
        <template v-slot:activator="{ props }">
          <div v-if="!stat_bonus" v-bind="props">
            <v-img
              :src="`src/assets/Forte/StatsBonus/${getStatBonusIconName(planner_resonator.resonator.forte.stats_bonus[index].name)}`"
            ></v-img>
          </div>
        </template>
        <p>{{ getStatBonusTooltipText(planner_resonator.resonator.forte.stats_bonus[index]) }}</p>
      </v-tooltip>
    </div>
    <v-divider></v-divider>
    <div class="materials_container ga-2 pa-4">
      <template v-for="necessary_material in necessary_materials" :key="necessary_material.id">
        <div v-if="necessary_material.show">
          <v-hover v-slot="{ isHovering, props: hoverProps }">
            <v-sheet class="material_card d-flex flex-column align-center" v-bind="hoverProps">
              <v-sheet class="rounded-t" :class="getRarityClass(necessary_material.rarity)">
                <v-sheet class="forged_quantity text-caption px-1 rounded-be" v-if="getForgedMaterialQuantity(necessary_material.id) > 0">
                  {{ getForgedMaterialQuantity(necessary_material.id) }}
                </v-sheet>
                <v-img
                  :src="`src/assets/Materials/${getMaterialFileName(necessary_material.name)}.webp`"
                  :width="50"
                >
                  <v-overlay
                    :model-value="!isHovering"
                    contained
                    scrim="#000000"
                    opacity-20
                    class="align-center justify-center rounded-t"
                    v-if="isMaterialCompleted(necessary_material.id)"
                  >
                    <v-icon
                      color="green-lighten-1"
                      icon="mdi-check-circle"
                    ></v-icon>
                  </v-overlay>
                </v-img>
              </v-sheet>
              <v-sheet class="rounded-b" width="50px" color="black">
                <p class="text-caption text-center">{{ getInitialMaterialQuantity(necessary_material.id) }}/{{ necessary_material.quantity }}</p>
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
import IPlannerResonator from '@/interfaces/Resonator/IPlannerResonator'
import IStatBonus from '@/interfaces/Forte/IStatBonus'
import IMaterial from '@/interfaces/Materials/INecessaryMaterial'
import AscentionMaterials from '@/utils/ascention_materials'
import { InherentSkill0Material, InherentSkill1Material } from '@/utils/inherent_skills_materials'
import { StatBonus0Material, StatBonus1Material } from '@/utils/stat_bonus_materials'
import SkillsMaterials from '@/utils/skills_materials'
import { useInventoryStore } from '@/stores/inventory'
import ResonatorMaterials from '@/utils/resonator_materials'
import { useFamilyMaterialStore } from '@/stores/family_material'

export default defineComponent({
  name: 'PlannerResonatorCard',
  props: {
    planner_resonator: {
      required: true,
      type: Object as ()=>IPlannerResonator
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
    const resonator = props.planner_resonator.resonator
    const inventoryStore = useInventoryStore()
    const famiyMaterialStore = useFamilyMaterialStore()
    const necessary_materials = ResonatorMaterials(resonator)

    return {
      inventoryStore,
      famiyMaterialStore,
      necessary_materials
    }
  },
  beforeMount() {
    this.getNecessaryMaterials()
  },
  methods: {
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
    getRarityClass(rarity: number): string {
      switch (rarity) {
        case 1: return 'one-star-gradient'
        case 2: return 'two-stars-gradient'
        case 3: return 'three-stars-gradient'
        case 4: return 'four-stars-gradient'
        case 5: return 'five-stars-gradient'
        default: return 'five-stars-gradient'
      }
    },
    getMaterialFileName(material_name: string): string {
      return (material_name.replace(/ /g, '_'))
    },
    getForgedMaterialQuantity(material_id: string) {
      return (this.resonator_inv.find(material => material.id === material_id)?.forged_quantity)
    },
    getInitialMaterialQuantity(material_id: string) {
      const material = this.initial_materials.find(material => material.id === material_id)

      if (material) {
        return material.quantity
      }

      return 0
    },
    getInvMaterialQuantity(material_id: string, necessary_quantity: number) {
      const material = this.inventoryStore.getForgedInvMaterial(material_id)
      const resonator_inv_material = this.resonator_inv.find(resonator_inv_material => resonator_inv_material.id === material?.id)
      const initial_material = this.initial_materials.find(initial_material => initial_material.id === material?.id)

      if (material) {
        if (resonator_inv_material) {
          resonator_inv_material.quantity += material.quantity
          resonator_inv_material.necessary_quantity += necessary_quantity

          initial_material.quantity += material.quantity
        }
        else {
          this.resonator_inv.push({
            id: material_id,
            quantity: material.quantity,
            necessary_quantity: necessary_quantity,
            forged_quantity: 0,
          })
          this.initial_materials.push({
            id: material_id,
            quantity: material.quantity,
          })
        }
      }
    },
    forgeMaterial(material_id: string) {
      const material = this.inventoryStore.getForgedInvMaterial(material_id)
      let resonator_inv_material = this.resonator_inv.find(resonator_inv_material => resonator_inv_material.id === material?.id)

      if (material) {
        const family = this.famiyMaterialStore.$state.families.find(family => family.id === material.family_id)
        let new_quantity = 0
        let forge_quantity = 0
        let forge_quantity2 = 0
        let forge_quantity3 = 0
        let forge_quantity4 = 0

        if (resonator_inv_material.quantity >= resonator_inv_material.necessary_quantity) {
          new_quantity = resonator_inv_material.quantity - resonator_inv_material.necessary_quantity
        }

        if (material.family_id !== '') {
          if (material.rarity === 2) {
            this.updateMaterialsToChange(material_id, new_quantity, forge_quantity, 0)
          }
          else if (material.rarity === 3) {
            let two_stars_material = this.resonator_inv.find(material => material.id === family?.forgery_materials.two_stars.id)

            while (true) {
              if (forge_quantity + resonator_inv_material.quantity >= resonator_inv_material.necessary_quantity ||
                  two_stars_material.quantity - 3 <= two_stars_material.necessary_quantity
                ) {
                break
              }
              forge_quantity += 1
              two_stars_material.quantity -= 3
              resonator_inv_material.forged_quantity += 1
            }
            this.updateMaterialsToChange(material_id, new_quantity, forge_quantity, 0)
            this.updateMaterialsToChange(two_stars_material.id, 0, forge_quantity, 3)
          }
          else if (material.rarity === 4) {
            let two_stars_material = this.resonator_inv.find(material => material.id === family?.forgery_materials.two_stars.id)
            let three_stars_material = this.resonator_inv.find(material => material.id === family?.forgery_materials.three_stars.id)

            while (true) {
              if (forge_quantity2 + resonator_inv_material.quantity >= resonator_inv_material.necessary_quantity ||
                  two_stars_material.quantity - 9 <= two_stars_material.necessary_quantity
                ) {
                break
              }
              forge_quantity += 1
              forge_quantity2 += 1
              two_stars_material.quantity -= 9
              resonator_inv_material.forged_quantity += 1
            }
            while (true) {
              if (forge_quantity3 + resonator_inv_material.quantity >= resonator_inv_material.necessary_quantity ||
                  three_stars_material.quantity - 3 <= three_stars_material.necessary_quantity
                ) {
                break
              }
              forge_quantity += 1
              forge_quantity3 += 1
              three_stars_material.quantity -= 3
              resonator_inv_material.forged_quantity += 1
            }
            this.updateMaterialsToChange(material_id, new_quantity, forge_quantity, 0)
            this.updateMaterialsToChange(two_stars_material.id, 0, forge_quantity2, 9)
            this.updateMaterialsToChange(three_stars_material.id, 0, forge_quantity3, 3)
          }
          else if (material.rarity === 5) {
            let two_stars_material = this.resonator_inv.find(material => material.id === family?.forgery_materials.two_stars.id)
            let three_stars_material = this.resonator_inv.find(material => material.id === family?.forgery_materials.three_stars.id)
            let four_stars_material = this.resonator_inv.find(material => material.id === family?.forgery_materials.four_stars.id)

            while (true) {
              if (forge_quantity2 + resonator_inv_material.quantity >= resonator_inv_material.necessary_quantity ||
                  two_stars_material.quantity - 27 < two_stars_material.necessary_quantity
                ) {
                break
              }
              forge_quantity += 1
              forge_quantity2 += 1
              two_stars_material.quantity -= 27
              resonator_inv_material.forged_quantity += 1
            }
            while (true) {
              if (forge_quantity3 + resonator_inv_material.quantity >= resonator_inv_material.necessary_quantity ||
                  three_stars_material.quantity - 9 < three_stars_material.necessary_quantity
                ) {
                break
              }
              forge_quantity += 1
              forge_quantity3 += 1
              three_stars_material.quantity -= 9
              resonator_inv_material.forged_quantity += 1
            }
            while (true) {
              if (forge_quantity4 + resonator_inv_material.quantity >= resonator_inv_material.necessary_quantity ||
                  four_stars_material.quantity - 3 < four_stars_material.necessary_quantity
                ) {
                break
              }
              forge_quantity += 1
              forge_quantity4 += 1
              four_stars_material.quantity -= 3
              resonator_inv_material.forged_quantity += 1
            }
            this.updateMaterialsToChange(material_id, new_quantity, forge_quantity, 0)
            this.updateMaterialsToChange(two_stars_material.id, 0, forge_quantity2, 27)
            this.updateMaterialsToChange(three_stars_material.id, 0, forge_quantity3, 9)
            this.updateMaterialsToChange(four_stars_material.id, 0, forge_quantity4, 3)
          }
        }
      }
    },
    updateMaterialsToChange(material_id: string, new_quantity: number, forged_quantity: number, forge_multiplier: number) {
      if (this.materials_to_change[material_id]) {
        this.materials_to_change[material_id] += new_quantity - forged_quantity * forge_multiplier
      }
      else {
        this.materials_to_change[material_id] = new_quantity - forged_quantity * forge_multiplier
      }
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
        this.getInvMaterialQuantity(material.id, material.quantity)
      }

      for (const material of this.necessary_materials) {
        this.forgeMaterial(material.id)
      }
      this.inventoryStore.updateMaterialsQuantity(this.materials_to_change, true)

      return this.necessary_materials
    },
    getAscentionMaterials() {
      const ascention_level = this.planner_resonator.ascention_level
      const new_ascention_level = this.planner_resonator.new_ascention_level
      const ascention_materials = AscentionMaterials(this.planner_resonator.resonator)

      for (let i = ascention_level; i < (new_ascention_level - ascention_level); i++) {
        for (const j in ascention_materials[i]) {
          this.addMaterialFromMatrix(ascention_materials, i, parseInt(j))
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
      const skills_materials = SkillsMaterials(this.planner_resonator.resonator)

      if (normal_attack_level !== new_normal_attack_level) {
        for (let i = normal_attack_level - 1; i < (new_normal_attack_level - normal_attack_level); i++) {
          for (const j in skills_materials[i]) {
            this.addMaterialFromMatrix(skills_materials, i, parseInt(j))
          }
        }
      }
      if (ressonance_skill_level !== new_ressonance_skill_level) {
        for (let i = ressonance_skill_level - 1; i < (new_ressonance_skill_level - ressonance_skill_level); i++) {
          for (const j in skills_materials[i]) {
            this.addMaterialFromMatrix(skills_materials, i, parseInt(j))
          }
        }
      }
      if (forte_circuit_level !== new_forte_circuit_level) {
        for (let i = forte_circuit_level - 1; i < (new_forte_circuit_level - forte_circuit_level); i++) {
          for (const j in skills_materials[i]) {
            this.addMaterialFromMatrix(skills_materials, i, parseInt(j))
          }
        }
      }
      if (ressonance_liberation_level !== new_ressonance_liberation_level) {
        for (let i = ressonance_liberation_level - 1; i < (new_ressonance_liberation_level - ressonance_liberation_level); i++) {
          for (const j in skills_materials[i]) {
            this.addMaterialFromMatrix(skills_materials, i, parseInt(j))
          }
        }
      }
      if (intro_skill_level !== new_intro_skill_level) {
        for (let i = intro_skill_level - 1; i < (new_intro_skill_level - intro_skill_level); i++) {
          for (const j in skills_materials[i]) {
            this.addMaterialFromMatrix(skills_materials, i, parseInt(j))
          }
        }
      }
    },
    getInherentSkillsMaterials() {
      const inherent_skill_0 = this.planner_resonator.forte.inherent_skills[0]
      const inherent_skill_1 = this.planner_resonator.forte.inherent_skills[1]

      const inherent_skill_0_materials = InherentSkill0Material(this.planner_resonator.resonator)
      const inherent_skill_1_materials = InherentSkill1Material(this.planner_resonator.resonator)

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
      const stat_bonus_0_materials = StatBonus0Material(this.planner_resonator.resonator)
      const stat_bonus_1_materials = StatBonus1Material(this.planner_resonator.resonator)
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
    addMaterialFromMatrix(materials: any, i: number, j: number) {
      const existing_material = this.necessary_materials.find(material => material.id === materials[i][j].id)
      if (existing_material) {
        existing_material.quantity += materials[i][j].quantity
        existing_material.show = true
      }
    },
    addMaterial(material: any) {
      const existing_material = this.necessary_materials.find(necessary_material => necessary_material.id === material.id)
      if (existing_material) {
        existing_material.quantity += material.quantity
        existing_material.show = true
      }
    },
    isMaterialCompleted(material_id: string) {
      const material = this.resonator_inv.find(resonator_material => resonator_material.id === material_id)

      if (material) {
        if (material.quantity + material.forged_quantity >= material.necessary_quantity) {
          return true
        }
      }
      return false
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
}

.forged_quantity {
  position: absolute;
  z-index: 1;
}
</style>
