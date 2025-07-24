<template>
  <div>
    <v-row class="mt-4" bg-color="grey-lighten-2">
        <v-data-table
          :headers="headers"
          :items="desplegables"
          hide-default-footer
          disable-pagination
        >
          <template v-slot:item.actions="{ item }">
            <v-btn-toggle>
              <v-btn
                justify="space-around"
                small
                icon="mdi-plus"
                v-tooltip="'Nuevo'"
                @click="nuevoDesplegable(item)"
              ></v-btn>

              <v-btn
                justify="space-around"
                small
                icon="mdi-file-remove"
                v-tooltip="'Borrar'"
                @click="eliminarDesplegable(item)"
              ></v-btn>
            </v-btn-toggle>
          </template>
        </v-data-table>
    </v-row>
  </div>
</template>

<script setup>
const props = defineProps({
  desplegables: Array,
});

const headers = [
  { title: "Desplegable", value: "valor" },
  { title: "Accion", value: "actions", sortable: false },
];

function nuevoDesplegable(item) {}

function eliminarDesplegable(item) {}

</script>

<style lang="scss" scoped></style>