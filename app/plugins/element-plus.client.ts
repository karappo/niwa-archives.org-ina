import ElementPlus from 'element-plus'
import locale from 'element-plus/es/locale/lang/ja'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus, { locale })
})