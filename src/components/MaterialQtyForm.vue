<template>
  <v-card>
    <v-card-title>
      {{ material.name }}
    </v-card-title>
    <v-form class="d-flex justify-center" @submit.prevent="submit">
      <v-sheet class="d-flex flex-column align-center">
        <v-sheet class="rounded-t" :class="getRarityClass(material.rarity)">
          <v-img
            :src="`src/assets/Materials/${getMaterialFileName(material.name)}.webp`"
            :width="50"
          >
          </v-img>
        </v-sheet>
        <v-sheet class="rounded-b" width="50px">
          <v-text-field
            class="centered_input"
            density="compact"
            variant="plain"
            v-model="material_qty"
          ></v-text-field>
        </v-sheet>
      </v-sheet>
    </v-form>

    <v-card-actions>
      <v-btn
        text="Cancel"
        @click="emitCloseMaterialQtyForm()"
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
import { useInventoryStore } from '@/stores/inventory'

// utils
import getRarityClass from '@/utils/rarity_class'
import { getMaterialFileName } from '@/utils/planner_materials'

export default defineComponent({
  name: 'MaterialQtyForm',
  props: {
    material_id: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const inventory_store = useInventoryStore()
    const material = inventory_store.getInvMaterial(props.material_id)
    const material_qty = ref(material.quantity)

    return {
      inventory_store,
      material,
      material_qty,
    }
  },
  methods: {
    getRarityClass,
    getMaterialFileName,
    emitCloseMaterialQtyForm() {
      this.$emit('close_material_qty_form')
    },
    emitUpdates() {
      this.$emit('add_n_updates')
    },
    submit() {
      let material_to_change: any = {}

      material_to_change[this.material.id] = this.material_qty

      this.inventory_store.updateMaterialsQuantity(material_to_change, false)
      this.inventory_store.resetForgedInventory()
      this.emitUpdates()
      this.emitCloseMaterialQtyForm()
    },
  }
})
</script>

<style scoped>
.centered_input >>> input {
  text-align: center;
}
</style>