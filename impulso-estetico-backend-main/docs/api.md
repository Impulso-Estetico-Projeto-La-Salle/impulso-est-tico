# Documentação da API — Impulso Estético

Base URL: `http://localhost:3000/api`

---

## Clientes

### `GET /clientes`
Retorna todos os clientes cadastrados.

**Resposta:**
```json
[
  { "id": 1, "nome": "Ana Silva", "telefone": "(51) 99999-0001", "email": "ana@email.com", "ativo": true }
]
```

### `POST /clientes`
Cadastra um novo cliente.

**Body:**
```json
{
  "nome": "Ana Silva",       // obrigatório
  "telefone": "(51) 99999-0001",
  "email": "ana@email.com",
  "data_nasc": "1990-05-15",
  "observacoes": "Pele sensível"
}
```

### `PUT /clientes/:id`
Atualiza os dados de um cliente.

---

## Agendamentos

### `GET /agendamentos`
Retorna todos os agendamentos com dados do cliente e procedimento.

### `POST /agendamentos`
Cria um novo agendamento.

**Body:**
```json
{
  "cliente_id": 1,           // obrigatório
  "procedimento_id": 2,      // obrigatório
  "data_hora": "2026-06-15T14:00:00", // obrigatório
  "observacoes": "Primeira vez"
}
```

### `PATCH /agendamentos/:id`
Atualiza apenas o status de um agendamento.

**Body:**
```json
{ "status": "concluido" }
```

**Status possíveis:** `agendado` | `confirmado` | `concluido` | `cancelado` | `faltou`

---

## Dashboard

### `GET /dashboard`
Retorna os indicadores da clínica.

**Resposta:**
```json
{
  "total_atendimentos": 42,
  "agendamentos_semana": 7,
  "taxa_cancelamento": {
    "cancelados": 5,
    "total": 47,
    "percentual": "10.6"
  },
  "servicos_mais_procurados": [
    { "nome": "Design de Sobrancelhas", "total": "18" }
  ],
  "horarios_demanda": [
    { "hora": "10", "total": "12" }
  ],
  "clientes_inativos": [
    { "id": 3, "nome": "Carla Mendes", "telefone": "...", "ultimo_atendimento": null }
  ]
}
```
