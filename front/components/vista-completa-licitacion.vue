<template>
  <div>
    <v-row>
      <v-col align-self="end">
        <v-btn
          @click="close()"
          color="orange darken-1"
          prepend-icon="mdi-arrow-left"
          stacked
        >
          Volver
        </v-btn>
      </v-col>
    </v-row>
    <v-container class="">
      <v-card class="ma-2" cols="12">
        <v-card-title class="d-flex justify-center">Proceso</v-card-title>
        <v-row class="my-2 mx-2">
          <v-col cols="12" md="6">
            <v-list>
              <v-list-item title="Nombre">
                <v-list-item-subtitle
                  v-html="licitacion.nombre"
                  class="wrap-text"
                ></v-list-item-subtitle>
              </v-list-item>
              <v-list-item
                title="Numero Proceso"
                :subtitle="licitacion.num_proceso"
              ></v-list-item>
              <v-list-item
                title="Expediente"
                :subtitle="licitacion.expediente"
              ></v-list-item>
              <v-list-item
                title="Area"
                :subtitle="licitacion.area"
              ></v-list-item>
              <v-list-item
                title="Sub Area"
                :subtitle="licitacion.subarea"
              ></v-list-item>
              <v-list-item
                title="Firmante"
                :subtitle="licitacion.firmante"
              ></v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" md="6">
            <v-list>
              <v-list-item
                title="Modalidad"
                :subtitle="licitacion.modalidad"
              ></v-list-item>
              <v-list-item
                title="Tipo Contrato"
                :subtitle="licitacion.tipo_contrato"
              ></v-list-item>
              <v-list-item
                title="Estado"
                :subtitle="licitacion.estado"
              ></v-list-item>
              <v-list-item
                title="Plazo"
                :subtitle="licitacion.plazo"
              ></v-list-item>
              <v-list-item
                title="Inicio"
                :subtitle="format.formatDate(licitacion.inicio)"
              ></v-list-item>
              <v-list-item
                title="Vencimiento"
                :subtitle="format.formatDate(licitacion.vencimiento)"
              ></v-list-item>
              <v-list-item
                title="Monto"
                :subtitle="format.priceFormater(licitacion.monto)"
              ></v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="ma-2" cols="12">
        <v-card-title class="d-flex justify-center">Licitacion</v-card-title>
        <v-row class="my-2 mx-2">
          <v-col cols="6">
            <v-list>
              <v-list-item
                title="Ingresos de los Pliego"
                :subtitle="format.formatDate(licitacion.pliego_ingreso)"
              ></v-list-item>
              <v-list-item
                title="Egresos de los Pliegos"
                :subtitle="format.formatDate(licitacion.pliego_egreso)"
              ></v-list-item>
              <v-list-item
                title="Salida PG"
                :subtitle="format.formatDate(licitacion.salida_pg1)"
              ></v-list-item>
              <v-list-item
                title="Vuelta PG"
                :subtitle="format.formatDate(licitacion.vuelta_pg1)"
              ></v-list-item>
              <v-list-item
                title="Fecha de Llamado"
                :subtitle="format.formatDate(licitacion.fecha_llamado)"
              ></v-list-item>
              <v-list-item
                title="Apertura de Ofertas"
                :subtitle="format.formatDate(licitacion.apertura_ofertas)"
              ></v-list-item>
            </v-list>
          </v-col>

          <v-col cols="6">
            <v-list>
              <v-list-item
                title="Vencimiento Documentacion"
                :subtitle="format.formatDate(licitacion.fecha_vencimiento_doc)"
              ></v-list-item>
              <v-list-item
                title="Vencimiento Plazo Impugnacion"
                :subtitle="format.formatDate(licitacion.fecha_vencimiento_plazo_impugnacion)"
              ></v-list-item>
              <v-list-item
                title="Salida PG2"
                :subtitle="format.formatDate(licitacion.salida_pg2)"
              ></v-list-item>
              <v-list-item
                title="Vuelta PG2"
                :subtitle="format.formatDate(licitacion.vuelta_pg2)"
              ></v-list-item>
              <v-list-item
                title="Fecha Aprobatoria"
                :subtitle="format.formatDate(licitacion.fecha_aprobatoria)"
              ></v-list-item>
              <v-list-item
                title="Aprobatoria"
                :subtitle="licitacion.aprobatoria"
              ></v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="ma-2" cols="12">
        <tabs :renglones="licitacion.renglon" />
      </v-card>

      <v-card class="ma-2" cols="12">
        <v-card-title class="d-flex justify-center"
          >Todas las ofertas</v-card-title
        >
        <v-card-text>
          Por si se quiere ver todas las ofertas o ofertas por todo se van a ver
          aca
        </v-card-text>
      </v-card>

      <v-card class="ma-2" cols="12">
        <v-card-title class="d-flex justify-center"
          >Todas las orden de Compra van aca</v-card-title
        >
        <v-row v-for="(oc, index) in licitacion.orden_compra" :key="index">
          <v-col cols="12">
            <onlyOneOc :orden_compra="oc" />
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import format from "../utils/formatText";

const props = defineProps({
  licitacion: Object,
});

const emit = defineEmits(["cerrar"]);
function close() {
  emit("cerrar");
}
</script>

<style>
.wrap-text {
  -webkit-line-clamp: unset !important;
}
</style>
