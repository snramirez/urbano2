<template>
  <div>
    <v-dialog v-model="show" max-width="700">
      <v-card class="my-10 pa-5" max-width="700">
        <v-card-title class="d-flex justify-center pt-5">{{
          titulo
        }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-3">
          <v-form @submit.prevent="onSubmit">
            <v-row>
              <v-col cols="10">
                <v-select
                  v-model="beneficiario"
                  multiple
                  chips
                  :item-props="itemProps"
                  :items="contratistas"
                  label="Contratista"
                  required
                  variant="outlined"
                  ref="valorRef"
                />
              </v-col>
            </v-row>

            <v-row class="mt-8 mx-auto">
              <currency-field label="Oferta" v-model="monto_oferta" />
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-checkbox
                v-model="doc_legal"
                label="Documentación Legal"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" md="4">
                <v-checkbox
                v-model="doc_economica"
                label="Documentación Económica"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" md="4">
                <v-checkbox
                v-model="doc_tecnica"
                label="Documentación Técnica"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-row>
              <v-textarea
                v-model="observaciones"
                name="Observaciones"
                label="Observaciones"
                variant="outlined"
                auto-grow
                :counter="300"
              />
            </v-row>

            

            <v-btn color="success" type="submit" class="pa-2">{{
              botonTexto
            }}</v-btn>
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
  contratistas: Array,
});

const emit = defineEmits(['update'])

const show = defineModel("show");
const beneficiario = defineModel("beneficiario");
const monto_oferta = defineModel("monto_oferta");
const observaciones = defineModel("observaciones");
const doc_legal = defineModel("doc_legal");
const doc_economica = defineModel("doc_economica");
const doc_tecnica = defineModel("doc_tecnica");
const valorRef = ref(null);

// Observar cuando se abre el diálogo
watch(show, async (nuevoValor) => {
  if (nuevoValor) {
    await nextTick()
    valorRef.value?.focus()
  }
})


function onSubmit() {
  emit('update');
}

function itemProps(item) {
  return {
    title: item.razon_social,
    subtitle: item.cuit,
  };
}
</script>

<style lang="scss" scoped></style>
