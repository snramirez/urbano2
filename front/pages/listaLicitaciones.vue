<template>
  <div class="px-4 mt-4">
    <v-card title="Licitaciones" v-show="vistaLista">
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Busqueda"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      </template>

      <v-data-table
        :headers="headers"
        :items="licitacionStore.licitaciones"
        :search="search"
        fixed-header
        height="600px"
      >
        <template v-slot:item.inicio="{ item }">
          <span>{{ format.formatDate(item.inicio) }}</span>
        </template>
        <template v-slot:item.vencimiento="{ item }">
          <span>{{ format.formatDate(item.vencimiento) }}</span>
        </template>
        <template v-slot:item.monto="{ item }">
          <span>{{ format.priceFormater(item.monto) }}</span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn-toggle>
            <v-btn
              justify="space-around"
              x-small
              icon="mdi-pencil"
              v-tooltip="'Editar Licitacion'"
              @click="verEdit(item)"
            ></v-btn>

            <v-btn
              justify="space-around"
              x-small
              icon="mdi-file-remove"
              v-tooltip="'Borrar Licitacion'"
              @click="eliminarLicitacion(item)"
            ></v-btn>

            <v-btn
              justify="space-around"
              x-small
              icon="mdi-file-eye"
              v-tooltip="'Ver Licitacion'"
              @click="verLicitacion(item)"
            ></v-btn>
          </v-btn-toggle>
        </template>
      </v-data-table>
    </v-card>

    <vista-completa-licitacion
      @cerrar="verLista"
      v-show="vistaUno"
      :licitacion="unaLicitacion"
    />

    <cargaLicitacion
      v-show="vistaEdit"
      titulo="Editar Licitacion"
      textoBoton="Editar Licitacion"
      :botonVolver="true"
      :contratistas="contratistaStore.contratistas"
      v-model:licitacionActual="licitacionStore.licitacionActual"
      @onSubmit="editarLicitacion"
      @cerrar="verLista"
    />

    <eliminarDialog
      v-model:show="vistaEliminar"
      titulo="Eliminar Licitacion"
      texto="¿Estás seguro de que querés eliminar esta licitación?"
      @confirm="confirmarEliminacion"
    />

    <MensajeAlerta
      v-model:show="alertaEliminar"
      title="Licitación eliminada"
      bodyText="La licitación fue eliminada correctamente"
    />

    <MensajeAlerta
      v-model:show="alertaEdit"
      title="Licitación editada"
      bodyText="La licitación fue guardada correctamente"
    />
  </div>
</template>

<script setup>
//import datos from "../utils/data";
import format from "../utils/formatText";
import { useLicitacionStore } from "~/stores/licitacionStore";
import { useContratistaStore } from "~/stores/contratistaStore";
import { ref } from "vue";

const search = ref("");
//const licitaciones = datos.datos
const licitacionStore = useLicitacionStore();
licitacionStore.fetchLicitaciones();

const contratistaStore = useContratistaStore();
contratistaStore.fetchContratistas();

const unaLicitacion = ref({});
const vistaLista = ref(true);
const vistaUno = ref(false);
const vistaEdit = ref(false);
const vistaEliminar = ref(false);
const idDelete = ref("");
const alertaEliminar = ref(false);
const alertaEdit = ref(false);

const headers = [
  { title: "Nombre", key: "nombre" },
  { title: "N° Proceso", key: "num_proceso" },
  { title: "Expediente", key: "expediente" },
  { title: "Estado", key: "estado" },
  { title: "Inicio", key: "inicio" },
  { title: "Vencimiento", key: "vencimiento" },
  { title: "Monto", key: "monto" },
  { title: "Accion", key: "actions", sortable: false },
];

function eliminarLicitacion(licitacion) {
  console.log("Eliminar Licitacion", licitacion);
  vistaEliminar.value = true;
  idDelete.value = licitacion._id;
}

function confirmarEliminacion() {
  licitacionStore.deleteLicitacion(idDelete.value);
  vistaEliminar.value = false;
  idDelete.value = "";
  alertaEliminar.value = true;
}

function editarLicitacion() {
  let id = licitacionStore.licitacionActual._id;
  licitacionStore.updateLicitacion(id, licitacionStore.licitacionActual);
  licitacionStore.limpiarLicitacionActual();
  alertaEdit.value = true;
  verLista()
}

function verLicitacion(licitacion) {
  unaLicitacion.value = licitacion;
  vistaUno.value = true;
  vistaLista.value = false;
  vistaEdit.value = false;
}

function verLista() {
  vistaUno.value = false;
  vistaLista.value = true;
  vistaEdit.value = false;
}

function verEdit(licitacion) {
  licitacionStore.setLicitacionActual(licitacion);
  vistaUno.value = false;
  vistaLista.value = false;
  vistaEdit.value = true;
}
</script>

<style lang="scss" scoped></style>
