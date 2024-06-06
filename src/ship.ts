import {UInt32} from '@wharfkit/antelope'
import {ServerContract} from './contracts'
import {PRECISION} from './types'
import {travelplanDuration} from './travel'

export class Ship extends ServerContract.Types.ship_row {
    get maxDistance(): UInt32 {
        return this.stats.capacity.dividing(this.stats.drain).multiplying(PRECISION)
    }

    get traveling(): boolean {
        return !!this.travelplan
    }

    get arrived(): boolean {
        if (!this.travelplan) {
            throw new Error('Ship is not traveling')
        }
        const depart = this.travelplan.departure.toDate()
        const arrive = new Date(
            depart.getTime() + Number(travelplanDuration(this.travelplan)) * 1000
        )
        return new Date() >= arrive
    }

    get eta(): number {
        if (!this.travelplan) {
            throw new Error('Ship is not traveling')
        }
        const depart = this.travelplan.departure.toDate()
        const arrive = new Date(
            depart.getTime() + Number(travelplanDuration(this.travelplan)) * 1000
        )
        return arrive.getTime() - new Date().getTime()
    }
}
