// middleware/authRole.global.ts
import { useUserStore } from '~/stores/userStore'

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();

  // si no está logueado lo mando al login
  if (!userStore.token) {
    return navigateTo('/login');
  }

  // Chequear roles específicos
  const allowedRoles = to.meta.roles as string[] | undefined;

  if (allowedRoles && !allowedRoles.includes(userStore.user?.role)) {
    return navigateTo('/noAutorizado'); // página de "no autorizado"
  }
});