export function validarIdUsuario(id) {
  if (!Number.isInteger(id) || id < 1 || id > 10) {
    throw new RangeError('El ID de usuario debe ser un entero entre 1 y 10');
  }

  return id;
}
