import {makeClient} from '@wharfkit/mock-data'
import {getCurrentEpoch, hash, hash512, PlatformContract, ServerContract} from '$lib'
import assert from 'assert'
import {TimePointSec} from '@wharfkit/antelope'

const client = makeClient('https://jungle4.greymass.com')
const platform = new PlatformContract.Contract({client})
const server = new ServerContract.Contract({client})

suite('epoch', function () {
    // test('getCurrentEpoch', async function () {
    //     const game = await platform.table('games').get('shipload.gm')
    //     if (!game) {
    //         throw new Error('game not found')
    //     }
    //     const epoch = getCurrentEpoch(game)
    // })
})
