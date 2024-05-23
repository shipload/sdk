import {makeClient} from '@wharfkit/mock-data'
import {ServerContract} from '$lib'
import {Serializer} from '@wharfkit/antelope'

const client = makeClient('https://jungle4.greymass.com')
const server = new ServerContract.Contract({client})

suite('travel', function () {
    test('travel estimation', async function () {
        const result = await server.readonly('esttravel', {
            id: 1,
            destination: {x: 0, y: 2},
        })
        // console.log(Serializer.objectify(result))
    })
})
