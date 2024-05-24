import {Checksum256Type, UInt64Type} from '@wharfkit/antelope'

export interface Coordinates {
    x: number
    y: number
}

export interface CameraPosition extends Coordinates {
    z: number
}

export interface Dimensions {
    width: number
    height: number
}

export interface Distance {
    origin: Coordinates
    destination: Coordinates
    distance: number
}
export interface Good {
    id: number
    name: string
    description: string
    base_price: number
    mass: number
}

export interface GoodPrice {
    good_id: number
    price: UInt64Type
}

export interface StateData {
    seed: Checksum256Type
    epochseed: Checksum256Type
}

export interface Player {
    balance: number
}

export interface Ship {
    id: number
    owner: string
    location: Coordinates
    traveling: boolean
}

export interface Cargo {
    id: number
    ship_id: number
    good_id: number
    quantity: number
}
