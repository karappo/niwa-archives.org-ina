import { camelCase } from 'change-case'

const removeParams = (url) => {
  url = new URL(url)
  return url.origin + url.pathname
}
export default async function ({ params, redirect, store }) {
  // 渡された配列を、1行目の値をキーとするCollectionに変換して返す
  const convertToCollection = (array) => {
    const collection = []
    const keys = array[0].values.map((x) => x.formattedValue)
    for (let i = 1; i < array.length; i++) {
      const values = array[i].values.map((x) => x.formattedValue)
      const data = {}
      const valueOf = (_key) => values[keys.indexOf(_key)]
      values.forEach((element, index) => {
        let key = keys[index]
        let value = element
        if (!value) {
          return
        }
        // 配列化
        if (['position', 'cameraPosition'].includes(key)) {
          value = value.split(',').map((v) => parseFloat(v))
        } else if (key === 'attachment') {
          // アタッチメントの種類に応じてkeyも切り替える。
          // これにより、「image, youtubeなど、別々のキーにしてそのうちいずれか一つ」というような難しい制限と同じ効果が得られる。
          if (/\/\/www\.dropbox\.com/.test(value)) {
            value = removeParams(value)
            if (/\.(gif|png|jpe?g)$/i.test(value)) {
              key = 'image'
            } else if (/\.pdf$/i.test(value)) {
              key = 'pdf'
            }
            // 通常共有リンクの`?dl=0`が付いているはずなので、一旦除去し、最後に`?raw=1`をつけて直リンクにする
            value = value + '?raw=1'
          } else if (/\/\/www\.youtube\.com/.test(value)) {
            key = 'youtube'
            value = new URL(value).searchParams.get('v')
          } else if (/\/\/youtu\.be\/([^/]*)/.test(value)) {
            key = 'youtube'
            value = value.match(/\/\/youtu\.be\/([^/]*)/)[1]
          } else if (/\/\/drive\.google\.com/.test(value)) {
            // eslint-disable-next-line
            const id = /\/\/drive\.google\.com\/file\/d\/(.*)\/view\?/.exec(value)[1]
            // GoogleDriveはアタッチメントの種類をURLから取得できないので、スプレッドシートから取得
            const type = valueOf('attachmentType')
            value = `https://drive.google.com/uc?export=view&id=${id}`
            if (!['image', 'pdf'].includes(type)) {
              // eslint-disable-next-line
              console.error(`Wrong "attachmentType" for ${valueOf('title')} (row:${i+1})`, type)
            }
            key = type
          }
        }
        data[key] = value
      })
      // positionが未記入のものは登録しない
      if (data.position) {
        collection.push(data)
      }
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
