import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('splitpanes', Splitpanes)
  nuxtApp.vueApp.component('pane', Pane)
})
