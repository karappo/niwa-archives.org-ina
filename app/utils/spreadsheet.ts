import { camelCase } from 'change-case'
import type { Annotation } from '~/stores/annotations'

interface SpreadsheetData {
  lastUpdateDateTime: Record<string, string>
  annotations: Record<string, Annotation[]>
}

const removeParams = (url: string): string => {
  const urlObj = new URL(url)
  return urlObj.origin + urlObj.pathname
}

const url2obj = (url: string): Record<string, string> => {
  const search = new URL(url).search.substring(1)
  if (search.length) {
    return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  }
  return {}
}

// 渡された配列を、1行目の値をキーとするCollectionに変換して返す
const convertToCollection = (array: any[]): Annotation[] => {
  const collection: Annotation[] = []
  const keys: string[] = array[1].values.map((x: any) => x.formattedValue)
  for (let i = 2; i < array.length; i++) {
    // ===== データ整形 =====
    if (array[i].values && array[i].values.length) {
      const values: string[] = array[i].values.map((x: any) => x.formattedValue)
      const data: any = {}
      const valueOf = (_key: string): string | undefined => values[keys.indexOf(_key)]
      values.forEach((element, index) => {
        let key: string | undefined = keys[index]
        let value: any = element
        if (!value || !key) {
          return
        }
        // 配列化
        if (['position', 'cameraPosition', 'cameraTarget'].includes(key)) {
          // 数値以外の文字列が入っていたら無効化
          if (/^[-0-9., ]+$/.test(value)) {
            value = value.split(',').map((v: string) => parseFloat(v))
          } else {
            value = null
          }
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
            const match = value.match(/\/\/youtu\.be\/([^/?]*)/)
            const v = match ? match[1] : '' // まずid（v）だけ取得しておく
            const urlObj = url2obj(value)
            urlObj.v = v // vをマージ
            value = new YouTube(urlObj)
          } else if (/\/\/drive\.google\.com/.test(value)) {
            if (!/\/\/drive\.google\.com\/file\/d\/(.*)\/view\??/.test(value)) {
              console.error(`"${valueOf('title')}"(${i+1}行目)の"attachment"の値が不正です。"//drive.google.com/file/d/xxxx" の形式である必要があります。`, value)
            }
            const match = /\/\/drive\.google\.com\/file\/d\/(.*)\/view\??/.exec(value)
            const id = match ? match[1] : ''
            // GoogleDriveはアタッチメントの種類をURLから取得できないので、スプレッドシートから取得（'movie'は2024/7に削除したので現在は'image','pdf'のみ）
            const type = valueOf('attachmentType')
            switch (type) {
              case 'image':
                value = `https://drive.google.com/thumbnail?id=${id}&sz=w2000`
                break
              case 'pdf':
                value = `https://drive.google.com/uc?export=view&id=${id}`
                break
              default:
                console.error(`"${valueOf('title')}"(${i+1}行目)の"attachmentType"が間違っています`, type)
            }
            key = type
          } else if (
            // WordPressのメディアライブラリ
            /\/\/(stg\.)?niwa-archives.org\/wp\/wp-content\/uploads\//.test(value)
          ) {
            if (/\.(apng|avif|gif|png|jpe?g|tiff?|webp)$/i.test(value)) {
              key = 'image'
            } else if (/\.pdf$/i.test(value)) {
              key = 'pdf'
            } else if (
              /\.(m4v|mov|mp4|mpeg|mpg|ogg|qt|webm|wmv)$/i.test(value)
            ) {
              key = 'movie'
            }
          }
        }
        if (key) {
          data[key] = value
        }
      })
      // ===== /データ整形 =====
      // ===== バリデーション（この時点で要件を満たさないものはふるい落とす） =====
      if (!(data.id && data.title && data.position && data.category)) {
        continue
      }
      // ===== 追加のデータ整形 =====
      if (data.tags) {
        data.tags = data.tags.split(',').map((t: string) => t.trim())
      }
      if (data.cameraTarget) {
        data.cameraPosition = data.position
      } else {
        // cameraTargetがない場合はpositionで代替
        data.cameraTarget = data.position

        if (!data.cameraPosition) {
          // cameraPositionが未設定の場合、決め打ちのcameraPositionを設定
          data.cameraPosition = [data.position[0] - 1, data.position[1] - 3, data.position[2] + 1]
        }
      }
      // ===== データ格納 =====
      collection.push(data)
    }
  }
  return collection
}

export async function loadSpreadsheetData(): Promise<SpreadsheetData> {
  const config = useRuntimeConfig()
  const SPREADSHEET_ID = config.public.spreadsheetId as string
  const API_KEY = config.public.apiKey as string

  if (!SPREADSHEET_ID || !API_KEY) {
    throw new Error('Spreadsheet ID or API key is not configured in environment variables')
  }

  const gss: any = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/?key=${API_KEY}&includeGridData=true`
  ).then((res) => res.json())

  if (gss.error) {
    console.log('Spreadsheetの読み込みでエラー発生')
    console.log(...gss.error)
    throw new Error('Failed to load spreadsheet data')
  }

  const result: SpreadsheetData = {
    lastUpdateDateTime: {},
    annotations: {}
  }

  gss.sheets.forEach((sheet: any) => {
    let data = sheet.data[0].rowData
    if (!data) {
      return
    }
    // 配列に変換
    if (!Array.isArray(data)) {
      data = Object.values(data)
    }

    // 更新日時の登録
    const key = camelCase(sheet.properties.title)
    const value = data[0].values[0].formattedValue
    result.lastUpdateDateTime[key] = value

    data = convertToCollection(data)
    // titleが空のものは削除
    data = data.filter((x: any) => x.title && 0 < x.title.length)
    result.annotations[key] = data
  })

  return result
}

class YouTube {
  private _params: Record<string, any>

  constructor(params: Record<string, any>) {
    this._params = params
  }

  getParams(): Record<string, any> {
    let params: Record<string, any> = { autoplay: 1 }
    params = Object.assign(params, this._params) // 複製（autoplayを追加）
    // Remove 'v'
    delete params.v
    if (params.t) {
      // Renema 't' to 'start'
      params.start = params.t
      delete params.t
    }
    return params
  }

  embedUrl(): string {
    const params = this.getParams()
    const query = Object.keys(params).map(key => key + '=' + params[key]).join('&')
    return `https://www.youtube.com/embed/${this._params.v}${query.length ? '?' + query : ''}`
  }

  id(): string {
    return this._params.v
  }

  thumbnailUrl(): string {
    // 1,2,3は自動作成されるサムネイルで、0はカスタムサムネイル（未設定の場合は1-3のうち選択された画像）
    // 0が一番解像度高いので0にする
    return `https://img.youtube.com/vi/${this._params.v}/0.jpg`
  }
}