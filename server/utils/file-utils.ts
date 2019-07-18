const fs = require('fs');
const path = require('path');

const FileUtils = {
  // Require all the modules in the specified directory
  mergeDirectoryModules: (dirpath: any) => {
    return fs.readdirSync(dirpath, 'utf8')
      .filter((filename: string) => !/^[_|index.]/.test(filename))
      .reduce(
        (acc: any, filename: string) => ({
          ...acc,
          ...require('' + path.resolve(dirpath, filename)).default,
        }),
        {}
      )
  },

  // Calculate max depth of a GraphQL query string
  calculateQueryDepth: (query: any) => {
    let depth = -1
    let maxDepth = depth

    for (let letter of query) {
      switch (letter) {
        case '{':
          if (++depth > maxDepth) maxDepth = depth
          break
        case '}':
          depth--
      }
    }
    return maxDepth
  }

}

export default FileUtils;
