import path from 'node:path';
import { ExecutorContext } from '@nx/devkit';
import { NxYarnDeployExecutorSchema } from './schema';

function log(message: string, data?: unknown) {
  console.log(
    'Nx Yarn Deploy Executor:',
    message,
    data ? JSON.stringify(data, null, 2) : ''
  );
}

function logError(message: string) {
  console.error('Nx Yarn Deploy Executor:', message);
}

export default async function runExecutor(
  options: NxYarnDeployExecutorSchema,
  context: ExecutorContext
) {
  log('Received options', options);

  const projectFolder = path.resolve(context.root, options.projectFolderPath);

  log('Running yarn npm release', { projectFolder });

  try {
    const { execa } = await import('execa');

    const { stdout } = execa('yarn', ['npm', 'release'], {
      cwd: projectFolder,
    });

    log('Release', stdout);

    return {
      success: true,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logError(error.message);

    return {
      success: false,
    };
  }
}
