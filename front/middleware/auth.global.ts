// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie("token");

  // Si no hay token y la ruta es protegida, redirige al login
  if (!token.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});