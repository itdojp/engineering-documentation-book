# エンジニアリングドキュメント実践ガイド：README・手順書・Runbook・ADR・ポストモーテム

## 概要

実務で使える技術ドキュメント成果物（README / 手順書 / Runbook / ADR / 障害報告・ポストモーテム等）の設計と運用を扱う。

## オンライン版（公開 URL）

- GitHub Pages: `https://itdojp.github.io/engineering-documentation-book/`
- 入口: `docs/index.md`

## 開発（ローカル）

### 前提

- Node.js（`npm`）
- （推奨）Podman または Docker（Ruby が無い環境でも `npm start` / `npm run build` を実行可能）
- Ruby + Bundler（導入済みの場合はそれを利用）

### 手順

```bash
npm ci

# Ruby/Bundler が無い場合は Podman/Docker を利用します（初回は image pull + bundle install が走ります）

# プレビュー
npm start

# ビルド
npm run build

# メタデータ整合性チェック
npm run check:metadata

# テスト（metadata / reader UX / markdown lint / link check）
npm test

# 依存関係の既知脆弱性を確認
npm audit
```

### 品質ゲート

`npm run check:metadata` は、`book-config.json` / `package.json` / `package-lock.json` / Jekyll 設定 / `docs/index.md` / ナビゲーションのタイトル・説明・版数・公開 URL がずれていないことを検証します。

`npm run check:reader-ux` は、公開 Mermaid 5件と SVG preview、stable anchor、図表索引、reader navigation の one-to-one 契約を検証します。`npm run check:reader-ux-regression` は、必須要素を壊した fixture を checker が制御された失敗として拒否することを検証します。

## ライセンス

本書は **CC BY-NC-SA 4.0** で提供します。詳細は `LICENSE.md` を参照してください。
