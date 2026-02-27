# MiniShop（架空）ドキュメント例

本ディレクトリは、同一の架空システム（MiniShop）を前提に「テンプレを埋めた完成形」を示す実例集です。

注意: 値やURL、Issue/PR番号、指標は例示（ダミー）です。秘密情報・個人情報は含めません（必要箇所は `[REDACTED]`）。

## 目的

- 注文作成と決済（外部プロバイダ）を行う最小のECバックエンドを想定し、運用に必要なドキュメント一式を揃える

## 目次（完成形）

- 構成図（Mermaid）: `architecture.md`
- 手順書（デプロイ）: `procedure-deploy.md`
- Runbook: `runbook.md`
- ADR: `adr-0001-validation.md`
- 障害報告（タイムライン）: `incident-report-2026-02-15.md`
- ポストモーテム: `postmortem-2026-02-15.md`

## Quick Start（例）

前提:

- Docker / docker compose が利用可能
- テスト用の決済プロバイダ（Sandbox）を利用

最小手順（例）:

1. `docker compose up -d`
2. `curl -fsS http://localhost:8080/healthz`

成功条件（例）:

- `GET /healthz` が `200` を返す
- `POST /orders` が `201` を返し、DBに保存される

## 依存関係（例）

- 外部: 決済プロバイダ（Sandbox）
- 権限/秘密情報: APIキー等はドキュメントに直接書かない（値は `[REDACTED]`、保管場所/取得手順のみ記載）

## 運用導線

- 異常時は `runbook.md` の「異常時」→「エスカレーション」→「復旧判断」を参照
