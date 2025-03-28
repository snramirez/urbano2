<template>
  <div class="px-4">
    <v-card title="Licitaciones" v-show="lista">
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Busqueda"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      </template>

      <v-data-table :headers="headers" :items="licitaciones" :search="search">
        <template v-slot:item.inicio="{ item }">
          <span>{{ format.formatDate(item.inicio) }}</span>
        </template>
        <template v-slot:item.vencimiento="{ item }">
          <span>{{ format.formatDate(item.vencimiento) }}</span>
        </template>
        <template v-slot:item.monto="{ item }">
          <span>{{ format.priceFormater(item.monto) }}</span>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-btn-toggle>
              <v-btn
                justify="space-around"
                x-small
                icon="mdi-pencil"
                v-tooltip="'Editar Licitacion'"
              ></v-btn>

              <v-btn
                justify="space-around"
                x-small
                icon="mdi-file-remove"
                v-tooltip="'Borrar Licitacion'"
              ></v-btn>

              <v-btn
                justify="space-around"
                x-small
                icon="mdi-file-eye"
                v-tooltip="'Ver Licitacion'"
                @click="verLicitacion(item)"
              ></v-btn>

            </v-btn-toggle>
          </template>
      </v-data-table>
    </v-card>
    <vista-completa-licitacion @cerrar="verLista" v-show="vistaUno" :licitacion="unaLicitacion"/>

  </div>
</template>

<script>
import data from "../utils/data";
import format from "../utils/formatText";
export default {
  data() {
    return {
      search: "",
      licitaciones: data.datos,
      format: format,
      unaLicitacion: data.datos[0],
      lista: true,
      vistaUno: false,
      headers: [
        { title: "Nombre", key: "nombre" },
        { title: "N° Proceso", key: "num_proceso" },
        { title: "Expediente", key: "expediente" },
        { title: "Estado", key: "estado" },
        { title: "Inicio", key: "inicio" },
        { title: "Vencimiento", key: "vencimiento" },
        { title: "Monto", key: "monto" },
        { title: "Accion", key: "actions", sortable: false },
      ],
    };
  },

  methods:{
    verLicitacion(licitacion){
      this.unaLicitacion = licitacion
      this.vistaUno = true
      this.lista = false
    },

    verLista(){
      this.vistaUno = false
      this.lista = true
    },
  }
};
</script>

<style lang="scss" scoped></style>
