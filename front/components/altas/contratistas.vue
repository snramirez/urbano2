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
        :items="contratistas"
        hide-default-footer
        disable-pagination
      >
        <template v-slot:item.actions="{ item }">
          <v-btn-toggle>
            <v-btn
              justify="space-around"
              small
              icon="mdi-pencil"
              v-tooltip="'Editar'"
              @click="showEdit(item)"
            ></v-btn>

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

    <altas-contratistas-dialog
      v-model:show="addView"
      v-model:razon_social="razon_social"
      v-model:cuit="cuit"
      :titulo="titulo"
      botonTexto="Agregar"
      @update="nuevoContratista"
    />

    <altas-contratistas-dialog
      v-model:show="editView"
      v-model:razon_social="razon_social"
      v-model:cuit="cuit"
      :titulo="titulo"
      botonTexto="Editar"
      @update="editarContratista"
    />

    <EliminarDialog
      v-model:show="deleteView"
      titulo="Eliminar Contratista"
      texto="¿Estás seguro de que querés eliminar este Contratista?"
      @confirm="eliminarContratista()"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  contratistas: Array,
  titulo: String,
});

const emit = defineEmits(["addContratista", "deleteContratista", "editContratista"]);

const headers = [
  { title: "Razon Social", value: "razon_social" },
  { title: "Cuit", value: "cuit" },
  { title: "Accion", value: "actions", sortable: false },
];

const addView = ref(false);
const deleteView = ref(false);
const editView = ref(false);
const razon_social = ref("");
const cuit = ref("");
const idDelete = ref(null);
const idEdit = ref(null);

function showAdd() {
  addView.value = true;
  razon_social.value = "";
  cuit.value = "";
}

function showDelete(item) {
  deleteView.value = true;
  idDelete.value = item._id;
}

function showEdit(item) {
  razon_social.value = item.razon_social;
  cuit.value = item.cuit;
  idEdit.value = item._id;
  editView.value = true;
}

function nuevoContratista(item) {
  emit("addContratista", {
    razon_social: razon_social.value,
    cuit: cuit.value,
  });
  addView.value = false;
}

function editarContratista() {
  emit("editContratista", {
    _id: idEdit.value,
    razon_social: razon_social.value,
    cuit: cuit.value,
  });
  editView.value = false;
}

function eliminarContratista(item) {
  emit("deleteContratista", idDelete.value);
  deleteView.value = false;
}

function verEdit(item) {}
</script>

<style lang="scss" scoped></style>
