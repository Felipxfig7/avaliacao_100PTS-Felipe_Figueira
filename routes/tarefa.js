const express = require('express')
const tarefasControllers = require('../controllers/tarefasControllers');
const router = express.Router();

router.post('/', tarefasControllers.criarTarefa);
router.get('/', tarefasControllers.listarTarefa);
router.get('/status', tarefasControllers.filtrarTarefa);
router.put('/:id', tarefasControllers.atualizarTarefa);
router.delete('/:id', tarefasControllers.deletarTarefa);

module.exports = router;