const pool = require('../config/database');

// GET /api/clientes
const listarClientes = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM clientes ORDER BY nome ASC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/clientes/:id
const buscarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/clientes
const criarCliente = async (req, res) => {
  try {
    const { nome, telefone, email, data_nasc, observacoes } = req.body;
    if (!nome) return res.status(400).json({ error: 'Nome é obrigatório' });

    const result = await pool.query(
      `INSERT INTO clientes (nome, telefone, email, data_nasc, observacoes)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nome, telefone, email, data_nasc, observacoes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/clientes/:id
const atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, email, data_nasc, observacoes, ativo } = req.body;

    const result = await pool.query(
      `UPDATE clientes SET nome=$1, telefone=$2, email=$3, data_nasc=$4,
       observacoes=$5, ativo=$6 WHERE id=$7 RETURNING *`,
      [nome, telefone, email, data_nasc, observacoes, ativo, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { listarClientes, buscarCliente, criarCliente, atualizarCliente };
