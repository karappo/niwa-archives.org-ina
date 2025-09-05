import VueYoutube from 'vue3-youtube'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueYoutube)
})
