// ============================================================
// TALLER DE RECUPERACIÓN — PRUEBAS UNITARIAS
// Taller de Pruebas — Universidad de Caldas
// ============================================================
//
// Acá vas a escribir las pruebas unitarias del TasksService.
// La idea es probar la lógica de negocio de forma aislada,
// sin que la base de datos ni los endpoints entren en juego.
//
// Para lograr eso vamos a usar mocks: básicamente le decimos
// a Jest "cuando el servicio llame al repositorio, no ejecutes
// el código real, devuelve lo que yo te digo".
//
// Antes de arrancar, instala las dependencias:
//   npm install
//
// Para correr solo este archivo:
//   npx jest test/unit/tasks.service.test.js
//
// ============================================================

const TasksService = require('../../src/tasks/tasks.service');
const TaskRepository = require('../../src/tasks/task.repository');

// Le decimos a Jest que reemplace todo el módulo TaskRepository con mocks.
// Así ninguna prueba toca datos reales.
jest.mock('../../src/tasks/task.repository');

// ── Bloque principal ─────────────────────────────────────────
describe('TasksService', () => {

  // Antes de cada prueba limpiamos los mocks para que no se
  // mezclen los resultados entre una prueba y otra.
  beforeEach(() => {
    jest.clearAllMocks();
  });


  // ── getAllTasks ───────────────────────────────────────────
  describe('getAllTasks', () => {

    it('debería retornar todas las tareas que hay en el repositorio', () => {
      // ARRANGE: preparamos la data falsa que va a devolver el repositorio
      const tareasFalsas = [
        { id: '1', title: 'Estudiar Jest', status: 'pending' },
        { id: '2', title: 'Hacer el taller', status: 'in_progress' },
      ];
      TaskRepository.findAll.mockReturnValue(tareasFalsas);

      // ACT: llamamos al método que queremos probar
      const resultado = TasksService.getAllTasks();

      // ASSERT: verificamos que el resultado sea lo que esperamos
      // TODO: completa las siguientes afirmaciones


      // Pista 1: ¿cuántas tareas debería traer?
      expect(resultado).toHaveLength(/* escribe el número esperado */);

      // Pista 2: ¿el repositorio debería haberse llamado una sola vez?
      expect(TaskRepository.findAll).toHaveBeenCalledTimes(/* escribe el número */);
    });

    it('debería retornar un arreglo vacío cuando no hay tareas', () => {
      TaskRepository.findAll.mockReturnValue([]);

      const resultado = TasksService.getAllTasks();

      // TODO: ¿qué esperarías encontrar en resultado?
      expect(resultado).toEqual(/* ??? */);
    });

  });


  // ── getTaskById ───────────────────────────────────────────
  describe('getTaskById', () => {

    it('debería retornar la tarea cuando el id existe', () => {
      const tareaFalsa = { id: 'abc-123', title: 'Tarea de prueba', status: 'pending' };
      TaskRepository.findById.mockReturnValue(tareaFalsa);

      const resultado = TasksService.getTaskById('abc-123');

      // TODO: verifica que el resultado sea igual a tareaFalsa
      expect(resultado).toEqual(/* ??? */);

      // TODO: verifica que findById fue llamado con el id correcto
      expect(TaskRepository.findById).toHaveBeenCalledWith(/* ??? */);
    });

    it('debería lanzar un error 404 cuando la tarea no existe', () => {
      // El repositorio devuelve null cuando no encuentra nada
      TaskRepository.findById.mockReturnValue(null);

      // TODO: ¿cómo verificamos que se lanzó un error?
      // Pista: usa expect(() => ...).toThrow(...)
      expect(() => {
        TasksService.getTaskById('id-que-no-existe');
      }).toThrow(/* escribe el mensaje de error que debería lanzar */);
    });

  });


  // ── createTask ────────────────────────────────────────────
  describe('createTask', () => {

    it('debería crear y retornar la tarea cuando los datos son válidos', () => {
      const datosNuevaTarea = { title: 'Nueva tarea', description: 'Descripción de prueba' };
      const tareaCreada = { id: 'xyz-789', ...datosNuevaTarea, status: 'pending' };
      TaskRepository.create.mockReturnValue(tareaCreada);

      const resultado = TasksService.createTask(datosNuevaTarea);

      // TODO: verifica que el resultado tenga el id esperado
      expect(resultado.id).toBe(/* ??? */);

      // TODO: verifica que create fue llamado una vez
      expect(TaskRepository.create).toHaveBeenCalledTimes(/* ??? */);
    });

    it('debería lanzar un error 400 cuando el título está vacío', () => {
      // TODO: escribe la prueba completa para este caso
      // Pista: llama a TasksService.createTask con un título vacío
      // y verifica que lanza el error correcto
    });

    it('debería lanzar un error 400 cuando el título tiene menos de 3 caracteres', () => {
      // TODO: escribe la prueba completa para este caso
    });

  });


  // ── updateTaskStatus ──────────────────────────────────────
  describe('updateTaskStatus', () => {

    it('debería actualizar el estado cuando el id y el estado son válidos', () => {
      const tareaExistente = { id: 'abc-123', title: 'Mi tarea', status: 'pending' };
      const tareaActualizada = { ...tareaExistente, status: 'done' };

      TaskRepository.findById.mockReturnValue(tareaExistente);
      TaskRepository.update.mockReturnValue(tareaActualizada);

      const resultado = TasksService.updateTaskStatus('abc-123', 'done');

      // TODO: ¿qué debería tener resultado.status?
      expect(resultado.status).toBe(/* ??? */);
    });

    it('debería lanzar un error 400 cuando el estado enviado no es válido', () => {
      const tareaExistente = { id: 'abc-123', title: 'Mi tarea', status: 'pending' };
      TaskRepository.findById.mockReturnValue(tareaExistente);

      // TODO: escribe el expect que verifica que se lanza el error
      // con el estado inválido 'volando'
    });

    it('debería lanzar un error 404 cuando la tarea no existe', () => {
      TaskRepository.findById.mockReturnValue(null);

      // TODO: escribe el expect completo
    });

  });


  // ── deleteTask ────────────────────────────────────────────
  describe('deleteTask', () => {

    it('debería eliminar la tarea cuando el id existe', () => {
      const tareaExistente = { id: 'abc-123', title: 'Mi tarea', status: 'done' };
      TaskRepository.findById.mockReturnValue(tareaExistente);
      TaskRepository.remove.mockReturnValue(true);

      const resultado = TasksService.deleteTask('abc-123');

      // TODO: ¿qué valor debería devolver deleteTask cuando elimina bien?
      expect(resultado).toBe(/* ??? */);
    });

    it('debería lanzar un error 404 cuando se intenta eliminar una tarea que no existe', () => {
      TaskRepository.findById.mockReturnValue(null);

      // TODO: escribe la prueba completa
    });

  });

});
