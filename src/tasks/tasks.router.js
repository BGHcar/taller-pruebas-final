const express = require('express');
const TasksController = require('./tasks.controller');

const router = express.Router();

router.get('/', TasksController.getAll);
router.get('/:id', TasksController.getById);
router.post('/', TasksController.create);
router.patch('/:id/status', TasksController.updateStatus);
router.delete('/:id', TasksController.remove);

module.exports = router;
