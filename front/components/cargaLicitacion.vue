<template>
  <v-container>
    <v-row>
      <v-col align-self="end">
        <v-btn
          @click="close()"
          v-show="botonVolver"
          color="orange darken-1"
          prepend-icon="mdi-arrow-left"
          stacked
        >
          Volver
        </v-btn>
      </v-col>
    </v-row>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-title> Proceso </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Nombre"
                v-model="licitacionActual.nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="N° Proceso"
                v-model="licitacionActual.num_proceso"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Expediente"
                v-model="licitacionActual.expediente"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Area"
                v-model="licitacionActual.area"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Sub Area"
                v-model="licitacionActual.subarea"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Firmante"
                v-model="licitacionActual.firmante"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Modalidad"
                v-model="licitacionActual.modalidad"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Tipo Contrato"
                v-model="licitacionActual.tipo_contrato"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Estado"
                v-model="licitacionActual.estado"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Plazo"
                v-model="licitacionActual.plazo"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Inicio"
                v-model="licitacionActual.inicio"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Finalizacion"
                v-model="licitacionActual.vencimiento"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title> Licitacion </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionActual.pliego_ingreso"
                label="Ingreso Pliego"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionActual.pliego_egreso"
                label="Egreso Pliego"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionActual.salida_pg1"
                label="Salida PG"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionActual.vuelta_pg1"
                label="Vuelta PG"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionActual.fecha_llamado"
                label="Fecha de Llamado"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionActual.apertura_ofertas"
                label="Apertura de Ofertas"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionActual.fecha_vencimiento_plazo_impugnacion"
                label="Vencimiento Plazo Impugnacion"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionActual.fecha_vencimiento_doc"
                label="Vencimiento Documentacion"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionActual.salida_pg2"
                label="Salida PG2"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionActual.vuelta_pg2"
                label="Vuelta PG2"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionActual.fecha_aprobatoria"
                label="Fecha Aprobatoria"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Aprobatoria"
                v-model="licitacionActual.aprobatoria"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider></v-divider>

    <RenglonCarga
      class="mt-4"
      v-model:renglones="licitacionActual.renglon"
      :contratistas="contratistas"
    />

    <v-divider></v-divider>

    <OrdenCompraCarga
      class="mt-4"
      v-model:ordenes_compras="licitacionActual.orden_compra"
      :contratistas="contratistas"
      :renglones="licitacionActual.renglon"
    />

    <v-divider></v-divider>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-btn color="primary" @click="accionBoton()">
          {{ textoBoton }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  titulo: String,
  textoBoton: String,
  contratistas: Array,
  botonVolver: { type: Boolean, default: false },

});

const panel = ref([]);
const licitacionActual = defineModel("licitacionActual");

const emit = defineEmits(["onSubmit", "cerrar"]);

function close() {
  emit("cerrar");
}

function accionBoton() {
  emit("onSubmit");
}
</script>

<style lang="scss" scoped></style>
