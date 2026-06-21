const pool = require('../config/database');

// GET /api/procedimentos
const listarProcedimentos = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM procedimentos ORDER BY nome ASC'
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/procedimentos/:id
const buscarProcedimento = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM procedimentos WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Procedimento não encontrado'
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/procedimentos
// POST /api/procedimentos
const criarProcedimento = async (req, res) => {
  try {
    const { nome, descricao, preco, duracao } = req.body; // Continua recebendo 'duracao' do seu front

    if (!nome || !preco || !duracao) {
      return res.status(400).json({
        error: 'Nome, preço e duração são obrigatórios'
      });
    }

    // 🟢 AJUSTE AQUI: Mudamos apenas o nome da coluna para bater com o banco de dados (duracao_min)
    const result = await pool.query(
      `INSERT INTO procedimentos
      (nome, descricao, preco, duracao_min) 
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [nome, descricao, preco, duracao] // Passa o valor do seu formulário para dentro dela
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  listarProcedimentos,
  buscarProcedimento,
  criarProcedimento
};