export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'niwa-archive-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: "/libs/jquery/jquery-3.1.1.min.js", defer: true},
      { src: "/libs/spectrum/spectrum.js", defer: true},
      { src: "/libs/jquery-ui/jquery-ui.min.js", defer: true},
      { src: "/libs/three.js/build/three.min.js", defer: true},
      { src: "/libs/three.js/extra/lines.js", defer: true},
      { src: "/libs/other/BinaryHeap.js", defer: true},
      { src: "/libs/tween/tween.min.js", defer: true},
      { src: "/libs/d3/d3.js", defer: true},
      { src: "/libs/proj4/proj4.js", defer: true},
      { src: "/libs/openlayers3/ol.js", defer: true},
      { src: "/libs/i18next/i18next.js", defer: true},
      { src: "/libs/jstree/jstree.js", defer: true},
      { src: "/build/potree/potree.js", defer: true},
      { src: "/libs/plasio/js/laslaz.js", defer: true}
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~assets/style/common'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [
      'three'
    ]
  }
}
