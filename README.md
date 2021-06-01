# niwa-archive-nuxt

| Environment | サーバー  | URL                        | BasicAuth(id:pw) |
|:------------|:---------|:---------------------------|:-----------------|
| Production  | AWS S3   | https://niwa2.ycam.jp      |                  |
| Test        | Heteml   | https://niwa.karappo.net   | niwa:archive     |
| Development | nuxt     | http://localhost:3000      |                  |


Getting started

```sh
git clone --recursive git@github.com:karappo/IncompleteNiwaArchives.git

# Ready potree to create build dir.
cd static/potree
npm i
```

## デプロイ

基本的に、pointcolud/は`.depignore`で無視しているので、点群データも更新したい場合は`.depignore`を一時的に修正してdeployすること

## 1. 点群データのサブサンプリング

目的は、容量削減。CloudCompareを使うが、GUI（Edit > Subsampling）でやろうとすると重いので、CLIでやったほうがよい。

```sh
/Applications/CloudCompare.app/Contents/MacOS/CloudCompare -O -GLOBAL_SHIFT AUTO /path/to/raw-data.e57  -C_EXPORT_FMT E57 -SS SPATIAL 0.0725 -SAVE_CLOUDS ALL_AT_ONCE
```

### サブサンプリングの値

常栄寺 : `0.005`

## 2. e57 → las 変換

1. Cloudcompareで1で作成したe57ファイルを開き（CCを開いたあとでWindowにファイルをドロップしないとエラーが出て開けないかも）
2. サイドバーのDB Treeから、エンティティを選択
3. Saveでlasファイルに変換

## 3. Windows上のPotreeConverterで変換

1. Resilio Syncを使って、lasファイルを転送
2. Windows上で、コマンドプロンプトを立ち上げ、`PotreeCOnverter_2.0.1_windows_x64/PotreeConverter.exec <filename>`を実行 ※ [PotreeConverter.exec](https://www.dropbox.com/sh/anvft1ce9459uil/AADVTVpd-N5yOPq33OjnvgNfa?dl=0)
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
