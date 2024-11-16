# Incomplete Niwa Archives

| Environment   | サーバー  | URL                              | BasicAuth(id:pw) |
|:--------------|:---------|:---------------------------------|:-----------------|
| Production    | さくら    | https://niwa-archives.org/       |                  |
| Staging       | Heteml   | https://stg.niwa-archives.org/   | niwa:archives    |
| Development   | nuxt     | http://localhost:3000            |                  |

※ トップページのみ残存

- [データシート](https://docs.google.com/spreadsheets/d/1F7sd4dz2FHWiagmLGDLwmeUK1U3XCWhjIApzdLXyRmo/edit#gid=0)
- [ファイル保存先](https://drive.google.com/drive/u/0/folders/1mwweu4PCDgja-3FXoQ1Pl4zvc-W9X_in)


# デバッグモード

## debug
例: `/joei_ji/?debug=1`<br>
点群の左上に4px角の透明なボタンを表示して、サイドバーを表示する

## info
例: `/joei_ji/?info=1`<br>
現在のモード（Low Performance Modeかどうか）を画面上に表示する

# ウェブフォント

FONTPLUS: https://fontplus.jp/users/login
アカウント: info@karappo.net

## Getting started

```sh
# M1以降のMacの場合で、nodeのインストールに失敗する場合は、archコマンドを使ってインストールすること
arch -x86_64 nodenv install xx.xx.xx
```

```sh
git clone --recursive git@github.com:karappo/IncompleteNiwaArchives.git

# Ready potree to create build dir.
cd static/potree
npm i

cd ../../
yarn
yarn dev
```

もし、spreadsheetが読み込めず`Spreadsheetの読み込みでエラー発生`が出る場合は、[GoogleCloudPlatform](https://console.cloud.google.com/apis/credentials/key/c238b06c-505e-4198-91bf-6557605ab380?hl=ja&project=proxies-of-client)の管理画面から、ウェブサイトの制限のところにドメインまたはIPを追加すること。

## デプロイ

基本的に、pointcolud/は`.depignore`で無視しているので、点群データも更新したい場合は`.depignore`を一時的に修正してdeployすること

```sh
yarn deploy (procution|staging)
```

## 1. 点群データのサブサンプリング

目的は、容量削減。CloudCompareを使うが、GUI（Edit > Subsampling）でやろうとすると重いので、CLIでやったほうがよい。

```sh
/Applications/CloudCompare.app/Contents/MacOS/CloudCompare -O -GLOBAL_SHIFT AUTO /path/to/raw-data.e57  -C_EXPORT_FMT E57 -SS SPATIAL 0.0725 -SAVE_CLOUDS ALL_AT_ONCE
```

### サブサンプリングの値

常栄寺 : `0.005`
無鄰菴 : `0.001`

## 2. e57 → las 変換

1. Cloudcompareで1で作成したe57ファイルを開き（CCを開いたあとでWindowにファイルをドロップしないとエラーが出て開けないかも）
2. サイドバーのDB Treeから、エンティティを選択
3. Saveでlasファイルに変換

## 3. Windows上のPotreeConverterで変換

1. Resilio Syncを使って、lasファイルを転送
2. Windows上で、コマンドプロンプトを立ち上げ、`PotreeCOnverter_2.0.1_windows_x64/PotreeConverter.exe <filename>`を実行 ※ [PotreeConverter.exec](https://www.dropbox.com/sh/anvft1ce9459uil/AADVTVpd-N5yOPq33OjnvgNfa?dl=0)
3. ファイルが生成される

## macos safari 上で表示できない

`ReferenceError: Can't find variable: WebGL2RenderingContext`
↓
開発>実験的な機能>WebGL2.0
↓
`TypeError: view.getBigInt64 is not a function. (In 'view.getBigInt64(i * bytesPerNode + 6, true)', 'view.getBigInt64' is undefined)`
↓
未解決…

## potreeのソースコードを修正する場合

`./static/potree`にサブモジュールとして配置しているpotreeのforkを編集する場合は、`npm run start`しておくこと。
また、編集内容が確定したら`npm run build`をして、potreeリポジトリ側をcommitし、IncompleteNiwaArchivesのリポジトリにもcommitする。

## アノテーションに紐付ける画像のサイズはFullHD（1920x1080）とする

GoogleDriveをFinderにローカル同期し、下記実行すると大きいものはリサイズされる

```sh
for f in **/*.JPG; do convert "$f" -resize 1920\> "$f"; done
```
※ imagemagicが必要


## 庭の増やし方

1. 点群データを格納
1. nuxt.config.js にルートを追加
1. store/annotation.js を編集
1. data/gardens 下にjsを追加

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
ryogen_in 1.61GB
