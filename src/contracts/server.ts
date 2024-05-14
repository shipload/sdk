import type {Action, Checksum256Type, Int64Type, NameType, UInt64Type} from '@wharfkit/antelope'
import {
    ABI,
    Blob,
    BlockTimestamp,
    Checksum256,
    Checksum512,
    Int64,
    Name,
    Struct,
    UInt16,
    UInt32,
    UInt64,
    UInt8,
} from '@wharfkit/antelope'
import type {ActionOptions, ContractArgs, PartialBy, Table} from '@wharfkit/contract'
import {Contract as BaseContract} from '@wharfkit/contract'
export const abiBlob = Blob.from(
    'DmVvc2lvOjphYmkvMS4yABUHYWR2YW5jZQAABmFycml2ZQACBW93bmVyBG5hbWUCaWQGdWludDY0CmNsZWFydGFibGUAAwp0YWJsZV9uYW1lBG5hbWUFc2NvcGUFbmFtZT8IbWF4X3Jvd3MHdWludDY0Pwtjb29yZGluYXRlcwACAXgFaW50NjQBeQVpbnQ2NAZlbmFibGUAAQdlbmFibGVkBGJvb2wJZXN0dHJhdmVsAAICaWQGdWludDY0C2Rlc3RpbmF0aW9uC2Nvb3JkaW5hdGVzBGhhc2gAAQV2YWx1ZQZzdHJpbmcEaW5pdAACBHNlZWQLY2hlY2tzdW0yNTYJZXBvY2hzZWVkC2NoZWNrc3VtMjU2BGpvaW4AAQdhY2NvdW50BG5hbWUMbG9hZGVyX3N0YXRzAAQIY2FwYWNpdHkGdWludDE2BG1hc3MGdWludDMyCHF1YW50aXR5BnVpbnQxNgZ0aHJ1c3QGdWludDMyCnBsYXllcl9yb3cAAwVvd25lcgRuYW1lB2JhbGFuY2UGdWludDY0BGRlYnQGdWludDY0DHNlcXVlbmNlX3JvdwACA2tleQRuYW1lBXZhbHVlBnVpbnQ2NAhzaGlwX3JvdwAIAmlkBnVpbnQ2NAVvd25lcgRuYW1lBG5hbWUGc3RyaW5nCGxvY2F0aW9uC2Nvb3JkaW5hdGVzBHNraW4FdWludDgEdGllcgV1aW50OAVzdGF0cwpzaGlwX3N0YXRzB2xvYWRlcnMMbG9hZGVyX3N0YXRzCnNoaXBfc3RhdHMABwhjYXBhY2l0eQZ1aW50MzIFZHJhaW4GdWludDMyBmVuZXJneQZ1aW50MzIEbWFzcwZ1aW50NjQFb3JiaXQGdWludDE2CHJlY2hhcmdlBnVpbnQzMgZ0aHJ1c3QGdWludDY0CXN0YXRlX3JvdwAFB2VuYWJsZWQEYm9vbAVlcG9jaAZ1aW50NjQJZXBvY2hzZWVkC2NoZWNrc3VtMjU2B2dlbmVzaXMUYmxvY2tfdGltZXN0YW1wX3R5cGUEc2VlZAtjaGVja3N1bTI1NgtzdW1tYXJ5X3JvdwACA2tleQRuYW1lBXZhbHVlDnRyYXZlbF9zdW1tYXJ5BHRlc3QAAQRkYXRhBnN0cmluZwZ0cmF2ZWwABAVvd25lcgRuYW1lAmlkBnVpbnQ2NAtkZXN0aW5hdGlvbgtjb29yZGluYXRlcwhyZWNoYXJnZQRib29sDnRyYXZlbF9zdW1tYXJ5AAwFc3RhdHMKc2hpcF9zdGF0cwdsb2FkZXJzDGxvYWRlcl9zdGF0cwZvcmlnaW4LY29vcmRpbmF0ZXMLZGVzdGluYXRpb24LY29vcmRpbmF0ZXMIZGlzdGFuY2UGdWludDY0CXRvdGFsbWFzcwZ1aW50NjQMYWNjZWxlcmF0aW9uBnVpbnQ2NApmbGlnaHR0aW1lBnVpbnQ2NAtlbmVyZ3l1c2FnZQZ1aW50NjQMcmVjaGFyZ2V0aW1lBnVpbnQ2NAhsb2FkdGltZQZ1aW50NjQEdGltZQZ1aW50NjQOdHJhdmVscGxhbl9yb3cABAJpZAZ1aW50NjQJZGVwYXJ0dXJlFGJsb2NrX3RpbWVzdGFtcF90eXBlC2Rlc3RpbmF0aW9uC2Nvb3JkaW5hdGVzCGR1cmF0aW9uBnVpbnQzMgR3aXBlAAALAAAAQKFpdjIHYWR2YW5jZdMBLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IGFkdmFuY2UKc3VtbWFyeTogJ0FkdmFuY2UgdHVybicKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKQWR2YW5jZSB0aGUgZ2FtZSB0byB0aGUgbmV4dCB0dXJuLgAAAACo7e41BmFycml2ZQAAgIrH5GtURApjbGVhcnRhYmxlvgEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogY2xlYXJ0YWJsZQpzdW1tYXJ5OiAnREVCVUc6IGNsZWFydGFibGUgYWN0aW9uJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tAAAAAKh4zFQGZW5hYmxl4gEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogZW5hYmxlCnN1bW1hcnk6ICdTZXQgZW5hYmxlZCBzdGF0ZScKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKRW5hYmxlIG9yIGRpc2FibGUgdGhpcyBnYW1lIG9mIFNoaXBsb2FkLgoKLS0tAACIapubM1YJZXN0dHJhdmVsAAAAAAAA0LBpBGhhc2jqAS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBoYXNoCnN1bW1hcnk6ICdDYWxjdWxhdGUgaGFzaCcKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKQ2FsY3VsYXRlcyB0aGUgaGFzaCBvZiBhIHN0cmluZyBiYXNlZCB1c2luZyB0aGUgZ2FtZSBzZWVkLgAAAAAAkN10BGluaXT/AS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBpbml0CnN1bW1hcnk6ICdJbml0aWFsaXplIGdhbWUgc2VlZCcKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKSW5pdGlhbGl6ZSBhIHRoZSBnYW1lcyBzZWVkIGFuZCBlcG9jaHNlZWQgdmFsdWVzIHRvIGJvb3RzdHJhcCBnYW1lIHN0YXRlLgAAAAAAMB19BGpvaW7EAS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBqb2luCnN1bW1hcnk6ICdKb2luIGEgZ2FtZScKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKSm9pbiBhIGdhbWUgb2YgU2hpcGxvYWQAAAAAAJCxygR0ZXN0sgEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogdGVzdApzdW1tYXJ5OiAnREVCVUc6IHRlc3QgYWN0aW9uJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tAAAAAES1zc0GdHJhdmVs+AEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogdHJhdmVsCnN1bW1hcnk6ICdNb3ZlIGEgc2hpcCcKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKSW5pdGlhdGUgdHJhdmVsIG9mIGEgc2hpcCBmcm9tIGl0cyBjdXJyZW50IGxvY2F0aW9uIHRvIGEgbmV3IGRlc3RpbmF0aW9uLgAAAAAAoKrjBHdpcGWyAS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiB3aXBlCnN1bW1hcnk6ICdERUJVRzogd2lwZSBhY3Rpb24nCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0GAAAAAFzlTawDaTY0AAAKcGxheWVyX3JvdwAAAApNpa3CA2k2NAAADHNlcXVlbmNlX3JvdwAAAAAAUF3DA2k2NAAACHNoaXBfcm93AAAAAACVTcYDaTY0AAAJc3RhdGVfcm93AAAAwF8jpcYDaTY0AAALc3VtbWFyeV9yb3cAwDSxRrXNzQNpNjQAAA50cmF2ZWxwbGFuX3JvdwERU2hpcGxvYWQgKFNlcnZlcikRU2hpcGxvYWQgKFNlcnZlcikAAAACAACIapubM1YOdHJhdmVsX3N1bW1hcnkAAAAAANCwaQtjaGVja3N1bTUxMg=='
)
export const abi = ABI.from(abiBlob)
export namespace Types {
    @Struct.type('advance')
    export class advance extends Struct {}
    @Struct.type('arrive')
    export class arrive extends Struct {
        @Struct.field(Name)
        owner!: Name
        @Struct.field(UInt64)
        id!: UInt64
    }
    @Struct.type('cleartable')
    export class cleartable extends Struct {
        @Struct.field(Name)
        table_name!: Name
        @Struct.field(Name, {optional: true})
        scope?: Name
        @Struct.field(UInt64, {optional: true})
        max_rows?: UInt64
    }
    @Struct.type('coordinates')
    export class coordinates extends Struct {
        @Struct.field(Int64)
        x!: Int64
        @Struct.field(Int64)
        y!: Int64
    }
    @Struct.type('enable')
    export class enable extends Struct {
        @Struct.field('bool')
        enabled!: boolean
    }
    @Struct.type('esttravel')
    export class esttravel extends Struct {
        @Struct.field(UInt64)
        id!: UInt64
        @Struct.field(coordinates)
        destination!: coordinates
    }
    @Struct.type('hash')
    export class hash extends Struct {
        @Struct.field('string')
        value!: string
    }
    @Struct.type('init')
    export class init extends Struct {
        @Struct.field(Checksum256)
        seed!: Checksum256
        @Struct.field(Checksum256)
        epochseed!: Checksum256
    }
    @Struct.type('join')
    export class join extends Struct {
        @Struct.field(Name)
        account!: Name
    }
    @Struct.type('loader_stats')
    export class loader_stats extends Struct {
        @Struct.field(UInt16)
        capacity!: UInt16
        @Struct.field(UInt32)
        mass!: UInt32
        @Struct.field(UInt16)
        quantity!: UInt16
        @Struct.field(UInt32)
        thrust!: UInt32
    }
    @Struct.type('player_row')
    export class player_row extends Struct {
        @Struct.field(Name)
        owner!: Name
        @Struct.field(UInt64)
        balance!: UInt64
        @Struct.field(UInt64)
        debt!: UInt64
    }
    @Struct.type('sequence_row')
    export class sequence_row extends Struct {
        @Struct.field(Name)
        key!: Name
        @Struct.field(UInt64)
        value!: UInt64
    }
    @Struct.type('ship_stats')
    export class ship_stats extends Struct {
        @Struct.field(UInt32)
        capacity!: UInt32
        @Struct.field(UInt32)
        drain!: UInt32
        @Struct.field(UInt32)
        energy!: UInt32
        @Struct.field(UInt64)
        mass!: UInt64
        @Struct.field(UInt16)
        orbit!: UInt16
        @Struct.field(UInt32)
        recharge!: UInt32
        @Struct.field(UInt64)
        thrust!: UInt64
    }
    @Struct.type('ship_row')
    export class ship_row extends Struct {
        @Struct.field(UInt64)
        id!: UInt64
        @Struct.field(Name)
        owner!: Name
        @Struct.field('string')
        name!: string
        @Struct.field(coordinates)
        location!: coordinates
        @Struct.field(UInt8)
        skin!: UInt8
        @Struct.field(UInt8)
        tier!: UInt8
        @Struct.field(ship_stats)
        stats!: ship_stats
        @Struct.field(loader_stats)
        loaders!: loader_stats
    }
    @Struct.type('state_row')
    export class state_row extends Struct {
        @Struct.field('bool')
        enabled!: boolean
        @Struct.field(UInt64)
        epoch!: UInt64
        @Struct.field(Checksum256)
        epochseed!: Checksum256
        @Struct.field(BlockTimestamp)
        genesis!: BlockTimestamp
        @Struct.field(Checksum256)
        seed!: Checksum256
    }
    @Struct.type('travel_summary')
    export class travel_summary extends Struct {
        @Struct.field(ship_stats)
        stats!: ship_stats
        @Struct.field(loader_stats)
        loaders!: loader_stats
        @Struct.field(coordinates)
        origin!: coordinates
        @Struct.field(coordinates)
        destination!: coordinates
        @Struct.field(UInt64)
        distance!: UInt64
        @Struct.field(UInt64)
        totalmass!: UInt64
        @Struct.field(UInt64)
        acceleration!: UInt64
        @Struct.field(UInt64)
        flighttime!: UInt64
        @Struct.field(UInt64)
        energyusage!: UInt64
        @Struct.field(UInt64)
        rechargetime!: UInt64
        @Struct.field(UInt64)
        loadtime!: UInt64
        @Struct.field(UInt64)
        time!: UInt64
    }
    @Struct.type('summary_row')
    export class summary_row extends Struct {
        @Struct.field(Name)
        key!: Name
        @Struct.field(travel_summary)
        value!: travel_summary
    }
    @Struct.type('test')
    export class test extends Struct {
        @Struct.field('string')
        data!: string
    }
    @Struct.type('travel')
    export class travel extends Struct {
        @Struct.field(Name)
        owner!: Name
        @Struct.field(UInt64)
        id!: UInt64
        @Struct.field(coordinates)
        destination!: coordinates
        @Struct.field('bool')
        recharge!: boolean
    }
    @Struct.type('travelplan_row')
    export class travelplan_row extends Struct {
        @Struct.field(UInt64)
        id!: UInt64
        @Struct.field(BlockTimestamp)
        departure!: BlockTimestamp
        @Struct.field(coordinates)
        destination!: coordinates
        @Struct.field(UInt32)
        duration!: UInt32
    }
    @Struct.type('wipe')
    export class wipe extends Struct {}
}
export const TableMap = {
    player: Types.player_row,
    sequence: Types.sequence_row,
    ship: Types.ship_row,
    state: Types.state_row,
    summary: Types.summary_row,
    travelplan: Types.travelplan_row,
}
export interface TableTypes {
    player: Types.player_row
    sequence: Types.sequence_row
    ship: Types.ship_row
    state: Types.state_row
    summary: Types.summary_row
    travelplan: Types.travelplan_row
}
export type RowType<T> = T extends keyof TableTypes ? TableTypes[T] : any
export type TableNames = keyof TableTypes
export namespace ActionParams {
    export namespace Type {
        export interface coordinates {
            x: Int64Type
            y: Int64Type
        }
    }
    export interface advance {}
    export interface arrive {
        owner: NameType
        id: UInt64Type
    }
    export interface cleartable {
        table_name: NameType
        scope?: NameType
        max_rows?: UInt64Type
    }
    export interface enable {
        enabled: boolean
    }
    export interface esttravel {
        id: UInt64Type
        destination: Type.coordinates
    }
    export interface hash {
        value: string
    }
    export interface init {
        seed: Checksum256Type
        epochseed: Checksum256Type
    }
    export interface join {
        account: NameType
    }
    export interface test {
        data: string
    }
    export interface travel {
        owner: NameType
        id: UInt64Type
        destination: Type.coordinates
        recharge: boolean
    }
    export interface wipe {}
}
export interface ActionNameParams {
    advance: ActionParams.advance
    arrive: ActionParams.arrive
    cleartable: ActionParams.cleartable
    enable: ActionParams.enable
    esttravel: ActionParams.esttravel
    hash: ActionParams.hash
    init: ActionParams.init
    join: ActionParams.join
    test: ActionParams.test
    travel: ActionParams.travel
    wipe: ActionParams.wipe
}
export type ActionNames = keyof ActionNameParams
export interface ActionReturnValues {
    esttravel: Types.travel_summary
    hash: Checksum512
}
export type ActionReturnNames = keyof ActionReturnValues
export class Contract extends BaseContract {
    constructor(args: PartialBy<ContractArgs, 'abi' | 'account'>) {
        super({
            client: args.client,
            abi: abi,
            account: args.account || Name.from('shipload.gm'),
        })
    }
    action<T extends ActionNames>(
        name: T,
        data: ActionNameParams[T],
        options?: ActionOptions
    ): Action {
        return super.action(name, data, options)
    }
    readonly<T extends ActionReturnNames>(
        name: T,
        data?: ActionNameParams[T]
    ): ActionReturnValues[T] {
        return super.readonly(name, data) as unknown as ActionReturnValues[T]
    }
    table<T extends TableNames>(name: T, scope?: NameType): Table<RowType<T>> {
        return super.table(name, scope, TableMap[name])
    }
}
