<template>
  <v-container>
    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel>
        <v-expansion-panel-title> Proceso </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Nombre"
                v-model="licitacionStore.licitacionActual.nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="N° Proceso"
                v-model="licitacionStore.licitacionActual.num_proceso"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Expediente"
                v-model="licitacionStore.licitacionActual.expediente"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Area"
                v-model="licitacionStore.licitacionActual.area"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Sub Area"
                v-model="licitacionStore.licitacionActual.subarea"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Firmante"
                v-model="licitacionStore.licitacionActual.firmante"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Modalidad"
                v-model="licitacionStore.licitacionActual.modalidad"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Tipo Contrato"
                v-model="licitacionStore.licitacionActual.tipo_contrato"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Estado"
                v-model="licitacionStore.licitacionActual.estado"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Plazo"
                v-model="licitacionStore.licitacionActual.plazo"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Inicio"
                v-model="licitacionStore.licitacionActual.inicio"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                variant="outlined"
                label="Finalizacion"
                v-model="licitacionStore.licitacionActual.vencimiento"
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
                v-model="licitacionStore.licitacionActual.pliego_ingreso"
                label="Ingreso Pliego"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionStore.licitacionActual.pliego_egreso"
                label="Egreso Pliego"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionStore.licitacionActual.salida_pg1"
                label="Salida PG"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionStore.licitacionActual.vuelta_pg1"
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
                v-model="licitacionStore.licitacionActual.fecha_llamado"
                label="Fecha de Llamado"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionStore.licitacionActual.apertura_ofertas"
                label="Apertura de Ofertas"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionStore.licitacionActual.fecha_vencimiento_plazo_impugnacion"
                label="Vencimiento Plazo Impugnacion"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionStore.licitacionActual.fecha_vencimiento_doc"
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
                v-model="licitacionStore.licitacionActual.salida_pg2"
                label="Salida PG2"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionStore.licitacionActual.vuelta_pg2"
                label="Vuelta PG2"
                prepend-icon="mdi-calendar"
                variant="outlined"
                clearable
              ></v-date-input>
            </v-col>
            <v-col cols="12" md="3">
              <v-date-input
                v-model="licitacionStore.licitacionActual.fecha_aprobatoria"
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
                v-model="licitacionStore.licitacionActual.aprobatoria"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-divider></v-divider>

    <RenglonCarga
      class="mt-4"
      v-model:renglones="licitacionStore.licitacionActual.renglon"
      :contratistas="contratistaStore.contratistas"
    />

    <v-divider></v-divider>

    <OrdenCompraCarga
      class="mt-4"
      v-model:ordenes_compras="licitacionStore.licitacionActual.orden_compra"
      :contratistas="contratistaStore.contratistas"
      :renglones="licitacionStore.licitacionActual.renglon"
    />
  </v-container>
</template>

<script setup>
//import datos from "../utils/data.licitacionActual";
import { useLicitacionStore } from  "~/stores/licitacionStore";
import { useContratistaStore } from "~/stores/contratistaStore";
import { ref } from "vue";

const panel = ref([]);
//const data = ref(datos.data);
const licitacionStore = useLicitacionStore();

const contratistaStore = useContratistaStore()
contratistaStore.fetchContratistas()

</script>

<style lang="scss" scoped></style>
