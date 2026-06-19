const pool = require('../config/database');

// GET /api/dashboard
const getDashboard = async (req, res) => {
  try {
    // Total de atendimentos concluídos
    const totalAtendimentos = await pool.query(
      `SELECT COUNT(*) AS total FROM agendamentos WHERE status = 'concluido'`
    );

    // Taxa de cancelamento
    const taxaCancelamento = await pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE status = 'cancelado') AS cancelados,
        COUNT(*) AS total
      FROM agendamentos
    `);

    // Serviços mais procurados
    const servicosMaisProcurados = await pool.query(`
      SELECT p.nome, COUNT(*) AS total
      FROM agendamentos a
      JOIN procedimentos p ON p.id = a.procedimento_id
      WHERE a.status != 'cancelado'
      GROUP BY p.nome
      ORDER BY total DESC
      LIMIT 5
    `);

    // Horários de maior demanda (hora do dia)
    const horariosDemanda = await pool.query(`
      SELECT EXTRACT(HOUR FROM data_hora) AS hora, COUNT(*) AS total
      FROM agendamentos
      WHERE status NOT IN ('cancelado', 'faltou')
      GROUP BY hora
      ORDER BY total DESC
    `);

    // Clientes inativos (sem agendamento nos últimos 60 dias)
    const clientesInativos = await pool.query(`
      SELECT c.id, c.nome, c.telefone, MAX(a.data_hora) AS ultimo_atendimento
      FROM clientes c
      LEFT JOIN agendamentos a ON a.cliente_id = c.id AND a.status = 'concluido'
      WHERE c.ativo = TRUE
      GROUP BY c.id, c.nome, c.telefone
      HAVING MAX(a.data_hora) < NOW() - INTERVAL '60 days' OR MAX(a.data_hora) IS NULL
      ORDER BY ultimo_atendimento ASC NULLS FIRST
      LIMIT 10
    `);

    // Agendamentos da semana
    const agendamentosSemana = await pool.query(`
      SELECT COUNT(*) AS total FROM agendamentos
      WHERE data_hora >= DATE_TRUNC('week', NOW())
        AND data_hora < DATE_TRUNC('week', NOW()) + INTERVAL '7 days'
    `);

    res.json({
      total_atendimentos: parseInt(totalAtendimentos.rows[0].total),
      agendamentos_semana: parseInt(agendamentosSemana.rows[0].total),
      taxa_cancelamento: {
        cancelados: parseInt(taxaCancelamento.rows[0].cancelados),
        total: parseInt(taxaCancelamento.rows[0].total),
        percentual: taxaCancelamento.rows[0].total > 0
          ? ((taxaCancelamento.rows[0].cancelados / taxaCancelamento.rows[0].total) * 100).toFixed(1)
          : '0.0'
      },
      servicos_mais_procurados: servicosMaisProcurados.rows,
      horarios_demanda: horariosDemanda.rows,
      clientes_inativos: clientesInativos.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getDashboard };
