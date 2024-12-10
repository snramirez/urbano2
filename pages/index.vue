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
        <v-data-table v-model:search="search" :headers="headers" :items="data">
          <template v-slot:item.inicio="{ item }">
            <span>{{ formatDate.formatDate(item.inicio) }}</span>
          </template>

          <template v-slot:item.vencimiento="{ item }">
            <span>{{ formatDate.formatDate(item.vencimiento) }}</span>
          </template>

          <template v-slot:item.certificado="{ item }">
            <div class="text-end">
              <v-chip
                :color="itsDue(item) ? 'red' : 'green'"
                :text="itsDue(item) ? 'Pagos vencidos' : 'Pagos al Dia'"
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

  <viewOC 
  :pliego="pliego"
  v-show="viewOC"
  @close="closeView"
  />
  </div>
</template>

<script>
import data from "../utils/data";
import format from "../utils/formatText";

export default {
  data() {
    return {
      search: "",
      data: data.datos,
      formatDate: format,
      pliego:{},
      viewOC: false,
      viewTable: true,
      headers: [
        { title: "Nombre", value: "nombre" },
        { title: "N° Proceso", value: "num_proceso" },
        { title: "Estado", value: "estado" },
        { title: "Inicio", value: "inicio" },
        { title: "Vencimiento", value: "vencimiento" },
        { title: "Certificado", value: "certificado" },
        { title: "Accion", value: "actions" },
      ],
    };
  },
  methods: {
    //recorre el pliego y devuelve true si algun control con fecha vencida no fue ejecutado
    itsDue(pliego) {
      //si algun renglon tiene algun control vencido devuelve true.
      return pliego.orden_compra.some((orden) => {
        return orden.control.some(this.vencido);
      });
    },

    vencido(control) {
      let currentDate = new Date();
      if (
        new Date(control.periodo) < currentDate &&
        control.estado != "EJECUTADO"
      ) {
        return true;
      }
    },

    changeViewOC(pliego){
      this.pliego = pliego
      this.viewOC = true
      this.viewTable = false
    },

    closeView(){
      this.viewOC = false
      this.viewTable = true
    }
  },
};
</script>

<style lang="scss" scoped></style>
