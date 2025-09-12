const siteTitle = 'Incomplete Niwa Archives 終らない庭のアーカイヴ'
const siteDescription =
  '2019年4月より始動した庭園アーカイヴ・プロジェクトは、現代のテクノロジーを駆使して、日本庭園の多様な側面をデータ化した新しい総合的アーカイヴを研究開発するものです。'
// TODO: 環境変数から読み込むなどしてstagingなどにも対応する
// const baseUrl = 'https://special.ycam.jp/niwa/'
// const baseUrl = 'https://niwa.ycam.jp'
const baseUrl = 'https://niwa-archives.org/ina/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
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
  },

  app: {
    baseURL: '/ina/',
    head: {
      title: siteTitle,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // { name: 'google-site-verification', content: '' },
        { name: 'description', content: siteDescription },
        { property: 'og:site_name', content: siteTitle },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: baseUrl },
        { property: 'og:title', content: siteTitle },
        { property: 'og:description', content: siteDescription },
        { property: 'og:image', content: `${baseUrl}/share.jpg` },
        { name: 'twitter:title', content: siteTitle },
        { name: 'twitter:url', content: baseUrl },
        { name: 'twitter:description', content: siteDescription },
        { name: 'twitter:image', content: `${baseUrl}/share.jpg` },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/ina/assets/potree/build/potree/potree.css'
        },
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/ina/assets/potree/libs/jstree/themes/mixed/style.css'
        },
        {
          rel: 'stylesheet',
          type: 'text/css',
          href: '/ina/assets/potree/libs/jquery-ui/jquery-ui.css'
        }
      ],
      script: [
        {
          src:
            '//webfont.fontplus.jp/accessor/script/fontplus.js?Kda7jDZHaBw%3D&box=BAYjMHHVKVM%3D&aa=1&ab=2',
          defer: true
        },
        { src: '/ina/assets/potree/libs/jquery/jquery-3.1.1.min.js' },
        { src: '/ina/assets/potree/libs/spectrum/spectrum.js' },
        { src: '/ina/assets/potree/libs/jquery-ui/jquery-ui.min.js' },
        { src: '/ina/assets/potree/libs/three.js/build/three.min.js' },
        { src: '/ina/assets/potree/libs/three.js/extra/lines.js' },
        { src: '/ina/assets/potree/libs/other/BinaryHeap.js' },
        { src: '/ina/assets/potree/libs/tween/tween.min.js' },
        { src: '/ina/assets/potree/libs/d3/d3.js' },
        { src: '/ina/assets/potree/libs/proj4/proj4.js' },
        { src: '/ina/assets/potree/libs/openlayers3/ol.js' },
        { src: '/ina/assets/potree/libs/i18next/i18next.js' },
        { src: '/ina/assets/potree/libs/jstree/jstree.js' },
        { src: '/ina/assets/potree/build/potree/potree.js' },
        { src: '/ina/assets/potree/libs/plasio/js/laslaz.js' }
      ]
    }
  },

  router: {
    options: {
      trailingSlash: true
    }
  },

  ssr: false,

  css: [
    'element-plus/dist/index.css',
    '~/assets/style/common.css',
    '~/assets/style/annotation.css'
  ],

  // plugins are auto-discovered from app/plugins/

  components: true,

  modules: [
    '@nuxtjs/device',
    '@pinia/nuxt'
  ],

  device: {
    // refreshOnResize option has been deprecated and removed
  },

  build: {
    transpile: ['three']
  },

  vite: {
    plugins: [
      // SVG support using vite-svg-loader
      require('vite-svg-loader')({
        // Convert SVGs to Vue components
        defaultImport: 'component'
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 1600, // Increase limit to 1600kB for large 3D libraries
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Group vendor dependencies
            if (id.includes('node_modules')) {
              if (id.includes('three')) {
                return 'vendor-three'
              }
              if (id.includes('vue') || id.includes('@vue')) {
                return 'vendor-vue'
              }
              return 'vendor'
            }
          }
        }
      }
    }
  }

  // ローカルIPでデバッグしたい時に有効化
  // server: {
  //   port: 3000, // デフォルト: 3000
  //   host: '0.0.0.0' // デフォルト: localhost
  // },
  // そのほかにやること
  // - ウェブフォントFONTPLUSの管理画面にIPを追加
  // - [GoogleCloudPlatform](https://console.cloud.google.com/apis/credentials/key/c238b06c-505e-4198-91bf-6557605ab380?hl=ja&project=proxies-of-client)の管理画面から、ウェブサイトの制限のところにドメインまたはIPを追加すること。
})