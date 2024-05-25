import {APIClient, UInt64} from '@wharfkit/antelope'
import {Coordinates, GoodPrice} from './types'
import {marketprice, marketprices} from './market'
import {ServerContract} from './contracts'
import {ERROR_SYSTEM_NOT_INITIALIZED} from './errors'
import {ChainDefinition} from '@wharfkit/session'
import ContractKit, {Contract} from '@wharfkit/contract'

interface ShiploadOptions {
    contractName?: string
    client?: APIClient
}

interface ShiploadConstructorOptions extends ShiploadOptions {
    serverContract: Contract
}

export class Shipload {
    private client: APIClient
    private server: Contract

    constructor(chain: ChainDefinition, {client, serverContract}: ShiploadConstructorOptions) {
        this.client = client || new APIClient({url: chain.url})

        this.server = serverContract
            ? serverContract
            : new ServerContract.Contract({client: this.client})
    }

    static async load(chain: ChainDefinition, shiploadOptions: ShiploadOptions): Promise<Shipload> {
        let server: Contract = new ServerContract.Contract({
            client: new APIClient({url: chain.url}),
        })
        if (shiploadOptions.contractName) {
            const client = shiploadOptions.client || new APIClient({url: chain.url})
            const contractKit = new ContractKit({client})
            server = await contractKit.load(shiploadOptions.contractName)
        }
        return new Shipload(chain, {...shiploadOptions, serverContract: server})
    }

    async getState(): Promise<ServerContract.Types.state_row> {
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
