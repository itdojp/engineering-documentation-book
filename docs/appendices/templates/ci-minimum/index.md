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

## 最小構成（`npm test` を成立させる例）

### `package.json`（例）

```json
{
  "name": "docs-quality-gate",
  "private": true,
  "scripts": {
    "test": "npm run lint && npm run check-links",
    "lint": "markdownlint -c .markdownlint.json \"docs/**/*.md\"",
    "check-links": "find docs -name '*.md' -print0 | xargs -0 -n 1 markdown-link-check -c .markdown-link-check.json"
  },
  "devDependencies": {
    "markdownlint-cli": "^0.45.0",
    "markdown-link-check": "^3.13.7"
  }
}
```

### `.markdownlint.json`（例）

```json
{
  "default": true,
  "MD013": false,
  "MD024": { "siblings_only": true }
}
```

### `.markdown-link-check.json`（例）

外部サイトの制限（403/429）や一時的な不安定さでCIが落ちる場合は、必要最小限の ignore を入れて運用する。

```json
{
  "timeout": "10s",
  "retryOn429": true,
  "retryCount": 2,
  "ignorePatterns": [
    { "pattern": "^https://twitter\\.com/" },
    { "pattern": "^https://www\\.linkedin\\.com/" }
  ]
}
```

## ローカル実行

```bash
npm ci
npm test
```

## 補足（任意）

- 生成物を公開する場合は、別ジョブで `jekyll build` などのビルドを追加する
- 「本文の正しさ」までは保証できないため、レビュー観点（章末/付録チェックリスト）と併用する
