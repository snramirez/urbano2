<template>
  <div>
    <v-container>
      <v-row>
        <h2>Ampliatoria</h2>
      </v-row>
      <v-row>
        <v-btn @click="showAdd" justify="space-around" icon="mdi-plus" small v-tooltip="'Nueva Ampliatoria'"></v-btn>
      </v-row>

      <v-row>
        <v-data-table :headers="headers" :items="ampliatoria" hide-default-footer disable-pagination class="elevation-1">
          <template v-slot:item.fecha="{ item }">
            <span>{{ format.formatDate(item.fecha) }}</span>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn-toggle>
              <v-btn justify="space-around" small icon="mdi-pencil" v-tooltip="'Editar'"
                @click="cargarEdit(item)"></v-btn>

              <v-btn justify="space-around" small icon="mdi-file-remove" v-tooltip="'Borrar Prorroga'"
                @click="borrarAmpliatoria(item)"></v-btn>
            </v-btn-toggle>
          </template>

          <template v-slot:item.monto="{ item }">
            <span>{{ format.priceFormater(item.monto) }}</span>
          </template>
        </v-data-table>
      </v-row>
    </v-container>

    <v-dialog v-model="addWindow" max-width="700">
      <v-card class="my-10 pa-5" max-width="700">
        <v-card-title class="d-flex justify-center pt-5">Nueva Ampliatoria</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-3">
          <v-form onSubmit="return false;" @submit="">
            <v-text-field v-model="acta" label="Acta Ampliatoria" variant="outlined"></v-text-field>

            <v-date-input v-model="fecha" label="Fecha Ampliatoria" prepend-icon="mdi-calendar" variant="outlined"
              clearable></v-date-input>

            <currency-field label="Monto" v-model="monto"></currency-field>

            <v-row class="mt-8 mx-auto">
              <v-btn color="success" class="pa-2" @click="addExtension()">Agregar</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editWindow" max-width="700">
      <v-card class="my-10 pa-5" max-width="700">
        <v-card-title class="d-flex justify-center pt-5">Editar Ampliatoria</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-3">
          <v-form onSubmit="return false;" @submit="">
            <v-text-field v-model="acta" label="Acta Ampliatoria" variant="outlined"></v-text-field>

            <v-date-input v-model="fecha" label="Fecha Ampliatoria" prepend-icon="mdi-calendar" variant="outlined"
              clearable></v-date-input>

            <currency-field label="Monto" v-model="monto"></currency-field>

            <v-row class="mt-8 mx-auto">
              <v-btn color="success" class="pa-2" @click="editExtension()">Agregar</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import format from "../utils/formatText";
import { ref, toRef, computed } from 'vue'


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
  ampliatoria: {
    type: Array,
    required: true,
  },
})

// Creamos una copia local y reactiva
const ampliatoriaLocal = ref([...props.ampliatoria])
const emit = defineEmits(['update:ampliatoria'])

function showAdd() {
  addWindow.value = !addWindow.value;
}

function showEdit() {
  editWindow.value = !editWindow.value;
}

//Hacerlo un emit como corresponde. 
function addExtension() {
  if (acta.value === "" || fecha.value === null || monto.value === 0) {
    return;
  }

  ampliatoriaLocal.value.push({
    acta: acta.value,
    fecha: fecha.value,
    monto: monto.value,
  });
  // Emitimos el evento para actualizar la lista de ampliatorias
  emit('update:ampliatoria', ampliatoriaLocal.value);
  cleanView();
  showAdd();
}

function cargarEdit(item) {
  showEdit();
  console.log(item);
  console.log(ampliatoriaLocal.value);
  acta.value = item.acta;
  fecha.value = new Date(item.fecha);
  monto.value = item.monto;
  editIndex.value = ampliatoriaLocal.value.indexOf(item);
}

function editExtension() {
  ampliatoriaLocal.value[editIndex.value] = {
    acta: acta.value,
    fecha: fecha.value,
    monto: monto.value,
  };
  // Emitimos el evento para actualizar la lista de ampliatorias 
  emit('update:ampliatoria', ampliatoriaLocal.value);
  showEdit();
  cleanView();
}

function borrarAmpliatoria(item) {
  let index = ampliatoriaLocal.value.indexOf(item);
  ampliatoriaLocal.value.splice(index, 1);
  // Emitimos el evento para actualizar la lista de ampliatorias
  emit('update:ampliatoria', ampliatoriaLocal.value);
}

function cleanView() {
  acta.value = "";
  fecha.value = null;
  monto.value = 0;
}

</script>

<style lang="scss" scoped></style>
