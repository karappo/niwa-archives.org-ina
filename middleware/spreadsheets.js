import { camelCase } from 'change-case'
export default async function ({ params, redirect, store }) {
  // 渡された配列を、1行目の値をキーとするCollectionに変換して返す
  const convertToCollection = (array) => {
    const collection = []
    const keys = array[0].values.map((x) => x.formattedValue)
    for (let i = 1; i < array.length; i++) {
      const values = array[i].values.map((x) => x.formattedValue)
      const data = {}
      values.forEach((element, index) => {
        const key = keys[index]
        let value = element
        if (!value) {
          return
        }
        // 配列化
        if (['position', 'cameraPosition'].includes(key)) {
          value = value.split(',').map((v) => parseFloat(v))
        } else if (['title', 'description'].includes(key)) {
          value = value.replace(/(\n|\r)/g, '<br>') // nl2br
        } else if (key === 'image') {
          value = value.replace('dl=0', 'raw=1') // Dropboxの共有リンクを直リンクに
        }
        data[key] = value
      })
      collection.push(data)
    }
    return collection
  }
  if (!store.state.gss) {
    const gss = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/?key=${process.env.API_KEY}&includeGridData=true`
    ).then((res) => res.json())
    gss.sheets.forEach((sheet) => {
      let data = sheet.data[0].rowData
      if (!data) {
        return
      }
      // 配列に変換
      if (!Array.isArray(data)) {
        data = Object.values(data)
      }
      data = convertToCollection(data)
      // titleが空のものは削除
      data = data.filter((x) => x.title && 0 < x.title.length)
      store.commit(`annotations/${camelCase(sheet.properties.title)}`, data)
    })
  }

  // // TODOここも整理（直接処理にできないか？）
  // // もし、下層ページでsheetIdが指定されていたら、もう一度登録してスキップされた処理を行う
  // if (store.state.sheetId != null) {
  //   store.commit('sheetId', store.state.sheetId)
  // }

  // // シートのトップページの時、リダイレクト
  // if (params.sheet && !params.sentence) {
  //   redirect(301, `/${params.sheet}/1/`)
  // }
}
