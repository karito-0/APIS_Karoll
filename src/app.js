import { getCommentsByPost, getPostsByUser, getUser } from './index.js';

export async function construirResultado(userId = 1) {
  const user = await getUser(userId);
  const posts = await getPostsByUser(user.id);
  const postsWithComments = await Promise.all(
    posts.map(async (post) => ({
      id: post.id,
      title: post.title,
      body: post.body,
      comentarios: await getCommentsByPost(post.id),
    })),
  );

  const resultado = {
    usuario: user.name,
    posts: postsWithComments,
  };
  return resultado;
}
