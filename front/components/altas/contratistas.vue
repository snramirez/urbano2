<template>
  <div>
    <v-row class="mt-4" bg-color="grey-lighten-2">
        <v-data-table
          :headers="headers"
          :items="contratistas"
          hide-default-footer
          disable-pagination
        >
          <template v-slot:item.actions="{ item }">
            <v-btn-toggle>
              <v-btn
                justify="space-around"
                small
                icon="mdi-plus"
                v-tooltip="'Nuevo Contratista'"
                @click="nuevoContratista(item)"
              ></v-btn>

              <v-btn
                justify="space-around"
                small
                icon="mdi-pencil"
                v-tooltip="'Editar'"
                @click="verEdit(item)"
              ></v-btn>

              <v-btn
                justify="space-around"
                small
                icon="mdi-file-remove"
                v-tooltip="'Borrar'"
                @click="eliminarContratista(item)"
              ></v-btn>
            </v-btn-toggle>
          </template>
        </v-data-table>
    </v-row>
  </div>
</template>

<script setup>
const props = defineProps({
  contratistas: Array,
});

const headers = [
  { title: "Razon Social", value: "razon_social" },
  { title: "Cuit", value: "cuit" },
  { title: "Accion", value: "actions", sortable: false },
];

function nuevoContratista(item) {}

function eliminarContratista(item) {}

function verEdit(item) {}
</script>

<style lang="scss" scoped></style>
