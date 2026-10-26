# Especificación: comentarios

- **Endpoint:** `/comments?postId=X`
- **Parámetros:** `postId`, enviado como parámetro de consulta con el identificador real de la publicación.
- **Función de consulta:** `getCommentsByPost(postId)`
- **Archivo:** `src/feature/comentarios/comentarios.service.js`

Cada comentario devuelto por la API contiene los campos reales `postId`, `id`, `name`, `email` y `body`. Los comentarios no tienen `userId`; se asocian a su publicación mediante `postId`.
