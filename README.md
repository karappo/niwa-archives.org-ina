# Incomplete Niwa Archives

| Environment   | サーバー  | URL                                  | BasicAuth(id:pw) |
|:--------------|:---------|:-------------------------------------|:-----------------|
| Production    | さくら    | https://niwa-archives.org/ina/       |                  |
| Staging       | Heteml   | https://stg.niwa-archives.org/ina/   | niwa:archives    |
| Development   | nuxt     | http://localhost:3000/ina/           |                  |

- [データシート](https://docs.google.com/spreadsheets/d/1F7sd4dz2FHWiagmLGDLwmeUK1U3XCWhjIApzdLXyRmo/edit#gid=0)
- [ファイル保存先](https://drive.google.com/drive/u/0/folders/1mwweu4PCDgja-3FXoQ1Pl4zvc-W9X_in)


# デバッグモード

## debug
例: `/joei_ji/?debug=1`<br>
点群の左上に4px角の透明なボタンを表示して、サイドバーを表示する

## info
例: `/joei_ji/?info=1`<br>
現在のモード（Low Performance Modeかどうか）を画面上に表示する

# パーマリンク

カメラ位置とサイドバーの状態をURLクエリパラメータに反映する。ユーザーがUIを操作するたびに `history.replaceState` でURLが書き換わり、そのURLを開けば同じ状態を再現できる。

書き込みはカメラが停止したタイミングで行う（移動中は保留）。デフォルト状態のパラメータは出力しない。

## クエリパラメータ

| キー | 意味 | 値の形式 |
|---|---|---|
| `position` | カメラ位置 | `x;y;z`（小数点3桁、Potree同梱 `loadSettingsFromURL` 互換） |
| `target` | 注視点 | `x;y;z`（同上） |
| `open` | ドロワーで開いている画面 | 単一スラグ |
| `annotation` | DrawerAnnotationで表示中のアノテーションID | スプレッドシート上のidをそのまま |
| `hide` | チェックを外しているvisibilityキー | hybrid形式のカンマ区切り |
| `filter` | DrawerList内のタグフィルタ | `listData.tagIndexStr`をそのまま |

## `open=` のスラグ

ページ名を `lowercase` + 空白を `-` に。`/` はそのまま残す。

| ストアのpageName | open=の値 |
|---|---|
| `History` / `Plans` / `3D Data` | `history` / `plans` / `3d-data` |
| `Annotations` | `annotations` |
| `Viewpoints` / `Viewpoints/Still Images` / `Viewpoints/Movies` | `viewpoints` / `viewpoints/still-images` / `viewpoints/movies` |
| `Elements` / `Elements/Stones` / ... / `Elements/DNA Data` | `elements` / `elements/stones` / ... / `elements/dna-data` |
| `Oral Archives` | `oral-archives` |
| `Guided Tour` / `Ramble Tour` | `guided-tour` / `ramble-tour` |

## `hide=` のスラグ（hybrid形式）

### 圧縮ルール（書き出し）

1. 全leafがhidden → `hide=annotations`
2. 特定グループの全leafがhidden → 親キーに圧縮（例: `viewpoints`, `elements`）
3. 同一親グループの子が連続する場合 → 2番目以降の `親/` プレフィックスを省略

| 状態 | URL |
|---|---|
| Elements/Plants, Creatures, Artifacts, DNA Data がoff | `hide=elements/plants,creatures,artifacts,dna-data` |
| Viewpoints/Movies + Elements/Plants, Creatures がoff | `hide=viewpoints/movies,elements/plants,creatures` |
| Viewpoints全部off + Oral Archives off | `hide=viewpoints,oral-archives` |
| Elements全部off | `hide=elements` |
| 全leaf off | `hide=annotations` |

### パースルール（読み込み）

カンマで分割して左から順に処理:

| トークン | 解釈 |
|---|---|
| `親/子`（例: `elements/plants`） | `親/子` キーをhide。currentGroupを更新 |
| 既知の親/単独キー（`annotations`, `viewpoints`, `elements`, `oral-archives`） | そのキーをhide。currentGroupをリセット |
| 上記以外のbareトークン | 直前のcurrentGroupの子として解釈 |
| 上記いずれにも該当しない | スキップ |

復元時は各キーに `mainStore.setAnnotationVisibilities(key, false)` を呼ぶ。親キーを渡すとストアのカスケード処理で子も全部 false になる。

## 不正な値・予期せぬパラメータの扱い

| ケース | 挙動 | URL の最終状態 |
|---|---|---|
| 関係ないパラメータ（例: `utm_source=foo`）| 完全に無視されつつ保持される | そのまま残る |
| 既存の `debug=1` / `info=1` | パーマリンク機能から無視されつつ保持される | そのまま残る |
| 不正な `open=nonsense` | スキップ（state変更なし）| 復元完了後のwriteUrlで`open=`削除 |
| `hide=` 内の不明トークン | 該当トークンのみスキップ、有効なものは処理 | writeUrlが再構築するので有効なものだけ残る |
| 不正な `annotation=nonexistent` | `console.error` を出して`annotationData`セットせず | writeUrlで`annotation=`削除 |
| 空値（`open=` / `hide=` / `annotation=`）| falsy判定でスキップ | 削除 |
| 不正な `filter=abc`（数字以外）| バリデーションで弾く、`tagIndexStr`セットせず | writeUrlで`filter=`削除 |
| 不正な `position=` / `target=`（NaN等）| `loadSettingsFromURL()`の前にURLから削除、`mainStore`保存値または`initCamera()`にフォールバック | 削除 |

書き込みは `writeUrl()` が「現状の state を元に URL を再構築する」方式なので、復元後の最初の書き込みで不正値は自動的にクリーンアップされる。

## 実装場所

`app/pages/[alias].vue`
- `writeUrl()`: 状態 → URL
- `restoreFromUrl()`: URL → 状態（Potree初期化後・アノテーション登録後に1回だけ実行）
- `urlSyncEnabled`: restore完了までURL書き込みを抑止するフラグ
- `urlSyncDirty`: サイドバー状態変化時に立つフラグ。カメラポーリングが停止検知時に書き込む
- `isValidVec3Slug()`: `position=` / `target=` の値のバリデーション

# ウェブフォント

FONTPLUS: https://fontplus.jp/users/login
アカウント: info@karappo.net

## Getting started

public/assets/pointclouds/に点群データ一式を追加


```sh
# M1以降のMacの場合で、nodeのインストールに失敗する場合は、archコマンドを使ってインストールすること
arch -x86_64 nodenv install xx.xx.xx
```

```sh
git clone --recursive git@github.com:karappo/IncompleteNiwaArchives.git

# Ready potree to create build dir.
cd public/assets/potree
npm install
npm run build

cd ../../../
pnpm install
pnpm run dev
```

もし、spreadsheetが読み込めず`Spreadsheetの読み込みでエラー発生`が出る場合は、[GoogleCloudPlatform](https://console.cloud.google.com/apis/credentials/key/c238b06c-505e-4198-91bf-6557605ab380?hl=ja&project=proxies-of-client)の管理画面から、ウェブサイトの制限のところにドメインまたはIPを追加すること。

## デプロイ

基本的に、pointcolud/は`.depignore`で無視しているので、点群データも更新したい場合は`.depignore`を一時的に修正してdeployすること

```sh
pnpm run deploy (procution|staging)
```


## potreeのソースコードを修正する場合

`./public/assets/potree`にサブモジュールとして配置しているpotreeのforkを編集する場合は、`pnpm run start`しておくこと。
また、編集内容が確定したら`pnpm run build`をして、potreeリポジトリ側をcommitし、IncompleteNiwaArchivesのリポジトリにもcommitする。

## アノテーションに紐付ける画像のサイズはFullHD（1920x1080）とする

GoogleDriveをFinderにローカル同期し、下記実行すると大きいものはリサイズされる

```sh
for f in **/*.JPG; do convert "$f" -resize 1920\> "$f"; done
```
※ imagemagicが必要


## 庭の増やし方

[INAページ追加手順（原さん用）](https://docs.google.com/document/d/15qDdliMnK17ZpU8oKGiXVrO0Ex1hIu3RtPIN8p4gl_M/edit?fbclid=IwY2xjawNivYVleHRuA2FlbQIxM)

1. 点群データを格納
2. nuxt.config
   1. nitro.prerender.routes にルートを追加
   2. sitemap.urls にルートを追加
3. app/stores/annotations を編集
4. app/data/gardens 下にjsを追加
5. スプレッドシートのデータにシートを作成
   1. 初回は権限の問題があるので、「スクリプト＞ランダムなIDを作成して選択中のセルにペースト」を一度実行しておくこと！

## Potreeのサイドバーを表示する方法

画面の左上数ピクセルの透明なボタンがあるので、カーソルを合わせると形状が変化することで場所を特定し、Shiftキーを押しながらクリックするとサイドバーが現れる。

## 点群テータの重さ参考

fugetsu_ro-autumn 3.12GB
fugetsu_ro-spring 2.34GB
fugetsu_ro-summer 10.14GB 最重
fugetsu_ro-winter 8.83GB
joei_ji 6.26GB
murin_an-snow 1.52GB 最軽
murin_an-summer 2.6GB
murin_an-winter 2.68GB
rikugi_en 4.22GB
ryogen_in 1.61GB

## よくあるエラー

### JSONエラー
consoleに下記のようなエラーがある場合、pointcloud/のデータを確認する。
```
Uncaught (in promise) SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON  VM6642:1
```

### 型定義の更新
型定義が見つからない等のエラーがCursorで出る時、修正後にTypeScriptサーバーを再起動してみる。
1. VS Code/Cursorのコマンドパレットを開く (Cmd+Shift+P)
2. "TypeScript: Restart TS Server" を実行


# ビルド成果物をローカルで確認する方法

```sh
pnpm run preview-build
```

ブラウザでhttp://localhost:3000/ina/にアクセスすると、ビルド成果物が確認できる。
devサーバーでは起こらないエラーの確認時にしよう。制的ファイルでの動作確認ができる。
