import {Checksum256, Int64, UInt16, UInt16Type, UInt64, UInt64Type} from '@wharfkit/antelope'

import {ServerContract} from './contracts'
import {hash} from './hash'
import {Distance} from './types'

export function distanceTraveled(ship: ServerContract.Types.ship_row): number {
    if (ship.travelplan) {
        const {departure, duration} = ship.travelplan
        return (+new Date() - +departure.toDate()) / (Number(duration) * 1000)
    }
    return 0
}

export function distanceBetweenCoordinates(
    origin: ServerContract.ActionParams.Type.coordinates,
    destination: ServerContract.ActionParams.Type.coordinates
): UInt16 {
    return distanceBetweenPoints(origin.x, origin.y, destination.x, destination.y)
}

export function distanceBetweenPoints(
    x1: UInt64Type,
    y1: UInt64Type,
    x2: UInt64Type,
    y2: UInt64Type
): UInt16 {
    const x = Math.pow(x1 - x2, 2)
    const y = Math.pow(y1 - y2, 2)
    return UInt16.from(Math.sqrt(x + y))
}

export function lerp(
    origin: ServerContract.ActionParams.Type.coordinates,
    destination: ServerContract.ActionParams.Type.coordinates,
    time: number
): ServerContract.ActionParams.Type.coordinates {
    return {
        x: (1 - time) * Number(origin.x) + time * Number(destination.x),
        y: (1 - time) * Number(origin.y) + time * Number(destination.y),
    }
}

export function rotation(
    origin: ServerContract.ActionParams.Type.coordinates,
    destination: ServerContract.ActionParams.Type.coordinates
) {
    return Math.atan2(destination.y - origin.y, destination.x - origin.x) * (180 / Math.PI) + 90
}

export function hasPlanet(
    seed: Checksum256,
    coordinates: ServerContract.ActionParams.Type.coordinates
): boolean {
    const str = ['system', coordinates.x, coordinates.y].join('-')
    return String(hash(seed, str)).slice(0, 2) === '00'
}

export function findNearbyPlanets(
    seed: Checksum256,
    origin: ServerContract.ActionParams.Type.coordinates,
    maxDistance: UInt16Type = 20
): Distance[] {
    const nearbySystems: Distance[] = []

    const max = UInt16.from(maxDistance)
    const xMin = Int64.from(origin.x).subtracting(max)
    const xMax = Int64.from(origin.x).adding(max)
    const yMin = Int64.from(origin.y).subtracting(max)
    const yMax = Int64.from(origin.y).adding(max)

    for (let x = Number(xMin); x <= Number(xMax); x++) {
        for (let y = Number(yMin); y <= Number(yMax); y++) {
            const samePlace = x === origin.x && y === origin.y
            if (!samePlace) {
                const distance = distanceBetweenPoints(origin.x, origin.y, x, y)
                if (Number(distance) <= Number(max)) {
                    const system = hasPlanet(seed, {x, y})
                    if (system) {
                        nearbySystems.push({origin, destination: {x, y}, distance})
                    }
                }
            }
        }
    }

    return nearbySystems
}
