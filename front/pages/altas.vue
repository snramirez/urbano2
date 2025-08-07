<template>
  <v-card class="mt-4 mx-2">
    <v-toolbar color="primary" title="Desplegables"> </v-toolbar>
    <v-container class="mt-4 d-flex flex-row">
      <v-tabs
        v-model="tab"
        bg-color="grey-lighten-2"
        show-arrows
        direction="vertical"
      >
        <v-tab value="1"> Contratistas </v-tab>
        <v-tab value="2"> Estado Licitacion </v-tab>
        <v-tab value="3"> Tipo Licitacion </v-tab>
        <v-tab value="4"> Tipo Contratacion </v-tab>
        <v-tab value="5"> Estado Orden de Compra </v-tab>
        <v-tab value="6"> Area </v-tab>
        <v-tab value="7"> Sub Area </v-tab>
        <v-tab value="8"> Firmante </v-tab>
        <v-tab value="9"> Modalidad </v-tab>
        <v-tab value="10"> Sub Modalidad </v-tab>

        
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="1">
          <v-card color="grey-lighten-2" width="500px">
            <altas-contratistas
              :contratistas="contratistaStore.contratistas"
              titulo="Contratista"
              @addContratista="addContratista"
              @deleteContratista="deleteContratista"
              @editContratista="editContratista"
            />
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="2">
          <v-card color="grey-lighten-2" width="500px">
            <altas-desplegables
              :desplegables="desplegablesStore.estadoLicitacion"
              @addDesplegable="addEstadoLicitacion"
              @deleteDesplegable="deleteDesplegable"
              titulo="Estado Licitacion"
            />
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="3">
          <v-card color="grey-lighten-2" width="500px">
            <altas-desplegables
              :desplegables="desplegablesStore.tipoLicitacion"
              @addDesplegable="addTipoLicitacion"
              @deleteDesplegable="deleteDesplegable"
              titulo="Tipo Licitacion"
            />
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="4">
          <v-card color="grey-lighten-2" width="500px">
            <altas-desplegables
              :desplegables="desplegablesStore.tipoContratacion"
              @addDesplegable="addTipoContratacion"
              @deleteDesplegable="deleteDesplegable"
              titulo="Tipo Contratacion"
            />
          </v-card>
        </v-tabs-window-item>

        <v-tabs-window-item value="5">
          <v-card color="grey-lighten-2" width="500px">
            <altas-desplegables
              :desplegables="desplegablesStore.estadoOC"
              @addDesplegable="addEstadoOC"
              @deleteDesplegable="deleteDesplegable"
              titulo="Estado Orden de Compra"
            />
          </v-card>
        </v-tabs-window-item>

      <v-tabs-window-item value="6">
        <v-card color="grey-lighten-2" width="500px">
          <altas-desplegables
            :desplegables="desplegablesStore.area"
            @addDesplegable="addArea"
            @deleteDesplegable="deleteDesplegable"
            titulo="Area"
          />
        </v-card>
      </v-tabs-window-item>

      <v-tabs-window-item value="7">
        <v-card color="grey-lighten-2" width="500px">
          <altas-desplegables
            :desplegables="desplegablesStore.subArea"
            @addDesplegable="addSubArea"
            @deleteDesplegable="deleteDesplegable"
            titulo="Sub Area"
          />
        </v-card>
      </v-tabs-window-item>

      <v-tabs-window-item value="8">
        <v-card color="grey-lighten-2" width="500px">
          <altas-desplegables
            :desplegables="desplegablesStore.firmante"
            @addDesplegable="addFirmante"
            @deleteDesplegable="deleteDesplegable"
            titulo="Firmante"
          />
        </v-card>
      </v-tabs-window-item>

      <v-tabs-window-item value="9">
        <v-card color="grey-lighten-2" width="500px">
          <altas-desplegables
            :desplegables="desplegablesStore.modalidad"
            @addDesplegable="addModalidad"
            @deleteDesplegable="deleteDesplegable"
            titulo="Modalidad"
          />
        </v-card>
      </v-tabs-window-item>

      <v-tabs-window-item value="10">
        <v-card color="grey-lighten-2" width="500px">
          <altas-desplegables
            :desplegables="desplegablesStore.subModalidad"
            @addDesplegable="addSubModalidad"
            @deleteDesplegable="deleteDesplegable"
            titulo="Sub Modalidad"
          />
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>

      <MensajeAlerta
        v-model:show="showAlerta"
        :title="tituloAlerta"
        :bodyText="textoAlerta"
        :color="color"
      />
    </v-container>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useContratistaStore } from "~/stores/contratistaStore";
import { useDesplegablesStore } from "~/stores/desplegablesStore";

const contratistaStore = useContratistaStore();
contratistaStore.fetchContratistas();

const desplegablesStore = useDesplegablesStore();
desplegablesStore.fetchEstadoLicitacion();
desplegablesStore.fetchTipoLicitacion();
desplegablesStore.fetchTipoContratacion();
desplegablesStore.fetchEstadoOC();
desplegablesStore.fetchArea();
desplegablesStore.fetchSubArea();
desplegablesStore.fetchFirmante();
desplegablesStore.fetchModalidad();
desplegablesStore.fetchSubModalidad();


const tab = ref(null);
const showAlerta = ref(false);
const tituloAlerta = ref("");
const textoAlerta = ref("");
const color = ref("primary");

function addEstadoLicitacion(valor) {
  let desplegable = {
    valor: valor,
    tipo: "ESTADO_LIC",
  };
  desplegablesStore.createDesplegable(desplegable);
}

function addTipoLicitacion(valor) {
  let desplegable = {
    valor: valor,
    tipo: "TIPO_LIC",
  };
  desplegablesStore.createDesplegable(desplegable);
}

function addTipoContratacion(valor) {
  let desplegable = {
    valor: valor,
    tipo: "TIPO_CONTR",
  };
  desplegablesStore.createDesplegable(desplegable);
}

function addEstadoOC(valor) {
  let desplegable = {
    valor: valor,
    tipo: "ESTADO_OC",
  };
  desplegablesStore.createDesplegable(desplegable);
}

function addArea(valor) {
  let desplegable = {
    valor: valor,
    tipo: "AREA",
  };
  desplegablesStore.createDesplegable(desplegable);
}

function addSubArea(valor) {
  let desplegable = {
    valor: valor,
    tipo: "SUB_AREA",
  };
  desplegablesStore.createDesplegable(desplegable);
}

function addFirmante(valor) {
  let desplegable = {
    valor: valor,
    tipo: "FIRMANTE",
  };
  desplegablesStore.createDesplegable(desplegable);
}

function addModalidad(valor) {
  let desplegable = {
    valor: valor,
    tipo: "MODALIDAD",
  };
  desplegablesStore.createDesplegable(desplegable);
}

function addSubModalidad(valor) {
  let desplegable = {
    valor: valor,
    tipo: "SUB_MODALIDAD",
  };
  desplegablesStore.createDesplegable(desplegable);
}

function deleteDesplegable(id) {
  desplegablesStore.deleteDesplegable(id);
  tituloAlerta.value = "Desplegable eliminado";
  textoAlerta.value = "El desplegable fue eliminado correctamente";
  color.value = "error";
  showAlerta.value = true;
}

function editContratista(contratista) {
  contratistaStore.updateContratista(contratista._id, contratista);
  tituloAlerta.value = "Contratista Editado";
  textoAlerta.value = "El Contratista fue editado correctamente";
  showAlerta.value = true;
}

function addContratista(contratista) {
  contratistaStore.createContratista(contratista);
  tituloAlerta.value = "Nuevo Contratista";
  textoAlerta.value = "El Contratista fue agregado correctamente";
  showAlerta.value = true;
}

function deleteContratista(id) {
  contratistaStore.deleteContratista(id);
  tituloAlerta.value = "Contratista eliminado";
  textoAlerta.value = "El Contratista fue eliminado correctamente";
  color.value = "error";
  showAlerta.value = true;
}
</script>

<style lang="scss" scoped></style>
