require('dotenv').config();
const express = require('express');
const cors = require('cors');

const clientesRoutes     = require('./routes/clientes');
const agendamentosRoutes = require('./routes/agendamentos');
const dashboardRoutes    = require('./routes/dashboard');
const procedimentosRoutes = require('./routes/procedimentos');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/clientes',     clientesRoutes);
app.use('/api/agendamentos', agendamentosRoutes);
app.use('/api/dashboard',    dashboardRoutes);
app.use('/api/procedimentos', procedimentosRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', projeto: 'Impulso Estético API' });
});

// Middleware de erro genérico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
