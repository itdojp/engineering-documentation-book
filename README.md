# エンジニアリング・ドキュメンテーション実務（仮）

## 概要

実務で使える技術ドキュメント成果物（README/手順書/Runbook/ADR/障害報告・ポストモーテム等）の設計と運用を扱う。

## オンライン版（公開URL）

- GitHub Pages: `https://itdojp.github.io/engineering-documentation-book/`（想定）
- 入口: `docs/index.md`

## 開発（ローカル）

### 前提

- Node.js（`npm`）
- Ruby（Bundler 経由で Jekyll を実行）

### 手順

```bash
npm install

# （初回のみ）Jekyll 実行環境
# 例: Ruby/Bundler を導入後、bundle install

# プレビュー
npm start

# ビルド
npm run build

# テスト（markdown lint / link check）
npm test
```

## ライセンス

本書は **CC BY-NC-SA 4.0** で提供します。詳細は `LICENSE.md` を参照してください。
