<template>
  <div class="d-flex justify-center align-center" style="height: 100vh">
    <v-card width="400" class="pa-6">
      <v-card-title class="text-h5 text-center">Registro de Usuario</v-card-title>

      <!-- Mostrar error si existe -->
      <v-alert
        v-if="userStore.error"
        type="error"
        class="text-sm"
        border="start"
        variant="tonal"
      >
        {{ userStore.error }}
      </v-alert>

      <v-divider></v-divider>

      <v-card-text>
        <v-form @submit.prevent="onSubmit">
          <v-text-field
            v-model="userName"
            label="Correo"
            type="email"
            variant="outlined"
            required
          />

           <v-text-field
          v-model="fullName"
          label="Nombre Completo"
          required
          variant="outlined"
        />

        <!-- CUIT -->
        <v-text-field
          v-model="cuit"
          label="CUIT"
          required
          variant="outlined"
        />

        <!-- Clave Secreta -->
        <v-text-field
          v-model="secretKey"
          label="Clave Secreta"
          type="password"
          required
          variant="outlined"
        />

        <!-- Password -->
        <v-text-field
          v-model="password"
          label="Contraseña"
          type="password"
          required
          variant="outlined"
        />

        <!-- Repetir Password -->
        <v-text-field
          v-model="confirmPassword"
          label="Repetir Contraseña"
          type="password"
          required
          :error="passwordError"
          :error-messages="passwordError ? ['Las contraseñas no coinciden'] : []"
          variant="outlined"
        />

          <v-alert v-if="userStore.error" type="error" class="mb-4">
            {{ userStore.error }}
          </v-alert>

          <v-btn
            type="submit"
            color="primary"
            block
            :disabled="loading"
          >
            Registrarse
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "~/stores/userStore";

const userStore = useUserStore();
const loading = ref(false);
const error = ref(null);

const userName = ref("");
const fullName = ref("");
const cuit = ref("");
const secretKey = ref("");
const password = ref("");
const confirmPassword = ref("");

const formRef = ref(null);

// Computed para validar contraseñas
const passwordError = computed(() => {
  return password.value !== confirmPassword.value && confirmPassword.value.length > 0;
});

// Función de submit
const onSubmit = async () => {
  if (passwordError.value) {
    error.value = "Las contraseñas no coinciden";
    return;
  }

  try {
    loading.value = true;
    error.value = null;

    await userStore.register({
      userName: userName.value,
      fullName: fullName.value,
      cuit: cuit.value,
      secretKey: secretKey.value,
      password: password.value,
    });

    // Redirige a login si todo salió bien
    navigateTo("/login");
  } catch (err) {
    error.value = err?.response?.data?.msg || "Error al registrar usuario";
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
