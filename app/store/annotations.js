import { defineStore } from 'pinia'

// -------------------------------
// ※ ページが増えたときはここに追加
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
// -------------------------------

export const useAnnotationsStore = defineStore('annotations', {
  state: () => {
    const result = {}
    for (const page of pages) {
      result[page] = null
    }
    return result
  },

  actions: {
    // 動的にアクションを生成
    ...(() => {
      const result = {}
      for (const page of pages) {
        result[page] = function(val) {
          this[page] = val
        }
      }
      return result
    })()
  },

  getters: {
    // 動的にゲッターを生成
    ...(() => {
      const result = {}
      for (const page of pages) {
        result[page] = (state) => state[page]
      }
      return result
    })()
  }
})
