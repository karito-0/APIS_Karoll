const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
const REQUEST_TIMEOUT_MS = 10_000;

export async function http(path) {
  const signal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, { signal });
  } catch (error) {
    const timedOut = signal.aborted || error?.name === 'TimeoutError';
    const message = timedOut
      ? `Tiempo de espera agotado en la ruta ${path}`
      : `Error de red en la ruta ${path}`;

    throw new Error(message, { cause: error });
  }

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status} en la ruta ${path}`, {
      cause: { status: response.status, path },
    });
  }

  return response.json();
}
