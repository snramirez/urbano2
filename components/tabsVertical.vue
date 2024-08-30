<template>
    <div class="d-flex flex-row">
        <v-tabs v-model="tab" direction="vertical">
            <v-tab value="1">Oferta 1</v-tab>
            <v-tab value="2">Oferta 2</v-tab>
            <v-tab value="3">Oferta 3</v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item value="1">
                <v-card flat>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi quibusdam optio nemo vero adipisci deleniti quisquam esse aliquid hic veniam, eaque molestias illum autem magni voluptas ea aspernatur consectetur at? Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero sit ipsum corporis quos ullam ab fugit exercitationem maiores, laborum beatae earum quis tempore cum. Officia aliquam nulla fugiat dolorum voluptates!</p>
                </v-card>
            </v-tabs-window-item>

            <v-tabs-window-item value="2">
                <v-card>
                    <p>Cosas de Ofertas</p>
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
export default {
    data: () => ({
        tab: null
    })
}
</script>

<style lang="scss" scoped></style>