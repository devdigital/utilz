{
    "command": {
      "create": {
        "license": "MIT"
      },
      "publish": {
        "allowBranch": "master",
        "bump": "patch",
        "conventionalCommits": true,
        "yes": true,
        "message": "chore(release): Publish"
      }
    },
    "packages": ["packages/*"],
    "loglevel": "success",
    "version": "independent",
    "npmClient": "yarn",
    "registry": "https://registry.npmjs.org/",
    "useWorkspaces": true,
    "ignoreChanges": [
      "CHANGELOG.md",
      "**/__tests__/**",
      "**/__mocks__/**",
      "**/__testfixtures__/**"
    ]
  }
  