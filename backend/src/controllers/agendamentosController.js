const pool = require('../config/database');

// GET /api/agendamentos
const listarAgendamentos = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.*, c.nome AS cliente_nome, p.nome AS procedimento_nome, p.preco
      FROM agendamentos a
      JOIN clientes c ON c.id = a.cliente_id
      JOIN procedimentos p ON p.id = a.procedimento_id
      ORDER BY a.data_hora DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/agendamentos
const criarAgendamento = async (req, res) => {
  try {
    const { cliente_id, procedimento_id, data_hora, observacoes } = req.body;
    if (!cliente_id || !procedimento_id || !data_hora) {
      return res.status(400).json({ error: 'cliente_id, procedimento_id e data_hora são obrigatórios' });
    }

    const result = await pool.query(
      `INSERT INTO agendamentos (cliente_id, procedimento_id, data_hora, observacoes)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [cliente_id, procedimento_id, data_hora, observacoes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/agendamentos/:id  — atualiza apenas o status
const atualizarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const statusValidos = ['agendado', 'confirmado', 'concluido', 'cancelado', 'faltou'];

    if (!statusValidos.includes(status)) {
      return res.status(400).json({ error: `Status inválido. Use: ${statusValidos.join(', ')}` });
    }

    const result = await pool.query(
      'UPDATE agendamentos SET status=$1 WHERE id=$2 RETURNING *',
      [status, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { listarAgendamentos, criarAgendamento, atualizarStatus };
