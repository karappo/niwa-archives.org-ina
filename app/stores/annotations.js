import { defineStore } from 'pinia'

// ページリスト（新しいページが追加されたらここに追加）
const pages = [
  'debug',
  'fugetsuRoAutumn', 
  'fugetsuRoSpring',
  'fugetsuRoSummer',
  'fugetsuRoWinter',
  'hosoo',
  'joeiJi',
  'murinAnSnow',
  'murinAnSummer',
  'murinAnWinter',
  'ryogenIn'
]

export const useAnnotationsStore = defineStore('annotations', {
  state: () => {
    const result = {}
    for (const page of pages) {
      result[page] = null
    }
    return result
  },

  getters: {
    // 動的getters for each page
    ...pages.reduce((getters, page) => {
      getters[page] = (state) => state[page]
      return getters
    }, {})
  },

  actions: {
    // 動的actions for each page
    ...pages.reduce((actions, page) => {
      actions[`set${page.charAt(0).toUpperCase() + page.slice(1)}`] = function(value) {
        this[page] = value
      }
      return actions
    }, {}),

    // 汎用的なsetter
    setPageAnnotations(page, value) {
      if (this.hasOwnProperty(page)) {
        this[page] = value
      }
    }
  }
})