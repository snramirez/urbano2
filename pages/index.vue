<template>
  <div>
    <v-container>
      <v-card flat>
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
              <span>{{formatDate.formatDate(item.inicio)}}</span>
            </template>
            <template v-slot:item.vencimiento="{ item }">
              <span>{{formatDate.formatDate(item.vencimiento)}}</span>
            </template>
        </v-data-table>


      </v-card>
    </v-container>
  </div>
</template>

<script>
import Data from "../utils/data";
import format from "../utils/formatText";

export default {
  data() {
    return {
      search: "",
      data: Data,
      formatDate: format,
      headers: [
        { title: "Nombre", value: "nombre" },
        { title: "N° Proceso", value: "num_proceso" },
        { title: "Estado", value: "estado" },
        { title: "Inicio", value: "inicio" },
        { title: "Vencimiento", value: "vencimiento" },
        { title: "Certificado", value: "" },
      ],

      items: [
        {
          name: "Nebula GTX 3080",
          image: "1.png",
          price: 699.99,
          rating: 5,
          stock: true,
        },
        {
          name: "Galaxy RTX 3080",
          image: "2.png",
          price: 799.99,
          rating: 4,
          stock: false,
        },
        {
          name: "Orion RX 6800 XT",
          image: "3.png",
          price: 649.99,
          rating: 3,
          stock: true,
        },
        {
          name: "Vortex RTX 3090",
          image: "4.png",
          price: 1499.99,
          rating: 4,
          stock: true,
        },
        {
          name: "Cosmos GTX 1660 Super",
          image: "5.png",
          price: 299.99,
          rating: 4,
          stock: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
