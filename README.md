# Impulso Estético — Backend

API REST para gerenciamento de clientes, agendamentos e indicadores da clínica.

## Stack

- **Runtime:** Node.js v18+
- **Framework:** Express
- **Banco:** PostgreSQL 14+
- **Driver:** node-postgres (pg)

## Como rodar

```bash
# 1. Instale as dependências
npm install

# 2. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do PostgreSQL

# 3. Crie as tabelas
npm run migrate

# 4. (Opcional) Popule com dados de teste
npm run seed

# 5. Inicie o servidor
npm run dev
```

Servidor disponível em `http://localhost:3000`.

## Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/clientes` | Lista clientes |
| POST | `/api/clientes` | Cadastra cliente |
| PUT | `/api/clientes/:id` | Atualiza cliente |
| GET | `/api/agendamentos` | Lista agendamentos |
| POST | `/api/agendamentos` | Cria agendamento |
| PATCH | `/api/agendamentos/:id` | Atualiza status |
| GET | `/api/dashboard` | Indicadores gerais |

Documentação completa em [`docs/api.md`](../docs/api.md).

## Integrantes

- João Theobald
- Kamine Ramos
- Lisandra
- Lisandra Gross

> Projeto Integrador II — ADS | La Salle 2026/1
