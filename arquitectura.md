# Arquitectura

El proyecto separa la construcción de resultados, el punto de entrada, las consultas por funcionalidad y el acceso HTTP compartido:

- `src/app.js` exporta `construirResultado()`, que coordina el flujo asíncrono y devuelve el resultado sin imprimirlo ni iniciar solicitudes por sí solo.
- `src/main.js` es el punto de entrada: solicita en la terminal el ID del usuario (1-10), ejecuta `construirResultado(id)` y muestra una sola vez el resultado.
- `src/terminal-output.js` presenta los objetos con color y títulos jerárquicos, sin efectos secundarios.
- `src/feature/` contiene los servicios organizados por funcionalidad: usuario, publicaciones (`post`) y comentarios.
- `src/core/` ofrece `http(path)`, el cliente HTTP compartido que consulta JSONPlaceholder, controla el tiempo de espera, informa errores de red/timeout/HTTP y devuelve el JSON.

El único barril del proyecto es `src/index.js`. Reexporta las funciones públicas `getUser`, `getPostsByUser` y `getCommentsByPost`; no hay barriles adicionales dentro de `src/feature/`.

El flujo comienza solicitando un ID de usuario entre 1 y 10, continúa con sus publicaciones y después solicita los comentarios de cada publicación usando su identificador real. Los servicios validan el ID para limitar los endpoints a los usuarios disponibles de JSONPlaceholder. Las consultas de comentarios se ejecutan en paralelo con `Promise.all` y `posts.map`. `src/app.js` arma y devuelve el objeto anidado; `src/terminal-output.js` lo distribuye en secciones por usuario, publicación y comentario, y `src/main.js` realiza una única escritura en la terminal.

El código de aplicación está agrupado en `src/`; las pruebas de integración del flujo están en `test/` y usan `node:test` con `fetch` simulado. Las especificaciones funcionales permanecen en `especificaciones/`. ESLint y Prettier se ejecutan desde `npm run lint`; la integración continua ejecuta lint y pruebas.
