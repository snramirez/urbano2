<template>
    <div>
        <v-container>
            <v-row>
                <h2>Prorroga</h2>
            </v-row>
            <v-row>
                <v-btn @click="showAdd" justify="space-around" icon="mdi-plus" small
                v-tooltip="'Nueva Prorroga'"></v-btn>
            </v-row>

            <v-row>
                <v-data-table :headers="headers" :items="data" hide-default-footer disable-pagination
                    class="elevation-1">
                    <template v-slot:item.vencimiento="{ item }">
                        <span>{{ formatDate.formatDate(item.vencimiento) }}</span>
                    </template>

                    <template v-slot:item.actions="{ item }">
                        <v-btn-toggle>
                            <v-btn justify="space-around" small icon="mdi-pencil" v-tooltip="'Editar'"></v-btn>

                            <v-btn justify="space-around" small icon="mdi-file-remove"
                                v-tooltip="'Borrar Prorroga'"></v-btn>
                        </v-btn-toggle>
                    </template>
                </v-data-table>
            </v-row>
        </v-container>

        <v-dialog v-model="addWindow" max-width="700">
            <v-card class="my-10 pa-5" max-width="700">
                <v-card-title class="d-flex justify-center pt-5">Nueva Prorroga</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-3">
                    <v-form onSubmit="return false;" @submit="">

                        <v-text-field v-model="acta" label="Acta Prorroga" variant="outlined"></v-text-field>

                        <v-date-input v-model="vencimiento" label="Vencimiento Prorroga" prepend-icon="mdi-calendar"
                            variant="outlined" clearable></v-date-input>

                        <v-row class="mt-8 mx-auto">
                            <v-btn color="success" class="pa-2" @click="addProrogation()">Agregar</v-btn>
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
            headers: [
                //{ text: "id", value: "_id" },
                { title: "Acta", value: "acta" },
                { title: "Vencimiento", value: "vencimiento" },
                { title: "Acciones", value: "actions", sortable: false },
            ],
            addWindow: false,
            editWindow: false,
            acta: "",
            vencimiento: null,
            editIndex: -1,
            formatDate: format,
        };
    },

    props: {
        data: Array,
    },

    methods: {
        showAdd() {
            this.addWindow = !this.addWindow;
        },

        showEdit() {
            this.editWindow = !this.editWindow;
        },

        addProrogation() {
            this.data.push({
                acta: this.acta,
                vencimiento: this.vencimiento
            });

            this.cleanView();
            this.showAdd();
        },

        cleanView() {
            this.acta = '',
            this.vencimiento = null
        },
    }
}
</script>

<style lang="scss" scoped></style>