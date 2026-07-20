---
title: "テンプレ集"
layout: book
order: 900
---

# テンプレ集

本付録は、成果物を一定の品質で再現するためのテンプレ集です。

## 使い方

- 図解の考え方は [第5章: 図解](../../chapters/chapter-05/) を先に確認する
- まずテンプレをコピーし、空欄を埋める
- 章末チェックリストで不足がないか確認する
- 実運用では、テンプレをそのまま使い続けず、事故/手戻りの原因を踏まえて更新する

## 注意（セキュリティ/プライバシー）

ログや設定例をドキュメントに載せる場合は、秘密情報・個人情報を含めないことを前提にする（伏字/REDACTED、データ分類、公開範囲の確認）。

参考: <https://itdojp.github.io/security-privacy-literacy-book/>

## 完成形サンプル（MiniShop）

テンプレを埋めた完成形の一式を、同じ架空システム MiniShop の文書として確認できる。本公開版 `v0.1.0` では、本文と同じ内容で確認した commit `48211ed133bd8480807b65274240f0cddd8b9000` を固定スナップショットとする。

- [MiniShop 完成形サンプルの目次](https://github.com/itdojp/engineering-documentation-book/blob/48211ed133bd8480807b65274240f0cddd8b9000/examples/minishop/README.md)
- [MiniShop のファイル一覧](https://github.com/itdojp/engineering-documentation-book/tree/48211ed133bd8480807b65274240f0cddd8b9000/examples/minishop)

固定スナップショットは、この公開版を読んでいる間にリンク先の内容が変わることを防ぐ。将来の最新版との差分が生じる可能性もある。新しい版では本文とサンプルを同時に確認し、固定 commit を更新する。

## 目次

- [README テンプレ](readme/)
- [構成図テンプレ（Mermaid）](architecture-diagram/)
- [手順書テンプレ](procedure/)
- [Runbook テンプレ](runbook/)
- [ADR テンプレ](adr/)
- [監査メモテンプレ](audit-memo/)
- [変更記録（ChangeLog）テンプレ](changelog/)
- [障害報告テンプレ](incident-report/)
- [ポストモーテムテンプレ](postmortem/)
- [最小 CI テンプレ（markdownlint + link check）](ci-minimum/)
