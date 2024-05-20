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
