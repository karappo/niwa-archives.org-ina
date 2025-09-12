import { loadSpreadsheetData } from '~/utils/spreadsheet'
import { useMainStore } from '~/stores/main'
import { useAnnotationsStore } from '~/stores/annotations'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Pinia storeの初期化
  const mainStore = useMainStore()
  const annotationsStore = useAnnotationsStore()

  // 既にデータが読み込まれているかチェック（lastUpdateDateTimeが空でない場合）
  if (Object.keys(mainStore.getLastUpdateDateTime).length > 0) {
    return
  }

  try {
    // スプレッドシートデータの読み込み
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
    console.error('スプレッドシートデータの読み込みに失敗しました:', error)
  }
})
