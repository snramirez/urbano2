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
            >
              {{ contratista.razon_social }}
            </v-chip>
          </template>

          <template v-slot:item.monto_ofertado="{ item }">
            <span>{{ format.priceFormater(item.monto_ofertado) }}</span>
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
      v-model:monto_ofertado="monto_ofertado"
      v-model:observacion="observacion"
      :contratistas="props.contratistas"
    />

    <OfertaContratistaOfertaDialog
      titulo="Editar Oferta"
      botonTexto="Editar"
      @update="editOferta"
      v-model:show="editWindow"
      v-model:beneficiario="beneficiario"
      v-model:monto_ofertado="monto_ofertado"
      v-model:observacion="observacion"
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
  { title: "Razon Social", value: "beneficiario" },
  { title: "Oferta", value: "monto_ofertado" },
  { title: "Observaciones", value: "observacion" },
  { title: "Accion", value: "actions", sortable: false },
];

const addWindow = ref(false);
const editWindow = ref(false);
const monto_ofertado = ref(0);
const observacion = ref("");
const beneficiario = ref([]);
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
    monto_ofertado: monto_ofertado.value,
    observacion: observacion.value,
    ganador: false,
    documentacion: false,
    beneficiario: beneficiario.value,
  });
  showAdd();
  limpiarVista();
}

function limpiarVista() {
  monto_ofertado.value = 0;
  observacion.value = "";
  beneficiario.value = [];
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
  monto_ofertado.value = item.monto_ofertado;
  observacion.value = item.observacion;
  beneficiario.value = item.beneficiario;
  editIndex.value = ofertas.value.indexOf(item);
}

function editOferta() {
  ofertas.value[editIndex.value] = {
    monto_ofertado: monto_ofertado.value,
    observacion: observacion.value,
    ganador: false,
    documentacion: true,
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
  background-color: #ffd500;
}

.style-2 {
  background-color: rgb(223, 35, 22);
}
</style>
