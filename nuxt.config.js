import messages from './assets/messages.js'

const site_title = `${messages.ja.title}`
const site_description = `${messages.ja.description}`
// const site_url = process.env.API_URL
// const site_url = 'https://niwa-teaser.karappo.net/niwa/'
const site_url = 'https://special.ycam.jp/niwa/'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'niwa-archive-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { name: 'google-site-verification', content: '' },
      { hid: 'description', name: 'description', content: site_description },
      { hid: 'description', name: 'description', content: site_description },
      { hid: 'og:site_name', property: 'og:site_name', content: site_title },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: site_url },
      { hid: 'og:title', property: 'og:title', content: site_title },
      { hid: 'og:description', property: 'og:description', content: site_description },
      { hid: 'og:image', property: 'og:image', content: `${site_url}/share.jpg` },
      { hid: 'twitter:title', property: 'twitter:title', content: site_title },
      { hid: 'twitter:url', property: 'twitter:url', content: site_url },
      { hid: 'twitter:description', property: 'twitter:description', content: site_description },
      { hid: 'twitter:image', property: 'twitter:image', content: `${site_url}/share.jpg` },
      { hid: 'twitter:card', property: 'twitter:card', content: 'summary_large_image' }
    ],
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: "//webfont.fontplus.jp/accessor/script/fontplus.js?Kda7jDZHaBw%3D&box=tTklazNwpV4%3D&aa=1&ab=2", defer: true},
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~assets/style/common'],

  /*
   ** Customize the progress-bar color
   */
  loading: {
    name: 'circle',
    color: '#344842',
    background: '#0A0C10',
  },

  router: {
    trailingSlash: true,
    base: '/2020/'
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~plugins/mixins',
    {
      src: '~plugins/gtag.js',
      mode: 'client'
    },
    {
      src: '@/plugins/vue-awesome-swiper',
      ssr: false
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-TODO-XX',
      },
    ]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    [
      'vue-scrollto/nuxt',
      {
        duration: 1000,
        offset: -63,
        easing: 'ease-in-out'
      }
    ],
    [
      'nuxt-i18n',
      {
        detectBrowserLanguage: false, // これしておかないとGoogleBotの言語が英語のため、日本語ページも英語ページとしてインデックスされてしまっていた
        locales: ['ja', 'en'],
        defaultLocale: 'ja',
        vueI18n: {
          fallbackLocale: 'ja',
          messages,
        }
      }
    ],
    'nuxt-ua'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  generate: {}
}
