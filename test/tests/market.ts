import {assert} from 'chai'
import {makeClient} from '@wharfkit/mock-data'

import {Coordinates, marketprice, marketprices, priceFromRoll, ServerContract} from '$lib'

const client = makeClient('https://jungle4.greymass.com')
const server = new ServerContract.Contract({client})

suite('market', function () {
    suite('marketprice', function () {
        test('SDK output matches API', async function () {
            const location: Coordinates = {x: 10, y: 20}
            const good_id = 1
            const price = await marketprice(location, good_id, client)

            const {price: onChainMarketPrice} = await server.readonly('marketprice', {
                location,
                good_id,
            })

            assert.isTrue(price.equals(onChainMarketPrice)) // should be onChainMarketPrice value
        })
    })

    suite('marketprices', function () {
        test('SDK output matches API', async function () {
            const location: Coordinates = {x: 10, y: 20}
            const prices = await marketprices(location, client)

            assert(prices.length > 0)

            const onChainMarketPrices = await server.readonly('marketprices', {
                location,
            })

            prices.forEach(({price}, index) => {
                assert.isTrue(price.equals(onChainMarketPrices[index].price))
            })
        })
    })

    suite('priceFromRoll', function () {
        test('should return base price multiplied by 2.25 when roll < 13', function () {
            const result = priceFromRoll(100, 10)
            assert.isTrue(result.equals(225))
        })

        test('should return base price multiplied by 1.75 when roll < 176', function () {
            const result = priceFromRoll(100, 100)
            assert.isTrue(result.equals(175))
        })

        test('should return base price multiplied by 1.4 when roll < 996', function () {
            const result = priceFromRoll(100, 500)
            assert.isTrue(result.equals(140))
        })

        test('should return base price multiplied by 1.225 when roll < 2966', function () {
            const result = priceFromRoll(100, 2000)
            assert.isTrue(result.equals(122))
        })

        test('should return base price multiplied by 17 when roll < 19568', function () {
            const result = priceFromRoll(100, 10000)
            assert.isTrue(result.equals(107))
        })

        test('should return 0 when roll < 45988', function () {
            const result = priceFromRoll(100, 30000)
            assert.isTrue(result.equals(0))
        })

        test('should return base price multiplied by 0.925 when roll < 62508', function () {
            const result = priceFromRoll(100, 50000)
            assert.isTrue(result.equals(92))
        })

        test('should return base price multiplied by 0.77 when roll < 64518', function () {
            const result = priceFromRoll(100, 63000)
            assert.isTrue(result.equals(77))
        })

        test('should return base price multiplied by 0.595 when roll < 65437', function () {
            const result = priceFromRoll(100, 65000)
            assert.isTrue(result.equals(59))
        })

        test('should return base price multiplied by 0.41 when roll < 65523', function () {
            const result = priceFromRoll(100, 65500)
            assert.isTrue(result.equals(41))
        })

        test('should return base price multiplied by 0.285 when roll >= 65523', function () {
            const result = priceFromRoll(100, 65523)
            assert.isTrue(result.equals(28))
        })
    })
})
