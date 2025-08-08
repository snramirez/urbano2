<template>
  <div>
    <v-container>
      <v-card flat v-show="viewTable">
        <v-card-title class="d-flex align-center pe-2">
          <v-text-field
            v-model="search"
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            flat
            hide-details
            single-line
          ></v-text-field>
        </v-card-title>

        <v-divider></v-divider>
        <v-data-table
          v-model:search="search"
          :headers="headers"
          :items="licitacionStore.licitaciones"
          show-expand
          hover
          class="border"
        >
          <template v-slot:expanded-row="{ columns, item }">
            <td :colspan="columns.length" class="pa-0">
              <v-row dense>
                <v-col cols="12" md="4">
                  <v-card
                    variant="elevated"
                    color="blue-grey-lighten-3"
                    title="Monto Total"
                    :subtitle="format.priceFormater(estadidistico.getMontoTotal(item))"
                  ></v-card>
                </v-col>

                <v-col cols="12" md="4">
                  <v-card
                    variant="elevated"
                    color="blue-grey-lighten-3"
                    title="Monto Total Devengado"
                    :subtitle="format.priceFormater(estadidistico.getMontoTotalDevengado(item))"
                    :text="(estadidistico.getMontoTotalDevengado(item) / estadidistico.getMontoTotal(item) * 100).toFixed(2) + '% Completado'"
                  ></v-card>
                </v-col>

                <v-col cols="12" md="4">
                  <v-card
                    variant="elevated"
                    color="blue-grey-lighten-3"
                    title="Monto Total Pagado"
                    :subtitle="format.priceFormater(estadidistico.getMontoTotalPagado(item))"
                    :text="(estadidistico.getMontoTotalPagado(item) / estadidistico.getMontoTotal(item) * 100).toFixed(2) + '% Completado'"
                  ></v-card>
                </v-col>
              </v-row>
            </td>
          </template>

          <template v-slot:item.inicio="{ item }">
            <span>{{ formatDate.formatDate(item.inicio) }}</span>
          </template>

          <template v-slot:item.vencimiento="{ item }">
            <span>{{ formatDate.formatDate(item.vencimiento) }}</span>
          </template>

          <template v-slot:item.devengados="{ item }">
            <div class="text-end">
              <v-chip
                :color="
                  estadidistico.devengadosPedientes(item) ? 'red' : 'green'
                "
                :text="
                  estadidistico.devengadosPedientes(item)
                    ? 'Vencidos'
                    : 'Al Dia'
                "
                class="text-uppercase"
                size="small"
                label
              >
              </v-chip>
            </div>
          </template>

          <template v-slot:item.pagos="{ item }">
            <div class="text-end">
              <v-chip
                :color="estadidistico.pagosPendientes(item) ? 'red' : 'green'"
                :text="
                  estadidistico.pagosPendientes(item) ? 'Vencidos' : 'Al Dia'
                "
                class="text-uppercase"
                size="small"
                label
              >
              </v-chip>
            </div>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn
              color="blue-lighten-4"
              icon="mdi-file-eye"
              @click="changeViewOC(item)"
            >
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-container>

    <viewOC :pliego="pliego" v-show="viewOrden" @close="closeView" />
  </div>
</template>

<script setup>
import { useLicitacionStore } from "~/stores/licitacionStore";
import format from "../utils/formatText";
import { useEstadidistico } from "~/utils/useEstadidistico";
import { ref } from "vue";

const search = ref("");
//const data = datos.datos;
const licitacionStore = useLicitacionStore();
licitacionStore.fetchLicitaciones();
const estadidistico = useEstadidistico();

const formatDate = format;
const pliego = ref({});
const viewOrden = ref(false);
const viewTable = ref(true);
const headers = [
  { title: "Nombre", key: "nombre" },
  { title: "N° Proceso", key: "num_proceso" },
  { title: "Estado", key: "estado" },
  { title: "Inicio", key: "inicio" },
  { title: "Vencimiento", key: "vencimiento" },
  { title: "Devengados", key: "devengados" },
  { title: "Pagados", key: "pagos" },
  { title: "Accion", key: "actions" },
];

//recorre el pliego y devuelve true si algun control con fecha vencida no fue ejecutado
function itsDue(item) {
  //si algun renglon tiene algun control vencido devuelve true.
  return item.orden_compra.some((orden) => {
    return orden.control.some(vencido);
  });
}

function vencido(control) {
  let currentDate = new Date();
  if (
    new Date(control.periodo) < currentDate &&
    control.estado != "DEVENGADO"
  ) {
    return true;
  }
}

function changeViewOC(item) {
  pliego.value = item;
  viewOrden.value = true;
  viewTable.value = false;
}

function closeView() {
  viewOrden.value = false;
  viewTable.value = true;
}
</script>

<style lang="scss" scoped></style>
