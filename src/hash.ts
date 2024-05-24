import {Bytes, Checksum256Type, Checksum512, UInt8} from '@wharfkit/antelope'

export function hash(seed: Checksum256Type, string: string): Checksum512 {
    const bytes = Bytes.from(`${seed}${string}`, 'utf8')
    return Checksum512.hash(bytes)
}

export function hashBytes(seed: Checksum256Type, string: string): Uint8Array {
    return hash(seed, string).array
}
