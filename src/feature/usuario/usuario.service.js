import { http } from '../../core/http.js';
import { validarIdUsuario } from './usuario-id.js';

export async function getUser(id = 1) {
  validarIdUsuario(id);

  return http(`/users/${id}`);
}
