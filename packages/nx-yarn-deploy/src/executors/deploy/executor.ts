import { ExecutorContext } from '@nx/devkit';
import { NxYarnDeployExecutorSchema } from './schema';

export default async function runExecutor(
  options: NxYarnDeployExecutorSchema,
  context: ExecutorContext
) {
  console.log('Executor ran for Nx Yarn Deploy', options);
  console.log('context', JSON.stringify(context, null, 2));

  return {
    success: true,
  };
}
