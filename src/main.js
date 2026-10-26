import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { construirResultado } from './app.js';
import { validarIdUsuario } from './feature/usuario/usuario-id.js';
import { construirSalida } from './terminal-output.js';

const terminal = createInterface({ input: stdin, output: stdout });

async function solicitarIdUsuario() {
  while (true) {
    const respuesta = await terminal.question(
      'Seleccione el ID de usuario (1-10): ',
    );
    const id = Number(respuesta.trim());

    try {
      return validarIdUsuario(id);
    } catch (error) {
      if (!(error instanceof RangeError)) {
        throw error;
      }
      console.error(error.message);
    }
  }
}

solicitarIdUsuario()
  .then((userId) => construirResultado(userId))
  .then((resultado) => stdout.write(`${construirSalida(resultado)}\n`))
  .catch((error) => {
    console.error('Error al obtener los datos:', error);
    process.exitCode = 1;
  })
  .finally(() => {
    terminal.close();
  });
