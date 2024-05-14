import {Bytes, Checksum256Type, Checksum512} from '@wharfkit/antelope'

export function hash(seed: Checksum256Type, string: string): string {
    const bytes = Bytes.from(`${seed}${string}`, 'utf8')
    return String(Checksum512.hash(bytes))
}
