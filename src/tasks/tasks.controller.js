const TasksService = require('./tasks.service');

// El controlador solo recibe el request, llama al servicio y devuelve la respuesta.
// Nada de lógica acá.

const TasksController = {
  getAll(req, res) {
    const tasks = TasksService.getAllTasks();
    res.status(200).json({ data: tasks, total: tasks.length });
  },

  getById(req, res) {
    try {
      const task = TasksService.getTaskById(req.params.id);
      res.status(200).json({ data: task });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },

  create(req, res) {
    try {
      const task = TasksService.createTask(req.body);
      res.status(201).json({ data: task });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },

  updateStatus(req, res) {
    try {
      const task = TasksService.updateTaskStatus(req.params.id, req.body.status);
      res.status(200).json({ data: task });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },

  remove(req, res) {
    try {
      TasksService.deleteTask(req.params.id);
      res.status(200).json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  },
};

module.exports = TasksController;
