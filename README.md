# niwa-archive-nuxt

| Environment | サーバー  | URL                        | BasicAuth(id:pw) |
|:------------|:---------|:---------------------------|:-----------------|
| Production  | TODO     | TODO                       |                  |
| Staging     | Heteml   | https://niwa.karappo.net   | niwa:archive     |
| Development | nuxt     | http://localhost:3000      |                  |

## 1. 点群データのサブサンプリング

CloudCompareを使うが、GUI（Edit > Subsampling）でやろうとすると重いので、CLIでやったほうがよい。

```sh
/Applications/CloudCompare.app/Contents/MacOS/CloudCompare -O -GLOBAL_SHIFT AUTO /path/to/raw-data.e57  -C_EXPORT_FMT E57 -SS SPATIAL 0.2 -SAVE_CLOUDS ALL_AT_ONCE
```

サブサンプリングの値は`0.1`から`0.725`くらいが良さそう。
雪舟庭のデータだと、`0.7`だと処理終了前にCCが固まってしまった。

## 2. e57 → las 変換

1. Cloudcompareで1で作成したe57ファイルを開き（CCを開いたあとでWindowにファイルをドロップしないとエラーが出て開けないかも）
2. サイドバーのDB Treeから、エンティティを選択
3. Saveでlasファイルに変換

## 3. Windows上のPotreeConverterで変換

1. Resilio Syncを使って、lasファイルを転送
2. Windows上で、コマンドプロンプトを立ち上げ、`PotreeCOnverter_2.0.1_windows_x64/PotreeConverter.exec <filename>`を実行
3. ファイルが生成される

## 4. potreeの更新

[本家リポジトリ](https://github.com/potree/potree))の `/libs` 及び `/build` ディレクトリをそのまま `/static` 下に複製して、読み込む。


## macos safari 上で表示できない

`ReferenceError: Can't find variable: WebGL2RenderingContext`
↓
開発>実験的な機能>WebGL2.0
↓
`TypeError: view.getBigInt64 is not a function. (In 'view.getBigInt64(i * bytesPerNode + 6, true)', 'view.getBigInt64' is undefined)`
↓
未解決…