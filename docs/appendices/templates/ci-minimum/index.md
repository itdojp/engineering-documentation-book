---
title: "最小CIテンプレ（markdownlint + link check）"
layout: book
order: 909
---

# 最小CIテンプレ（markdownlint + link check）

Docs-as-Code の最小CIは「形式チェック（lint）」と「リンク切れ検出」を自動化し、レビュー前に破綻を止めることです。

本リポジトリでは `npm test` が `markdownlint` と `markdown-link-check` を実行する想定です。

## コピペ用（GitHub Actions）

```yaml
name: docs-quality-gate

on:
  pull_request:

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Install dependencies
        run: npm ci

      - name: Lint + Link check
        run: npm test
```

## ローカル実行

```bash
npm ci
npm test
```

## 補足（任意）

- 生成物を公開する場合は、別ジョブで `jekyll build` 等のビルドを追加する
- 「本文の正しさ」までは保証できないため、レビュー観点（章末/付録チェックリスト）と併用する

