---
title: "構成図テンプレ（Mermaid）"
layout: book
order: 902
---

# 構成図テンプレ（Mermaid）

最小の箱と矢印で、責任分界とデータ/通信の流れを説明します。

## コピペ用テンプレ

## 図（例）

```mermaid
flowchart LR
  User[利用者] -->|HTTPS| App[アプリ]
  App --> DB[(DB)]
  App --> Cache[(Cache)]

  subgraph 監視
    Log[ログ] --> SIEM[集約]
  end
  App --> Log

  %% 注釈: 重要な境界（社内/社外、VPC/インターネット）を明示する
```

## 補足（記載観点）

- 入口（誰が/どこから）
- データの保管先
- 認証/認可の境界
- 監視/ログの出口
