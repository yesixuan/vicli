const { chalk, toShortPluginId } = require('@vicli/cli-shared-utils')

exports.getFeatures = (preset) => {
  const features = []
  if (preset.router) {
    features.push('router')
  }
  if (preset.vuex) {
    features.push('vuex')
  }
  if (preset.cssPreprocessor) {
    features.push(preset.cssPreprocessor)
  }
  const plugins = Object.keys(preset.plugins).filter(dep => {
    return dep !== '@vicli/cli-service'
  })
  features.push.apply(features, plugins)
  return features
}

exports.formatFeatures = (preset, lead, joiner) => {
  const features = exports.getFeatures(preset)
  return features.map(dep => {
    dep = toShortPluginId(dep)
    return `${lead || ''}${chalk.yellow(dep)}`
  }).join(joiner || ', ')
}
