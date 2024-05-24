import {Coordinates, GoodPrice, StateData} from './types'
import {getGood, goods} from './goods'
import {APIClient} from '@wharfkit/antelope'
import {roll} from './rolls'
import {ERROR_SYSTEM_NOT_INITIALIZED} from './errors'
import {ServerContract} from './contracts'

async function getState(client: APIClient): Promise<StateData> {
    const server = new ServerContract.Contract({client})
    const state = await server.table('state').get()
    if (!state) {
        throw new Error(ERROR_SYSTEM_NOT_INITIALIZED)
    }
    return state
}

export async function marketprice(
    location: Coordinates,
    good_id: number,
    client?: APIClient
): Promise<number> {
    const serverClient = client || new APIClient({url: 'https://jungle4.greymass.com'})
    const stateData = await getState(serverClient)

    const epochSeed = stateData.epochseed
    const good = getGood(good_id)

    const rollSeed: string = `${location.x}${epochSeed}${location.y}${good_id}`
    const rollValue = roll(stateData.seed, rollSeed)
    const price = priceFromRoll(good.base_price, rollValue)

    return price
}

export async function marketprices(
    location: Coordinates,
    client?: APIClient
): Promise<GoodPrice[]> {
    const serverClient = client || new APIClient({url: 'https://jungle4.greymass.com'})
    return Promise.all(
        goods.map(async (good) => ({
            price: await marketprice(location, good.id, serverClient),
            good_id: good.id,
        }))
    )
}

export function priceFromRoll(basePrice: number, roll: number): number {
    let price: number

    if (roll < 13) {
        price = basePrice * 2.25 // ~0.02% chance
    } else if (roll < 176) {
        price = basePrice * 1.75 // ~0.25% chance
    } else if (roll < 996) {
        price = basePrice * 1.4 // ~1.25% chance
    } else if (roll < 2966) {
        price = basePrice * 1.225 // ~3.00% chance
    } else if (roll < 19568) {
        price = basePrice * 1.07 // ~25.33% chance
    } else if (roll < 45988) {
        price = 0 // ~40.30% chance
    } else if (roll < 62508) {
        price = basePrice * 0.925 // ~25.33% chance
    } else if (roll < 64518) {
        price = basePrice * 0.77 // ~3.00% chance
    } else if (roll < 65437) {
        price = basePrice * 0.595 // ~1.25% chance
    } else if (roll < 65523) {
        price = basePrice * 0.41 // ~0.25% chance
    } else {
        price = basePrice * 0.285 // ~0.02% chance
    }

    return Number(price.toFixed(0))
}
