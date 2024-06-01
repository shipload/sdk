import {makeClient} from '@wharfkit/mock-data'
import Shipload, {
    distanceBetweenCoordinates,
    ServerContract,
    travelplan,
    travelplanDuration,
} from '$lib'
import {assert} from 'chai'
import {Chains} from '@wharfkit/session'

const client = makeClient('https://jungle4.greymass.com')
const server = new ServerContract.Contract({client})

const origin = {x: 0, y: 0}
const destination = {x: 0, y: 1}
let plan: ServerContract.Types.travel_plan

const platformContractName = 'platform.gm'
const serverContractName = 'shipload.gm'

suite('travel', function () {
    let shipload: Shipload

    setup(async () => {
        shipload = await Shipload.load(Chains.Jungle4, {
            client,
            platformContractName,
            serverContractName,
        })
        const ship = await server.table('ship').get()
        if (!ship) {
            throw new Error('No ship found')
        }
        const game = await shipload.getGame()
        plan = travelplan(game, ship, [], {x: 0, y: 0}, {x: 0, y: 1}, false)
    })

    // test('server::travelplan', async function () {
    //     console.log(Serializer.objectify(plan))
    // })

    suite('travelplanDuration', () => {
        test('should return the correct duration', async () => {
            const duration = travelplanDuration(plan)
            assert.equal(Number(duration), 14)
        })
    })

    suite('distanceBetweenCoordinates', () => {
        test('0,0 -> 0,1', async () => {
            const distance = distanceBetweenCoordinates(origin, destination)
            assert.equal(Number(plan.distance), Number(distance))
        })
        test('0,0 -> 5,9', async () => {
            const api = await server.readonly('travelplan', {
                id: 1,
                origin,
                destination: {x: 5, y: 9},
                recharge: false,
            })
            const sdk = distanceBetweenCoordinates(origin, {x: 5, y: 9})
            assert.equal(Number(api.distance), Number(sdk))
        })
    })
})
