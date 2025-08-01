<template>
  <div>
    <v-btn @click="addOC">Nueva Orden de Compra</v-btn>

    <v-expansion-panels v-model="panelOC" multiple>
      <v-expansion-panel v-for="(OC, index) in ordenes_compras" :key="index">
        <v-expansion-panel-title>
          Orden de Compra {{ index + 1 }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Numero de Orden"
                v-model="OC.num_orden"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="OC.tipo"
                :items="desplegablesStore.getEstadoOC()"
                label="Tipo Orden"
                required
                variant="outlined"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <currency-field
                label="Monto Original"
                v-model="OC.monto"
              ></currency-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="OC.destinatario"
                multiple
                chips
                :item-props="itemProps"
                :items="contratistas"
                label="Contratista"
                required
                variant="outlined"
              ></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-select
                v-model="OC.origen"
                :items="origenOC"
                label="Origen"
                required
                variant="outlined"
              ></v-select>
            </v-col>

            <v-col v-if="OC.origen === 'AMPLIATORIA'" cols="12" md="3">
              <v-select
                v-model="OC.ampliatoria_origen"
                :items="getAmpliatoria()"
                label="Ampliatoria origen"
                required
                clearable
                variant="outlined"
              ></v-select>
            </v-col>

            <v-col v-if="OC.origen === 'PRORROGA'" cols="12" md="3">
              <v-select
                v-model="OC.prorroga_origen"
                :items="getPrroroga()"
                label="Prorroga origen"
                required
                clearable
                variant="outlined"
              ></v-select>
            </v-col>

            <v-col v-if="OC.origen === 'RENGLON'" cols="12" md="3">
              <v-select
                v-model="OC.renglon_origen"
                :items="getRenglon()"
                label="Renglon origen"
                required
                clearable
                variant="outlined"
              ></v-select>
            </v-col>

            <v-col cols="12" md="3">
              <currency-field
                variant="outlined"
                :model-value="getMontoTotal(OC)"
                readonly
                label="Monto Total"
              ></currency-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <ampliatoria
                v-model:extensionData="OC.prorroga"
                titulo="Prorroga"
                tipo="PRORROGA"
              />
            </v-col>
            <v-col cols="6">
              <ampliatoria
                v-model:extensionData="OC.ampliatoria"
                titulo="Ampliatoria"
                tipo="AMPLIATORIA"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <ampliatoria
                v-model:extensionData="OC.redeterminacion"
                titulo="Redeterminación"
                tipo="REDETERMINACION"
              />
            </v-col>
            <v-col cols="6">
              <ampliatoria
                v-model:extensionData="OC.continuidad"
                titulo="Continuidad"
                tipo="CONTINUIDAD"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <control v-model:orden_compra="ordenes_compras[index]" />
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDesplegablesStore } from "~/stores/desplegablesStore";

const props = defineProps({
  contratistas: Array,
  renglones: Array,
});

const desplegablesStore = useDesplegablesStore();
desplegablesStore.fetchEstadoOC();

const ordenes_compras = defineModel("ordenes_compras");

const panelOC = ref([]);
const origenOC = ["RENGLON", "AMPLIATORIA", "PRORROGA", "REDETERMINACION", "CONTINUIDAD"];

function addOC() {
  ordenes_compras.value.push({
    num_orden: "",
    monto: 0,
    tipo: "",
    destinatario: null,
    origen: "",
    ampliatoria_origen: null,
    prorroga_origen: null,
    renglon_origen: null,
    prorroga: [],
    ampliatoria: [],
    redeterminacion: [],
    continuidad: [],
    control: [],
  });
}

function itemProps(item) {
  return {
    title: item.razon_social,
    subtitle: item.cuit,
  };
}

function getAmpliatoria() {
  let listAmp = [];
  ordenes_compras.value.forEach((OC) => {
    OC.ampliatoria.forEach((amp) => {
      listAmp.push(amp.acta);
    });
  });
  return listAmp;
}

function getPrroroga() {
  let listProrroga = [];
  ordenes_compras.value.forEach((OC) => {
    OC.prorroga.forEach((pro) => {
      listProrroga.push(pro.acta);
    });
  });
  return listProrroga;
}

function getRenglon() {
  let listRenglon = [];
  props.renglones.forEach((renglon) => listRenglon.push(renglon.descripcion));
  return listRenglon;
}

function getMontoTotal(orden) {
  let montoTotal = 0;
  orden.ampliatoria.forEach((amp) => (montoTotal += amp.monto));
  orden.prorroga.forEach((amp) => (montoTotal += amp.monto));
  orden.redeterminacion.forEach((amp) => (montoTotal += amp.monto));
  orden.continuidad.forEach((amp) => (montoTotal += amp.monto));
  montoTotal += orden.monto;
  return montoTotal;
}
</script>

<style lang="scss" scoped></style>
