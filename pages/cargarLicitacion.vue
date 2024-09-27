<template>
    <v-container>
        <v-expansion-panels v-model="panel" multiple>
            <v-expansion-panel>
                <v-expansion-panel-title>
                    Proceso
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-row>
                        <v-col cols="12" md="3">
                            <v-text-field variant="outlined" label="Nombre" v-model="data.nombre"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field variant="outlined" label="N° Proceso"
                                v-model="data.num_proceso"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field variant="outlined" label="Expediente"
                                v-model="data.expediente"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field variant="outlined" label="Area" v-model="data.area"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="3">
                            <v-text-field variant="outlined" label="Modalidad" v-model="data.modalidad"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field variant="outlined" label="Tipo Contrato"
                                v-model="data.tipo_contrato"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field variant="outlined" label="Estado" v-model="data.estado"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field variant="outlined" label="Plazo" v-model="data.plazo"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="3">
                            <v-text-field variant="outlined" label="Inicio" v-model="data.inicio"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field variant="outlined" label="Finalizacion"
                                v-model="data.vencimiento"></v-text-field>
                        </v-col>
                    </v-row>
                </v-expansion-panel-text>
            </v-expansion-panel>

            <v-expansion-panel>
                <v-expansion-panel-title>
                    Licitacion
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-row>
                        <v-col cols="12" md="3">
                            <v-date-input v-model="data.pliego_ingreso" label="Ingreso Pliego"
                                prepend-icon="mdi-calendar" variant="outlined" clearable></v-date-input>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-date-input v-model="data.pliego_egreso" label="Egreso Pliego" prepend-icon="mdi-calendar"
                                variant="outlined" clearable></v-date-input>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-date-input v-model="data.salida_pg1" label="Salida PG" prepend-icon="mdi-calendar"
                                variant="outlined" clearable></v-date-input>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-date-input v-model="data.vuelta_pg1" label="Vuelta PG" prepend-icon="mdi-calendar"
                                variant="outlined" clearable></v-date-input>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="3">
                            <v-date-input v-model="data.fecha_llamado" label="Fecha de Llamado"
                                prepend-icon="mdi-calendar" variant="outlined" clearable></v-date-input>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-date-input v-model="data.apertura_ofertas" label="Apertura de Ofertas"
                                prepend-icon="mdi-calendar" variant="outlined" clearable></v-date-input>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-date-input v-model="data.fecha_acta_preadjudicacion" label="Fecha Preadjudicacion"
                                prepend-icon="mdi-calendar" variant="outlined" clearable></v-date-input>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field variant="outlined" label="Acta Preadjudicacion"
                                v-model="data.acta_preadjudicacion"></v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="3">
                            <v-date-input v-model="data.salida_pg2" label="Salida PG2" prepend-icon="mdi-calendar"
                                variant="outlined" clearable></v-date-input>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-date-input v-model="data.vuelta_pg2" label="Vuelta PG2" prepend-icon="mdi-calendar"
                                variant="outlined" clearable></v-date-input>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-date-input v-model="data.fecha_aprobatoria" label="Fecha Aprobatoria"
                                prepend-icon="mdi-calendar" variant="outlined" clearable></v-date-input>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field variant="outlined" label="Aprobatoria"
                                v-model="data.aprobatoria"></v-text-field>
                        </v-col>
                    </v-row>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>


        <v-btn @click="addRenglon">Nuevo Renglon</v-btn>

        <v-expansion-panels v-model="panelRenglon" multiple>
            <v-expansion-panel v-for="(renglon, index) in data.renglon" :key="index">
                <v-expansion-panel-title>
                    Renglon {{index + 1}}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    {{ renglon }}
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
import data from "../utils/data";
export default {
    data() {
        return {
            panel: [],
            panelRenglon:[],
            data: data.empyData
        }
    },
    methods: {
        addRenglon() {
            this.data.renglon.push({
                descripcion:"",
                monto:"",
                orden_compra:{},
                oferta: []
            })
        }
    }
}

</script>

<style lang="scss" scoped></style>