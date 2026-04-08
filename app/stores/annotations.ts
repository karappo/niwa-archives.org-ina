import { defineStore } from 'pinia'

// アノテーションデータの型定義
export interface Annotation {
  id: string
  title: string
  position: number[]
  category: string
  grouped?: boolean
  firstInGroup?: boolean
  [key: string]: any
}

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
  // 'rikugiEn',
  'ryogenIn'
] as const

// 公開ページかどうかを判定（route.params.aliasの形式：'rikugi_en'）
// camelCase形式（例：'joeiJi'）でのアクセスは無効として扱う
export const isPublishedPage = (alias: string): boolean => {
  const snakeCasePages = pages.map((p) =>
    p.replace(/[A-Z]/g, (c) => '_' + c.toLowerCase())
  )
  return snakeCasePages.includes(alias)
}

// ストアの状態の型
interface AnnotationsState {
  [key: string]: Annotation[] | null
}

export const useAnnotationsStore = defineStore('annotations', {
  state: (): AnnotationsState => {
    const result: AnnotationsState = {}
    for (const page of pages) {
      result[page] = null
    }
    return result
  },

  getters: {
    // 動的getters for each page
    ...pages.reduce((getters, page) => {
      getters[`get${page.charAt(0).toUpperCase() + page.slice(1)}`] = (state: AnnotationsState) => state[page] ?? null
      return getters
    }, {} as Record<string, (state: AnnotationsState) => Annotation[] | null>)
  },

  actions: {
    // 動的actions for each page
    ...pages.reduce((actions, page) => {
      actions[`set${page.charAt(0).toUpperCase() + page.slice(1)}`] = function(value: Annotation[] | null) {
        (this as any)[page] = value
      }
      return actions
    }, {} as Record<string, (value: Annotation[] | null) => void>),

    // 汎用的なsetter
    setPageAnnotations(page: string, value: Annotation[] | null) {
      if (Object.prototype.hasOwnProperty.call(this, page)) {
        (this as any)[page] = value
      }
    }
  }
})