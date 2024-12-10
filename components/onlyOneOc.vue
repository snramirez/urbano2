<template>
    <div>
        <v-card>
            <v-card-title class="d-flex justify-center">Orden de Compra</v-card-title>
            <v-card-subtitle class="d-flex justify-center">{{
                orden_compra.num_orden
            }}</v-card-subtitle>
            <v-data-table :headers="headers" :items="orden_compra.control" :row-props="itemRowBackground"
                hide-default-footer>
                <template v-slot:item.periodo="{ item }">
                    <span>{{ formatDate.formatDate(item.periodo) }}</span>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
import format from "../utils/formatText";
export default {
    data() {
        return {
            formatDate: format,
            headers: [
                { title: "Numero Certificado", value: "num_certificado" },
                { title: "Periodo", value: "periodo" },
                { title: "SPR", value: "SPR" },
                { title: "PRD", value: "PRD" },
                { title: "Monto Ejecutado", value: "monto_ejecutado" },
                { title: "Estado", value: "estado" },
            ],
        }
    },

    props: {
        orden_compra: Object
    },

    methods: {
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