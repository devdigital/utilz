import path from 'node:path';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
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
  console.error('Nx Yarn Deploy Executor Error:', message);
}

export default async function runExecutor(
  options: NxYarnDeployExecutorSchema,
  context: ExecutorContext
) {
  log('Received options', options);

  const projectFolder = path.join(context.root, options.projectFolderPath);

  log('Running yarn npm publish', { projectFolder });

  try {
    const publishCommand = `yarn npm publish --access ${
      options.access ?? 'restricted'
    }`;

    const { stdout: publishStdout, stderr: publishStderr } = await promisify(
      exec
    )(publishCommand, {
      cwd: projectFolder,
    });

    if (publishStderr) {
      logError(publishStderr);
      return { success: false };
    }

    log('Release', publishStdout);

    const gitPushCommand = `git push --atomic --follow-tags`;

    const { stdout: gitPushStdout, stderr: gitPushStderr } = await promisify(
      exec
    )(gitPushCommand, {
      cwd: projectFolder,
    });

    if (gitPushStderr) {
      logError(gitPushStderr);
      return { success: false };
    }

    log('Git push', gitPushStdout);

    return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logError(error.stdout);

    return { success: false };
  }
}
