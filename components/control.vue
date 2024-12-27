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
                    <v-card>
                        <v-card-title class="d-flex justify-center">Orden de Compra</v-card-title>
                        <v-card-subtitle class="d-flex justify-center">
                            {{ orden_compra.num_orden }}
                        </v-card-subtitle>

                        <v-data-table :headers="headers" :items="orden_compra.control" :row-props="itemRowBackground"
                            hide-default-footer>
                            <template v-slot:item.periodo="{ item }">
                                <span>{{ formatDate.formatDate(item.periodo) }}</span>
                            </template>

                            <template v-slot:item.actions="{ item }">
                                <v-btn-toggle>
                                    <v-btn justify="space-around" small icon="mdi-pencil" v-tooltip="'Editar'"
                                        @click="cargarEdit(item)"></v-btn>

                                    <v-btn justify="space-around" small icon="mdi-file-remove"
                                        v-tooltip="'Borrar Certificado'" @click="borrarCertificado(item)"></v-btn>
                                </v-btn-toggle>
                            </template>
                        </v-data-table>
                    </v-card>
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
                            <v-btn color="success" class="pa-2" @click="editOC()">Editar</v-btn>
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
            selectEstados: ["EJECUTADO", "NO EJECUTADO"],
            formatDate: format,
            headers: [
                { title: "Numero Certificado", value: "num_certificado" },
                { title: "Periodo", value: "periodo" },
                { title: "SPR", value: "SPR" },
                { title: "PRD", value: "PRD" },
                { title: "Monto Devengado", value: "monto_ejecutado" },
                { title: "Monto Pagado", value: "monto_ejecutado" },
                { title: "Estado", value: "estado" },
                { title: "Accion", value: "actions", sortable: false },
            ],
        };
    },

    props: {
        orden_compra: Object,
    },

    methods: {
        showAdd() {
            this.addWindow = !this.addWindow;
        },
        showEdit() {
            this.editWindow = !this.editWindow;
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

            this.cleanView();
            this.showAdd();
        },

        cargarEdit(item) {
            this.num_certificado = item.num_certificado;
            this.periodo = item.periodo;
            this.SPR = item.SPR;
            this.PRD = item.PRD;
            this.monto_ejecutado = item.monto_ejecutado;
            this.estado = item.estado;
            this.editIndex = this.orden_compra.control.indexOf(item);
            this.showEdit();
        },

        editOC() {
            this.orden_compra.control[this.editIndex] = {
                num_certificado: this.num_certificado,
                periodo: this.periodo,
                SPR: this.SPR,
                PRD: this.PRD,
                monto_ejecutado: this.monto_ejecutado,
                estado: this.estado,
            };
            this.showEdit()
            this.cleanView()
        },

        borrarCertificado(item) {
            let index = this.orden_compra.control.indexOf(item);
            this.orden_compra.control.splice(index, 1);
        },

        cleanView() {
            this.num_certificado = "";
            this.periodo = null;
            this.SPR = "";
            this.PRD = "";
            this.monto_ejecutado = 0;
            this.estado = "";
        },

        itemRowBackground(item) {
            return this.vencido(item) ? { class: "style-1" } : { class: "" };
        },

        vencido(control) {
            let currentDate = new Date();
            if ((new Date(control.item.periodo) < currentDate) && (control.item.estado != "EJECUTADO")) {
                return true;
            }
        },
    },
}

</script>

<style>
.style-1 {
    background-color: #E57373;
}

.style-2 {
    background-color: rgb(114, 114, 67);
}
</style>
