import {GoodPrice} from './types'
import {getGood, goods} from './goods'
import {Checksum256Type, UInt16Type, UInt64, UInt64Type} from '@wharfkit/antelope'
import {roll} from './rolls'
import {ServerContract} from './contracts'

export async function marketprice(
    location: ServerContract.ActionParams.Type.coordinates,
    good_id: UInt16Type,
    gameSeed: Checksum256Type,
    epochSeed: Checksum256Type
): Promise<UInt64> {
    const good = getGood(good_id)
    const rollSeed = `${location.x}${epochSeed}${location.y}${good_id}`
    const rollValue = roll(gameSeed, rollSeed)
    return priceFromRoll(good.base_price, rollValue)
}

export async function marketprices(
    location: ServerContract.ActionParams.Type.coordinates,
    gameSeed: Checksum256Type,
    epochSeed: Checksum256Type
): Promise<GoodPrice[]> {
    return Promise.all(
        goods.map(async (good) => {
            const price = await marketprice(location, good.id, gameSeed, epochSeed)
            return {price, id: good.id}
        })
    )
}

export function priceFromRoll(basePrice: UInt64Type, roll: number): UInt64 {
    basePrice = Number(basePrice)
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
    return UInt64.from(price)
}
