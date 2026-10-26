import { http } from '../../core/http.js';

export function getCommentsByPost(postId) {
  return http(`/comments?postId=${postId}`);
}
