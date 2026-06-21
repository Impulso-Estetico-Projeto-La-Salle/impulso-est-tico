const express = require('express');

const router = express.Router();

const {
  listarProcedimentos,
  buscarProcedimento,
  criarProcedimento
} = require('../controllers/procedimentosController');

router.get('/', listarProcedimentos);
router.get('/:id', buscarProcedimento);
router.post('/', criarProcedimento);

module.exports = router;