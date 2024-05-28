import {UInt16, UInt64} from '@wharfkit/antelope'
import {ServerContract} from './contracts'

export interface CameraPosition extends ServerContract.ActionParams.Type.coordinates {
    z: number
}

export interface Dimensions {
    width: number
    height: number
}

export interface Distance {
    origin: ServerContract.ActionParams.Type.coordinates
    destination: ServerContract.ActionParams.Type.coordinates
    distance: UInt16
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
