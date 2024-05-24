import {Bytes, Checksum256Type, Checksum512} from '@wharfkit/antelope'
import {hashBytes} from './hash'

export function roll(game_seed: Checksum256Type, roll_seed: string): number {
    const byteArray = hashBytes(game_seed, roll_seed)
    // Combine the first two bytes to form a uint16_t value
    return (byteArray[0] << 8) | byteArray[1]
}
