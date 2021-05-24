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
  inject('key', (e) => {
    const key = e.key.toLowerCase()
    // OS間共通 ======================
    if (e.keyCode === 13) { // 日本語変換時の確定が反応してしまわないようにkeyCodeで判定
      return 'enter'
    }
    else if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'alt', 'meta'].includes(key)) {
      return key
    }
    else if (e.keyCode === 32) {
      return 'space'
    }
    // Mac ==========================
    else if (app.$ua.is.macos) {
      // Chrome以外 ------------------
      if (!app.$ua.is.chrome) {
        if (e.code.toLowerCase() === 'space' && e.keyCode === 229 && !e.isComposing) {
          return 'space'
        }
      }
    }
    // Windows ======================
    else if (app.$ua.is.windows) {
      // Chrome ---------------------
      if (app.$ua.is.chrome) {
        if ((e.code && e.code.toLowerCase() === 'space') && e.keyCode === 229 && !e.isComposing) {
          return 'space'
        }
      }
    }
  })
}
