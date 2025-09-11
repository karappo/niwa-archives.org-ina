export default defineNuxtPlugin((nuxtApp) => {
  // Vue 3用のyoutubeプラグインを動的にロード
  if (process.client) {
    import('vue3-youtube').then((VueYoutube) => {
      nuxtApp.vueApp.use(VueYoutube.default)
    })
  }
})