import {UInt16, UInt64} from '@wharfkit/antelope'

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
    id: UInt16
    name: string
    description: string
    base_price: UInt64
    mass: UInt64
}

export interface GoodPrice {
    id: UInt16
    price: UInt64
}
