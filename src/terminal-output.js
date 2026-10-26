import { inspect } from 'node:util';

function inspeccionarObjeto(valor) {
  return inspect(valor, { colors: true, depth: null });
}

export function construirSalida(resultado) {
  const secciones = [
    '# Usuario',
    inspeccionarObjeto({ usuario: resultado.usuario }),
    '',
    `# Publicaciones (${resultado.posts.length})`,
  ];

  if (resultado.posts.length === 0) {
    secciones.push('Sin publicaciones.');
    return secciones.join('\n');
  }

  for (const post of resultado.posts) {
    secciones.push(
      '',
      `## Publicación ${post.id}`,
      inspeccionarObjeto({
        id: post.id,
        title: post.title,
        body: post.body,
      }),
      '',
      `### Comentarios (${post.comentarios.length})`,
    );

    if (post.comentarios.length === 0) {
      secciones.push('Sin comentarios.');
      continue;
    }

    for (const comentario of post.comentarios) {
      secciones.push(
        '',
        `#### Comentario ${comentario.id}`,
        inspeccionarObjeto(comentario),
      );
    }
  }

  return secciones.join('\n');
}
