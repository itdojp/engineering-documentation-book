---
title: "第10章：Docs-as-Code 運用（レビュー / 版管理 / CI / 公開）"
layout: book
order: 100
---

# 第10章：Docs-as-Code 運用（レビュー / 版管理 / CI / 公開）

## この章で学ぶこと

- 文書を PR で回す運用（レビュー観点/責任分界）を理解する
- CI（lint/link など）で品質ゲートを設ける
- 公開/権限/変更履歴の扱いを決める
- PR body と監査メモに、確認範囲・根拠・レビュー対応・公開反映を残す

## この章の成果物（または判断基準）

- Docs-as-Code 運用ルール（PR レビュー、Owner、変更履歴）
- 品質ゲート（例: `npm test`）の導入方針
- PR body / 監査メモに残す証跡の最小項目

## 本文

Docs-as-Code の狙いは、文書の変更を「レビュー可能」にし、更新の責任を明確化すること。

### 最小の運用

- PR で変更
- レビュー観点（付録チェックリスト）
- CI で形式チェック（lint/link）
- 変更履歴（ChangeLog）
- 公開範囲と権限

CI だけでは本文の妥当性は担保できないが、形式不備やリンク切れなどの機械的な破綻は検出できる。

### PR body と監査メモに残す証跡

Docs-as-Code では「何を直したか」だけでなく、「何を確認し、なぜその判断にしたか」を残す。これは `issue-driven-work-book` の Issue / PR 運用では PR body の役割であり、本書では文書成果物として監査メモに残す。

|証跡|PR body に書くこと|監査メモに残すこと|
|---|---|---|
|確認範囲|変更した章、テンプレート、公開ページ|確認したが変更しなかった範囲|
|根拠|Issue、実行コマンド、CI、review thread|一次情報、参照日、判断に使ったログ|
|レビュー対応|review 本文、inline comment、suggestion への対応|対応不要理由、別 Issue に分離した判断|
|公開反映|main checks、公開 URL、確認した文言|再確認条件、Owner、次回棚卸し日|

変更不要判断は省略しない。たとえば、Runbook の連絡先を確認して現行運用と一致していた場合も、確認日と再確認条件を残す。

### 最小 CI 例（コピペ）

- 最小は「lint + link check」を pull_request で必ず回す
- 付録: [最小 CI テンプレ（markdownlint + link check）](../../appendices/templates/ci-minimum/)

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
文書を直接 main に push
レビューも CI も無い
誰が更新するか不明
```

### 良い例

```md
PR で文書を更新し、レビュー観点で確認
CI で lint/link を実行
Owner と更新頻度（棚卸し）を決める
変更履歴を残す
```

## チェックリスト

- [ ] PR で回す運用になっている
- [ ] レビュー観点がある
- [ ] CI で最低限の品質ゲートがある
- [ ] 変更履歴の方針がある
- [ ] 公開範囲と権限が決まっている
- [ ] PR body に確認範囲、根拠、レビュー対応、公開反映が残っている
- [ ] 変更不要判断は監査メモまたは Issue コメントに残っている

## まとめ

- PR レビューと CI を前提に、変更履歴・公開範囲・Owner を運用ルールとして定義する
- 自動チェックで機械的破綻を止め、本文の妥当性はレビュー観点で担保する
- PR body と監査メモを使い、変更した理由と変更しなかった理由をどちらも追跡可能にする

## 次章への接続

- 次章: [第11章](../chapter-11/)
