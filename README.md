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
cd public/assets/potree
pnpm install

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
2. nuxt.config.js にルートを追加
3. store/annotation.js を編集
4. data/gardens 下にjsを追加
5. スプレッドシートのデータにシートを作成
5. nuxt.config.ts の sitemapにルートを追加

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
pnpm run generate
pnpm run preview-build
```

ブラウザでhttp://localhost:8080/ina/にアクセスすると、ビルド成果物が確認できる。
devサーバーでは起こらないエラーの確認時にしよう。制的ファイルでの動作確認ができる。
