import {PlatformContract} from './contracts'

export function getCurrentEpoch(game: PlatformContract.Types.game_row): number {
    const current = new Date().getTime()
    const difference = (current - game.config.start.toMilliseconds()) / 1000
    const epoch = Math.floor(difference / Number(game.config.epochtime)) + 1
    return epoch
}
