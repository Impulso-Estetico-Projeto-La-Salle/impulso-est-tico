# Impulso Estético — Frontend

Interface web para gerenciamento de clientes, agendamentos e dashboard de indicadores.

## Stack

- HTML + CSS + JavaScript (Vanilla)
- Sem frameworks ou dependências externas

## Estrutura

```
frontend/
├── public/
│   └── index.html              ← entrada da aplicação
└── src/
    ├── assets/
    │   └── style.css           ← estilos globais
    ├── components/
    │   └── sidebar.js          ← navegação reutilizável
    └── pages/
        ├── dashboard.html      ← indicadores da clínica
        ├── clientes.html       ← cadastro e listagem
        └── agendamentos.html   ← controle de horários
```

## Como rodar

Abra `public/index.html` no navegador, ou use o Live Server no VS Code.

> O frontend consome a API do backend em `http://localhost:3000`. Certifique-se de que o backend está rodando antes de abrir.

## Repositório do backend

[impulso-estetico-backend](https://github.com/Impulso-Estetico-Projeto-La-Salle/impulso-estetico-backend)

## Integrantes

- João Theobald
- Kamine Ramos
- Lisandra Gross

> Projeto Integrador II — ADS | La Salle 2026/1
