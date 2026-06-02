const { v4: uuidv4 } = require('uuid');

// Acá guardamos las tareas en memoria mientras corre el servidor.
// Nada de base de datos por ahora, lo que importa es practicar las pruebas.
let tasks = [];

const TaskRepository = {
  findAll() {
    return [...tasks];
  },

  findById(id) {
    return tasks.find((t) => t.id === id) || null;
  },

  create(data) {
    const newTask = {
      id: uuidv4(),
      title: data.title,
      description: data.description || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    return newTask;
  },

  update(id, changes) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...changes };
    return tasks[index];
  },

  remove(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },

  // Solo para tests: limpia todo el arreglo antes de cada prueba
  _clear() {
    tasks = [];
  },
};

module.exports = TaskRepository;
