import Ajv from 'ajv'
import { MutentError } from 'mutent'

function getAjvInstance (options) {
  if (options.ajv) {
    return options.ajv
  }
  return new Ajv({
    allErrors: process.env.NODE_ENV !== 'production',
    coerceTypes: true,
    removeAdditional: true,
    useDefaults: true,
    ...options.ajvOptions
  })
}

/**
 * TODO: use Mutent's exported function (future versions)
 */
function getAdapterName (adapter) {
  return typeof adapter === 'object' && adapter !== null
    ? adapter[Symbol.for('adapter-name')] || adapter.constructor.name
    : 'Unknown Adapter'
}

export function mutentJsonSchema (options) {
  const ajv = getAjvInstance(options)

  const validate = ajv.compile(options.schema.valueOf())

  function hook (entity, ctx) {
    if (!validate(entity.valueOf())) {
      return Promise.reject(
        new MutentError(
          'EMUT_INVALID_ENTITY',
          'Current entity does not match the configured schema.',
          {
            adapter: getAdapterName(ctx.adapter),
            intent: ctx.intent,
            argument: ctx.argument,
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
