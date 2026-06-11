const express = require('express');
const router = express.Router();
const { listarClientes, buscarCliente, criarCliente, atualizarCliente } = require('../controllers/clientesController');

router.get('/',     listarClientes);
router.get('/:id',  buscarCliente);
router.post('/',    criarCliente);
router.put('/:id',  atualizarCliente);

module.exports = router;
