import test from 'ava'
import S from 'fluent-json-schema'
import { Store } from 'mutent'

import { mutentJsonSchema } from './mutent-json-schema.mjs'

test('fluent-json-schema', async t => {
  const store = new Store({
    adapter: {
      create () {},
      update () {}
    },
    plugins: [
      mutentJsonSchema({
        ajvOptions: {
          coerceTypes: true
        },
        schema: S.object()
          .additionalProperties(false)
          .prop('value', S.number())
      })
    ]
  })

  await t.throwsAsync(
    store.create({ value: 'nope' }).unwrap(),
    { code: 'EMUT_INVALID_ENTITY' }
  )

  await t.throwsAsync(
    store.create({}).assign({ value: 'nope' }).unwrap(),
    { code: 'EMUT_INVALID_ENTITY' }
  )

  await t.throwsAsync(
    store.from({}).assign({ value: 'nope' }).unwrap(),
    { code: 'EMUT_INVALID_ENTITY' }
  )

  const a = await store.create({ value: '42' }).unwrap()
  t.deepEqual(a, { value: 42 })

  const b = await store.from({ value: 42 }).unwrap()
  t.deepEqual(b, { value: 42 })
})
