<template>
  <div>
    <v-dialog v-model="show" max-width="700">
      <v-card class="my-10 pa-5" max-width="700">
        <v-card-title class="d-flex justify-center pt-5"
          >{{botonTexto}} {{ titulo }}</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="pa-3">
          <v-form>
            <v-text-field
              v-model="acta"
              :label="`Acta ${titulo}`"
              variant="outlined"
            ></v-text-field>

            <v-date-input
              v-model="fecha"
              :label="`Fecha ${titulo}`"
              prepend-icon="mdi-calendar"
              variant="outlined"
              clearable
            ></v-date-input>

            <currency-field label="Monto" v-model="monto"></currency-field>

            <v-row class="mt-8 mx-auto">
              <v-btn color="success" class="pa-2" @click="onSubmit()"
                >{{botonTexto}}</v-btn
              >
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
});

const emit = defineEmits(['update'])

const show = defineModel("show");
const acta = defineModel("acta");
const fecha = defineModel("fecha");
const monto = defineModel("monto");

function onSubmit() {
  emit('update');
}


</script>

<style lang="scss" scoped></style>
