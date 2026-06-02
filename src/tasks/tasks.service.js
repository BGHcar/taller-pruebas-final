const TaskRepository = require('./task.repository');

// Acá va toda la lógica de negocio.
// El controlador no decide nada, solo llama a este servicio.

const VALID_STATUSES = ['pending', 'in_progress', 'done'];

const TasksService = {
  getAllTasks() {
    return TaskRepository.findAll();
  },

  getTaskById(id) {
    const task = TaskRepository.findById(id);
    if (!task) {
      const error = new Error('Tarea no encontrada');
      error.statusCode = 404;
      throw error;
    }
    return task;
  },

  createTask(data) {
    if (!data.title || data.title.trim() === '') {
      const error = new Error('El título es obligatorio');
      error.statusCode = 400;
      throw error;
    }
    if (data.title.trim().length < 3) {
      const error = new Error('El título debe tener al menos 3 caracteres');
      error.statusCode = 400;
      throw error;
    }
    return TaskRepository.create({
      title: data.title.trim(),
      description: data.description,
    });
  },

  updateTaskStatus(id, status) {
    if (!status) {
      const error = new Error('El estado es obligatorio');
      error.statusCode = 400;
      throw error;
    }
    if (!VALID_STATUSES.includes(status)) {
      const error = new Error(
        `Estado inválido. Los valores permitidos son: ${VALID_STATUSES.join(', ')}`
      );
      error.statusCode = 400;
      throw error;
    }

    // Verifica que la tarea exista antes de actualizar
    this.getTaskById(id);

    return TaskRepository.update(id, { status });
  },

  deleteTask(id) {
    // Verifica que exista antes de intentar borrar
    this.getTaskById(id);
    return TaskRepository.remove(id);
  },
};

module.exports = TasksService;
