// ブラウザやOSによってキーの判定方法が複雑なのでここに一元化する
//
// // 使用例
// onKeydown(e) {
//   const key = $key(e)
// }
// TODO:
// keyCodeはdeprecatedらしいので、使わない方法を模索したい
// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode

export default defineNuxtPlugin(() => {
  return {
    provide: {
      key: (e: KeyboardEvent) => {
        const key = e.key.toLowerCase()
        // OS間共通 ======================
        if (e.keyCode === 13) { // 日本語変換時の確定が反応してしまわないようにkeyCodeで判定
          return 'enter'
        }

        // Space キー
        if (e.keyCode === 32) {
          return 'space'
        }
        
        // Mac ==========================
        if (navigator.platform.includes('Mac')) {
          // Chrome以外 ------------------
          if (!navigator.userAgent.includes('Chrome')) {
            if (e.code?.toLowerCase() === 'space' && e.keyCode === 229 && !e.isComposing) {
              return 'space'
            }
          }
        }
        // Windows ======================
        else if (navigator.platform.includes('Win')) {
          // Chrome ---------------------
          if (navigator.userAgent.includes('Chrome')) {
            if ((e.code && e.code.toLowerCase() === 'space') && e.keyCode === 229 && !e.isComposing) {
              return 'space'
            }
          }
        }

        return key
      }
    }
  }
})