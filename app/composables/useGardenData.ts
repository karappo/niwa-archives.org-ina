/**
 * 庭園データを取得するcomposable
 */
import type { GardenData } from '../../types/garden'
export const useGardenData = () => {
  /**
   * 庭園の基本名を取得（variationを除いた部分）
   * @param alias - 庭園のalias (例: 'murin_an-spring')
   * @returns 基本名 (例: 'murin_an')
   */
  const getGardenBaseName = (alias: string): string => {
    if (!alias) return ''
    const parts = alias.split('-')
    return parts.length > 1 ? parts[0] as string : alias
  }

  /**
   * 庭園データを取得
   * @param alias - 庭園のalias
   * @returns 庭園データオブジェクト
   */
  const getGardenData = async (alias: string): Promise<GardenData | null> => {
    if (!alias) return null

    try {
      // まず、正確なaliasでインポートを試みる
      const gardenData = await import(`~/data/gardens/${alias}.js`)
      return gardenData.default as GardenData
    } catch (error) {
      // 失敗したら、基本名でインポートを試みる
      try {
        const baseName = getGardenBaseName(alias)
        const gardenData = await import(`~/data/gardens/${baseName}.js`)
        return gardenData.default as GardenData
      } catch (innerError) {
        console.error(`Garden data not found for alias: ${alias}`)
        return null
      }
    }
  }

  /**
   * 指定された庭園にHistory機能があるかチェック
   * @param alias - 庭園のalias
   * @returns History機能の有無
   */
  const hasHistory = async (alias: string): Promise<boolean> => {
    const gardenData = await getGardenData(alias)
    return !!(gardenData && gardenData.historyContent)
  }

  /**
   * 指定された庭園に3D Data機能があるかチェック
   * @param alias - 庭園のalias
   * @returns 3D Data機能の有無
   */
  const has3DData = async (alias: string): Promise<boolean> => {
    const gardenData = await getGardenData(alias)
    return !!(gardenData && gardenData.threeDDataContent)
  }

  /**
   * 指定された庭園にGuided Tour機能があるかチェック
   * @param alias - 庭園のalias
   * @returns Guided Tour機能の有無
   */
  const hasGuidedTour = async (alias: string): Promise<boolean> => {
    const gardenData = await getGardenData(alias)
    return !!(gardenData && gardenData.guidedTour && gardenData.guidedTour.length > 0)
  }

  return {
    getGardenBaseName,
    getGardenData,
    hasHistory,
    has3DData,
    hasGuidedTour
  }
}
