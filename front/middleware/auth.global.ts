// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie<string | null>("token", { readonly: true });
  const pathAuthFree = ["/login", "/register"];

  // Si no hay token y la ruta es protegida, redirige al login
  if (!token.value &&  !pathAuthFree.includes(to.path)){
    return navigateTo("/login");
  }
});