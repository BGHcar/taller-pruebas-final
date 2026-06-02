# Taller de Recuperación — Pruebas Unitarias e Integración
**Taller de Pruebas — Universidad de Caldas**

---

## ¿Qué hay acá?

Una API REST en Node.js/Express que maneja tareas. Está completa y funciona bien. Tu trabajo es escribir las pruebas, no tocar el código de la API.

La API tiene cinco endpoints:

| Método | Ruta | Qué hace |
|--------|------|----------|
| GET | `/tasks` | Lista todas las tareas |
| GET | `/tasks/:id` | Obtiene una tarea por id |
| POST | `/tasks` | Crea una tarea nueva |
| PATCH | `/tasks/:id/status` | Cambia el estado de una tarea |
| DELETE | `/tasks/:id` | Elimina una tarea |

Los estados válidos de una tarea son: `pending`, `in_progress`, `done`.

---

## Cómo arrancar

```bash
# Instala las dependencias
npm install

# Levanta el servidor si quieres probarlo manualmente
npm run dev

# Corre los tests
npm test

# Corre los tests con reporte de cobertura (esto es lo que debes entregar)
npm run test:coverage
```

---

## Estructura del proyecto

```
taller-pruebas/
├── src/
│   ├── app.js                        # Configuración de Express
│   ├── server.js                     # Punto de entrada
│   └── tasks/
│       ├── task.repository.js        # Acceso a datos (en memoria)
│       ├── tasks.service.js          # Lógica de negocio
│       ├── tasks.controller.js       # Manejo de requests/responses
│       └── tasks.router.js           # Definición de rutas
└── test/
    ├── unit/
    │   └── tasks.service.test.js     # AQUÍ escribes las pruebas unitarias
    └── integration/
        └── tasks.api.test.js         # AQUÍ escribes las pruebas de integración
```

---

## Tu trabajo

Los dos archivos que tienes que completar están en la carpeta `test/`. Están llenos de comentarios `// TODO` que te indican exactamente qué escribir en cada caso.

**Pruebas unitarias** (`test/unit/tasks.service.test.js`):
- Prueban el servicio de forma aislada
- Usan mocks para que el repositorio no ejecute código real
- Mínimo 6 casos cubiertos

**Pruebas de integración** (`test/integration/tasks.api.test.js`):
- Prueban los endpoints de punta a punta
- No usan mocks: la app corre real en memoria con Supertest
- Mínimo un happy path y un caso de error por endpoint

**No necesitas modificar ningún archivo de `src/`.**

---

## Qué debes entregar

1. Los dos archivos de test completos (con todos los `// TODO` resueltos)
2. Una captura de pantalla de `npm run test:coverage` corriendo con éxito
3. Una tabla en el informe con los casos de prueba (puedes usar la plantilla de abajo)

### Plantilla de tabla para el informe

| ID | Descripción | Tipo | Resultado esperado | Resultado obtenido |
|----|-------------|------|-------------------|--------------------|
| UT-01 | getAllTasks retorna arreglo vacío | Unitaria | `[]` | |
| UT-02 | ... | | | |
| IT-01 | GET /tasks responde 200 | Integración | Status 200 | |
| ... | | | | |

---

## Criterios de evaluación

| Criterio | Peso |
|----------|------|
| Pruebas unitarias completas y pasando | 40% |
| Pruebas de integración completas y pasando | 40% |
| Informe con tabla de casos y reflexión | 20% |

La cobertura mínima esperada es **70%** sobre los archivos de `src/tasks/`.

---

## Preguntas frecuentes

**¿Puedo cambiar el código de la API?**
No. Si encuentras algo raro, es parte del ejercicio; escribe el test que lo evidencie.

**¿Puedo agregar más casos de prueba además de los del TODO?**
Sí, y suma puntos.

**¿Qué significa que un mock "retorne null"?**
Significa que le estás diciendo a Jest: "cuando se llame a esta función, devuelve null en lugar de ejecutar el código real". Lo ves en el taller con `TaskRepository.findById.mockReturnValue(null)`.

**El test falla con "Cannot find module", ¿qué hago?**
Revisa que corriste `npm install` y que estás ejecutando Jest desde la raíz del proyecto.
