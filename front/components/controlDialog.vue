<template>
  <div>
    <v-dialog v-model="show" max-width="700">
      <v-card class="my-10 pa-5" max-width="700">
        <v-card-title class="d-flex justify-center pt-5">{{
          titulo
        }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-3">
          <v-form onSubmit="return false;" @submit="">
            <v-text-field
              v-model="num_certificado"
              label="N° Certificado"
              variant="outlined"
            ></v-text-field>
            <v-date-input
              v-model="periodo"
              label="Periodo"
              prepend-icon="mdi-calendar"
              variant="outlined"
              clearable
            ></v-date-input>
            <v-text-field
              v-model="SPR"
              label="SPR"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              v-model="PRD"
              label="PRD"
              variant="outlined"
            ></v-text-field>
            <currency-field
              v-model="monto_ejecutado"
              label="Monto Devengado"
            ></currency-field>
            <currency-field
              v-model="monto_pagado"
              label="Monto Pagado"
            ></currency-field>
            <v-select
              v-model="estado"
              :items="selectEstados"
              label="Estado"
              variant="outlined"
            ></v-select>

            <v-row class="mt-8 mx-auto">
              <v-btn color="success" class="pa-2" @click="onSubmit()">{{
                botonTexto
              }}</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  titulo: String,
  botonTexto: String,
  selectEstados: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update'])

const num_certificado = defineModel("num_certificado");
const periodo = defineModel("periodo");
const SPR = defineModel("SPR");
const PRD = defineModel("PRD");
const monto_ejecutado = defineModel("monto_ejecutado");
const monto_pagado = defineModel("monto_pagado");
const estado = defineModel("estado");
const show = defineModel("show");

function onSubmit() {
  emit("update");
}
</script>

<style lang="scss" scoped></style>
