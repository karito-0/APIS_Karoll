import { http } from '../../core/http.js';
import { validarIdUsuario } from '../usuario/usuario-id.js';

export function getPostsByUser(userId) {
  validarIdUsuario(userId);
  return http(`/posts?userId=${userId}`);
}
