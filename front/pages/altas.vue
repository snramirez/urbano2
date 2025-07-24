<template>
  <v-container class="mt-4">
    <v-tabs v-model="tab" bg-color="grey-lighten-2">
      <v-tab value="1"> Contratistas </v-tab>
      <v-tab value="2"> Estado Licitacion </v-tab>
      <v-tab value="3"> Tipo Licitacion </v-tab>
      <v-tab value="4"> Tipo Contratacion </v-tab>
      <v-tab value="5"> Estado Orden de Compra </v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="1">
        <v-card color="grey-lighten-2">
            <altas-contratistas
            :contratistas="contratistaStore.contratistas"  
            />
        </v-card>
    </v-tabs-window-item>
      <v-tabs-window-item value="2">
        <v-card color="grey-lighten-2">
            <altas-desplegables
            :desplegables="desplegablesStore.estadoLicitacion"  
            />
        </v-card>
      </v-tabs-window-item>
      <v-tabs-window-item value="3"> ventana tres </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useContratistaStore } from "~/stores/contratistaStore";
import { useDesplegablesStore } from "~/stores/desplegablesStore";

const contratistaStore = useContratistaStore();
contratistaStore.fetchContratistas();

const desplegablesStore = useDesplegablesStore();
desplegablesStore.fetchEstadoLicitacion();

const tab = ref(null);

</script>

<style lang="scss" scoped></style>
