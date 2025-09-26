export default defineNuxtPlugin(async (nuxtApp) => {
  // Vue 3用のyoutubeプラグインを動的にロード
  if (process.client) {
    try {
      const VueYoutube = await import('vue3-youtube')
      // vue3-youtubeはコンポーネントを直接エクスポートするので、手動で登録
      const YouTubeComponent = VueYoutube.default || VueYoutube
      nuxtApp.vueApp.component('YouTube', YouTubeComponent)
    } catch (error) {
      console.warn('Failed to load vue3-youtube plugin:', error)
    }
  }
})