<template>
    <div>
        <v-card>
            <v-card-title class="d-flex justify-center">Orden de Compra</v-card-title>
            <v-row class="my-2 mx-2">
                <v-col cols="12" md="6">
                    <v-list>
                        <v-list-item title="Numero Orden" :subtitle="orden_compra.num_orden"></v-list-item>
                        <v-list-item title="Tipo Orden" :subtitle="orden_compra.tipo"></v-list-item>
                        <v-list-item title="Monto Original"
                            :subtitle="formatDate.priceFormater(orden_compra.monto)"></v-list-item>
                    </v-list>
                </v-col>

                <v-col cols="12" md="6">
                    <v-list>
                        <v-list-item v-for="(item, index) in orden_compra.destinatario" :key="item">
                            <v-list-item-title>Destinatario {{ index + 1 }}</v-list-item-title>
                            <v-list-item-subtitle class="wrap-text">
                                <p>{{ item.razon_social }}</p>
                                <p>{{ item.cuit }}</p>
                            </v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item title="Origen" :subtitle="orden_compra.origen"></v-list-item>
                        <v-list-item v-if="orden_compra.origen === 'RENGLON'" title="Renglon" :subtitle="orden_compra.renglon_origen"></v-list-item>
                        <v-list-item v-if="orden_compra.origen === 'PRORROGA'" title="Prorroga" :subtitle="orden_compra.prorroga_origen"></v-list-item>
                        <v-list-item v-if="orden_compra.origen === 'AMPLIATORIA'" title="Ampliatoria" :subtitle="orden_compra.ampliatoria_origen"></v-list-item>
                    </v-list>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-title>Progreso {{ (montoDevengado() / getMontoTotal() * 100).toFixed(2) }}%</v-card-title>
            <v-card-subtitle>Monto Total $ {{ getMontoTotal() }}</v-card-subtitle>
            <v-card-subtitle>Monto Devengado $ {{ montoDevengado() }}</v-card-subtitle>
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
                { title: "Monto Devengado", value: "monto_ejecutado" },
                { title: "Monto Pagado", value: "monto_pagado" },
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

        montoDevengado() {
            let monto = 0
            this.orden_compra.control.forEach(certificado => {
                certificado.estado == 'EJECUTADO' ? monto += certificado.monto_ejecutado : 0
            });
            return monto
        },

        getMontoTotal() {
            let montoTotal = 0
            this.orden_compra.ampliatoria.forEach(amp => montoTotal += amp.monto)
            montoTotal += this.orden_compra.monto
            return montoTotal
        }
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