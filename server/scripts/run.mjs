import { spawn } from 'child_process';
import { join, normalize } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DEFAULT_CONFIG = {
  directories: ['apps/gateway', 'apps/courses', 'apps/users'],
  command: 'install',
  manager: 'npm'
};

function parseArgs() {
  const args = process.argv.slice(2);
  const config = { ...DEFAULT_CONFIG };

  args.forEach(arg => {
    const [key, value] = arg.replace('--', '').split('=');
    if (key === 'command' && value) {
      config.command = value;
    }
    if (key === 'directories' && value) {
      config.directories = value.split(',').map(dir => normalize(dir.trim()));
    }
    if (key === 'manager' && value) {
      config.manager = value;
    }
  });

  return config;
}

function validateDirectory(path) {
  if (!existsSync(path)) {
    throw new Error(`El directorio no existe: ${path}`);
  }
}

function runCommand(manager, command, directory) {
  return new Promise((resolve, reject) => {
    // Obtenemos la ruta absoluta
    const absolutePath = join(__dirname, '..', directory);
    try {
      validateDirectory(absolutePath);
      console.log(`📂 Ejecutando 'npm ${command}' en: ${absolutePath}`);
      // Según el SO
      const isWindows = process.platform === 'win32';
      const managerCmd = isWindows ? `${manager}.cmd` : manager;
      const childProcess = spawn(managerCmd, [command], {
        cwd: absolutePath,
        stdio: 'inherit',
        shell: isWindows
      });
      childProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`El comando falló con código de salida ${code}`));
        } else {
          resolve();
        }
      });

      childProcess.on('error', (error) => {
        reject(new Error(`Error ejecutando el comando: ${error.message}`));
      });

    } catch (error) {
      reject(error);
    }
  });
}

async function executeCommands() {
  try {
    console.time('Tiempo total');
    const { command, directories, manager } = parseArgs();

    console.log(`🚀 Iniciando ejecución del comando '${command}' en ${directories.length} directorios`);

    let hasErrors = false;

    for (const dir of directories) {
      try {
        await runCommand(manager, command, dir);
        console.log(`✅ Comando completado exitosamente en ${dir}`);
      } catch (error) {
        hasErrors = true;
        console.error(`❌ Error en ${dir}:`, error.message);
      }
    }

    if (hasErrors) {
      console.log('⚠️ El proceso completó con algunos errores');
    } else {
      console.log('✨ Proceso completado exitosamente');
    }

    console.timeEnd('Tiempo total');
  } catch (error) {
    console.error('❌ Error general:', error.message);
    process.exit(1);
  }
}

executeCommands().catch(error => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});