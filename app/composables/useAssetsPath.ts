/**
 * アセットパスにbaseURLとassetsディレクトリを付与するcomposable
 * Nuxtのapp.baseURLを考慮して、正しい絶対パスを生成します
 *
 * @example
 * assetsPath('sound/file.mp3') → '/ina/assets/sound/file.mp3'
 * assetsPath('pointclouds/data.json') → '/ina/assets/pointclouds/data.json'
 */
export const useAssetsPath = () => {
  const config = useRuntimeConfig()
  const baseURL = (config.app.baseURL || '/').replace(/\/$/, '') // 末尾の / を削除

  return (path: string): string => {
    // 既に http:// や https:// で始まる場合はそのまま返す
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }

    // 空の場合はbaseURLを返す
    if (!path) {
      return baseURL
    }

    // baseURL で既に始まっている場合はそのまま返す
    if (path.startsWith(baseURL + '/')) {
      return path
    }

    // / で始まる場合は、既に /ina/ が含まれているかチェック
    if (path.startsWith('/')) {
      // /ina/... の形式の場合はそのまま返す
      if (path.startsWith(baseURL + '/') || path.startsWith(baseURL)) {
        return path
      }
      // /assets/... のような形式の場合は baseURL を付与
      return `${baseURL}${path}`
    }

    // 相対パスの場合（sound/..., pointclouds/... のような形式）
    // 自動的に assets/ を前に追加
    return `${baseURL}/assets/${path}`
  }
}
