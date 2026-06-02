// ============================================================
// TALLER DE RECUPERACIÓN — PRUEBAS DE INTEGRACIÓN
// Taller de Pruebas — Universidad de Caldas
// ============================================================
//
// Acá las pruebas ya no usan mocks. Levantamos la app real en
// memoria y disparamos peticiones HTTP contra ella usando
// Supertest. Así probamos que el controlador, el servicio y
// el repositorio funcionan juntos de punta a punta.
//
// Para correr solo este archivo:
//   npx jest test/integration/tasks.api.test.js
//
// Para correr todo con cobertura (lo que vas a entregar):
//   npm run test:coverage
//
// ============================================================

const request = require('supertest');
const app = require('../../src/app');
const TaskRepository = require('../../src/tasks/task.repository');

// Antes de cada prueba limpiamos las tareas guardadas en memoria.
// Si no hacemos esto, una prueba puede afectar a la siguiente.
beforeEach(() => {
  TaskRepository._clear();
});


// ── GET /tasks ────────────────────────────────────────────────
describe('GET /tasks', () => {

  it('debería responder 200 y un arreglo vacío cuando no hay tareas', async () => {
    const response = await request(app).get('/tasks');

    // TODO: verifica el status code
    expect(response.status).toBe(/* ??? */);

    // TODO: verifica que data sea un arreglo vacío
    expect(response.body.data).toEqual(/* ??? */);
  });

  it('debería retornar las tareas que existen', async () => {
    // Primero creamos una tarea directamente en el repositorio
    TaskRepository.create({ title: 'Tarea de integración' });

    const response = await request(app).get('/tasks');

    // TODO: ¿cuántas tareas debería haber en data?
    expect(response.body.data).toHaveLength(/* ??? */);

    // TODO: ¿cuánto debería ser total?
    expect(response.body.total).toBe(/* ??? */);
  });

});


// ── GET /tasks/:id ────────────────────────────────────────────
describe('GET /tasks/:id', () => {

  it('debería retornar 200 y la tarea cuando el id existe', async () => {
    // Creamos una tarea para tener un id real
    const tarea = TaskRepository.create({ title: 'Tarea de prueba' });

    const response = await request(app).get(`/tasks/${tarea.id}`);

    // TODO: verifica el status y que data.id coincide con tarea.id
    expect(response.status).toBe(/* ??? */);
    expect(response.body.data.id).toBe(/* ??? */);
  });

  it('debería retornar 404 cuando el id no existe', async () => {
    const response = await request(app).get('/tasks/id-inventado-123');

    // TODO: verifica el status 404
    expect(response.status).toBe(/* ??? */);

    // TODO: verifica que el body tenga un campo message
    expect(response.body).toHaveProperty(/* ??? */);
  });

});


// ── POST /tasks ───────────────────────────────────────────────
describe('POST /tasks', () => {

  it('debería crear una tarea y retornar 201 con los datos de la tarea nueva', async () => {
    const datosTarea = {
      title: 'Aprender Supertest',
      description: 'Practicar pruebas de integración',
    };

    const response = await request(app)
      .post('/tasks')
      .send(datosTarea);

    // TODO: verifica el status 201
    expect(response.status).toBe(/* ??? */);

    // TODO: verifica que data.title sea igual al que enviamos
    expect(response.body.data.title).toBe(/* ??? */);

    // TODO: verifica que data.status sea 'pending' (valor por defecto)
    expect(response.body.data.status).toBe(/* ??? */);
  });

  it('debería retornar 400 cuando se envía sin título', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ description: 'Sin título esto falla' });

    // TODO: escribe los expects para status y message
  });

  it('debería retornar 400 cuando el título tiene menos de 3 caracteres', async () => {
    // TODO: escribe la prueba completa
    // Pista: envía { title: 'AB' } y verifica status 400
  });

});


// ── PATCH /tasks/:id/status ───────────────────────────────────
describe('PATCH /tasks/:id/status', () => {

  it('debería actualizar el estado de la tarea y retornar 200', async () => {
    const tarea = TaskRepository.create({ title: 'Tarea a actualizar' });

    const response = await request(app)
      .patch(`/tasks/${tarea.id}/status`)
      .send({ status: 'in_progress' });

    // TODO: verifica status 200 y que data.status sea 'in_progress'
    expect(response.status).toBe(/* ??? */);
    expect(response.body.data.status).toBe(/* ??? */);
  });

  it('debería retornar 400 cuando el estado enviado no es válido', async () => {
    const tarea = TaskRepository.create({ title: 'Tarea de prueba' });

    const response = await request(app)
      .patch(`/tasks/${tarea.id}/status`)
      .send({ status: 'en_el_aire' });

    // TODO: escribe los expects
  });

  it('debería retornar 404 cuando la tarea no existe', async () => {
    const response = await request(app)
      .patch('/tasks/no-existe/status')
      .send({ status: 'done' });

    // TODO: escribe los expects
  });

});


// ── DELETE /tasks/:id ─────────────────────────────────────────
describe('DELETE /tasks/:id', () => {

  it('debería eliminar la tarea y retornar 200 con mensaje de confirmación', async () => {
    const tarea = TaskRepository.create({ title: 'Tarea para borrar' });

    const response = await request(app).delete(`/tasks/${tarea.id}`);

    // TODO: verifica status 200 y que message existe en el body
    expect(response.status).toBe(/* ??? */);
    expect(response.body).toHaveProperty(/* ??? */);
  });

  it('debería retornar 404 al intentar eliminar una tarea que no existe', async () => {
    // TODO: escribe la prueba completa
  });

  it('después de eliminar, el GET ya no debería encontrar esa tarea', async () => {
    // Este es un caso más completo: creamos, borramos y verificamos
    const tarea = TaskRepository.create({ title: 'Tarea temporal' });

    await request(app).delete(`/tasks/${tarea.id}`);

    const response = await request(app).get(`/tasks/${tarea.id}`);

    // TODO: ¿qué status esperarías ahora?
    expect(response.status).toBe(/* ??? */);
  });

});
