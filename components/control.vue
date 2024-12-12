<template>
    <div>
        <v-container>
            <v-row>
                <h2>Certificados</h2>
            </v-row>
            <v-row>
                <v-btn @click="showAdd" justify="space-around" icon="mdi-plus" small
                    v-tooltip="'Nuevo Control'"></v-btn>
            </v-row>
            <v-row>
                <v-col>
                    <onlyOneOc :orden_compra="orden_compra" />
                </v-col>
            </v-row>
        </v-container>

        <v-dialog v-model="addWindow" max-width="700">
            <v-card class="my-10 pa-5" max-width="700">
                <v-card-title class="d-flex justify-center pt-5">Nuevo Certificado</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-3">
                    <v-form onSubmit="return false;" @submit="">
                        <v-text-field v-model="num_certificado" label="N° Certificado"
                            variant="outlined"></v-text-field>
                        <v-date-input v-model="periodo" label="Periodo" prepend-icon="mdi-calendar" variant="outlined"
                            clearable></v-date-input>
                        <v-text-field v-model="SPR" label="SPR" variant="outlined"></v-text-field>
                        <v-text-field v-model="PRD" label="PRD" variant="outlined"></v-text-field>
                        <currency-field v-model="monto_ejecutado" label="Monto"></currency-field>
                        <v-select v-model="estado" :items="selectEstados" label="Estado" variant="outlined"></v-select>

                        <v-row class="mt-8 mx-auto">
                            <v-btn color="success" class="pa-2" @click="addOC()">Agregar</v-btn>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="editWindow" max-width="700">
            <v-card class="my-10 pa-5" max-width="700">
                <v-card-title class="d-flex justify-center pt-5">Editar Certificado</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-3">
                    <v-form onSubmit="return false;" @submit="">
                        <v-text-field v-model="num_certificado" label="N° Certificado"
                            variant="outlined"></v-text-field>
                        <v-date-input v-model="periodo" label="Periodo" prepend-icon="mdi-calendar" variant="outlined"
                            clearable></v-date-input>
                        <v-text-field v-model="SPR" label="SPR" variant="outlined"></v-text-field>
                        <v-text-field v-model="PRD" label="PRD" variant="outlined"></v-text-field>
                        <currency-field v-model="monto_ejecutado" label="Monto"></currency-field>
                        <v-select v-model="estado" :items="selectEstados" label="Estado" variant="outlined"></v-select>

                        <v-row class="mt-8 mx-auto">
                            <v-btn color="success" class="pa-2" @click="editOC()">Agregar</v-btn>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import format from "../utils/formatText";
export default {
    data() {
        return {
            addWindow: false,
            editWindow: false,
            num_certificado: "",
            periodo: null,
            SPR: "",
            PRD: "",
            monto_ejecutado: 0,
            estado: "",
            editIndex: -1,
            format: format,
            selectEstados: ["EJECUTADO", "NO EJECUTADO"]
        };
    },

    props: {
        orden_compra: Object
    },

    methods: {
        showAdd() {
            this.addWindow = !this.addWindow;
        },
        addOC() {
            this.orden_compra.control.push({
                num_certificado: this.num_certificado,
                periodo: this.periodo,
                SPR: this.SPR,
                PRD: this.PRD,
                monto_ejecutado: this.monto_ejecutado,
                estado: this.estado,
            });
        },

        cargarEdit(item) {
            this.num_certificado = item.num_certificado,
                this.periodo = item.periodo,
                this.SPR = item.SPR,
                this.PRD = item.PRD,
                this.monto_ejecutado = item.monto_ejecutado,
                this.estado = item.estado,
                this.editIndex = this.data.indexOf(item);
        },

        editOC() {

        }

    }
}
</script>

<style lang="scss" scoped></style>