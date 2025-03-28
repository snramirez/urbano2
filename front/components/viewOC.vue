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
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <p class="text-h5 font-weight-medium p-4 mb-4">
              {{ pliego.nombre }}
            </p>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div v-for="(orden, index) in pliego.orden_compra" :key="index">
            <v-container>
              <!-- <p class="text-h5 font-weight-medium p-4 mb-4">
                Renglon: {{ renglon.descripcion }}
              </p> -->
              <v-card>
                <v-card-title>Orden de Compra</v-card-title>
                <v-card-subtitle>{{
                  orden.num_orden
                }}</v-card-subtitle>
                <v-data-table
                  :headers="headers"
                  :items="orden.control"
                  :row-props="itemRowBackground"
                >
                  <template v-slot:item.periodo="{ item }">
                    <span>{{ formatDate.formatDate(item.periodo) }}</span>
                  </template>
                </v-data-table>
              </v-card>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Data from "../utils/data";
import format from "../utils/formatText";

export default {
  data() {
    return {
      data: Data,
      formatDate: format,
      headers: [
        { title: "Numero Certificado", value: "num_certificado" },
        { title: "Periodo", value: "periodo" },
        { title: "SPR", value: "SPR" },
        { title: "PRD", value: "PRD" },
        { title: "Monto Ejecutado", value: "monto_ejecutado" },
        { title: "Estado", value: "estado" },
      ],
    };
  },
  props: {
    pliego: Object,
  },
  methods: {
    close() {
      this.$emit("close");
    },

    itemRowBackground(item) {
      return this.vencido(item) ? {class: "style-1"} : {class: ""};
    },

    vencido(control) {
      let currentDate = new Date();
      if ((new Date(control.item.periodo) < currentDate) && (control.item.estado != "EJECUTADO")){
        return true;
      }
    },
  },
};
</script>

<style>
.style-1 {
  background-color: #E57373;
}
.style-2 {
  background-color: rgb(114, 114, 67);
}
</style>
