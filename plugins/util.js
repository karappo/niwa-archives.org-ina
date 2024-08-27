/* eslint-disable */
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
export default ({ app }, inject) => {
  inject('getTitle', (category) => {
    return category
      .split('/')
      .filter((a) => a.length) // ''を削除
      .pop()
  }),
  inject('getTags', (annotations) => {
    return _uniq(_flattenDeep(_map(annotations, (o) => o.tags)))
      .filter((o) => o)
      .sort()
  }),
  inject('garden', (route) => {
    // 'joei_ji', 'murin_an' などを返す
    const arr = route.params.alias.split('-')
    if (2 <= arr.length) {
      return arr[0]
    } else {
      return route.params.alias
    }
  }),
  inject('variation', (route) => {
    // 'summer', 'snow' などを返す
    const arr = route.params.alias.split('-')
    if (2 <= arr.length) {
      return arr[1]
    } else {
      return null
    }
  })
  inject('isIPad13', isIPad13),
  inject('isMobileOrTablet', () => {
    return app.$device.isMobileOrTablet || isIPad13()
  })
}
