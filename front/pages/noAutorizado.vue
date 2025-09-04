<template>
  <v-container>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <v-card class="pa-6 text-center" max-width="400" elevation="3">
        <v-card-title class="text-red-600 text-xl font-bold">
          Acceso Denegado
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-4">
          <p>No tenés permisos para ver esta página.</p>
        </v-card-text>
        <v-card-actions class="justify-center mt-4">
          <v-btn color="primary" @click="goHome">Volver al inicio</v-btn>
          <v-btn color="error" @click="logout">Cerrar sesión</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useUserStore } from "~/stores/userStore";

const router = useRouter();
const userStore = useUserStore();
const user = userStore.user;

function goHome() {
  router.push("/login");
}

function logout() {
  userStore.logout();
  router.push("/login");
}
</script>
