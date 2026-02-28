---
title: "テンプレ集"
layout: book
order: 900
---

# テンプレ集

本付録は、成果物を一定の品質で再現するためのテンプレ集です。

## 使い方

- まずテンプレをコピーし、空欄を埋める
- 章末チェックリストで不足がないか確認する
- 実運用では、テンプレをそのまま使い続けず、事故/手戻りの原因を踏まえて更新する

## 注意（セキュリティ/プライバシー）

ログや設定例をドキュメントに載せる場合は、秘密情報・個人情報を含めないことを前提にする（伏字/REDACTED、データ分類、公開範囲の確認）。

参考: <https://itdojp.github.io/security-privacy-literacy-book/>

## 完成形の実例（examples/）

テンプレを埋めた完成形の一式は、リポジトリの `examples/` にまとめると、横断で参照しやすい。

- 例（MiniShop）: <https://github.com/itdojp/engineering-documentation-book/tree/main/examples/minishop>

## 目次

- [README テンプレ](readme/)
- [構成図テンプレ（Mermaid）](architecture-diagram/)
- [手順書テンプレ](procedure/)
- [Runbook テンプレ](runbook/)
- [ADR テンプレ](adr/)
- [変更記録（ChangeLog）テンプレ](changelog/)
- [障害報告テンプレ](incident-report/)
- [ポストモーテムテンプレ](postmortem/)
- [最小CIテンプレ（markdownlint + link check）](ci-minimum/)
