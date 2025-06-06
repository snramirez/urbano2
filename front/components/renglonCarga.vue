<template>
  <div>
    <v-btn @click="addRenglon">Nuevo Renglon</v-btn>

    <v-expansion-panels v-model="panelRenglon" multiple>
      <v-expansion-panel
        v-for="(renglon, index) in renglonesLocal"
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
                :ofertas="renglon.oferta"
                @update:ofertas="(newOffers) => {
                  renglon.oferta = newOffers;
                  emit('update:renglones', renglonesLocal.value);
                }"
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
  },
  renglones: {
    type: Array,
    required: true,
  },
});

const panelRenglon = ref([])

// Creamos una copia local y reactiva
const renglonesLocal = ref([...props.renglones]);
const emit = defineEmits(["update:renglones"]);

function addRenglon() {
  renglonesLocal.value.push({
    descripcion: "",
    monto: 0,
    oferta: [],
  });

  emit("update:renglones", renglonesLocal.value);
}
</script>

<style lang=""></style>
