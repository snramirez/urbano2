<template>
    <div>
        <v-container class="">
            <v-card class="ma-2 mt-4" cols="12">
                <v-card-title class="d-flex justify-center">Proceso</v-card-title>
                <v-row class="my-2 mx-2">
                    <v-col cols="12" md="6">
                        <v-list>
                            <v-list-item title="Nombre">
                                <v-list-item-subtitle v-html="data[1].nombre" class="wrap-text"></v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item title="Numero Proceso" :subtitle="data[1].num_proceso"></v-list-item>
                            <v-list-item title="Expediente" :subtitle="data[1].expediente"></v-list-item>
                            <v-list-item title="Area" :subtitle="data[1].area"></v-list-item>
                            <v-list-item title="Subarea" :subtitle="data[1].subarea"></v-list-item>
                            <v-list-item title="Firmante" :subtitle="data[1].firmante"></v-list-item>
                            <v-list-item title="Modalidad" :subtitle="data[1].modalidad"></v-list-item>
                        </v-list>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-list>
                            <v-list-item title="Tipo Contrato" :subtitle="data[1].tipo_contrato"></v-list-item>
                            <v-list-item title="Estado" :subtitle="data[1].estado"></v-list-item>
                            <v-list-item title="Plazo" :subtitle="data[1].plazo"></v-list-item>
                            <v-list-item title="Inicio"
                                :subtitle="fortmatDate.formatDate(data[1].inicio)"></v-list-item>
                            <v-list-item title="Vencimiento"
                                :subtitle="fortmatDate.formatDate(data[1].vencimiento)"></v-list-item>
                            <v-list-item title="Monto"
                                :subtitle="fortmatDate.priceFormater(data[1].monto)"></v-list-item>

                        </v-list>
                    </v-col>
                </v-row>
            </v-card>

            <v-card class="ma-2" cols="12">
                <v-card-title class="d-flex justify-center">Licitacion</v-card-title>
                <v-row class="my-2 mx-2">
                    <v-col cols="12" md="6">
                        <v-list>
                            <v-list-item title="Ingresos de los Pliego"
                                :subtitle="fortmatDate.formatDate(data[1].pliego_ingreso)"></v-list-item>
                            <v-list-item title="Egresos de los Pliegos"
                                :subtitle="fortmatDate.formatDate(data[1].pliego_egreso)"></v-list-item>
                            <v-list-item title="Salida PG"
                                :subtitle="fortmatDate.formatDate(data[1].salida_pg1)"></v-list-item>
                            <v-list-item title="Vuelta PG"
                                :subtitle="fortmatDate.formatDate(data[1].vuelta_pg1)"></v-list-item>
                            <v-list-item title="Fecha de Llamado"
                                :subtitle="fortmatDate.formatDate(data[1].fecha_llamado)"></v-list-item>
                            <v-list-item title="Apertura de Ofertas"
                                :subtitle="fortmatDate.formatDate(data[1].apertura_ofertas)"></v-list-item>
                        </v-list>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-list>
                            <v-list-item title="Vencimiento Plazo Impugnacion"
                                :subtitle="fortmatDate.formatDate(data[1].fecha_vencimiento_plazo_impugnacion)"></v-list-item>
                            <v-list-item title="Vencimiento de Documentacion"
                                :subtitle="fortmatDate.formatDate(data[1].fecha_vencimiento_doc)"></v-list-item>
                            <v-list-item title="Salida PG2"
                                :subtitle="fortmatDate.formatDate(data[1].salida_pg2)"></v-list-item>
                            <v-list-item title="Vuelta PG2"
                                :subtitle="fortmatDate.formatDate(data[1].vuelta_pg2)"></v-list-item>
                            <v-list-item title="Fecha Aprobatoria"
                                :subtitle="fortmatDate.formatDate(data[1].fecha_aprobatoria)"></v-list-item>
                            <v-list-item title="Aprobatoria" :subtitle="data[1].aprobatoria"></v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card>

            <v-card class="ma-2" cols="12">
                <tabs :renglones="data[1].renglon" />
            </v-card>

            <v-card class="ma-2" cols="12">
                <v-card-title class="d-flex justify-center">Todas las ofertas</v-card-title>
                <v-card-text>
                    Por si se quiere ver todas las ofertas o ofertas por todo se van a ver aca

                </v-card-text>
            </v-card>

            <v-card class="ma-2" cols="12">
                <v-card-title class="d-flex justify-center">Todas las orden de Compra van aca</v-card-title>
                <v-row v-for="(oc, index) in data[1].orden_compra" :key="index">
                    <v-col cols="12">
                        <onlyOneOc :orden_compra="oc" />
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<script setup>
import datos from "../utils/data";
import format from "../utils/formatText";
import { ref } from 'vue'

const tab = ref(null)
const data = datos.datos
const fortmatDate = format
const allOC = ref([])

// const props = defineProps({
//     licitacion: {
//         type: Object,
//         required: true
//     }
// })


// getAllOC() {
//     let oc = []
//     this.data[1].renglon.forEach(renglon => {
//         oc.push(renglon.orden_compra)
//         renglon.orden_compra.orden_compra.forEach(subOC => oc.push(subOC))
//     });
//     return oc
// }

// created() {
//     this.allOC = this.getAllOC()
// }

</script>

<style>
.wrap-text {
    -webkit-line-clamp: unset !important;
}
</style>