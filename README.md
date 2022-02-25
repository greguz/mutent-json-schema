# mutent-json-schema

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

```javascript
import { Store } from 'mutent'
import { mutentJsonSchema } from 'mutent-json-schema'

const store = new Store({
  adapter: new MyAdapter(),
  // Add the JSON Schema plugin to the store declaration
  plugins: [
    mutentJsonSchema({
      schema: {
        type: 'object',
        additionalProperties: false,
        properties: {
          version: {
            type: 'integer',
            minimum: 0
          },
          value: {
            type: 'string'
          }
        }
      }
    })
  ]
})

// Use the store as usual
```
