<template>
    <div>
        <v-row>
            <v-col align-self="end">
                <v-btn @click="close()" color="orange darken-1" prepend-icon="mdi-arrow-left" stacked>
                    Volver
                </v-btn>
            </v-col>
        </v-row>
        <v-container class="">
            <v-card class="ma-2" cols="12">
                <v-card-title class="d-flex justify-center">Proceso</v-card-title>
                <v-row class="my-2 mx-2">
                    <v-col cols="12" md="6">
                        <v-list>
                            <v-list-item title="Nombre">
                                <v-list-item-subtitle v-html="licitacion.nombre"
                                    class="wrap-text"></v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item title="Numero Proceso" :subtitle="licitacion.num_proceso"></v-list-item>
                            <v-list-item title="Expediente" :subtitle="licitacion.expediente"></v-list-item>
                            <v-list-item title="Area" :subtitle="licitacion.area"></v-list-item>
                            <v-list-item title="Modalidad" :subtitle="licitacion.modalidad"></v-list-item>
                        </v-list>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-list>
                            <v-list-item title="Tipo Contrato" :subtitle="licitacion.tipo_contrato"></v-list-item>
                            <v-list-item title="Estado" :subtitle="licitacion.estado"></v-list-item>
                            <v-list-item title="Plazo" :subtitle="licitacion.plazo"></v-list-item>
                            <v-list-item title="Inicio"
                                :subtitle="fortmatDate.formatDate(licitacion.inicio)"></v-list-item>
                            <v-list-item title="Vencimiento"
                                :subtitle="fortmatDate.formatDate(licitacion.vencimiento)"></v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card>

            <v-card class="ma-2" cols="12">
                <v-card-title class="d-flex justify-center">Licitacion</v-card-title>
                <v-row class="my-2 mx-2">
                    <v-col cols="6">
                        <v-list>
                            <v-list-item title="Ingresos de los Pliego"
                                :subtitle="fortmatDate.formatDate(licitacion.pliego_ingreso)"></v-list-item>
                            <v-list-item title="Egresos de los Pliegos"
                                :subtitle="fortmatDate.formatDate(licitacion.pliego_egreso)"></v-list-item>
                            <v-list-item title="Salida PG"
                                :subtitle="fortmatDate.formatDate(licitacion.salida_pg1)"></v-list-item>
                            <v-list-item title="Vuelta PG"
                                :subtitle="fortmatDate.formatDate(licitacion.vuelta_pg2)"></v-list-item>
                            <v-list-item title="Fecha de Llamado"
                                :subtitle="fortmatDate.formatDate(licitacion.fecha_llamado)"></v-list-item>
                            <v-list-item title="Apertura de Ofertas"
                                :subtitle="fortmatDate.formatDate(licitacion.apertura_ofertas)"></v-list-item>
                        </v-list>
                    </v-col>

                    <v-col cols="6">
                        <v-list>
                            <v-list-item title="Fecha Acta Preadjudicacion"
                                :subtitle="fortmatDate.formatDate(licitacion.fecha_acta_preadjudicacion)"></v-list-item>
                            <v-list-item title="Acta Preadjudicacion"
                                :subtitle="licitacion.acta_preadjudicacion"></v-list-item>
                            <v-list-item title="Salida PG2"
                                :subtitle="fortmatDate.formatDate(licitacion.salida_pg2)"></v-list-item>
                            <v-list-item title="Vuelta PG2"
                                :subtitle="fortmatDate.formatDate(licitacion.vuelta_pg2)"></v-list-item>
                            <v-list-item title="Fecha Aprobatoria"
                                :subtitle="fortmatDate.formatDate(licitacion.fecha_aprobatoria)"></v-list-item>
                            <v-list-item title="Aprobatoria" :subtitle="licitacion.aprobatoria"></v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card>

            <v-card class="ma-2" cols="12">
                <tabs :renglones="licitacion.renglon" />
            </v-card>

            <v-card class="ma-2" cols="12">
                <v-card-title class="d-flex justify-center">Todas las ofertas</v-card-title>
                <v-card-text>
                    Por si se quiere ver todas las ofertas o ofertas por todo se van a ver aca

                </v-card-text>
            </v-card>

            <v-card class="ma-2" cols="12">
                <v-card-title class="d-flex justify-center">Todas las orden de Compra van aca</v-card-title>
                <v-row v-for="(oc, index) in licitacion.orden_compra" :key="index">
                    <v-col cols="12">
                        <onlyOneOc :orden_compra="oc" />
                    </v-col>
                </v-row>
            </v-card>



        </v-container>
    </div>
</template>

<script>
import data from "../utils/data";
import format from "../utils/formatText";

export default {
    data() {
        return {
            tab: null,
            fortmatDate: format,
            allOC: []
        }
    },
    props: {
        licitacion: Object
    },
    methods: {
        close() {
            this.$emit("cerrar");
        },
    },
    computed: {
        getAllOC() {
            let oc = []
            this.licitacion.renglon.forEach(renglon => {
                oc.push(renglon.orden_compra)
                renglon.orden_compra.orden_compra.forEach(subOC => oc.push(subOC))
            });
            return oc
        }
    }
    // created() {
    //     this.allOC = this.getAllOC()
    // }
}
</script>

<style>
.wrap-text {
    -webkit-line-clamp: unset !important;
}
</style>