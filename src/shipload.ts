import {APIClient, UInt64} from '@wharfkit/antelope'
import {Coordinates, GoodPrice} from './types'
import {marketprice, marketprices} from './market'
import {PlatformContract, ServerContract} from './contracts'
import {ERROR_SYSTEM_NOT_INITIALIZED} from './errors'
import {ChainDefinition} from '@wharfkit/session'
import ContractKit, {Contract} from '@wharfkit/contract'

interface ShiploadOptions {
    platformContractName?: string
    serverContractName?: string
    client?: APIClient
}

interface ShiploadConstructorOptions extends ShiploadOptions {
    platformContract: Contract
    serverContract: Contract
}

export class Shipload {
    public client: APIClient
    public server: Contract
    public platform: Contract

    constructor(
        chain: ChainDefinition,
        {client, platformContract, serverContract}: ShiploadConstructorOptions
    ) {
        this.client = client || new APIClient({url: chain.url})

        this.platform = platformContract
            ? platformContract
            : new PlatformContract.Contract({client: this.client})

        this.server = serverContract
            ? serverContract
            : new ServerContract.Contract({client: this.client})
    }

    static async load(chain: ChainDefinition, shiploadOptions: ShiploadOptions): Promise<Shipload> {
        let platform: Contract = new PlatformContract.Contract({
            client: new APIClient({url: chain.url}),
        })
        if (shiploadOptions.platformContractName) {
            const client = shiploadOptions.client || new APIClient({url: chain.url})
            const contractKit = new ContractKit({client})
            platform = await contractKit.load(shiploadOptions.platformContractName)
        }

        let server: Contract = new ServerContract.Contract({
            client: new APIClient({url: chain.url}),
        })
        if (shiploadOptions.serverContractName) {
            const client = shiploadOptions.client || new APIClient({url: chain.url})
            const contractKit = new ContractKit({client})
            server = await contractKit.load(shiploadOptions.serverContractName)
        }

        return new Shipload(chain, {
            ...shiploadOptions,
            platformContract: platform,
            serverContract: server,
        })
    }

    async getGame(): Promise<PlatformContract.Types.game_row> {
        const game = await this.platform.table('games').get()
        if (!game) {
            throw new Error(ERROR_SYSTEM_NOT_INITIALIZED)
        }
        return game
    }

    async getState(): Promise<ServerContract.Types.state_row> {
        const state = await this.server.table('state').get()
        if (!state) {
            throw new Error(ERROR_SYSTEM_NOT_INITIALIZED)
        }
        return state
    }

    async marketprice(location: Coordinates, good_id: number): Promise<UInt64> {
        const game = await this.getGame()
        const state = await this.getState()
        return marketprice(location, good_id, game.config.seed, state.seed)
    }

    async marketprices(location: Coordinates): Promise<GoodPrice[]> {
        const game = await this.getGame()
        const state = await this.getState()
        return marketprices(location, game.config.seed, state.seed)
    }
}
