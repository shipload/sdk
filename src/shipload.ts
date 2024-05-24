import {APIClient, Checksum256Type, UInt64} from '@wharfkit/antelope'
import {Coordinates, GoodPrice, StateData} from './types'
import {marketprice, marketprices} from './market'
import {ServerContract} from './contracts'
import {ERROR_SYSTEM_NOT_INITIALIZED} from './errors'
import { ChainDefinition } from '@wharfkit/session'

export class Shipload {
    private client: APIClient
    private server: ServerContract.Contract

    constructor(chain: ChainDefinition, contractName: string) {
        this.client = new APIClient({url: chain.url})
        this.server = new ServerContract.Contract({client: this.client, account: contractName})
    }

    async getState(): Promise<StateData> {
        const state = await this.server.table('state').get()
        if (!state) {
            throw new Error(ERROR_SYSTEM_NOT_INITIALIZED)
        }
        return state
    }

    async marketprice(location: Coordinates, good_id: number): Promise<UInt64> {
        const {seed, epochseed} = await this.getState()
        return marketprice(location, good_id, seed, epochseed)
    }

    async marketprices(location: Coordinates): Promise<GoodPrice[]> {
        const {seed, epochseed} = await this.getState()
        return marketprices(location, seed, epochseed)
    }
}
