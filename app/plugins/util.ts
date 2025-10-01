import _flattenDeep from 'lodash/flattenDeep'
import _map from 'lodash/map'
import _uniq from 'lodash/uniq'

// iPad13+は、検知できないので自前で判定
// https://www.bit-hive.com/articles/20190820
const isIPad13 = () => {
  if (
    navigator.platform === 'MacIntel' &&
    navigator.userAgent.includes('Safari') &&
    !navigator.userAgent.includes('Chrome')
  ) {
    if (navigator.standalone !== undefined) {
      // iPad OS Safari
      return true
    } else {
      // macOS Safari
    }
  }
  return false
}

export default defineNuxtPlugin((nuxtApp) => {
  const { $device } = nuxtApp

  return {
    provide: {
      getTitle: (category: string) => {
        return category
          .split('/')
          .filter((a) => a.length) // ''を削除
          .pop()
      },
      getTags: (annotations: any[]) => {
        return _uniq(_flattenDeep(_map(annotations, (o) => o.tags)))
          .filter((o) => o)
          .sort()
      },
      garden: (route: any) => {
        // 'joei_ji', 'murin_an' などを返す
        const arr = route.params.alias.split('-')
        if (2 <= arr.length) {
          return arr[0]
        } else {
          return route.params.alias
        }
      },
      variation: (route: any) => {
        // 'summer', 'snow' などを返す
        const arr = route.params.alias.split('-')
        if (2 <= arr.length) {
          return arr[1]
        } else {
          return null
        }
      },
      isIPad13,
      isMobileOrTablet: () => {
        // TODOここ動作している？
        return $device.isMobileOrTablet || isIPad13()
      }
    }
  }
})