# niwa-archive-nuxt

| Environment | サーバー  | URL                        | BasicAuth(id:pw) |
|:------------|:---------|:---------------------------|:-----------------|
| Production  | TODO     | TODO                       |                  |
| Staging     | Heteml   | https://niwa.karappo.net   | niwa:archive     |
| Development | nuxt     | http://localhost:3000      |                  |

## 点群データのサブサンプリング

CloudCompareを使うが、GUI（Edit > Subsampling）でやろうとすると重いので、CLIでやったほうがよい。

```sh
/Applications/CloudCompare.app/Contents/MacOS/CloudCompare -O -GLOBAL_SHIFT AUTO /path/to/raw-data.e57  -C_EXPORT_FMT E57 -SS SPATIAL 0.2 -SAVE_CLOUDS ALL_AT_ONCE
```

サブサンプリングの値は`0.2`か`0.1`くらいが良さそう。
