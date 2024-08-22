<template>
  <div>
    <v-layout>
      <v-app-bar>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>BA Licitaciones</v-app-bar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer">
        <v-list-item>
          <v-list-item-title>Menu</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list>
          <v-list-item :to="'/'">
            <v-list-item-title> Dashboard </v-list-item-title>
            <template v-slot:prepend>
              <v-icon icon="mdi-view-dashboard"></v-icon>
            </template>
          </v-list-item>

          <v-list-item :to="'/licitaciones'">
            <v-list-item-title> Licitaciones </v-list-item-title>
            <template v-slot:prepend>
              <v-icon icon="mdi-form-select"></v-icon>
            </template>
          </v-list-item>

          <v-list-item>
            <v-list-item-title> Certificaciones </v-list-item-title>
            <template v-slot:prepend>
              <v-icon icon="mdi-file-certificate"></v-icon>
            </template>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
