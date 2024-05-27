import {UInt16, UInt16Type, UInt64} from '@wharfkit/antelope'
import {Good} from './types'

// List of goods with titles and descriptions
export const goods: Good[] = [
    {
        id: UInt16.from(1),
        name: 'FizzGlo',
        description: 'Pops with flavor! A neon drink that makes your burps glow.',
        base_price: UInt64.from(200),
        mass: UInt64.from(500),
    },
    {
        id: UInt16.from(2),
        name: 'ZapSnacks',
        description: 'Electric taste! Spicy edible energy sparks for a tongue-tingling experience.',
        base_price: UInt64.from(300),
        mass: UInt64.from(2000),
    },
    {
        id: UInt16.from(3),
        name: 'Blob Buddies',
        description: 'Squishy friends! Clingy, cute and mood-matching pet blobs for every home!',
        base_price: UInt64.from(400),
        mass: UInt64.from(10000),
    },
    {
        id: UInt16.from(4),
        name: 'TuneTooth',
        description: 'Whistle while you eat! Edible instrument treats that play tunes when chewed.',
        base_price: UInt64.from(600),
        mass: UInt64.from(3000),
    },
    {
        id: UInt16.from(5),
        name: 'SunPods',
        description: 'Miniature suns in your pocket providing on-demand light & warmth.',
        base_price: UInt64.from(800),
        mass: UInt64.from(1000),
    },
    {
        id: UInt16.from(6),
        name: 'Fuzzix',
        description: 'Pocket-sized quantum fluff generator for instant comfy.',
        base_price: UInt64.from(1000),
        mass: UInt64.from(4000),
    },
    {
        id: UInt16.from(7),
        name: 'GlowGo',
        description: 'Ingestible bioluminescent jelly, your inside glows in the dark!',
        base_price: UInt64.from(140),
        mass: UInt64.from(3000),
    },
    {
        id: UInt16.from(8),
        name: 'KrackleKaps',
        description: 'Capsules packed with tiny firecrackers, spice up meals and parties.',
        base_price: UInt64.from(180),
        mass: UInt64.from(2000),
    },
    {
        id: UInt16.from(9),
        name: 'PlasmaMints',
        description: 'Hypercharged candy giving plasma breath capable of cutting through steel.',
        base_price: UInt64.from(220),
        mass: UInt64.from(500),
    },
    {
        id: UInt16.from(10),
        name: 'TimeTreats',
        description: 'Confectionery morsels releasing slow-mo effect over a limited period.',
        base_price: UInt64.from(250),
        mass: UInt64.from(3000),
    },
    {
        id: UInt16.from(11),
        name: 'QuantumQuencher',
        description:
            'Bottled hyper-fluid quenching thirst across multiple parallel realities simultaneously.',
        base_price: UInt64.from(300),
        mass: UInt64.from(6000),
    },
    {
        id: UInt16.from(12),
        name: 'TransmatterTruffles',
        description: 'Delectable chocolates instantly teleporting consumers short distances.',
        base_price: UInt64.from(350),
        mass: UInt64.from(4000),
    },
    {
        id: UInt16.from(13),
        name: 'MemoryGum',
        description: 'Chewable gum storing or replaying memories while being chewed.',
        base_price: UInt64.from(400),
        mass: UInt64.from(500),
    },
    {
        id: UInt16.from(14),
        name: 'SymbioSnack',
        description: 'Edible alien larvae adopting owner’s taste preference upon consumption.',
        base_price: UInt64.from(500),
        mass: UInt64.from(1000),
    },
]

export function getGood(good_id: UInt16Type): Good {
    const good = goods.find((g) => g.id.equals(good_id))
    if (!good) {
        throw new Error('Good does not exist')
    }
    return good
}
