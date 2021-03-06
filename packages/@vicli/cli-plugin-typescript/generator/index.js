const pluginDevDeps = require('../package.json').devDependencies

module.exports = (api, {
  classComponent,
  tsLint,
  lintOn = [],
  convertJsToTs,
  allowJs
}, _, invoking) => {
  if (typeof lintOn === 'string') {
    lintOn = lintOn.split(',')
  }

  // api.extendPackage({
  //   devDependencies: {
  //     typescript: pluginDevDeps.typescript
  //   }
  // })

  // if (classComponent) {
  //   api.extendPackage({
  //     dependencies: {
  //       'vue-class-component': pluginDevDeps['vue-class-component'],
  //       'vue-property-decorator': pluginDevDeps['vue-property-decorator']
  //     }
  //   })
  // }

  if (tsLint) {
    api.extendPackage({
      scripts: {
        lint: 'vicli-cli-service lint'
      }
    })

    if (!lintOn.includes('save')) {
      api.extendPackage({
        vue: {
          lintOnSave: false
        }
      })
    }

    if (lintOn.includes('commit')) {
      api.extendPackage({
        devDependencies: {
          'lint-staged': '^9.5.0'
        },
        gitHooks: {
          'pre-commit': 'lint-staged'
        },
        'lint-staged': {
          '*.ts': ['vicli-cli-service lint', 'git add'],
          '*.tsx': ['vicli-cli-service lint', 'git add']
        }
      })
    }

    // lint and fix files on creation complete
    // api.onCreateComplete(() => {
    //   return require('../lib/tslint')({}, api, true)
    // })
  }

  // late invoke compat
  if (invoking) {
    if (api.hasPlugin('unit-mocha')) {
      // eslint-disable-next-line node/no-extraneous-require
      require('@vue/cli-plugin-unit-mocha/generator').applyTS(api)
    }

    if (api.hasPlugin('unit-jest')) {
      // eslint-disable-next-line node/no-extraneous-require
      require('@vue/cli-plugin-unit-jest/generator').applyTS(api)
    }

    if (api.hasPlugin('eslint')) {
      // eslint-disable-next-line node/no-extraneous-require
      require('@vue/cli-plugin-eslint/generator').applyTS(api)
    }
  }

  api.render('./template', {
    isTest: process.env.VUE_CLI_TEST || process.env.VUE_CLI_DEBUG,
    hasMocha: api.hasPlugin('unit-mocha'),
    hasJest: api.hasPlugin('unit-jest')
  })

  require('./convert')(api, { tsLint, convertJsToTs })
}
