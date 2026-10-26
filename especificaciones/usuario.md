# Especificación: usuario

- **Endpoint permitido:** `/users/{id}`, para IDs enteros del `1` al `10`.
- **Parámetros:** `getUser(id = 1)` acepta el identificador como argumento; el programa solicita el ID en la terminal.
- **Función de consulta:** `getUser(id = 1)`
- **Archivo:** `src/feature/usuario/usuario.service.js`

La API devuelve un usuario con estos campos reales:

- `id`
- `name`
- `username`
- `email`
- `address` (objeto)
- `phone`
- `website`
- `company` (objeto)

El nombre que se muestra en el resultado se toma de `name` en la respuesta de la API.
