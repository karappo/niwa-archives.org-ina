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
export default ({ app }, inject) => {
  inject('getIcon', (category) => {
    switch (category) {
      case 'Viewpoints/Photos':
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
  })
}
