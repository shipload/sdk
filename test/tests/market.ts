import {makeClient} from '@wharfkit/mock-data'
import {ServerContract} from '$lib'
import {Serializer} from '@wharfkit/antelope'

const client = makeClient('https://jungle4.greymass.com')
const server = new ServerContract.Contract({client})

suite('market', function () {
    test('price at location', async function () {
        const result = await server.readonly('marketprice', {
            location: {x: 0, y: 0},
            good_id: 3,
        })
        console.log(Serializer.objectify(result))
    })
})
