const pool = require('../src/config/database');

async function seed() {
  console.log('🌱 Inserindo dados de exemplo...\n');

  // Procedimentos
  await pool.query(`
    INSERT INTO procedimentos (nome, descricao, duracao_min, preco) VALUES
      ('Design de Sobrancelhas', 'Modelagem e design personalizado', 60, 80.00),
      ('Henna de Sobrancelhas', 'Pigmentação temporária com henna', 45, 60.00),
      ('Brow Lamination', 'Laminação e alinhamento dos fios', 90, 150.00),
      ('Micropigmentação', 'Técnica semipermanente de preenchimento', 120, 350.00)
    ON CONFLICT DO NOTHING;
  `);
  console.log('✅ Procedimentos inseridos');

  // Clientes de exemplo
  await pool.query(`
    INSERT INTO clientes (nome, telefone, email) VALUES
      ('Ana Silva',    '(51) 99999-0001', 'ana@email.com'),
      ('Beatriz Costa','(51) 99999-0002', 'beatriz@email.com'),
      ('Carla Mendes', '(51) 99999-0003', 'carla@email.com')
    ON CONFLICT DO NOTHING;
  `);
  console.log('✅ Clientes inseridos');

  // Agendamentos de exemplo
  await pool.query(`
    INSERT INTO agendamentos (cliente_id, procedimento_id, data_hora, status) VALUES
      (1, 1, NOW() + INTERVAL '1 day',  'agendado'),
      (2, 2, NOW() + INTERVAL '2 days', 'confirmado'),
      (3, 3, NOW() - INTERVAL '7 days', 'concluido'),
      (1, 4, NOW() - INTERVAL '3 days', 'concluido'),
      (2, 1, NOW() - INTERVAL '1 day',  'cancelado');
  `);
  console.log('✅ Agendamentos inseridos');

  console.log('\n🎉 Seed concluído!');
  await pool.end();
}

seed().catch(err => {
  console.error('Erro no seed:', err.message);
  process.exit(1);
});
