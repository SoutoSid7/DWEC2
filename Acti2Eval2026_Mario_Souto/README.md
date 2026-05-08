# Actividad 2 EVAL 2026 - Gestión de pólizas

Aplicación web interna para gestionar pólizas de seguro de automóvil. Incluye frontend en React y backend en Node.js con Express. Los datos se guardan en `backend/data/seguros.json`, que solo se modifica desde el backend.

## Funcionalidades implementadas

- Consulta de todas las pólizas en tabla.
- Alta manual de una nueva póliza con formulario.
- Eliminación mediante botón en la tabla.
- Actualización de póliza seleccionando por `id_poliza`, sin permitir modificar `id_poliza` ni `matricula`.
- API REST:
  - `GET /polizas`
  - `GET /polizas/:id_poliza`
  - `POST /polizas`
  - `PUT /polizas`
  - `DELETE /polizas/:id_poliza`
  - `GET /estadisticas`
- Estadísticas calculadas en el backend con filtros por transmisión, combustible/eléctrico y siniestro.
- Validaciones en frontend y backend.
- Expresiones regulares guardadas en React Context: `frontend/src/context/ValidationContext.jsx`.

## Validaciones

- `id_poliza`: formato `IDXXXXX`, donde `XXXXX` son 5 dígitos.
- Todos los campos son obligatorios.
- `vigencia`: entre 1 y 21 meses.
- `matricula`: 4 números y 3 letras españolas permitidas.
- `edad_coche`: entre 0 y 10.
- `edad_tomador`: entre 18 y 90 años.
- `transmision`: solo `Automática` o `Manual`.
- `comb_electrico`: solo `Combustión` o `Eléctrico`.
- `siniestro`: 0 o 1, mostrado como Sí/No en la interfaz.

## Cómo ejecutarlo

Necesitas Node.js instalado.

```bash
npm install
npm run install:all
npm run dev
```

Después abre el navegador en:

```text
http://localhost:5173
```

El backend se ejecuta en:

```text
http://localhost:3001
```

## Estructura del proyecto

```text
actividad2eval2026-polizas/
├── backend/
│   ├── data/seguros.json
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── style.css
│   ├── index.html
│   └── package.json
├── package.json
└── README.md
```

## Cómo se ha hecho

1. En el backend se ha creado un servidor Express que lee y escribe el archivo JSON con `fs/promises`.
2. Se han definido rutas REST para listar, buscar, crear, modificar y eliminar pólizas.
3. Se han duplicado validaciones importantes en backend para proteger el archivo JSON aunque el frontend falle.
4. En React se han creado componentes separados: formulario, tabla y panel de estadísticas.
5. El formulario usa eventos `onChange` y `onSubmit` para capturar datos y validarlos.
6. Las llamadas al servidor se hacen con `fetch` y `async/await` en `frontend/src/services/api.js`.
7. Las estadísticas se piden al endpoint `/estadisticas`, por lo que el cálculo no se realiza en el cliente.

## Entrega

Entrega este proyecto comprimido en ZIP, sin `node_modules`. También súbelo completo a un repositorio de GitHub. Antes de comprimir, borra cualquier carpeta `node_modules` si la has generado.
