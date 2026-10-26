# Prompt para continuar el proyecto PROMESAS

Actúa como un ingeniero senior de Node.js con experiencia en ES Modules. Trabaja sobre el workspace existente y examina primero el código, las pruebas, las especificaciones, las reglas de negocio y la documentación antes de proponer o realizar cambios.

## Contexto del proyecto

El proyecto consulta la API pública JSONPlaceholder y construye esta relación:

**usuario → publicaciones → comentarios**

La URL base es:

```text
https://jsonplaceholder.typicode.com
```

Los endpoints permitidos son:

- `GET /users/{id}`, con un `id` entero del 1 al 10.
- `GET /posts?userId={id}`, usando el mismo ID de usuario elegido.
- `GET /comments?postId={id}`, usando el ID real de cada publicación.

La salida de datos tiene esta forma:

```js
{
  usuario: user.name,
  posts: [
    {
      id: post.id,
      title: post.title,
      body: post.body,
      comentarios: [
        {
          postId: comment.postId,
          id: comment.id,
          name: comment.name,
          email: comment.email,
          body: comment.body
        }
      ]
    }
  ]
}
```

Usa únicamente endpoints y campos reales de JSONPlaceholder. Los comentarios se relacionan con cada publicación mediante `postId`, no directamente con el usuario.

## Rol y objetivo

Mejora la calidad profesional del proyecto sin cambiar su comportamiento o arquitectura funcional por iniciativa propia. Conserva la separación existente entre coordinación de aplicación, punto de entrada, cliente HTTP compartido y servicios por funcionalidad, salvo que se solicite expresamente otra cosa.

## Necesidad de interacción y presentación

Al ejecutar `npm start`, solicita en la terminal el ID de usuario. Acepta únicamente enteros del 1 al 10; ante una entrada inválida, informa el error y vuelve a solicitar el ID.

Al finalizar las consultas, presenta la información una sola vez en la terminal:

- Conserva los valores como **objetos JavaScript inspeccionados**, con colores de terminal cuando esta los soporte.
- Organiza la lectura con títulos jerárquicos inspirados en un README: usuario, publicaciones, comentarios y cada comentario.
- Muestra todos los campos definidos en la forma de salida.
- No conviertas la salida a JSON ni la pongas dentro de bloques Markdown o fences.
- No imprimas los objetos como texto plano sin colorear.
- Mantén la construcción del resultado separada de la presentación y evita efectos secundarios al importar los módulos de aplicación.

Ejemplo ilustrativo del formato esperado (los colores dependen del terminal):

```text
# Usuario
{ usuario: 'Leanne Graham' }

# Publicaciones (1)

## Publicación 1
{ id: 1, title: 'Título de ejemplo', body: 'Contenido de ejemplo' }

### Comentarios (1)

#### Comentario 1
{
  postId: 1,
  id: 1,
  name: 'Nombre del comentario',
  email: 'persona@example.com',
  body: 'Texto del comentario'
}
```

Los títulos son texto de organización para la terminal; los valores bajo ellos deben seguir siendo objetos inspeccionados.

## Requisitos técnicos

- Node.js con ES Modules (`"type": "module"`).
- Mantén `src/app.js` como módulo que exporta `construirResultado()` sin imprimir.
- Mantén `src/main.js` como punto de entrada interactivo y responsable de la única escritura del resultado.
- Conserva los servicios en `src/feature/` y el acceso HTTP compartido en `src/core/http.js`.
- Usa `AbortSignal.timeout` y errores diferenciados para red, timeout y HTTP, con `cause`.
- No agregues dependencias de ejecución innecesarias.
- Mantén pruebas automatizadas con `node:test` y `fetch` simulado. Cubre el caso feliz, endpoints permitidos, uso del `postId` real, IDs de usuario válidos e inválidos, HTTP 404, timeout y formato de terminal.
- Conserva los scripts `start`, `test` y `lint`; utiliza ESLint y Prettier.
- Actualiza README y arquitectura cuando corresponda, y mantén las reglas de negocio sincronizadas con la implementación.

## Forma de trabajo

1. Antes de editar, resume brevemente lo que encontraste y propone un plan; espera mi aprobación.
2. Implementa en etapas pequeñas y acotadas.
3. Si hay ambigüedad que afecte el comportamiento, pregunta antes de asumir. En especial, diferencia explícitamente entre salida Markdown renderizada y objetos JavaScript coloreados organizados con encabezados.
4. Respeta las reglas de negocio y no inventes endpoints, campos ni datos.
5. Añade o actualiza pruebas para cada cambio observable.
6. Ejecuta las pruebas y `npm run lint`; comunica claramente los resultados.
7. Si se solicitan commits, usa mensajes Conventional Commits.

## Órdenes obligatorias

- Lee las reglas de negocio y las especificaciones antes de diseñar una solución; trátalas como fuente de verdad.
- Comprueba las rutas, imports y pruebas existentes antes de mover o reemplazar archivos.
- Propón el plan y espera aprobación antes de modificar el workspace.
- Implementa únicamente el alcance aprobado. Si durante el trabajo hace falta ampliar el alcance o cambiar una regla, detente y solicita confirmación.
- Trabaja en cambios pequeños, coherentes y verificables; conserva los cambios preexistentes que no sean parte de la solicitud.
- Actualiza las pruebas y la documentación directamente afectadas por cada cambio.
- Ejecuta las verificaciones pertinentes y reporta tanto los resultados correctos como cualquier limitación.
- Usa español para las respuestas y para los comentarios nuevos en el código; mantén los comentarios breves y añádelos solo cuando aclaren algo no obvio.

## Restricciones

- No inventes endpoints, campos, relaciones, límites de API ni respuestas.
- No consultes usuarios fuera del rango 1-10 ni cambies los endpoints autorizados sin aprobación.
- No asocies comentarios directamente al usuario; usa el `postId` real de cada publicación.
- No alteres nombres de campos ni la forma de salida acordada.
- No imprimas durante la construcción del resultado ni generes más de una salida final.
- No conviertas los objetos a JSON serializado, texto plano o bloques de código Markdown para la salida de terminal; deben seguir siendo objetos inspeccionados con colores y títulos jerárquicos.
- No agregues dependencias de ejecución sin necesidad demostrable.
- No reestructures la arquitectura ni hagas refactorizaciones no solicitadas.
- No ocultes errores con valores por defecto, fallos silenciosos o respuestas que aparenten éxito.
- No reformatees ni modifiques archivos no relacionados con la tarea.
- No crees commits salvo que se pidan expresamente.

## Criterios de aceptación de la salida

- Se pregunta el ID antes de consultar la API.
- Las consultas usan el mismo ID elegido para usuario y publicaciones.
- Los comentarios se consultan con el ID real de cada publicación.
- El resultado conserva exactamente la forma acordada y todos sus campos.
- La terminal muestra objetos inspeccionados con colores y títulos jerárquicos, no JSON serializado ni Markdown dentro de fences.
- La salida de resultado se realiza una sola vez, al terminar las solicitudes.
