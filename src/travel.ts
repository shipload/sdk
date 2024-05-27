import {Checksum256} from '@wharfkit/antelope'

import {ServerContract} from './contracts'
import {hash} from './hash'
import {Coordinates, Distance} from './types'

export function distanceTraveled(ship: ServerContract.Types.ship_row): number {
    if (ship.travelplan) {
        const {departure, duration} = ship.travelplan
        return (+new Date() - +departure.toDate()) / (Number(duration) * 1000)
    }
    return 0
}

export function distanceBetweenPoints(x1: number, y1: number, x2: number, y2: number) {
    const x = Math.pow(x1 - x2, 2)
    const y = Math.pow(y1 - y2, 2)
    return Math.sqrt(x + y)
}

export function lerp(origin: Coordinates, destination: Coordinates, time: number) {
    return {
        x: (1 - time) * origin.x + time * destination.x,
        y: (1 - time) * origin.y + time * destination.y,
    }
}

export function rotation(origin: Coordinates, destination: Coordinates) {
    return Math.atan2(destination.y - origin.y, destination.x - origin.x) * (180 / Math.PI) + 90
}

export function hasPlanet(seed: Checksum256, coords: Coordinates): boolean {
    const str = ['system', coords.x, coords.y].join('-')
    return String(hash(seed, str)).slice(0, 2) === '00'
}

export function findNearbyPlanets(
    seed: Checksum256,
    origin: Coordinates,
    maxDistance = 20
): Distance[] {
    const nearbySystems: Distance[] = []

    const xMin = origin.x - maxDistance
    const xMax = origin.x + maxDistance
    const yMin = origin.y - maxDistance
    const yMax = origin.y + maxDistance

    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            const samePlace = x === origin.x && y === origin.y
            if (!samePlace) {
                const distance = distanceBetweenPoints(origin.x, origin.y, x, y)
                if (distance <= maxDistance) {
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
