<template>
  <div>
    <v-btn @click="addRenglon">Nuevo Renglon</v-btn>

    <v-expansion-panels v-model="panelRenglon" multiple>
      <v-expansion-panel
        v-for="(renglon, index) in renglones"
        :key="index"
      >
        <v-expansion-panel-title>
          Renglon {{ index + 1 }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="renglon.descripcion"
                label="Descripcion"
                variant="outlined"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <currency-field
                v-model="renglon.monto"
                label="Monto"
              ></currency-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <OfertaContratistaContractorOffer
                :contratistas="contratistas"
                v-model:ofertas="renglon.oferta"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>


<script setup>
import { ref } from "vue";

const props = defineProps({
  contratistas: {
    type: Array,
    required: true,
  }
});

const panelRenglon = ref([])
const renglones = defineModel("renglones");


function addRenglon() {
  renglones.value.push({
    descripcion: "",
    monto: 0,
    oferta: [],
  });
}
</script>

<style lang=""></style>
