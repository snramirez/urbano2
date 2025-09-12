<template>
  <div>
    <v-layout>
      <v-app-bar>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>
          <v-btn variant="text" to="/"> BA Licitaciones </v-btn>
        </v-app-bar-title>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer">

        <v-divider></v-divider>

        <v-list-item
          v-if="userStore.user"
          prepend-avatar="~/assets/avatar_user.png"
        >
          <v-list-item-title>
            {{ userStore.user ? userStore.user.fullName : "Invitado" }}
          </v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list v-if="userStore.user">
          <v-list-item :to="'/dashboard'">
            <v-list-item-title> Dashboard </v-list-item-title>
            <template v-slot:prepend>
              <v-icon icon="mdi-view-dashboard"></v-icon>
            </template>
          </v-list-item>

          <v-list-item :to="'/cargarLicitacion'">
            <v-list-item-title> Carga </v-list-item-title>
            <template v-slot:prepend>
              <v-icon icon="mdi-file-certificate"></v-icon>
            </template>
          </v-list-item>

          <v-list-item :to="'/listaLicitaciones'">
            <v-list-item-title> Lista </v-list-item-title>
            <template v-slot:prepend>
              <v-icon icon="mdi-file-certificate"></v-icon>
            </template>
          </v-list-item>

          <v-list-item :to="'/altas'">
            <v-list-item-title> Altas </v-list-item-title>
            <template v-slot:prepend>
              <v-icon icon="mdi-form-select"></v-icon>
            </template>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn color="danger" v-if="userStore.user" block @click="logout()">
              Cerrar Sesion
            </v-btn>
          </div>
        </template>

        <template v-slot:prepend>
          <div class="pa-2">
            <v-btn color="success" v-if="!userStore.user" block to="/login">
              Login
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main>
        <slot />
      </v-main>
    </v-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "~/stores/userStore";

const drawer = ref(false);
const userStore = useUserStore();
if(userStore.token){
  userStore.fetchUser(); // Intentar obtener datos del usuario al cargar el layout
}

function logout() {
  userStore.logout();
  navigateTo("/login");
}
</script>

<style lang="scss" scoped></style>
