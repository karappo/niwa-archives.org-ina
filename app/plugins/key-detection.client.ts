// ブラウザやOSによってキーの判定方法が複雑なのでここに一元化する
//
// // 使用例
// onKeydown(e) {
//   const key = $key(e)
// }
export default defineNuxtPlugin(() => {
  return {
    provide: {
      key: (e: KeyboardEvent) => {
        const key = e.key.toLowerCase()

        // 日本語変換中は無視
        if (e.isComposing) {
          return null
        }

        // OS間共通 ======================
        if (key === 'enter') {
          return 'enter'
        }

        // Space キー
        if (key === ' ' || e.code === 'Space') {
          return 'space'
        }

        return key
      }
    }
  }
})