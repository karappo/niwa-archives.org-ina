export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  ssr: false,

  manifest: {
    crossorigin: 'use-credentials'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Incomplete Niwa Archives 終らない庭のアーカイヴ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '/assets/potree/build/potree/potree.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/assets/potree/libs/jstree/themes/mixed/style.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/assets/potree/libs/jquery-ui/jquery-ui.css' },
    ],
    script: [
      { src: '//webfont.fontplus.jp/accessor/script/fontplus.js?Kda7jDZHaBw%3D&box=tTklazNwpV4%3D&aa=1&ab=2', defer: true},
      { src: '/assets/potree/libs/jquery/jquery-3.1.1.min.js'},
      { src: '/assets/potree/libs/spectrum/spectrum.js'},
      { src: '/assets/potree/libs/jquery-ui/jquery-ui.min.js'},
      { src: '/assets/potree/libs/three.js/build/three.min.js'},
      { src: '/assets/potree/libs/three.js/extra/lines.js'},
      { src: '/assets/potree/libs/other/BinaryHeap.js'},
      { src: '/assets/potree/libs/tween/tween.min.js'},
      { src: '/assets/potree/libs/d3/d3.js'},
      { src: '/assets/potree/libs/proj4/proj4.js'},
      { src: '/assets/potree/libs/openlayers3/ol.js'},
      { src: '/assets/potree/libs/i18next/i18next.js'},
      { src: '/assets/potree/libs/jstree/jstree.js'},
      { src: '/assets/potree/build/potree/potree.js'},
      { src: '/assets/potree/libs/plasio/js/laslaz.js'}
    ],
  },

  loading: {
    color: '#C9E2D4'
  },
  loadingIndicator: {
    color: '#666666',
    background: '#0D1F1F'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~assets/style/common'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~plugins/element-ui',
    '~plugins/util',
    '~plugins/vue-scrollto',
    '~plugins/key-detection',
    '~plugins/splitpanes',
    '~plugins/vue-youtube'
  ],

  router: {
    trailingSlash: true,
    middleware: ['spreadsheets']
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/svg',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    'nuxt-ua'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [
      'three'
    ]
  },

  generate: {
    routes: [
      '/murin_an-snow/',
      '/murin_an-summer/',
      '/murin_an-winter/',
      '/ryogen_in/',
      '/joei_ji/'
    ]
  }
}
