// middleware/auth.global.ts
import { useUserStore } from "~/stores/userStore";

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();
  const token = useCookie("token");

  // Si no hay token y la ruta es protegida, redirige al login
  if (!token.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});