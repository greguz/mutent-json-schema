export default {
  input: './mutent-json-schema.mjs',
  output: {
    file: './mutent-json-schema.cjs',
    format: 'cjs'
  },
  external: ['ajv', 'mutent']
}
