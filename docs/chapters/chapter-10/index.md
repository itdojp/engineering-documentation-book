---
title: "第10章：Docs-as-Code運用（レビュー/版管理/CI/公開）"
layout: book
order: 100
---

# 第10章：Docs-as-Code運用（レビュー/版管理/CI/公開）

## この章で学ぶこと

- 文書をPRで回す運用（レビュー観点/責任分界）を理解する
- CI（lint/link など）で品質ゲートを設ける
- 公開/権限/変更履歴の扱いを決める

## この章の成果物（または判断基準）

- Docs-as-Code運用ルール（PRレビュー、Owner、変更履歴）
- 品質ゲート（例: `npm test`）の導入方針

## 本文

Docs-as-Code の狙いは、文書の変更を「レビュー可能」にし、更新の責任を明確化すること。

### 最小の運用

- PRで変更
- レビュー観点（付録チェックリスト）
- CIで形式チェック（lint/link）
- 変更履歴（ChangeLog）
- 公開範囲と権限

CIだけでは本文の妥当性は担保できないが、形式不備やリンク切れなどの機械的な破綻は検出できる。

### 最小CI例（コピペ）

- 最小は「lint + link check」を pull_request で必ず回す
- 付録: [最小CIテンプレ（markdownlint + link check）](../../appendices/templates/ci-minimum/)

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
      - run: npm ci
      - run: npm test
```

## 具体例（悪い例→良い例）

### 悪い例

```md
文書を直接mainにpush
レビューもCIも無い
誰が更新するか不明
```

### 良い例

```md
PRで文書を更新し、レビュー観点で確認
CIで lint/link を実行
Owner と更新頻度（棚卸し）を決める
変更履歴を残す
```

## チェックリスト

- [ ] PRで回す運用になっている
- [ ] レビュー観点がある
- [ ] CIで最低限の品質ゲートがある
- [ ] 変更履歴の方針がある
- [ ] 公開範囲と権限が決まっている

## まとめ

- PR レビューと CI を前提に、変更履歴・公開範囲・Owner を運用ルールとして定義する
- 自動チェックで機械的破綻を止め、本文の妥当性はレビュー観点で担保する

## 次章への接続

- 次章: [第11章](../chapter-11/)
