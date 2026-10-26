# PROMESAS

Aplicación Node.js que consulta JSONPlaceholder y construye la relación usuario → publicaciones → comentarios.

## Requisitos

- Node.js 20 o superior.
- npm.

## Instalación y ejecución

```sh
npm ci
npm start
```

Al iniciar, la terminal solicita un ID de usuario entre `1` y `10`. Al terminar las consultas, muestra los objetos JavaScript con colores y los agrupa con títulos jerárquicos:

```text
# Usuario
{ usuario: 'Leanne Graham' }

# Publicaciones (1)

## Publicación 1
{ id: 1, title: '...', body: '...' }

### Comentarios (1)

#### Comentario 1
{ postId: 1, id: 1, name: '...', email: '...', body: '...' }
```

Los valores se muestran coloreados en la terminal; los puntos suspensivos abrevian el ejemplo.

## Estructura del proyecto

```text
.
├── src/
│   ├── app.js
│   ├── main.js
│   ├── index.js
│   ├── core/
│   │   └── http.js
│   └── feature/
│       ├── usuario/
│       ├── post/
│       └── comentarios/
├── test/
├── especificaciones/
├── .github/workflows/
├── arquitectura.md
└── reglas-de-negocio.md
```

## Flujo

```mermaid
flowchart TD
    A[src/main.js] --> B[construirResultado en src/app.js]
    B --> C[Solicitar ID 1-10]
    C --> D[getUser: /users/{id}]
    D --> E[getPostsByUser: /posts?userId={id}]
    E --> F[getCommentsByPost: /comments?postId=ID real]
    F --> G[Armar { usuario, posts }]
    G --> H[Objetos coloreados y agrupados por títulos]
    D -. HTTP compartido .-> I[src/core/http.js]
    E -. HTTP compartido .-> I
    F -. HTTP compartido .-> I
```

## Decisiones de diseño

- El código de aplicación vive en `src/`; `src/app.js` construye y devuelve el resultado, `src/terminal-output.js` organiza los objetos coloreados con títulos y `src/main.js` controla el arranque y la única salida en terminal.
- Se mantiene la arquitectura por funcionalidad (`src/feature/`) y el cliente HTTP compartido (`src/core/`).
- Los endpoints se limitan a `/users/{id}` y `/posts?userId={id}` para IDs entre 1 y 10, y `/comments?postId=X` con el ID real de cada publicación.
- Los comentarios se consultan en paralelo y se buscan usando el `id` real de cada publicación.
- El cliente HTTP usa `AbortSignal.timeout` y conserva las causas al distinguir fallos de red, timeout y respuestas HTTP no exitosas.
- No hay dependencias de ejecución. Las dependencias de desarrollo cubren ESLint y Prettier.

## Calidad

```sh
npm test
npm run lint
```

Las pruebas usan `node:test` y sustituyen `fetch`; no dependen de la red.
