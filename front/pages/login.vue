<template>
  <div class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card width="400" class="pa-6">
      <v-card-title class="text-h5 text-center">Iniciar Sesión</v-card-title>

      <v-card-text>
        <v-form @submit.prevent="onSubmit">
          <v-text-field
            v-model="email"
            label="Correo"
            type="email"
            variant="outlined"
            required
          />

          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            variant="outlined"
            required
          />

          <v-alert
            v-if="userStore.error"
            type="error"
            class="mb-4"
          >
            {{ userStore.error }}
          </v-alert>

          <v-btn
            type="submit"
            color="primary"
            block
            :loading="userStore.loading"
          >
            Ingresar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '~/stores/userStore'

const email = ref('')
const password = ref('')
const userStore = useUserStore()

async function onSubmit() {
  await userStore.login(email.value, password.value)

  if (!userStore.error && userStore.user) {
    // si el login fue exitoso, redirigimos
    const router = useRouter()
    router.push('/')
  }
}
</script>