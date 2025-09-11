export default defineNuxtPlugin((nuxtApp) => {
  // Vue 3では動的インポートでvue-scrolltoを処理
  if (process.client) {
    import('vue-scrollto').then((VueScrollTo) => {
      nuxtApp.vueApp.use(VueScrollTo.default, {
        duration: 1000,
        easing: 'easeInOut'
      })
    })
  }
})