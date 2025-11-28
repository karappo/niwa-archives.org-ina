# プロジェクト概要
Nuxt 2からNuxt 4への移行プロジェクト

## 参照用リソース
- Nuxt 2版（移行元）: `~/Sites/niwa-archives.org-ina`（mainブランチ）

## 技術スタック
- フレームワーク: Nuxt 4
- パッケージマネージャー: pnpm
- Node.js:22.18.0

## 移行状況
ほぼ完了していて、細かいバグ修正をしている状況。

## コーディング規約
- TypeScript使用
- Composition API優先

## よく使うコマンド
- 開発サーバー: `pnpm run dev`
- ビルド: `pnpm run build`
- テスト: `pnpm run test`
- デプロイ: `pnpm run deploy staging`

## デプロイ手順
「デプロイしてください」と指示された場合：
1. **devサーバーが起動していれば必ず停止する**（重要：停止しないとデプロイが失敗する可能性あり）
2. `pnpm run deploy staging` を実行する

## 注意事項
- デプロイ前にdevサーバーを停止すること