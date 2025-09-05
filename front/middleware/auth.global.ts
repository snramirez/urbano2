// middleware/auth.global.ts
import { useUserStore } from "~/stores/userStore";

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();
  const token = useCookie("token");
  const pathAuthFree = ["/login", "/register", "/"];

  // Si no hay token y la ruta es protegida, redirige al login
  if (!token.value &&  !pathAuthFree.includes(to.path)){
    return navigateTo("/login");
  }
});