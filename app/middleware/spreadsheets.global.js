import { useMainStore } from '~/stores/main'
import { useAnnotationsStore } from '~/stores/annotations'
import { loadSpreadsheetData } from '~/utils/spreadsheet'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // クライアントサイドでのみ実行
  if (process.client) {
    // Pinia storeの初期化
    const mainStore = useMainStore()
    const annotationsStore = useAnnotationsStore()

    // 既にデータが読み込まれているかチェック（lastUpdateDateTimeが空でない場合）
    if (Object.keys(mainStore.getLastUpdateDateTime).length > 0) {
      return
    }

    try {
      const spreadsheetData = await loadSpreadsheetData()

      // 更新日時をmainストアに保存
      for (const [key, value] of Object.entries(spreadsheetData.lastUpdateDateTime)) {
        mainStore.setLastUpdateDateTime(key, value)
      }

      // アノテーションデータをannotationsストアに保存
      for (const [key, value] of Object.entries(spreadsheetData.annotations)) {
        annotationsStore.setPageAnnotations(key, value)
      }
    } catch (error) {
      console.error('Failed to load spreadsheet data:', error)
      throw error // ページ遷移を止めるためにエラーを再スロー
    }
  }
})
