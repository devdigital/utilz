import axios from 'axios'
import * as cheerio from 'cheerio'

export type GitHubCommit = {
  date: string
  count: number
  level: number
}

export async function gitHubCommits(username: string): Promise<GitHubCommit[]> {
  const response = await axios({
    method: 'get',
    url: `https://github.com/users/${username}/contributions`,
  })

  const $ = cheerio.load(response.data)

  const commits: GitHubCommit[] = []

  $('.ContributionCalendar-day').each((_, element) => {
    commits.push({
      date: $(element).attr('data-date') ?? '',
      count: Number($(element).attr('data-count') ?? 0),
      level: Number($(element).attr('data-level') ?? 0),
    })
  })

  return commits.filter((c) => c.date)
}
