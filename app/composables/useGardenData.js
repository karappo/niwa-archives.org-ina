/**
 * 庭園データを取得するcomposable
 */
export const useGardenData = () => {
  /**
   * 庭園の基本名を取得（variationを除いた部分）
   * @param {string} alias - 庭園のalias (例: 'murin_an-spring')
   * @returns {string} 基本名 (例: 'murin_an')
   */
  const getGardenBaseName = (alias) => {
    if (!alias) return ''
    const parts = alias.split('-')
    return parts.length > 1 ? parts[0] : alias
  }

  /**
   * 庭園データを取得
   * @param {string} alias - 庭園のalias
   * @returns {Promise<Object|null>} 庭園データオブジェクト
   */
  const getGardenData = async (alias) => {
    if (!alias) return null

    try {
      // まず、正確なaliasでインポートを試みる
      const gardenData = await import(`~/data/gardens/${alias}.js`)
      return gardenData.default
    } catch (error) {
      // 失敗したら、基本名でインポートを試みる
      try {
        const baseName = getGardenBaseName(alias)
        const gardenData = await import(`~/data/gardens/${baseName}.js`)
        return gardenData.default
      } catch (innerError) {
        console.error(`Garden data not found for alias: ${alias}`)
        return null
      }
    }
  }

  /**
   * 指定された庭園にHistory機能があるかチェック
   * @param {string} alias - 庭園のalias
   * @returns {Promise<boolean>} History機能の有無
   */
  const hasHistory = async (alias) => {
    const gardenData = await getGardenData(alias)
    return !!(gardenData && gardenData.historyContent)
  }

  /**
   * 指定された庭園に3D Data機能があるかチェック
   * @param {string} alias - 庭園のalias
   * @returns {Promise<boolean>} 3D Data機能の有無
   */
  const has3DData = async (alias) => {
    const gardenData = await getGardenData(alias)
    return !!(gardenData && gardenData.threeDDataContent)
  }

  return {
    getGardenBaseName,
    getGardenData,
    hasHistory,
    has3DData
  }
}
