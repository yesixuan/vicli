const { createSchema, validateSync } = require('@vicli/cli-shared-utils')

const schema = createSchema(joi => ({
  title: joi.string().required(),
  message: joi.string().required(),
  icon: joi.string()
}))

exports.validateNotify = (options) => {
  validateSync(options, schema)
}
