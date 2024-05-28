import {Checksum256Type} from '@wharfkit/antelope'
import {hash512} from './hash'

export function roll(game_seed: Checksum256Type, roll_seed: string): number {
    const hash = hash512(game_seed, roll_seed)
    // Combine the first two bytes to form a uint16_t value
    return (hash.array[0] << 8) | hash.array[1]
}
