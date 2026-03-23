---
title: "エンジニアリングドキュメント実践ガイド：README・手順書・Runbook・ADR・ポストモーテム"
description: "未経験〜初級が、実務で求められるドキュメント成果物（README/手順書/Runbook/ADR/障害報告・ポストモーテム）を作成できる状態にする。"
layout: book
order: 0
readerProfile:
  - "README/手順書/Runbook/ADR/ポストモーテムを体系的に整えたい初級〜中級エンジニア"
  - "レビュー観点を揃えたいテックリード/EM"
  - "Docs-as-Code を導入したい開発チーム"
learningOutcomes:
  - "Who/Why/What を短文で定義できる"
  - "成果物ごとに必要な情報粒度と例外系を判断できる"
  - "図解テンプレと文書テンプレを再利用できる"
---

# エンジニアリングドキュメント実践ガイド：README・手順書・Runbook・ADR・ポストモーテム

未経験〜初級が、実務で求められるドキュメント成果物（README/手順書/Runbook/ADR/障害報告・ポストモーテム）を作成できる状態にする。

## 想定読者

- README/手順書/Runbook/ADR/ポストモーテムを体系的に整えたい初級〜中級エンジニア
- レビュー観点を揃えたいテックリード/EM
- Docs-as-Code を導入したい開発チーム

## 学習成果

- Who/Why/What を短文で定義できる
- 成果物ごとに必要な情報粒度と例外系を判断できる
- 図解テンプレと文書テンプレを再利用できる

## 読み方ガイド

- まず第2章で読者と目的を固定し、いま必要な成果物/判断がどこにあるかを特定する
- 図解の入口は第5章、テンプレの入口は付録のテンプレ集を使う
- 付録のテンプレ/チェックリストを先に読み、本文で意図と落とし穴を補完する
- 章末のチェックリストをレビュー観点として運用に取り込む

## 前提知識

- Markdown の基本
- Git/GitHub の基本（Issue/PR）

## すぐ開く先

- 図解の入口: [第5章: 図解（構成図/フロー/シーケンスの最小セット）](chapters/chapter-05/)
- テンプレの入口: [テンプレ集](appendices/templates/)
- 運用観点の入口: [チェックリスト集](appendices/checklists/)

## 所要時間（目安）

- 全章を通読: 3〜5時間（テンプレを自分の題材で埋める場合は +2〜4時間）
- 必要な成果物だけ読む: 30〜60分/章

注記: 既存システムの規模、関係者数、既存ドキュメントの有無により大きく変動する。

## 目次

- [第1章: 実務ドキュメントの全体像（目的別・成果物別マップ）](chapters/chapter-01/)
- [第2章: 読者と目的から逆算する（Who/Why/What）](chapters/chapter-02/)
- [第3章: 情報設計（前提/用語/粒度/スコープ境界）](chapters/chapter-03/)
- [第4章: 技術文体（曖昧さ排除・手順の書き方・例外系）](chapters/chapter-04/)
- [第5章: 図解（構成図/フロー/シーケンスの最小セット）](chapters/chapter-05/)
- [第6章: 手順書（実行前提/検証/ロールバック/リスク）](chapters/chapter-06/)
- [第7章: Runbook（平常時/異常時/エスカレーション）](chapters/chapter-07/)
- [第8章: ADR（意思決定記録：背景→選択肢→決定→影響）](chapters/chapter-08/)
- [第9章: 障害報告・ポストモーテム（タイムライン/真因/再発防止）](chapters/chapter-09/)
- [第10章: Docs-as-Code運用（レビュー/版管理/CI/公開）](chapters/chapter-10/)
- [第11章: ドキュメント品質の守り方（陳腐化対策/Owner/KPI）](chapters/chapter-11/)

## 付録

- [テンプレ集](appendices/templates/)
- [チェックリスト集](appendices/checklists/)
- [参考文献](appendices/references/)
- [用語集](appendices/glossary/)
