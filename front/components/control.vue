<template>
  <div>
    <v-container>
      <v-row>
        <h2>Certificados</h2>
      </v-row>
      <v-row>
        <v-btn
          @click="showAdd"
          justify="space-around"
          icon="mdi-plus"
          small
          v-tooltip="'Nuevo Control'"
        ></v-btn>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="d-flex justify-center"
              >Orden de Compra</v-card-title
            >
            <v-card-subtitle class="d-flex justify-center">
              {{ orden_compra.num_orden }}
            </v-card-subtitle>
            <v-divider></v-divider>
            <v-card-title
              >Progreso
              {{
                ((montoDevengado() / getMontoTotal()) * 100).toFixed(2)
              }}%</v-card-title
            >
            <v-card-subtitle
              >Monto Total $ {{ getMontoTotal() }}</v-card-subtitle
            >
            <v-card-subtitle
              >Monto Devengado $ {{ montoDevengado() }}</v-card-subtitle
            >
            <v-card-subtitle
              >Monto Pagado $ {{ montoPagado() }}</v-card-subtitle
            >

            <v-data-table
              :headers="headers"
              :items="orden_compra.control"
              :row-props="itemRowBackground"
              hide-default-footer
            >
              <template v-slot:item.periodo="{ item }">
                <span>{{ format.formatDate(item.periodo) }}</span>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn-toggle>
                  <v-btn
                    justify="space-around"
                    small
                    icon="mdi-pencil"
                    v-tooltip="'Editar'"
                    @click="cargarEdit(item)"
                  ></v-btn>

                  <v-btn
                    justify="space-around"
                    small
                    icon="mdi-file-remove"
                    v-tooltip="'Borrar Certificado'"
                    @click="borrarCertificado(item)"
                  ></v-btn>
                </v-btn-toggle>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <controlDialog
      titulo="Nuevo Certificado"
      botonTexto="Agregar"
      :selectEstados="selectEstados"
      @update="addOC"
      v-model:show="addWindow"
      v-model:num_certificado="num_certificado"
      v-model:periodo="periodo"
      v-model:SPR="SPR"
      v-model:PRD="PRD"
      v-model:monto_ejecutado="monto_ejecutado"
      v-model:monto_pagado="monto_pagado"
      v-model:estado="estado"
    />

    <controlDialog
      titulo="Editar Certificado"
      botonTexto="Editar"
      :selectEstados="selectEstados"
      @update="editOC"
      v-model:show="editWindow"
      v-model:num_certificado="num_certificado"
      v-model:periodo="periodo"
      v-model:SPR="SPR"
      v-model:PRD="PRD"
      v-model:monto_ejecutado="monto_ejecutado"
      v-model:monto_pagado="monto_pagado"
      v-model:estado="estado"
    />
  </div>
</template>

<script setup>
import format from "../utils/formatText";
import { ref, defineProps } from "vue";

const orden_compra = defineModel("orden_compra");

const addWindow = ref(false);
const editWindow = ref(false);
const num_certificado = ref("");
const periodo = ref(null);
const SPR = ref("");
const PRD = ref("");
const monto_ejecutado = ref(0);
const monto_pagado = ref(0);
const estado = ref("");
const editIndex = ref(-1);
const selectEstados = ref(["PAGADO", "NO DEVENGADO", "DEVENGADO"]);
const headers = [
  { title: "Numero Certificado", value: "num_certificado" },
  { title: "Periodo", value: "periodo" },
  { title: "SPR", value: "SPR" },
  { title: "PRD", value: "PRD" },
  { title: "Monto Devengado", value: "monto_ejecutado" },
  { title: "Monto Pagado", value: "monto_pagado" },
  { title: "Estado", value: "estado" },
  { title: "Accion", value: "actions", sortable: false },
];

function showAdd() {
  cleanView();
  addWindow.value = !addWindow.value;
}
function showEdit() {
  editWindow.value = !editWindow.value;
}
function addOC() {
  orden_compra.value.control.push({
    num_certificado: num_certificado.value,
    periodo: periodo.value,
    SPR: SPR.value,
    PRD: PRD.value,
    monto_ejecutado: monto_ejecutado.value,
    monto_pagado: monto_pagado.value,
    estado: estado.value,
  });

  cleanView();
  showAdd();
}

function cargarEdit(item) {
  cleanView();
  num_certificado.value = item.num_certificado;
  periodo.value = item.periodo;
  SPR.value = item.SPR;
  PRD.value = item.PRD;
  monto_ejecutado.value = item.monto_ejecutado;
  (monto_pagado.value = item.monto_pagado), (estado.value = item.estado);
  editIndex.value = orden_compra.value.control.indexOf(item);
  showEdit();
}

function editOC() {
  orden_compra.value.control[editIndex.value] = {
    num_certificado: num_certificado.value,
    periodo: periodo.value,
    SPR: SPR.value,
    PRD: PRD.value,
    monto_ejecutado: monto_ejecutado.value,
    monto_pagado: monto_pagado.value,
    estado: estado.value,
  };
  showEdit();
  cleanView();
}

function borrarCertificado(item) {
  let index = orden_compra.value.control.indexOf(item);
  orden_compra.value.control.splice(index, 1);
}

function cleanView() {
  num_certificado.value = "";
  periodo.value = null;
  SPR.value = "";
  PRD.value = "";
  monto_ejecutado.value = 0;
  monto_pagado.value = 0;
  estado.value = "";
}

function itemRowBackground(item) {
  return vencido(item) ? { class: "style-1" } : { class: "" };
}

function vencido(control) {
  let currentDate = new Date();
  if (
    new Date(control.item.periodo) < currentDate &&
    control.item.estado == "NO DEVENGADO"
  ) {
    return true;
  }
}

function montoDevengado() {
  let monto = 0;
  orden_compra.value.control.forEach((certificado) => {
    certificado.estado == "DEVENGADO" || certificado.estado == "PAGADO"
      ? (monto += certificado.monto_ejecutado)
      : 0;
  });
  return monto;
}

function montoPagado() {
  let monto = 0;
  orden_compra.value.control.forEach((certificado) => {
    certificado.estado == "PAGADO" ? (monto += certificado.monto_pagado) : 0;
  });
  return monto;
}

function getMontoTotal() {
  let montoTotal = 0;
  orden_compra.value.ampliatoria.forEach((amp) => (montoTotal += amp.monto));
  orden_compra.value.prorroga.forEach((amp) => (montoTotal += amp.monto));
  orden_compra.value.redeterminacion.forEach(
    (amp) => (montoTotal += amp.monto)
  );
  orden_compra.value.continuidad.forEach((amp) => (montoTotal += amp.monto));
  montoTotal += orden_compra.value.monto;
  return montoTotal;
}
</script>

<style>
.style-1 {
  background-color: #e57373;
}

.style-2 {
  background-color: rgb(114, 114, 67);
}
</style>
