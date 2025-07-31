<template>
  <v-snackbar v-model="show" :timeout="timeout" :color="color" elevation="3">
    <div>
      <strong>{{ title }}</strong>
      <div>{{ bodyText }}</div>
    </div>
  </v-snackbar>
</template>

<script setup>
import { ref, watch, defineProps, defineExpose } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  bodyText: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'primary'
  },
  timeout: {
    type: Number,
    default: 3000
  }
})

const show = defineModel('show')

defineExpose({ show })  // permite llamar `refAlert.value.show()` desde el padre
</script>