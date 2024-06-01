import {UInt16, UInt16Type, UInt64} from '@wharfkit/antelope'
import {Good, GoodType, PRECISION} from './types'

// List of goods with titles and descriptions
const goods: GoodType[] = [
    {
        id: 1,
        name: 'FizzGlo',
        description: 'Pops with flavor! A neon drink that makes your burps glow.',
        base_price: 200,
        mass: 5000,
    },
    {
        id: 2,
        name: 'ZapSnacks',
        description: 'Electric taste! Spicy edible energy sparks for a tongue-tingling experience.',
        base_price: 300,
        mass: 2000,
    },
    {
        id: 3,
        name: 'Blob Buddies',
        description: 'Squishy friends! Clingy, cute and mood-matching pet blobs for every home!',
        base_price: 400,
        mass: 10000,
    },
    {
        id: 4,
        name: 'TuneTooth',
        description: 'Whistle while you eat! Edible instrument treats that play tunes when chewed.',
        base_price: 600,
        mass: 3000,
    },
    {
        id: 5,
        name: 'SunPods',
        description: 'Miniature suns in your pocket providing on-demand light & warmth.',
        base_price: 800,
        mass: 1000,
    },
    {
        id: 6,
        name: 'Fuzzix',
        description: 'Pocket-sized quantum fluff generator for instant comfy.',
        base_price: 1000,
        mass: 4000,
    },
    {
        id: 7,
        name: 'GlowGo',
        description: 'Ingestible bioluminescent jelly, your inside glows in the dark!',
        base_price: 140,
        mass: 10000,
    },
    {
        id: 8,
        name: 'KrackleKaps',
        description: 'Capsules packed with tiny firecrackers, spice up meals and parties.',
        base_price: 180,
        mass: 2000,
    },
    {
        id: 9,
        name: 'PlasmaMints',
        description: 'Hypercharged candy giving plasma breath capable of cutting through steel.',
        base_price: 220,
        mass: 500,
    },
    {
        id: 10,
        name: 'TimeTreats',
        description: 'Confectionery morsels releasing slow-mo effect over a limited period.',
        base_price: 250,
        mass: 3000,
    },
    {
        id: 11,
        name: 'QuantumQuencher',
        description:
            'Bottled hyper-fluid quenching thirst across multiple parallel realities simultaneously.',
        base_price: 300,
        mass: 6000,
    },
    {
        id: 12,
        name: 'TransmatterTruffles',
        description: 'Delectable chocolates instantly teleporting consumers short distances.',
        base_price: 350,
        mass: 4000,
    },
    {
        id: 13,
        name: 'MemoryGum',
        description: 'Chewable gum storing or replaying memories while being chewed.',
        base_price: 400,
        mass: 500,
    },
    {
        id: 14,
        name: 'SymbioSnack',
        description: 'Edible alien larvae adopting owner’s taste preference upon consumption.',
        base_price: 500,
        mass: 10000,
    },
]

export const goodIds = goods.map((g) => g.id)

export function getGood(good_id: UInt16Type): Good {
    const good = goods.find((g) => UInt16.from(good_id).equals(g.id))
    if (!good) {
        throw new Error('Good does not exist')
    }
    return {
        ...good,
        id: UInt16.from(good.id),
        base_price: UInt64.from(good.base_price),
        mass: UInt64.from(good.mass).multiplying(PRECISION),
    }
}

export function getGoods(): Good[] {
    return goods.map((g) => getGood(g.id))
}
