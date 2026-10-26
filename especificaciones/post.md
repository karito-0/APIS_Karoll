# Especificación: publicaciones

- **Endpoint:** `/posts?userId={id}`, donde `id` es el ID de usuario elegido (1-10).
- **Parámetros:** `userId`, enviado como parámetro de consulta con el identificador real del usuario.
- **Función de consulta:** `getPostsByUser(userId)`
- **Archivo:** `src/feature/post/post.service.js`

Cada publicación devuelta por la API contiene los campos reales `userId`, `id`, `title` y `body`. En el objeto final se conservan `id`, `title` y `body`; la relación con el usuario se usa para consultar las publicaciones, pero `userId` no se copia al resultado.
