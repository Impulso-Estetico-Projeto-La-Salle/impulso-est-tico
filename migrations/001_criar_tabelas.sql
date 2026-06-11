-- ============================================================
-- Impulso Estético — Schema do Banco de Dados
-- Migration 001 — Criação das tabelas principais
-- ============================================================

-- Tabela de clientes
CREATE TABLE IF NOT EXISTS clientes (
  id          SERIAL PRIMARY KEY,
  nome        VARCHAR(100) NOT NULL,
  telefone    VARCHAR(20),
  email       VARCHAR(100),
  data_nasc   DATE,
  observacoes TEXT,
  ativo       BOOLEAN DEFAULT TRUE,
  criado_em   TIMESTAMP DEFAULT NOW()
);

-- Tabela de procedimentos (serviços oferecidos)
CREATE TABLE IF NOT EXISTS procedimentos (
  id          SERIAL PRIMARY KEY,
  nome        VARCHAR(100) NOT NULL,
  descricao   TEXT,
  duracao_min INTEGER,        -- duração estimada em minutos
  preco       NUMERIC(10,2),
  ativo       BOOLEAN DEFAULT TRUE
);

-- Tabela de agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
  id               SERIAL PRIMARY KEY,
  cliente_id       INTEGER NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  procedimento_id  INTEGER NOT NULL REFERENCES procedimentos(id),
  data_hora        TIMESTAMP NOT NULL,
  status           VARCHAR(20) DEFAULT 'agendado'
                   CHECK (status IN ('agendado', 'confirmado', 'concluido', 'cancelado', 'faltou')),
  observacoes      TEXT,
  criado_em        TIMESTAMP DEFAULT NOW()
);

-- Índices para melhor performance nas consultas do dashboard
CREATE INDEX IF NOT EXISTS idx_agendamentos_data     ON agendamentos(data_hora);
CREATE INDEX IF NOT EXISTS idx_agendamentos_status   ON agendamentos(status);
CREATE INDEX IF NOT EXISTS idx_agendamentos_cliente  ON agendamentos(cliente_id);
