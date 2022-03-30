import axios from 'axios'

export async function gitHubCommits(username: string) {
  const response = await axios({
    method: 'get',
    url: `https://github.com/users/${username}/contributions`,
  })

  return response.data
}
