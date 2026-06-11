const fs = require('fs');
const path = require('path');
const pool = require('../src/config/database');

async function runMigrations() {
  const migrationsDir = __dirname;
  const files = fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort();

  console.log(`🔄 Executando ${files.length} migration(s)...\n`);

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');
    try {
      await pool.query(sql);
      console.log(`✅ ${file}`);
    } catch (err) {
      console.error(`❌ Erro em ${file}:`, err.message);
      process.exit(1);
    }
  }

  console.log('\n✅ Migrations concluídas!');
  await pool.end();
}

runMigrations();
