import Ajv from 'ajv'
import { MutentError } from 'mutent'

function getAjvInstance (options) {
  if (options.ajv) {
    return options.ajv
  }
  return new Ajv({
    coerceTypes: true,
    removeAdditional: true,
    useDefaults: true,
    ...options.ajvOptions
  })
}

export function mutentJsonSchema (options) {
  const ajv = getAjvInstance(options)

  const validate = ajv.compile(options.schema.valueOf())

  function hook (entity, context) {
    if (!validate(entity.valueOf())) {
      return Promise.reject(
        new MutentError(
          'EMUT_INVALID_ENTITY',
          'Current entity does not match the configured schema',
          {
            store: context.store,
            intent: context.intent,
            argument: context.argument,
            data: entity.valueOf(),
            errors: validate.errors
          }
        )
      )
    }
  }

  return {
    hooks: {
      onEntity: hook,
      beforeCreate: hook,
      beforeUpdate: hook
    }
  }
}
