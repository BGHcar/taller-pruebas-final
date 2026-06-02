const express = require('express');
const tasksRouter = require('./tasks/tasks.router');

// Separamos la app del servidor para que los tests de integración
// puedan levantar la app sin abrir un puerto real.
const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/tasks', tasksRouter);

// Manejo de rutas que no existen
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

module.exports = app;
