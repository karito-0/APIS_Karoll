# APIS_Karoll

Encadenamiento de promesas con async/await usando JSONPlaceholder.
Obtiene un usuario con sus posts (y comentarios), álbumes (y fotos) y todos.

## Ejecutar (Node.js 18+)

```bash
node main.js
```

## Prompt utilizado

```text
ACCESO A GITHUB (completar antes de enviar el prompt)
USUARIO: <escribe aquí tu usuario de GitHub>
TOKEN: <pega aquí tu token personal de GitHub>
REPOSITORIO: <pega aquí la URL del repositorio, terminada en .git>

ROL
Actúa como un ingeniero de software experto en JavaScript, con dominio de
ES Modules, programación asíncrona y consumo de APIs REST.
 
TAREA
Desarrolla un ejemplo de encadenamiento de promesas con async/await
que obtenga un usuario y toda su información relacionada, y la muestre en un
único console.log como un objeto JSON completo.
 
CONTEXTO
- Estamos practicando encadenamiento de promesas en JavaScript.
- Usamos la API https://jsonplaceholder.typicode.com/
- El proyecto usa un archivo barril (index.js) que reexporta las funciones
  de los servicios (users, posts, comments, photos).
- En esta API los comentarios NO tienen userId: pertenecen a un post
  (postId). La relación correcta es usuario → posts → comentarios.
- El usuario también tiene álbumes (con fotos) y tareas (todos).
 
FORMATO DE RESPUESTA
1. Estructura de carpetas del proyecto.
2. Código de cada archivo, en bloques separados y con su ruta:
   http.js, users.js, posts.js, comments.js, photos.js, index.js (barril)
   y main.js.
3. Un único console.log final con JSON.stringify(resultado, null, 2)
   (o console.dir con depth: null) que muestre:
   { user, posts: [ { ...post, comments: [...] } ], albums: [...], todos: [...] }
4. Ejemplo resumido de la salida esperada.
5. Instrucciones para ejecutarlo (type: "module" y comando node).
6. Usa async/await.
 
 
RESTRICCIONES
- Usa únicamente JavaScript (ES Modules). No uses ni menciones Java ni PHP.
- No inventes endpoints, propiedades ni datos: usa solo los que existen en
  JSONPlaceholder. Si algo no existe, dilo.
- No alucines: si tienes dudas, pregunta antes de asumir.
- Sigue estas instrucciones al pie de la letra.
- Responde en español, con comentarios breves en el código.
```

> No escribas tu token real en este archivo: déjalo como campo vacío y compártelo solo en el chat.
