import { NxYarnDeployExecutorSchema } from './schema';
import executor from './executor';

const options: NxYarnDeployExecutorSchema = {
  projectFolderPath: 'test',
};

describe('Echo Executor', () => {
  it('can run', async () => {
    const output = await executor(options, {
      root: '',
      cwd: '',
      isVerbose: false,
    });

    expect(output.success).toBe(true);
  });
});
