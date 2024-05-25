import {UInt16Type, UInt64Type} from '@wharfkit/antelope'

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
    id: UInt16Type
    price: UInt64Type
}
