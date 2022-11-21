# mutent-json-schema

[![npm](https://img.shields.io/npm/v/mutent-json-schema)](https://www.npmjs.com/package/mutent-json-schema)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This plugin for [Mutent](https://github.com/greguz/mutent) will inject a set of Hooks that will validate that all Entities match with the desired JSON Schema.

The validation will be performed when any Entity is loaded (`onEntity` hook) and before any Adapter's write op (`beforeCreate` and `beforeUpdate` hooks).

## Install

```
npm i mutent-json-schema
```

## API

### `mutentJsonSchema(options)`

Returns a new Mutent's Plugin that enforces a JSON Schema to all Entities.

- `options` `<Object>` 
- `[options.ajv]` `<Ajv>` A customized instance of [Ajv](https://ajv.js.org/). Optional.
- `[options.ajvOptions]` `<Object>` Custom [options](https://ajv.js.org/options.html) for the Ajv constructor function. Optional defaults are documented below.
- `options.schema` `<*>` The required JSON Schema to enforce. Schemas generated with [`fluent-json-schema`](https://github.com/fastify/fluent-json-schema) are also supported.
- Returns: `<Plugin>`

### Default Ajv options

Those are the default options used to create the internal Ajv instance.

```javascript
new Ajv({
  allErrors: process.env.NODE_ENV !== 'production',
  coerceTypes: true,
  removeAdditional: true,
  useDefaults: true,
  ...pluginOptions.ajvOptions
})
```

### JSON Schema errors

When an Entity with an invalid schema is detected, an error will be thrown. The error is an instance of `MutentError` with the `"EMUT_INVALID_ENTITY"` code.

You can access the raw Ajv-generated errors, and the Entity that has generated those errors, from the `.info.errors` and `.info.data` properties respectively.

## Example

```javascript
import { Store } from 'mutent'
import { ArrayAdapter } from 'mutent-array'
import { mutentJsonSchema } from 'mutent-json-schema'

const store = new Store({
  adapter: new ArrayAdapter(),
  plugins: [
    mutentJsonSchema({
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: {
            type: 'string'
          },
          value: {
            type: 'integer'
          }
        },
        required: ['id', 'value']
      }
    })
  ]
})

async function foo () {
  try {
    await store.create({}).unwrap()
  } catch (err) {
    console.error(err)
    // err.code will be 'EMUT_INVALID_ENTITY'
    // err.info.data will contain the data that triggered the error
    // err.info.errors will contain Ajv errors
  }
  
  await store.create({ id: 'my_entity', value: 42 }).unwrap()

  console.log(store.adapter.items) // [ { id: 'my_entity', value: 42 } ]
}

foo()
```

## License

Licensed under [MIT](./LICENSE).
