// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    'vuetify-nuxt-module',
  ],
  vuetify:{
    moduleOptions: {

    },
    vuetifyOptions: {
      locale: {
        locale: 'es',
        fallback: 'en'
      },
      localeMessages: ['es', 'en'],
      labComponents: true
    }
  },
  runtimeConfig: {
    public: {
      apiURL: process.env.NUXT_PUBLIC_API_URL,
      appName: 'My Nuxt App'
    }
  },
})