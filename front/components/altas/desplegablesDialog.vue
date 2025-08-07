<template>
  <div>
    <v-dialog v-model="show" max-width="500">
      <v-card class="my-10 pa-5" max-width="500">
        <v-card-title class="d-flex justify-center pt-5"
          >{{botonTexto}} {{ titulo }}</v-card-title
        >
        <v-divider></v-divider>
        <v-card-text class="pa-3">
          <v-form @submit.prevent="onSubmit">
            <v-text-field
              v-model="valor"
              ref="valorRef"
              :label="`Nuevo ${titulo}`"
              variant="outlined"
            ></v-text-field>

            <v-row class="mt-8 mx-auto">
              <v-btn type="submit" color="success" class="pa-2"
                >{{botonTexto}}</v-btn
              >
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const props = defineProps({
  titulo: String,
  botonTexto: String,
});

const emit = defineEmits(['update'])

const show = defineModel("show");
const valor = defineModel("valor");
const valorRef = ref(null);

// Observar cuando se abre el diálogo
watch(show, async (nuevoValor) => {
  if (nuevoValor) {
    await nextTick()
    valorRef.value?.focus()
  }
})

function onSubmit() {
  emit('update');
}


</script>

<style lang="scss" scoped></style>