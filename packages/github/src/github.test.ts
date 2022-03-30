import { gitHubCommits } from '.'

describe('github', () => {
  it('should foo', async () => {
    const commits = await gitHubCommits('ianlovell')
    console.log(commits)
  })
})
