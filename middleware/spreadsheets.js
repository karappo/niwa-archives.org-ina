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
            value = new YouTube(url2obj(value))
          } else if (/\/\/youtu\.be\/([^/]*)/.test(value)) {
            key = 'youtube'
            const v = value.match(/\/\/youtu\.be\/([^/?]*)/)[1] // まずid（v）だけ取得しておく
            value = url2obj(value)
            value.v = v // vをマージ
            value = new YouTube(value)
          } else if (/\/\/drive\.google\.com/.test(value)) {
            // eslint-disable-next-line
            if (!/\/\/drive\.google\.com\/file\/d\/(.*)\/view\?/.test(value)) {
              // eslint-disable-next-line
              console.error(`"${valueOf('title')}"(${i+1}行目)の"attachment"の値が不正です。"//drive.google.com/file/d/xxxx" の形式である必要があります。`, value)
            }
            // eslint-disable-next-line
            const id = /\/\/drive\.google\.com\/file\/d\/(.*)\/view\?/.exec(value)[1]
            // GoogleDriveはアタッチメントの種類をURLから取得できないので、スプレッドシートから取得
            const type = valueOf('attachmentType')
            switch (type) {
              case 'image':
              case 'pdf':
                value = `https://drive.google.com/uc?export=view&id=${id}`
                break
              case 'movie':
                value = `https://drive.google.com/file/d/${id}/preview`
                break
              default:
                // eslint-disable-next-line
                console.error(`"${valueOf('title')}"(${i+1}行目)の"attachmentType"が間違っています`, type)
            }
            key = type
          }
        }
        data[key] = value
      })

      // cameraPositionが未設定の場合真上からにする
      if (data.position && !data.cameraPosition) {
        // eslint-disable-next-line
        data.cameraPosition = [data.position[0] - 1, data.position[1] - 3, data.position[2] + 1]
      }

      if (data.tags) {
        data.tags = data.tags.split(',').map((t) => t.trim())
      }

      // データを格納
      if (data.title && data.position) {
        collection.push(data)
      }
    }
    return collection
  }
  const url2obj = (url) => {
    const search = new URL(url).search.substring(1)
    if (search.length) {
      // eslint-disable-next-line
      return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    }
    return {}
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

class YouTube {
  #params

  constructor(params) {
    this.#params = params
  }

  embedUrl() {
    let params = { autoplay: 1 }
    params = Object.assign(params, this.#params) // 複製（autoplayを追加）
    // Remove 'v'
    delete params.v
    if (params.t) {
      // Renema 't' to 'start'
      params.start = params.t
      delete params.t
    }
    // eslint-disable-next-line
    const query = Object.keys(params).map(key => key + '=' + params[key]).join('&')
    // eslint-disable-next-line
    return `https://www.youtube.com/embed/${this.#params.v}${query.length ? '?' + query : ''}`
  }

  thumbnailUrl() {
    return `https://img.youtube.com/vi/${this.#params.v}/1.jpg`
  }
}
