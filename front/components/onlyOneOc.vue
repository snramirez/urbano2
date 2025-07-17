<template>
  <div>
    <v-card variant="tonal">
      <v-card class="mt-2 mx-4">
        <v-card-title>
          Progreso
          {{ ((montoDevengado() / getMontoTotal()) * 100).toFixed(2) }}%
        </v-card-title>
        <v-card-subtitle>Monto Total $ {{ getMontoTotal() }}</v-card-subtitle>
        <v-card-subtitle
          >Monto Devengado $ {{ montoDevengado() }}</v-card-subtitle
        >
      </v-card>
      <v-row class="my-2 mx-2">
        <v-col cols="12" md="6">
          <v-list>
            <v-list-item
              title="Numero Orden"
              :subtitle="orden_compra.num_orden"
            ></v-list-item>
            <v-list-item
              title="Tipo Orden"
              :subtitle="orden_compra.tipo"
            ></v-list-item>
            <v-list-item
              title="Monto Original"
              :subtitle="format.priceFormater(orden_compra.monto)"
            ></v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="6">
          <v-list>
            <v-list-item
              v-for="(item, index) in orden_compra.destinatario"
              :key="item"
            >
              <v-list-item-title
                >Destinatario {{ index + 1 }}</v-list-item-title
              >
              <v-list-item-subtitle class="wrap-text">
                <p>{{ item.razon_social }}</p>
                <p>{{ item.cuit }}</p>
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item
              title="Origen"
              :subtitle="orden_compra.origen"
            ></v-list-item>
            <v-list-item
              v-if="orden_compra.origen === 'RENGLON'"
              title="Renglon"
              :subtitle="orden_compra.renglon_origen"
            ></v-list-item>
            <v-list-item
              v-if="orden_compra.origen === 'PRORROGA'"
              title="Prorroga"
              :subtitle="orden_compra.prorroga_origen"
            ></v-list-item>
            <v-list-item
              v-if="orden_compra.origen === 'AMPLIATORIA'"
              title="Ampliatoria"
              :subtitle="orden_compra.ampliatoria_origen"
            ></v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row class="mt-2">
        <v-col cols="12" md="6">
          <v-card class="ml-4" title="Ampliatorias">
            <v-data-table
              :headers="headersExtension"
              :items="orden_compra.ampliatoria"
              hide-default-footer
            >
              <template v-slot:item.fecha="{ item }">
                <span>{{ format.formatDate(item.fecha) }}</span>
              </template>
            </v-data-table>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="mr-4" title="Prorrogas">
            <v-data-table
              :headers="headersExtension"
              :items="orden_compra.prorroga"
              hide-default-footer
            >
              <template v-slot:item.fecha="{ item }">
                <span>{{ format.formatDate(item.fecha) }}</span>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row class="mt-2">
        <v-col>
          <v-card class="my-4 mx-4" title="Control de Certificados">
            <v-data-table
              :headers="headers"
              :items="orden_compra.control"
              :row-props="itemRowBackground"
              hide-default-footer
            >
              <template v-slot:item.periodo="{ item }">
                <span>{{ format.formatDate(item.periodo) }}</span>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import format from "../utils/formatText";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  orden_compra: Object,
});

const headers = [
  { title: "Numero Certificado", value: "num_certificado" },
  { title: "Periodo", value: "periodo" },
  { title: "SPR", value: "SPR" },
  { title: "PRD", value: "PRD" },
  { title: "Monto Devengado", value: "monto_ejecutado" },
  { title: "Monto Pagado", value: "monto_pagado" },
  { title: "Estado", value: "estado" },
];

const headersExtension = [
  { title: "Acta", value: "acta" },
  { title: "Fecha", value: "fecha" },
  { title: "Monto", value: "monto" },
  { title: "Observacion", value: "observaciones" },
];

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
  props.orden_compra.control.forEach((certificado) => {
    certificado.estado == "DEVENGADO" || certificado.estado == "PAGADO"
      ? (monto += certificado.monto_ejecutado)
      : 0;
  });
  return monto;
}

function getMontoTotal() {
  let montoTotal = 0;
  props.orden_compra.ampliatoria.forEach((amp) => (montoTotal += amp.monto));
  montoTotal += props.orden_compra.monto;
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
