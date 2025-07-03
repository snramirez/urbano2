<template>
  <div>
    <v-container>
      <v-row>
        <h2>{{ titulo }}</h2>
      </v-row>
      <v-row>
        <v-btn @click="showAdd" justify="space-around" icon="mdi-plus" small :v-tooltip="`Nueva ${titulo}`"></v-btn>
      </v-row>

      <v-row>
        <v-data-table :headers="headers" :items="extensionData" hide-default-footer disable-pagination class="elevation-1">
          <template v-slot:item.fecha="{ item }">
            <span>{{ format.formatDate(item.fecha) }}</span>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn-toggle>
              <v-btn justify="space-around" small icon="mdi-pencil" v-tooltip="'Editar'"
                @click="cargarEdit(item)"></v-btn>

              <v-btn justify="space-around" small icon="mdi-file-remove" v-tooltip="'Borrar'"
                @click="borrarAmpliatoria(item)"></v-btn>
            </v-btn-toggle>
          </template>

          <template v-slot:item.monto="{ item }">
            <span>{{ format.priceFormater(item.monto) }}</span>
          </template>
        </v-data-table>
      </v-row>
    </v-container>

    <extensionDialog
      :titulo="titulo"
      botonTexto="Agregar"
      @update="addExtension"
      v-model:show="addWindow"
      v-model:acta="acta"
      v-model:fecha="fecha"
      v-model:monto="monto"
    />

    <extensionDialog
      :titulo="titulo"
      botonTexto="Editar"
      @update="editExtension"
      v-model:show="editWindow"
      v-model:acta="acta"
      v-model:fecha="fecha"
      v-model:monto="monto"
    />
  </div>
</template>

<script setup>
import format from "../utils/formatText";
import { ref, toRef, computed } from 'vue'


const extensionData = defineModel("extensionData");

const headers = [
  //{ text: "id", value: "_id" },
  { title: "Acta", value: "acta" },
  { title: "Fecha", value: "fecha" },
  { title: "Monto", value: "monto" },
  { title: "Accion", value: "actions", sortable: false },
]

const addWindow = ref(false)
const editWindow = ref(false)
const acta = ref("")
const fecha = ref(null)
const monto = ref(0)
const editIndex = ref(-1)

const props = defineProps({
  titulo: String,
  tipo: String,
})

function showAdd() {
  cleanView();
  addWindow.value = !addWindow.value;
}

function showEdit() {
  editWindow.value = !editWindow.value;
}

//Hacerlo un emit como corresponde. 
function addExtension() {
  if (acta.value === "" && fecha.value === null && monto.value === 0) {
    return;
  }

   extensionData.value.push({
    tipo: props.tipo,
    acta: acta.value,
    fecha: fecha.value,
    monto: monto.value,
  });
  cleanView();
  showAdd();
}

function cargarEdit(item) {
  cleanView();
  acta.value = item.acta;
  fecha.value = item.fecha === null ? null : new Date(item.fecha);
  monto.value = item.monto;
  editIndex.value = extensionData.value.indexOf(item);
  showEdit()
}

function editExtension() {
  extensionData.value[editIndex.value] = {
    tipo: props.tipo,
    acta: acta.value,
    fecha: fecha.value,
    monto: monto.value,
  };
  
  showEdit();
  cleanView();
}

function borrarAmpliatoria(item) {
  let index = extensionData.value.indexOf(item);
  extensionData.value.splice(index, 1);
}

function cleanView() {
  acta.value = "";
  fecha.value = null;
  monto.value = 0;
}

</script>

<style lang="scss" scoped></style>
