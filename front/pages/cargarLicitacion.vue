<template>
  <v-container>
    <MensajeAlerta
      v-model:show="showAlerta"
      title="Licitación creada"
      bodyText="La licitación fue guardada correctamente"
    />
    <cargaLicitacion 
      titulo="Crear Licitacion"
      textoBoton="Crear Licitacion"
      :contratistas="contratistaStore.contratistas"
      v-model:licitacionActual="licitacionStore.licitacionActual"
      @onSubmit="crearLicitacion"
    />
  </v-container>
</template>

<script setup>
//import datos from "../utils/data.licitacionActual";
import { useLicitacionStore } from "~/stores/licitacionStore";
import { useContratistaStore } from "~/stores/contratistaStore";
import { ref } from "vue";

const showAlerta = ref(false)
const panel = ref([]);
//const data = ref(datos.data);
const licitacionStore = useLicitacionStore();

const contratistaStore = useContratistaStore();
contratistaStore.fetchContratistas();

function crearLicitacion() {
  licitacionStore.createLicitacion(licitacionStore.licitacionActual);
  licitacionStore.limpiarLicitacionActual();
  showAlerta.value = true;
} 
</script>

<style lang="scss" scoped></style>
