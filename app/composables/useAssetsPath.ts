/**
 * アセットパスにbaseURLとassetsディレクトリを付与するcomposable
 * Nuxtのapp.baseURLを考慮して、正しい絶対パスを生成します
 *
 * @example
 * assetsPath('sound/file.mp3') → '/ina/assets/sound/file.mp3'
 * assetsPath('pointclouds/data.json') → '/ina/assets/pointclouds/data.json'
 */
export const useAssetsPath = () => {
  // クライアントサイドでより確実にbaseURLを取得
  let baseURL = '/ina' // デフォルト値
  let fullBaseURL = '' // 完全なベースURL（プロトコル+ドメイン付き）

  if (import.meta.client && typeof window !== 'undefined') {
    // window.__NUXT__.config から直接取得（最も確実）
    const nuxtConfig = (window as any).__NUXT__?.config
    if (nuxtConfig?.app?.baseURL) {
      baseURL = nuxtConfig.app.baseURL.replace(/\/$/, '') // 末尾の / を削除
    }
    // 完全なベースURLを生成（ブラウザの現在のオリジン + baseURL）
    fullBaseURL = window.location.origin + baseURL
  } else {
    // サーバーサイドまたはビルド時
    const config = useRuntimeConfig()
    baseURL = (config.app.baseURL || '/ina').replace(/\/$/, '')
    fullBaseURL = baseURL // サーバーサイドでは相対パスのまま
  }

  return (path: string): string => {
    // 既に http:// や https:// で始まる場合はそのまま返す
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }

    // 空の場合はbaseURLを返す
    if (!path) {
      return fullBaseURL || baseURL
    }

    // baseURL で既に始まっている場合
    if (path.startsWith(baseURL + '/')) {
      // クライアントサイドでは完全なURLを返す
      return fullBaseURL ? `${fullBaseURL}${path.substring(baseURL.length)}` : path
    }

    // / で始まる場合は、既に /ina/ が含まれているかチェック
    if (path.startsWith('/')) {
      // /ina/... の形式の場合
      if (path.startsWith(baseURL + '/') || path.startsWith(baseURL)) {
        return fullBaseURL ? `${fullBaseURL}${path.substring(baseURL.length)}` : path
      }
      // /assets/... のような形式の場合は baseURL を付与
      return fullBaseURL ? `${fullBaseURL}${path}` : `${baseURL}${path}`
    }

    // 相対パスの場合（sound/..., pointclouds/... のような形式）
    // 自動的に assets/ を前に追加し、完全なURLを生成
    return fullBaseURL ? `${fullBaseURL}/assets/${path}` : `${baseURL}/assets/${path}`
  }
}
