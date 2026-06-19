const express = require('express');
const router = express.Router();
const { listarAgendamentos, criarAgendamento, atualizarStatus } = require('../controllers/agendamentosController');

router.get('/',        listarAgendamentos);
router.post('/',       criarAgendamento);
router.patch('/:id',   atualizarStatus);

module.exports = router;
