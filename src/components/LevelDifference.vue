<template>
  <div class="d-flex align-center">
    <p class="item-info-text py-1">{{ level }}</p>
    <v-icon
      icon="mdi-arrow-right-thin"
      size="small"
      v-if="level !== new_level"
    ></v-icon>
    <p
      class="item-info-text py-1"
      v-if="level !== new_level"
    >
      {{ new_level }}
    </p>
  </div>
</template>

<script lang=ts>
  export default defineComponent({
    name: 'LevelDifference',
    props: {
      level: {
        required: true,
        type: Number,
      },
      new_level: {
        required: true,
        type: Number,
      }
    }
  })
</script>
