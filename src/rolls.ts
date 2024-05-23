import {Bytes, Checksum256, Checksum256Type} from '@wharfkit/antelope'

export function roll(seed_data: string): number {
    const seed = Checksum256.hash(Bytes.from(seed_data, 'utf8'))
    const byteArray = Bytes.from(seed).array

    // Combine the first two bytes to form a uint16_t value
    return (byteArray[0] << 8) | byteArray[1]
}
