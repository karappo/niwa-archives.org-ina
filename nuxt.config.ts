// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],

  nitro: {
    prerender: {
      routes: [
        '/fugetsu_ro-spring/',
        '/fugetsu_ro-summer/',
        '/fugetsu_ro-autumn/',
        '/fugetsu_ro-winter/',
        '/hosoo/',
        '/joei_ji/',
        '/murin_an-snow/',
        '/murin_an-summer/',
        '/murin_an-winter/',
        '/ryogen_in/'
      ]
    }
  }
})
