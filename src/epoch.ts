import {PlatformContract} from './contracts'

export async function getCurrentEpoch(game: PlatformContract.Types.game_row): Promise<number> {
    const current = new Date().getTime()
    const difference = (current - game.config.start.toDate().getTime()) / 1000
    const epoch = Math.floor(difference / Number(game.config.epochtime)) + 1
    return epoch
}
