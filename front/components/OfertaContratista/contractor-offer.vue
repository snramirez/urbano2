<template>
  <div>
    <v-container>
      <v-row>
        <v-btn
          @click="showAdd"
          justify="space-around"
          icon="mdi-plus"
          small
          v-tooltip="'Nueva Oferta'"
        ></v-btn>
        <h2>Ofertas</h2>
      </v-row>
      <v-row>
        <v-data-table
          :headers="headers"
          :items="ofertas"
          :row-props="itemRowBackground"
          hide-default-footer
          disable-pagination
          class="elevation-1"
        >
          <template v-slot:item.beneficiario="{ item }">
            <v-chip
              v-for="(contratista, index) in item.beneficiario"
              :key="index"
              size="small"
            >
              {{ contratista.razon_social }}
            </v-chip>
          </template>

          <template v-slot:item.monto_oferta="{ item }">
            <span>{{ format.priceFormater(item.monto_oferta) }}</span>
          </template>

          <template v-slot:item.doc_legal="{ item }">
            <div class="text-end">
              <v-icon
                :color="item.doc_legal ? 'green' : 'red'"
                :icon="item.doc_legal ? 'mdi-check-bold' : 'mdi-cancel'"
                size="large"
              >
              </v-icon>
            </div>
          </template>

          <template v-slot:item.doc_economica="{ item }">
            <div class="text-end">
              <v-icon
                :color="item.doc_economica ? 'green' : 'red'"
                :icon="item.doc_economica ? 'mdi-check-bold' : 'mdi-cancel'"
                size="large"
              >
              </v-icon>
            </div>
          </template>

          <template v-slot:item.doc_tecnica="{ item }">
            <div class="text-end">
              <v-icon
                :color="item.doc_tecnica ? 'green' : 'red'"
                :icon="item.doc_tecnica ? 'mdi-check-bold' : 'mdi-cancel'"
                size="large"
              >
              </v-icon>
            </div>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn-toggle>
              <v-btn
                justify="space-around"
                small
                icon="mdi-pencil"
                v-tooltip="'Editar'"
                @click="cargarEdit(item)"
              ></v-btn>

              <v-btn
                justify="space-around"
                small
                icon="mdi-file-remove"
                v-tooltip="'Borrar Oferta'"
                @click="borrarOferta(item)"
              ></v-btn>

              <v-btn
                justify="space-around"
                small
                icon="mdi-check-bold"
                v-tooltip="'Ganador Licitacion'"
                @click="ganador(item)"
              ></v-btn>

              <v-btn
                justify="space-around"
                small
                icon="mdi-close-thick"
                v-tooltip="'Borrar Ganador Licitacion'"
                @click="noGanador(item)"
              ></v-btn>
            </v-btn-toggle>
          </template>
        </v-data-table>
      </v-row>
    </v-container>

    <OfertaContratistaOfertaDialog
      titulo="Nueva Oferta"
      botonTexto="Agregar"
      @update="agregarOferta"
      v-model:show="addWindow"
      v-model:beneficiario="beneficiario"
      v-model:monto_oferta="monto_oferta"
      v-model:observaciones="observaciones"
      v-model:doc_legal="doc_legal"
      v-model:doc_economica="doc_economica"
      v-model:doc_tecnica="doc_tecnica"
      :contratistas="props.contratistas"
    />

    <OfertaContratistaOfertaDialog
      titulo="Editar Oferta"
      botonTexto="Editar"
      @update="editOferta"
      v-model:show="editWindow"
      v-model:beneficiario="beneficiario"
      v-model:monto_oferta="monto_oferta"
      v-model:observaciones="observaciones"
      v-model:doc_legal="doc_legal"
      v-model:doc_economica="doc_economica"
      v-model:doc_tecnica="doc_tecnica"
      :contratistas="props.contratistas"
    />
  </div>
</template>

<script setup>
import format from "../../utils/formatText";
import { ref, defineEmits, defineProps } from "vue";

const props = defineProps({
  contratistas: Array,
});

const ofertas = defineModel("ofertas");

const headers = [
  { title: "Razon Social", value: "beneficiario", align: "start"},
  { title: "Oferta", value: "monto_oferta" },
  { title: "Doc Legal", value: "doc_legal" },
  { title: "Doc Economica", value: "doc_economica", align: "center",},
  { title: "Doc Tecnica", value: "doc_tecnica", align: "center",  },
  { title: "Observaciones", value: "observaciones", align: "center",  },
  { title: "Accion", value: "actions", sortable: false },
];

const addWindow = ref(false);
const editWindow = ref(false);

const monto_oferta = ref(0);
const observaciones = ref("");
const beneficiario = ref([]);
const doc_legal = ref(false);
const doc_economica = ref(false);
const doc_tecnica = ref(false);
const editIndex = ref(-1);

function showAdd() {
  addWindow.value = !addWindow.value;
}

function showEdit() {
  editWindow.value = !editWindow.value;
}

function itemRowBackground(item) {
  return item.item.ganador ? { class: "style-1" } : { class: "" };
}

function agregarOferta() {
  ofertas.value.push({
    monto_oferta: monto_oferta.value,
    observaciones: observaciones.value,
    ganador: false,
    doc_legal: doc_legal.value,
    doc_economica: doc_economica.value,
    doc_tecnica: doc_tecnica.value,
    beneficiario: beneficiario.value,
  });
  showAdd();
  limpiarVista();
}

function limpiarVista() {
  monto_oferta.value = 0;
  observaciones.value = "";
  beneficiario.value = [];
  doc_economica.value = false;
  doc_legal.value = false;
  doc_tecnica.value = false;
}

function ganador(item) {
  ofertas.value.forEach((oferta) => {
    if (oferta._id === item._id) {
      oferta.ganador = true;
    }
  });
}

function noGanador(item) {
  ofertas.value.forEach((oferta) => {
    if (oferta._id === item._id) {
      oferta.ganador = false;
    }
  });
}

function cargarEdit(item) {
  showEdit();
  monto_oferta.value = item.monto_oferta;
  observaciones.value = item.observaciones;
  beneficiario.value = item.beneficiario;
  doc_legal.value = item.doc_legal;
  doc_economica.value = item.doc_economica;
  doc_tecnica.value = item.doc_tecnica;
  // Guardar el índice del elemento que se está editando
  editIndex.value = ofertas.value.indexOf(item);
}

function editOferta() {
  ofertas.value[editIndex.value] = {
    monto_oferta: monto_oferta.value,
    observaciones: observaciones.value,
    ganador: false,
    doc_legal: doc_legal.value,
    doc_economica: doc_economica.value,
    doc_tecnica: doc_tecnica.value,
    beneficiario: beneficiario.value,
  };
  showEdit();
  limpiarVista();
}

function borrarOferta(item) {
  const index = ofertas.value.indexOf(item);
  if (index !== -1) {
    ofertas.value.splice(index, 1);
  }
}
</script>

<style>
.style-1 {
  background-color: #3cff00;
}

.style-2 {
  background-color: rgb(18, 15, 196);
}
</style>
