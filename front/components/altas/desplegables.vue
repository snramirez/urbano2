<template>
  <div>
    <div class="text-center mt-2 mb-4">
      <v-btn
        icon="mdi-plus"
        v-tooltip="`Nuevo ${titulo}`"
        variant="outlined"
        @click="showAdd"
      ></v-btn>
    </div>
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
              icon="mdi-file-remove"
              v-tooltip="'Borrar'"
              @click="showDelete(item)"
            ></v-btn>
          </v-btn-toggle>
        </template>
      </v-data-table>
    </v-row>

    <AltasDesplegablesDialog
      v-model:show="addView"
      v-model:valor="nuevoValor"
      :titulo="titulo"
      botonTexto="Agregar"
      @update="nuevoDesplegable"
    />

    <EliminarDialog
      v-model:show="deleteView"
      titulo="Eliminar Desplegable"
      texto="¿Estás seguro de que querés eliminar este desplegable?"
      @confirm="eliminarDesplegable()"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  desplegables: Array,
  titulo: String,
});

const emit = defineEmits(["addDesplegable", "deleteDesplegable"]);

const headers = [
  { title: "Desplegable", value: "valor" },
  { title: "Accion", value: "actions", sortable: false },
];

const addView = ref(false);
const deleteView = ref(false);
const nuevoValor = ref("");
const idDelete = ref(null);

function showAdd() {
  addView.value = true;
  nuevoValor.value = "";
}

function nuevoDesplegable() {
  emit("addDesplegable", nuevoValor.value);
  addView.value = false;
}

function showDelete(item) {
  deleteView.value = true;
  idDelete.value = item._id;
}

function eliminarDesplegable() {
  emit("deleteDesplegable", idDelete.value);
  deleteView.value = false;
}
</script>

<style lang="scss" scoped></style>
