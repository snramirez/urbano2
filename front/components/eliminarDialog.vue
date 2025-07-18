<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card>
      <v-card-title class="text-h6">{{ titulo }}</v-card-title>
      <v-card-text>{{ texto }}</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text @click="cancel">Cancelar</v-btn>
        <v-btn color="red" text @click="confirm">Eliminar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  titulo: { type: String, default: 'Confirmar eliminación' },
  texto: { type: String, default: '¿Estás seguro de que querés eliminar esto?' }
})

const emit = defineEmits(['confirm'])

const show = defineModel('show')

function close() {
  show.value = false
}

function cancel() {
  close()
}

function confirm() {
  close()
  emit('confirm')
}
</script>