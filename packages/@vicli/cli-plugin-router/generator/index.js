module.exports = (api, options = {}) => {
  // api.injectImports(api.entryFile, `import { BrowserRouter, Route, Link } from 'react-router-dom'`)
  // api.injectRootOptions(api.entryFile, `router`)

  api.extendPackage({
    dependencies: {
      'react-router-dom': '^5.1.2'
    }
  })

  api.render('./template', {
    historyMode: options.historyMode,
    doesCompile: api.hasPlugin('babel') || api.hasPlugin('typescript')
  })

  if (api.invoking) {
    if (api.hasPlugin('typescript')) {
      /* eslint-disable-next-line node/no-extraneous-require */
      const convertFiles = require('@vue/cli-plugin-typescript/generator/convert')
      convertFiles(api)
    }
  }
}
