import {makeClient} from '@wharfkit/mock-data'
import {hash, ServerContract} from '$lib'
import assert from 'assert'

const client = makeClient('https://jungle4.greymass.com')
const server = new ServerContract.Contract({client})

suite('hash', function () {
    test('SDK output matches API', async function () {
        const value = 'foo'
        const state = await server.table('state').get()
        if (!state) {
            throw new Error('state not found')
        }
        const result = await server.readonly('hash', {
            value,
        })
        assert.equal(result, String(hash(state.seed, value)))
    })
})
