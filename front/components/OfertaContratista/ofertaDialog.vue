<template>
    <div>
        <v-dialog v-model="show" max-width="700">
            <v-card class="my-10 pa-5" max-width="700">
                <v-card-title class="d-flex justify-center pt-5">{{ titulo }}</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-3">
                    <v-form @submit.prevent="onSubmit">
                        <v-row>
                            <v-col cols="10">
                                <v-select v-model="beneficiario" multiple chips :item-props="itemProps"
                                    :items="contratistas" label="Contratista" required variant="outlined" />
                            </v-col>
                        </v-row>

                        <v-row class="mt-8 mx-auto">
                            <currency-field label="Oferta" v-model="monto_ofertado" />
                        </v-row>

                        <v-row>
                            <v-textarea v-model="observacion" name="Observaciones" label="Observaciones"
                                variant="outlined" auto-grow :counter="300" />
                        </v-row>

                        <v-btn color="success" @click="onSubmit" class="pa-2">{{ botonTexto }}</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    titulo: String,
    botonTexto: String,
    onSubmit: Function
})

const show = true
const beneficiario = defineModel('beneficiario')
const monto_ofertado = defineModel('monto_ofertado')
const observacion = defineModel('observacion')

function itemProps(item) {
  return {
    title: item.razon_social,
    subtitle: item.cuit
  }
}

</script>

<style lang="scss" scoped></style>