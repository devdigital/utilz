const path = require('path')
const { collect, ext } = require('@utilz/file')

async function main() {
  const items = await collect(path.resolve(__dirname, './items'), {
    filter: ext('.txt'),
  })

  console.log({ items })
}

main()
