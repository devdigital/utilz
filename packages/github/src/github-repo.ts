import { Octokit } from '@octokit/rest'

export type GitHubItemType = 'file' | 'dir' | 'symlink' | 'submodule' // See https://docs.github.com/en/rest/reference/repos#get-repository-content

export type GitHubItemSummary = {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url?: string
  git_url?: string
  download_url?: string
  type: GitHubItemType
}

function toItemType(type: string): GitHubItemType {
  if (type === 'dir') {
    return 'dir'
  }

  if (type === 'symlink') {
    return 'symlink'
  }

  if (type === 'submodule') {
    return 'submodule'
  }

  return 'file'
}

type GitHubRepoOptions = {
  octokit: Octokit
  owner: string
  repo: string
}

function getGitHubItems({ octokit, owner, repo }: GitHubRepoOptions) {
  return async function ({
    path,
  }: {
    path: string
  }): Promise<GitHubItemSummary[]> {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
    })

    if (!Array.isArray(response?.data)) {
      throw new Error('Unexpected non array from GitHub getContent.')
    }

    return response.data.map((item) => ({
      name: item.name,
      path: item.path,
      sha: item.sha,
      size: item.size,
      url: item.url,
      html_url: item.html_url ?? undefined,
      git_url: item.git_url ?? undefined,
      download_url: item.download_url ?? undefined,
      type: toItemType(item.type),
    }))
  }
}

function getGitHubItemsRecursive({ octokit, owner, repo }: GitHubRepoOptions) {
  return async function ({
    path,
  }: {
    path: string
  }): Promise<GitHubItemSummary[]> {
    const files = await getGitHubItems({ octokit, owner, repo })({ path })

    const result = await Promise.all(
      files.map(async (item) => {
        switch (item.type) {
          case 'file': {
            return item
          }

          case 'dir': {
            return [
              item,
              ...(await getGitHubItemsRecursive({
                octokit,
                owner,
                repo,
              })({ path: item.path })),
            ]
          }

          default: {
            throw new Error(`Unexpected repo file type: ${item.type}`)
          }
        }
      })
    )

    return result.flat()
  }
}

function getGitHubFileBySha({ octokit, owner, repo }: GitHubRepoOptions) {
  return async function ({ sha }: { sha: string }) {
    const { data } = await octokit.request(
      'GET /repos/{owner}/{repo}/git/blobs/{file_sha}',
      {
        owner,
        repo,
        file_sha: sha,
      }
    )

    const encoding = data.encoding as Parameters<typeof Buffer.from>['1']
    return Buffer.from(data.content, encoding).toString()
  }
}

function getGitHubFileByPath({ octokit, owner, repo }: GitHubRepoOptions) {
  return async function ({ path }: { path: string }) {
    const { data } = (await octokit.request(
      'GET /repos/{owner}/{repo}/contents/{path}',
      {
        owner,
        repo,
        path,
      }
    )) as { data: { content?: string; encoding?: string } }

    if (!data.content || !data.encoding) {
      console.error(data)
      throw new Error(
        `Tried to get ${path} but got back something that was unexpected. It doesn't have a content or encoding property.`
      )
    }

    const encoding = data.encoding as Parameters<typeof Buffer.from>['1']
    return Buffer.from(data.content, encoding).toString()
  }
}

export function gitHubRepo({
  auth,
  owner,
  repo,
}: {
  auth: string
  owner: string
  repo: string
}) {
  const octokit = new Octokit({
    auth,
  })

  return {
    getItems: getGitHubItems({ octokit, owner, repo }),
    getItemsRecursive: getGitHubItemsRecursive({ octokit, owner, repo }),
    getFile: getGitHubFileByPath({ octokit, owner, repo }),
    getFileBySha: getGitHubFileBySha({ octokit, owner, repo }),
  }
}
