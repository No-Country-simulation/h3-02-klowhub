import { isatty } from 'tty';

const reset = '\x1b[0m';
const colors = {
  gray: '\x1b[37m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
};

export function gray(text: string): string {
  return `${colors.gray}${text}${reset}`;
}

export function green(text: string): string {
  return `${colors.green}${text}${reset}`;
}

export function red(text: string): string {
  return `${colors.red}${text}${reset}`;
}

export function yellow(text: string): string {
  return `${colors.yellow}${text}${reset}`;
}

export function isColorSupported(): boolean {
  const env = process.env; // Acceder a las variables de entorno
  const hasColor =
    env.FORCE_COLOR || // Si se fuerza el uso de colores
    env.NODE_DISABLE_COLORS === undefined || // Colores habilitados por defecto
    (env.TERM && env.TERM !== 'dumb') || // Si el terminal no es 'dumb'
    isatty(process.stdout.fd); // Verificar si la salida estándar es un terminal interactivo

  return Boolean(hasColor);
}
