import {Checksum256} from '@wharfkit/antelope'

import {ServerContract} from './contracts'
import {hash} from './hash'
import {Coordinates} from './types'

export function distance(ship: ServerContract.Types.ship_row): number {
    if (ship.travelplan) {
        const {departure, duration} = ship.travelplan
        return (+new Date() - +departure.toDate()) / (Number(duration) * 1000)
    }
    return 0
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
