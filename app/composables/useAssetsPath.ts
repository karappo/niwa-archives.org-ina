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
    // デバッグログ
    console.log('useAssetsPath - input path:', path)
    console.log('useAssetsPath - baseURL:', baseURL)
    console.log('useAssetsPath - fullBaseURL:', fullBaseURL)

    // 既に http:// や https:// で始まる場合はそのまま返す
    if (path.startsWith('http://') || path.startsWith('https://')) {
      console.log('useAssetsPath - returning absolute URL:', path)
      return path
    }

    // 空の場合はbaseURLを返す
    if (!path) {
      const result = fullBaseURL || baseURL
      console.log('useAssetsPath - empty path, returning:', result)
      return result
    }

    // baseURL で既に始まっている場合
    if (path.startsWith(baseURL + '/')) {
      // クライアントサイドでは完全なURLを返す
      const result = fullBaseURL ? `${fullBaseURL}${path.substring(baseURL.length)}` : path
      console.log('useAssetsPath - already has baseURL, returning:', result)
      return result
    }

    // / で始まる場合は、既に /ina/ が含まれているかチェック
    if (path.startsWith('/')) {
      // /ina/... の形式の場合
      if (path.startsWith(baseURL + '/') || path.startsWith(baseURL)) {
        const result = fullBaseURL ? `${fullBaseURL}${path.substring(baseURL.length)}` : path
        console.log('useAssetsPath - starts with baseURL, returning:', result)
        return result
      }
      // /assets/... のような形式の場合は baseURL を付与
      const result = fullBaseURL ? `${fullBaseURL}${path}` : `${baseURL}${path}`
      console.log('useAssetsPath - adding baseURL to absolute path:', result)
      return result
    }

    // 相対パスの場合（sound/..., pointclouds/... のような形式）
    // 自動的に assets/ を前に追加し、完全なURLを生成
    const result = fullBaseURL ? `${fullBaseURL}/assets/${path}` : `${baseURL}/assets/${path}`
    console.log('useAssetsPath - relative path, final result:', result)
    return result
  }
}
