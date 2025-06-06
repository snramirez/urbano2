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
          :items="ofertasLocal"
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
      v-show="addWindow"
      titulo="Nueva Oferta"
      botonTexto="Agregar"
      @onSubmit="agregarOferta"
      v-model:beneficiario="beneficiario"
      v-model:monto_ofertado="monto_ofertado"
      v-model:observacion="observacion"
      :contratistas="props.contratistas"
    />

    <OfertaContratistaOfertaDialog
      v-show="editWindow"
      titulo="Editar Oferta"
      botonTexto="Editar"
      @onSubmit="editOferta"
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
  ofertas: Array,
});

const ofertasLocal = ref([...props.ofertas]);
const emit = defineEmits(["update:ofertas"]);

watch(
  ofertasLocal,
  (newVal) => {
    emit("update:oferta", newVal);
  },
  { deep: true }
);

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
  ofertasLocal.value.push({
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
  ofertasLocal.value.forEach((oferta) => {
    if (oferta._id === item._id) {
      oferta.ganador = true;
    }
  });
}

function noGanador(item) {
  ofertasLocal.value.forEach((oferta) => {
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
  editIndex.value = ofertasLocal.value.indexOf(item);
}

function editOferta() {
  ofertasLocal.value[editIndex.value] = {
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
  const index = ofertasLocal.value.indexOf(item);
  if (index !== -1) {
    ofertasLocal.value.splice(index, 1);
  }
}

// export default {
//   data() {
//     return {
//       headers: [
//         { title: "Razon Social", value: "beneficiario" },
//         { title: "Oferta", value: "monto_ofertado" },
//         // { title: "Diferencia %", value: "Porcentage" },
//         { title: "Observaciones", value: "observacion" },
//         { title: "Accion", value: "actions", sortable: false },
//       ],
//       addWindow: false,
//       editWindow: false,
//       monto_ofertado: 0,
//       observacion: "",
//       beneficiario: [],
//       editIndex: -1,
//       format: format,
//     };
//   },
//   props: {
//     contratistas: Array,
//     datostabla: Array,
//   },

//   methods: {
//     showAdd() {
//       this.addWindow = !this.addWindow;
//     },

//     showEdit() {
//       this.editWindow = !this.editWindow;
//     },

//     itemRowBackground(item) {
//       console.log(item.item.ganador);
//       return item.item.ganador ? { class: "style-1" } : { class: "" };
//     },
//     itemProps(item) {
//       return {
//         title: item.razon_social,
//         subtitle: item.cuit,
//       };
//     },
//     agregarOferta() {
//       this.datostabla.push({
//         monto_ofertado: this.monto_ofertado,
//         observacion: this.observacion,
//         ganador: false,
//         documentacion: true,
//         beneficiario: this.beneficiario,
//       });
//       this.showAdd();
//       this.limpiarVistaAgregar();
//     },

//     limpiarVistaAgregar() {
//       this.monto_ofertado = 0;
//       this.observacion = "";
//       this.beneficiario = [];
//     },

//     ganador(item) {
//       this.datostabla.forEach((element) => {
//         if (element._id === item._id) {
//           element.ganador = true;
//         }
//       });
//     },

//     noGanador(item) {
//       this.datostabla.forEach((element) => {
//         if (element._id === item._id) {
//           element.ganador = false;
//         }
//       });
//     },

//     cargarEdit(item) {
//       this.showEdit();
//       this.beneficiario = [];
//       this.monto_ofertado = item.monto_ofertado;
//       this.observacion = item.observacion;
//       this.beneficiario = item.beneficiario;
//       this.editIndex = this.datostabla.indexOf(item);
//     },

//     editOferta() {
//       this.datostabla[this.editIndex] = {
//         monto_ofertado: this.monto_ofertado,
//         observacion: this.observacion,
//         ganador: false,
//         documentacion: true,
//         beneficiario: this.beneficiario,
//       };
//       this.showEdit();
//       this.limpiarVistaAgregar();
//     },

//     borrarOferta(item) {
//       let index = this.datostabla.indexOf(item);
//       this.datostabla.splice(index, 1);
//     },
//   },
// };
</script>

<style>
.style-1 {
  background-color: #ffd500;
}

.style-2 {
  background-color: rgb(223, 35, 22);
}
</style>
