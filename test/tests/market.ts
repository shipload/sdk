import assert from 'assert'
import {makeClient} from '@wharfkit/mock-data'
import {Checksum256, Serializer} from '@wharfkit/antelope'

import {Coordinates, marketprice, marketprices} from '$lib'

const client = makeClient('https://jungle4.greymass.com')

suite('market', function () {
    suite('marketprice', function () {
        test('SDK output matches API', async function () {
            const location: Coordinates = {x: 10, y: 20}
            const good_id = 1
            const price = await marketprice(location, good_id)

            assert.equal(price, 185)
        })
    })

    const expectedMarketPrices = {
        1: 185,
        2: 277.5,
        3: 0,
        4: 0,
        5: 0,
        6: 925,
        7: 171.5,
        8: 166.5,
        9: 0,
        10: 0,
        11: 321,
        12: 269.5,
        13: 428,
        14: 0,
    }

    suite('marketprices', function () {
        test('SDK output matches API', async function () {
            const location: Coordinates = {x: 10, y: 20}
            const prices = await marketprices(location)

            assert(prices.length > 0)
            prices.forEach(({good_id, price}) => {
                assert.equal(price, expectedMarketPrices[good_id])
            })
        })
    })
})
