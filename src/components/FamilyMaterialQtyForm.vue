<template>
  <v-card>
    <v-card-title>
      {{ material_family.name }}
    </v-card-title>
    <v-form class="d-flex ga-2 px-6" @submit.prevent="submit">
      <v-sheet class="d-flex flex-column align-center">
        <v-sheet class="rounded-t" :class="getRarityClass(material_family.two_stars.rarity)">
          <v-img
            :src="`src/assets/Materials/${getMaterialFileName(material_family.two_stars.name)}.webp`"
            :width="50"
          >
          </v-img>
        </v-sheet>
        <v-sheet class="rounded-b" width="50px">
          <v-text-field
            class="centered_input"
            density="compact"
            variant="plain"
            v-model="two_stars_material_qty"
          ></v-text-field>
        </v-sheet>
      </v-sheet>
      <v-sheet class="material_card d-flex flex-column align-center">
        <v-sheet class="rounded-t" :class="getRarityClass(material_family.three_stars.rarity)">
          <v-img
            :src="`src/assets/Materials/${getMaterialFileName(material_family.three_stars.name)}.webp`"
            :width="50"
          >
          </v-img>
        </v-sheet>
        <v-sheet class="rounded-b" width="50px">
          <v-text-field
            class="centered_input"
            density="compact"
            variant="plain"
            v-model="three_stars_material_qty"
          ></v-text-field>
        </v-sheet>
      </v-sheet>
      <v-sheet class="material_card d-flex flex-column align-center">
        <v-sheet class="rounded-t" :class="getRarityClass(material_family.four_stars.rarity)">
          <v-img
            :src="`src/assets/Materials/${getMaterialFileName(material_family.four_stars.name)}.webp`"
            :width="50"
          >
          </v-img>
        </v-sheet>
        <v-sheet class="rounded-b" width="50px">
          <v-text-field
          class="centered_input"
            density="compact"
            variant="plain"
            v-model="four_stars_material_qty"
          ></v-text-field>
        </v-sheet>
      </v-sheet>
      <v-sheet class="material_card d-flex flex-column align-center">
        <v-sheet class="rounded-t" :class="getRarityClass(material_family.five_stars.rarity)">
          <v-img
            :src="`src/assets/Materials/${getMaterialFileName(material_family.five_stars.name)}.webp`"
            :width="50"
          >
          </v-img>
        </v-sheet>
        <v-sheet class="rounded-b" width="50px">
          <v-text-field
            class="centered_input"
            density="compact"
            variant="plain"
            v-model="five_stars_material_qty"
          ></v-text-field>
        </v-sheet>
      </v-sheet>
    </v-form>

    <v-card-actions>
      <v-btn
        text="Cancel"
        @click="emitCloseFamilyMaterialQtyForm()"
      ></v-btn>
      <v-btn
        text="Save"
        type="submit"
        @click="submit()"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
// stores
import { useFamilyMaterialStore } from '@/stores/family_material'
import { useInventoryStore } from '@/stores/inventory'

// utils
import getRarityClass from '@/utils/rarity_class'
import { getMaterialFileName } from '@/utils/planner_materials'

export default defineComponent({
  name: 'FamilyMaterialQtyForm',
  props: {
    material_family_id: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const family_material_store = useFamilyMaterialStore()
    const inventory_store = useInventoryStore()

    const material_family = family_material_store.getFamily(props.material_family_id)
    const two_stars_material = inventory_store.getInvMaterial(material_family.two_stars.id)
    const three_stars_material = inventory_store.getInvMaterial(material_family.three_stars.id)
    const four_stars_material = inventory_store.getInvMaterial(material_family.four_stars.id)
    const five_stars_material = inventory_store.getInvMaterial(material_family.five_stars.id)
    const two_stars_material_qty = ref(two_stars_material.quantity)
    const three_stars_material_qty = ref(three_stars_material.quantity)
    const four_stars_material_qty = ref(four_stars_material.quantity)
    const five_stars_material_qty = ref(five_stars_material.quantity)

    return {
      material_family,
      inventory_store,
      two_stars_material,
      three_stars_material,
      four_stars_material,
      five_stars_material,
      two_stars_material_qty,
      three_stars_material_qty,
      four_stars_material_qty,
      five_stars_material_qty,
    }
  },
  methods: {
    getRarityClass,
    getMaterialFileName,
    emitCloseFamilyMaterialQtyForm() {
      this.$emit('close_family_material_qty_form')
    },
    emitUpdates() {
      this.$emit('add_n_updates')
    },
    submit() {
      let materials_to_change: any = {}

      materials_to_change[this.two_stars_material.id] = this.two_stars_material_qty
      materials_to_change[this.three_stars_material.id] = this.three_stars_material_qty
      materials_to_change[this.four_stars_material.id] = this.four_stars_material_qty
      materials_to_change[this.five_stars_material.id] = this.five_stars_material_qty


      this.inventory_store.updateMaterialsQuantity(materials_to_change, false)
      this.inventory_store.resetForgedInventory()
      this.emitUpdates()
      this.emitCloseFamilyMaterialQtyForm()
    },
  }
})
</script>

<style scoped>
.centered_input >>> input {
  text-align: center;
}
</style>