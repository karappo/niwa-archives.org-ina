/* eslint-disable */
// ブラウザやOSによってキーの判定方法が複雑なのでここに一元化する
//
// // 使用例
// onKeydown(e) {
//   const key = this.$key(e)
// }
// TODO:
// keyCodeはdeprecatedらしいので、使わない方法を模索したい
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
//
// Dependencies:
// - [nuxt-ua](https://www.npmjs.com/package/nuxt-ua)
//
import _flattenDeep from 'lodash/flattenDeep'
import _map from 'lodash/map'
import _uniq from 'lodash/uniq'
export default ({ app }, inject) => {
  inject('getIcon', (category) => {
    switch (category) {
      case 'Viewpoints/Still Images':
        return ''
      case 'Viewpoints/Movies':
        return ''
      case 'Elements/Stones':
        return ''
      case 'Elements/Plants':
        return ''
      case 'Elements/Creatures':
        return ''
      case 'Elements/Artifacts':
        return ''
      case 'Elements/DNA Data':
        return ''
      case 'Oral Archives':
        return ''
    }
    return null
  })
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
}
