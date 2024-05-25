import {makeClient} from '@wharfkit/mock-data'
import {ServerContract} from '$lib'
import {Serializer} from '@wharfkit/antelope'
import {assert} from 'chai'

const client = makeClient('https://jungle4.greymass.com')
const server = new ServerContract.Contract({client})

suite('travel', function () {
    test('travel estimation', async function () {
        const result = await server.readonly('esttravel', {
            id: 1,
            destination: {x: 0, y: 2},
        })
        assert.deepEqual(Serializer.objectify(result), {
            stats: {
                capacity: 10000000,
                drain: 100000,
                mass: '2147483648005500000',
                orbit: 0,
                recharge: 65536000,
                thrust: '42949672960100000',
            },
            loaders: {capacity: 0, mass: 655360000, quantity: 38528, thrust: 65688},
            origin: {x: 10000, y: '4294967296'},
            destination: {x: 0, y: '8589934592'},
            distance: '4294967296',
            totalmass: '2190433320960000000',
            acceleration: '841813590016',
            flighttime: '60129542144',
            energyusage: '6012954214400000',
            rechargetime: '60129542144',
            loadtime: 0,
            time: '120259084288',
        })
    })
})
