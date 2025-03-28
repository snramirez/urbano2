<template>
    <div>
        <v-tabs v-model="tab">
            <v-tab v-for="(renglon, index) in renglones" :key="renglon" :value="index">Renglon {{ index + 1 }}</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item v-for="(renglon, index) in renglones" :key="index" :value="index">
                <v-card>
                    <v-row class="my-2 mx-2">
                        <v-col cols="12" md="6">
                            <v-list>
                                <v-list-item title="Descripcion" :subtitle="renglon.descripcion"></v-list-item>
                            </v-list>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-list>
                                <v-list-item title="Monto" :subtitle="format.priceFormater(renglon.monto)"></v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                    <tabsVertical :ofertas="renglon.oferta"/>
                </v-card>


            </v-tabs-window-item>
        </v-tabs-window>
    </div>
</template>

<script>
import format from "../utils/formatText";
export default {
    data() {
        return {
            tab: null,
            format: format,
        }
    },
    props: {
        renglones: Array,
    }
}
</script>

<style lang="scss" scoped></style>