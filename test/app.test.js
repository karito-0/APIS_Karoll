import assert from 'node:assert/strict';
import test from 'node:test';
import { construirResultado } from '../src/app.js';
import { http } from '../src/core/http.js';
import { construirSalida } from '../src/terminal-output.js';
import { getPostsByUser } from '../src/feature/post/post.service.js';
import { getUser } from '../src/feature/usuario/usuario.service.js';

const apiBaseUrl = 'https://jsonplaceholder.typicode.com';
const user = { id: 1, name: 'Leanne Graham' };
const posts = [
  { userId: 1, id: 17, title: 'Primera publicación', body: 'Contenido uno' },
  { userId: 1, id: 42, title: 'Segunda publicación', body: 'Contenido dos' },
];
const commentsByPostId = {
  17: [
    {
      postId: 17,
      id: 101,
      name: 'Comentario uno',
      email: 'uno@example.com',
      body: 'Texto uno',
    },
  ],
  42: [
    {
      postId: 42,
      id: 102,
      name: 'Comentario dos',
      email: 'dos@example.com',
      body: 'Texto dos',
    },
  ],
};

function installFetchMock(t, implementation) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = implementation;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });
}

function mockJsonResponse(data, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => data,
  };
}

function installSuccessfulApi(t, calls = []) {
  const responses = new Map([
    [`${apiBaseUrl}/users/1`, user],
    [`${apiBaseUrl}/posts?userId=1`, posts],
    ...posts.map((post) => [
      `${apiBaseUrl}/comments?postId=${post.id}`,
      commentsByPostId[post.id],
    ]),
  ]);

  installFetchMock(t, async (url, options) => {
    calls.push({ url, options });
    if (!responses.has(url)) {
      throw new Error(`Endpoint inesperado: ${url}`);
    }
    return mockJsonResponse(responses.get(url));
  });
}

test('construirResultado devuelve el usuario, publicaciones y comentarios', async (t) => {
  installSuccessfulApi(t);

  const result = await construirResultado();

  assert.deepEqual(result, {
    usuario: user.name,
    posts: posts.map((post) => ({
      id: post.id,
      title: post.title,
      body: post.body,
      comentarios: commentsByPostId[post.id],
    })),
  });
});

test('solo consulta los endpoints permitidos y usa el postId real', async (t) => {
  const calls = [];
  installSuccessfulApi(t, calls);

  await construirResultado();

  assert.deepEqual(
    calls.map(({ url }) => url),
    [
      `${apiBaseUrl}/users/1`,
      `${apiBaseUrl}/posts?userId=1`,
      `${apiBaseUrl}/comments?postId=17`,
      `${apiBaseUrl}/comments?postId=42`,
    ],
  );
  assert.ok(
    calls.every(({ options }) => options.signal instanceof AbortSignal),
  );
  assert.ok(
    calls.every(({ url }) =>
      /^https:\/\/jsonplaceholder\.typicode\.com\/(?:users\/(?:[1-9]|10)|posts\?userId=(?:[1-9]|10)|comments\?postId=\d+)$/.test(
        url,
      ),
    ),
  );
  assert.ok(calls.every(({ url }) => !/postId=[01]$/.test(url)));
});

test('construirResultado consulta al usuario elegido y sus publicaciones', async (t) => {
  const calls = [];
  const selectedUser = { id: 2, name: 'Ervin Howell' };
  const selectedPosts = [
    { userId: 2, id: 23, title: 'Publicación seleccionada', body: 'Contenido' },
  ];
  const selectedComment = {
    postId: 23,
    id: 201,
    name: 'Comentario',
    email: 'comentario@example.com',
    body: 'Texto',
  };
  const responses = new Map([
    [`${apiBaseUrl}/users/2`, selectedUser],
    [`${apiBaseUrl}/posts?userId=2`, selectedPosts],
    [`${apiBaseUrl}/comments?postId=23`, [selectedComment]],
  ]);
  installFetchMock(t, async (url) => {
    calls.push(url);
    assert.ok(responses.has(url), `Endpoint inesperado: ${url}`);
    return mockJsonResponse(responses.get(url));
  });

  const result = await construirResultado(2);

  assert.equal(result.usuario, selectedUser.name);
  assert.equal(result.posts[0].id, selectedPosts[0].id);
  assert.deepEqual(result.posts[0].comentarios, [selectedComment]);
  assert.deepEqual(calls, [
    `${apiBaseUrl}/users/2`,
    `${apiBaseUrl}/posts?userId=2`,
    `${apiBaseUrl}/comments?postId=23`,
  ]);
});

test('rechaza IDs fuera del rango de usuarios JSONPlaceholder', async () => {
  for (const id of [0, 11, 1.5, '2']) {
    await assert.rejects(getUser(id), RangeError);
    assert.throws(() => getPostsByUser(id), RangeError);
  }
});

test('organiza los objetos coloreados con títulos jerárquicos', () => {
  const salida = construirSalida({
    usuario: 'Leanne Graham',
    posts: [
      {
        id: 17,
        title: 'Título *importante*',
        body: 'Contenido del post',
        comentarios: [
          {
            postId: 17,
            id: 101,
            name: 'Comentario',
            email: 'persona@example.com',
            body: 'Texto del comentario',
          },
        ],
      },
    ],
  });

  assert.match(salida, /^# Usuario/m);
  assert.match(salida, /^# Publicaciones \(1\)$/m);
  assert.match(salida, /^## Publicación 17$/m);
  assert.match(salida, /^### Comentarios \(1\)$/m);
  assert.match(salida, /^#### Comentario 101$/m);
  assert.ok(salida.includes(String.fromCharCode(27)));
  assert.ok(salida.includes("'Leanne Graham'"));
  assert.ok(salida.includes("'Título *importante*'"));
  assert.ok(salida.includes('postId:'));
  assert.ok(salida.includes('17'));
  assert.doesNotMatch(salida, /```json/);
});

test('la salida indica cuando no hay publicaciones', () => {
  assert.match(
    construirSalida({ usuario: 'Leanne Graham', posts: [] }),
    /# Publicaciones \(0\)\nSin publicaciones\./,
  );
});

test('HTTP 404 incluye el estado y la ruta como causa', async (t) => {
  installFetchMock(t, async () => mockJsonResponse({}, 404));

  await assert.rejects(http('/users/1'), (error) => {
    assert.match(error.message, /Error HTTP 404/);
    assert.deepEqual(error.cause, { status: 404, path: '/users/1' });
    return true;
  });
});

test('un fallo de red conserva el error original como causa', async (t) => {
  const networkError = new TypeError('fallo simulado');
  installFetchMock(t, async () => {
    throw networkError;
  });

  await assert.rejects(http('/users/1'), (error) => {
    assert.match(error.message, /Error de red/);
    assert.equal(error.cause, networkError);
    return true;
  });
});

test('el timeout se identifica por separado y conserva su causa', async (t) => {
  const timeoutError = new DOMException('tiempo agotado', 'TimeoutError');
  t.mock.method(AbortSignal, 'timeout', () => AbortSignal.abort(timeoutError));
  installFetchMock(t, async (_url, { signal }) => {
    throw signal.reason;
  });

  await assert.rejects(http('/users/1'), (error) => {
    assert.match(error.message, /Tiempo de espera agotado/);
    assert.equal(error.cause, timeoutError);
    return true;
  });
});
