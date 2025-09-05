import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ja from 'element-plus/dist/locale/ja.mjs'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus, {
    locale: ja
  })
})
