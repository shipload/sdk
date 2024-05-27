import {assert} from 'chai'
import {makeClient} from '@wharfkit/mock-data'
import Shipload, {Coordinates, ServerContract} from '$lib'
import {Chains} from '@wharfkit/common'

const client = makeClient('https://jungle4.greymass.com')
const contractName = 'shipload.gm'

const server = new ServerContract.Contract({client})

suite('Shipload', function () {
    let shipload: Shipload

    setup(async () => {
        shipload = await Shipload.load(Chains.Jungle4, {client, contractName})
    })

    suite('marketprice', function () {
        test('should return correct market price', async function () {
            const location: Coordinates = {x: 10, y: 20}
            const good_id = 1
            const price = await shipload.marketprice(location, good_id)

            const {price: onChainMarketPrice} = await server.readonly('marketprice', {
                location,
                good_id,
            })

            assert.isTrue(price.equals(onChainMarketPrice))
        })
    })

    suite('marketprices', function () {
        test('should return correct market prices for all goods', async function () {
            const location: Coordinates = {x: 10, y: 20}
            const prices = await shipload.marketprices(location)

            const onChainMarketPrices = await server.readonly('marketprices', {
                location,
            })

            assert.equal(prices.length, onChainMarketPrices.length)
            prices.forEach((price, index) => {
                assert.isTrue(price.price.equals(onChainMarketPrices[index].price))
                assert(price.id.equals(onChainMarketPrices[index].id))
            })
        })
    })

    suite('getState', function () {
        test('should return the correct state', async function () {
            const state = await shipload.getState()
            const expectedState = await server.table('state').get()

            assert.deepEqual(state, expectedState)
        })
    })
})
