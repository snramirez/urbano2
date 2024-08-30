<template>
    <div>
        <v-tabs v-model="tab">
            <v-tab value="1">Renglon 1</v-tab>
            <v-tab value="2">Renglon 2</v-tab>
            <v-tab value="3">Renglon 3</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item value="1">
                <v-card>
                    <v-row class="my-2 mx-2">
                        <v-col cols="6">
                            <p>Info Renglon</p>
                            <p>Info Renglon</p>
                            <p>Info Renglon</p>
                            <p>Info Renglon</p>
                            <p>Info Renglon</p>
                            <p>Info Renglon</p>
                        </v-col>

                        <v-col cols="6">
                            <p>Info Renglon</p>
                            <p>Info Renglon</p>
                            <p>Info Renglon</p>
                            <p>Info Renglon</p>
                            <p>Info Renglon</p>
                            <p>Info Renglon</p>
                        </v-col>
                    </v-row>
                    <tabsVertical/>
                </v-card>


            </v-tabs-window-item>
            <v-tabs-window-item value="2">
                <v-row class="my-2 mx-2">
                    <v-col cols="6">
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                    </v-col>

                    <v-col cols="6">
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                    </v-col>
                </v-row>
            </v-tabs-window-item>
            <v-tabs-window-item value="3">
                <v-row class="my-2 mx-2">
                    <v-col cols="6">
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                    </v-col>

                    <v-col cols="6">
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                        <p>Info Renglon</p>
                    </v-col>
                </v-row>
            </v-tabs-window-item>
        </v-tabs-window>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tab: null
        }
    },
    props:{
        renglon: Array,
    }
}
</script>

<style lang="scss" scoped></style>