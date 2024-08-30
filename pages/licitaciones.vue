<template>
    <div>
        <v-container class="">
            <v-card cols="12">
                <v-card-title class="d-flex justify-center">Proceso</v-card-title>
                <v-row class="my-2 mx-2">
                    <v-col cols="12" md="6">
                        <v-list lines="two">
                            <v-list-item
                            title="Nombre"
                            :subtitle="data[0].nombre"
                            ></v-list-item>
                            <v-list-item
                            title="Numero Proceso"
                            :subtitle="data[0].num_proceso"
                            ></v-list-item>
                            <v-list-item
                            title="Expediente"
                            :subtitle="data[0].expediente"
                            ></v-list-item>
                            <v-list-item
                            title="Area"
                            :subtitle="data[0].area"
                            ></v-list-item>
                            <v-list-item
                            title="Modalidad"
                            :subtitle="data[0].modalidad"
                            ></v-list-item>
                        </v-list>
                    </v-col>
                    
                    <v-col cols="12" md="6">
                        <v-list lines="two">
                            <v-list-item
                            title="Tipo Contrato"
                            :subtitle="data[0].tipo_contrato"
                            ></v-list-item>
                            <v-list-item
                            title="Estado"
                            :subtitle="data[0].estado"
                            ></v-list-item>
                            <v-list-item
                            title="Plazo"
                            :subtitle="data[0].plazo"
                            ></v-list-item>
                            <v-list-item
                            title="Inicio"
                            :subtitle="fortmatDate.formatDate(data[0].inicio)"
                            ></v-list-item>
                            <v-list-item
                            title="Vencimiento"
                            :subtitle="fortmatDate.formatDate(data[0].vencimiento)"
                            ></v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card>

            <v-card cols="12">
                <v-card-title class="d-flex justify-center">Licitacion</v-card-title>
                <v-row class="my-2 mx-2">
                    <v-col cols="6">
                        <v-list lines="two">
                            <v-list-item
                            title="Ingresos de los Pliego"
                            :subtitle="fortmatDate.formatDate(data[0].pliego_ingreso)"
                            ></v-list-item>
                            <v-list-item
                            title="Egresos de los Pliegos"
                            :subtitle="fortmatDate.formatDate(data[0].pliego_egreso)"
                            ></v-list-item>
                            <v-list-item
                            title="Salida PG"
                            :subtitle="fortmatDate.formatDate(data[0].salida_pg1)"
                            ></v-list-item>
                            <v-list-item
                            title="Vuelta PG"
                            :subtitle="fortmatDate.formatDate(data[0].vuelta_pg2)"
                            ></v-list-item>
                            <v-list-item
                            title="Fecha de Llamado"
                            :subtitle="fortmatDate.formatDate(data[0].fecha_llamado)"
                            ></v-list-item>
                            <v-list-item
                            title="Apertura de Ofertas"
                            :subtitle="fortmatDate.formatDate(data[0].apertura_ofertas)"
                            ></v-list-item>
                        </v-list>
                    </v-col>

                    <v-col cols="6">
                        <v-list lines="two">
                            <v-list-item
                            title="Fecha Acta Preadjudicacion"
                            :subtitle="fortmatDate.formatDate(data[0].fecha_acta_preadjudicacion)"
                            ></v-list-item>
                            <v-list-item
                            title="Acta Preadjudicacion"
                            :subtitle="data[0].acta_preadjudicacion"
                            ></v-list-item>
                            <v-list-item
                            title="Salida PG2"
                            :subtitle="fortmatDate.formatDate(data[0].salida_pg2)"
                            ></v-list-item>
                            <v-list-item
                            title="Vuelta PG2"
                            :subtitle="fortmatDate.formatDate(data[0].vuelta_pg2)"
                            ></v-list-item>
                            <v-list-item
                            title="Fecha Aprobatoria"
                            :subtitle="fortmatDate.formatDate(data[0].fecha_aprobatoria)"
                            ></v-list-item>
                            <v-list-item
                            title="Aprobatoria"
                            :subtitle="data[0].aprobatoria"
                            ></v-list-item>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card>

            <v-card cols="12">
                <tabs :renglon="data[0].renglon"/>
            </v-card>

            <v-card cols="12">
                <v-card-title>Todas las ofertas</v-card-title>
                <v-card-text>
                    Por si se quiere ver todas las ofertas o ofertas por todo se van a ver aca

                </v-card-text>
            </v-card>

            <v-card cols="12">
                <v-card-title>Todas las orden de Compra van aca</v-card-title>
                <v-card-text>
                    <tabs/>
                </v-card-text>
            </v-card>

            

        </v-container>
    </div>
</template>

<script>
import Data from "../utils/data";
import format from "../utils/formatText";

export default {
    data() {
        return {
            tab: null,
            data: Data,
            fortmatDate: format,
        }
    },

}
</script>

<style lang="scss" scoped></style>