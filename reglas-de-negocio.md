# Reglas de negocio

1. La relación de datos es usuario → publicaciones → comentarios.
2. Cada comentario se vincula con una publicación por medio de `postId`; los comentarios no se vinculan directamente con el usuario.
3. El nombre mostrado se obtiene de `user.name` recibido de la API; no se fija en la lógica.
4. Los únicos endpoints permitidos son:
   - `/users/{id}`, donde `id` es un entero entre `1` y `10`, solicitado al usuario en la terminal.
   - `/posts?userId={id}`, con el mismo ID elegido.
   - `/comments?postId=X`, donde `X` es el identificador real de cada publicación.
5. El objeto final tiene la forma `{ usuario, posts }`. Cada publicación conserva `id`, `title` y `body`, y contiene `comentarios`; cada comentario conserva `postId`, `id`, `name`, `email` y `body`.
6. El resultado se presenta una única vez y al final en la terminal, como objetos JavaScript coloreados y organizados con títulos jerárquicos de usuario, publicación y comentarios.
