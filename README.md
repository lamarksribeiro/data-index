# Data Index

Portal de entrada do ecossistema GoldenLens Data. Landing page leve que centraliza o acesso aos três sistemas de dados e operação.

## Objetivo

Oferecer um único ponto de partida para escolher e abrir o sistema certo, sem misturar responsabilidades entre coleta, análise e execução.

```
                    ┌─────────────────┐
                    │   data-index    │
                    │  (esta página)  │
                    └────────┬────────┘
           ┌─────────────────┼─────────────────┐
           ▼                 ▼                 ▼
   ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
   │ data-colector │ │ data-backtest │ │  data-robot   │
   │ coleta 24×7   │ │ lakehouse +   │ │ trading real  │
   │ ticks + book  │ │ backtest GLS  │ │ Polymarket    │
   └───────────────┘ └───────────────┘ └───────────────┘
```

## Sistemas disponíveis

| Sistema | Papel | Porta local (padrão) | Repositório |
|---|---|---|---|
| **data-colector** (Data Gecko) | Coleta, persiste e expõe ticks e order book da Polymarket | `3000` | `../data-colector` |
| **data-backtest** (Data Runner) | Lakehouse OLAP, sync incremental, Backtest Studio e estratégias GLS | `3100` | `../data-backtest` |
| **data-robot** | Robô de trading real (UI + CLI no Coolify Giovanna; engine contínua ainda não é produção autônoma) | `3200` | `../data-robot` |

Em desenvolvimento local, os links da landing page devem apontar para:

- Coletor: `http://localhost:3000`
- Backtest: `http://localhost:3100`
- Robot: `http://localhost:3200` (ou `DATA_ROBOT_URL`)

Em produção (Coolify), as URLs são injetadas por ambiente — por exemplo `DATA_COLLECTOR_URL`, `DATA_BACKTEST_URL` e `DATA_ROBOT_URL=https://robot.fracta.online`.

## Escopo deste repositório

- Página inicial estática ou servida por um servidor mínimo (HTML/CSS/JS).
- Cards ou botões claros para cada sistema, com descrição curta e link externo.
- Sem autenticação própria: cada sistema mantém login e sessão independentes.
- Sem lógica de negócio de coleta, backtest ou trading.

## Status

Projeto em **inicialização**. Próximos passos:

1. Definir stack (HTML estático vs. Express/nginx).
2. Implementar layout da landing page alinhado à identidade GoldenLens.
3. Parametrizar URLs dos três destinos via `.env`.
4. Preparar `Dockerfile` para deploy no Coolify como serviço de entrada.

## Projetos relacionados

- [`data-colector`](../data-colector) — coletor e provedor de histórico
- [`data-backtest`](../data-backtest) — lakehouse e Backtest Studio
- [`data-robot`](../data-robot) — robô de trading real
- [`polymarket-robot`](../polymarket-robot) — implementação atual do robô (migração pendente)
