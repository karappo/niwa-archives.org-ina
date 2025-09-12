export default defineNuxtPlugin(async (nuxtApp) => {
  // Vue 3用のyoutubeプラグインを動的にロード
  if (process.client) {
    try {
      const VueYoutube = await import('vue3-youtube')
      if (VueYoutube.default && typeof VueYoutube.default.install === 'function') {
        nuxtApp.vueApp.use(VueYoutube.default)
      }
    } catch (error) {
      console.warn('Failed to load vue3-youtube plugin:', error)
    }
  }
})