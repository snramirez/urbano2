<template>
    <div class="d-flex flex-row">
        <v-tabs v-model="tab" direction="vertical">
            <v-tab v-for="(oferta, index) in ofertas" :key="oferta" :value="index">Oferta {{ index + 1 }}</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item v-for="(oferta, index) in ofertas" :key="oferta" :value="index">
                <v-card flat>
                    <v-row class="my-2 mx-2">
                        <v-col cols="12" md="6">
                            <v-list>
                                <v-list-item title="Monto Ofertado" :subtitle="format.priceFormater(oferta.monto_oferta)"></v-list-item>
                                <v-list-item title="Observacion" >
                                    <v-list-item-subtitle v-html="oferta.observaciones" class="wrap-text"></v-list-item-subtitle>
                                </v-list-item>
                                <v-list-item title="Estado Oferta" :subtitle="oferta.ganador ? 'OFERTA GANADORA' : 'EN REVISION'"></v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-list>
                                <v-list-item title="Documentacion" :subtitle="oferta.documentacion ? 'PRESENTADA':'NO PRESENTADA'"></v-list-item>
                                <v-list-item v-for="(item, index) in oferta.beneficiario" :key="item">
                                    <v-list-item-title>Beneficiario {{ index + 1 }}</v-list-item-title>
                                    <v-list-item-subtitle class="wrap-text">
                                        <p>{{ item.razon_social }}</p>
                                        <p>{{ item.cuit }}</p>
                                    </v-list-item-subtitle>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                </v-card>
            </v-tabs-window-item>

            <v-tabs-window-item value="2">
                <v-card>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui perspiciatis tempore asperiores harum doloribus. Ratione, corrupti laudantium expedita voluptate sed odio? Reprehenderit sed molestiae quod consequatur obcaecati autem harum officiis.</p>
                </v-card>
            </v-tabs-window-item>

            <v-tabs-window-item value="3">
                <v-card>
                    <p>Cosas de Ofertas</p>
                </v-card>
            </v-tabs-window-item>
        </v-tabs-window>
    </div>
</template>

<script>
import format from "../utils/formatText";
export default {
    data: () => ({
        tab: null,
        format: format,
    }),
    props:{
        ofertas: Array
    }
}
</script>

<style>
.wrap-text {
  -webkit-line-clamp: unset !important;
}
</style>