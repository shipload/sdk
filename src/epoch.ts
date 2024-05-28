import {PlatformContract, ServerContract} from './contracts'

export async function getCurrentEpoch(
    game: PlatformContract.Types.game_row,
    state: ServerContract.Types.state_row
): Promise<number> {
    const current = new Date().getTime()
    const difference = (current - state.genesis.toDate().getTime()) / 1000
    const epoch = Math.floor(difference / Number(game.config.epochtime)) + 1
    return epoch
}
