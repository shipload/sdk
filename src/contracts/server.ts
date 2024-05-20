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
    TimePoint,
    UInt16,
    UInt32,
    UInt64,
    UInt8,
} from '@wharfkit/antelope'
import type {ActionOptions, ContractArgs, PartialBy, Table} from '@wharfkit/contract'
import {Contract as BaseContract} from '@wharfkit/contract'
export const abiBlob = Blob.from(
    'DmVvc2lvOjphYmkvMS4yABgHYWR2YW5jZQAABmFycml2ZQACBW93bmVyBG5hbWUCaWQGdWludDY0CGJ1eWdvb2RzAAQFYnV5ZXIEbmFtZQdzaGlwX2lkBnVpbnQ2NAdnb29kX2lkBnVpbnQ2NAhxdWFudGl0eQZ1aW50NjQJY2FyZ29fcm93AAQCaWQGdWludDY0B3NoaXBfaWQGdWludDY0B2dvb2RfaWQGdWludDY0CHF1YW50aXR5BnVpbnQ2NApjbGVhcnRhYmxlAAMKdGFibGVfbmFtZQRuYW1lBXNjb3BlBW5hbWU/CG1heF9yb3dzB3VpbnQ2ND8LY29vcmRpbmF0ZXMAAgF4BWludDY0AXkFaW50NjQGZW5hYmxlAAEHZW5hYmxlZARib29sCWVzdHRyYXZlbAACAmlkBnVpbnQ2NAtkZXN0aW5hdGlvbgtjb29yZGluYXRlcwRoYXNoAAEFdmFsdWUGc3RyaW5nBGluaXQAAgRzZWVkC2NoZWNrc3VtMjU2CWVwb2Noc2VlZAtjaGVja3N1bTI1NgRqb2luAAEHYWNjb3VudARuYW1lDGxvYWRlcl9zdGF0cwAECGNhcGFjaXR5BnVpbnQxNgRtYXNzBnVpbnQzMghxdWFudGl0eQZ1aW50MTYGdGhydXN0BnVpbnQzMgpwbGF5ZXJfcm93AAMFb3duZXIEbmFtZQdiYWxhbmNlBnVpbnQ2NARkZWJ0BnVpbnQ2NAlzZWxsZ29vZHMABAZzZWxsZXIEbmFtZQdzaGlwX2lkBnVpbnQ2NAdnb29kX2lkBnVpbnQ2NAhxdWFudGl0eQZ1aW50NjQMc2VxdWVuY2Vfcm93AAIDa2V5BG5hbWUFdmFsdWUGdWludDY0CHNoaXBfcm93AAkCaWQGdWludDY0BW93bmVyBG5hbWUEbmFtZQZzdHJpbmcIbG9jYXRpb24LY29vcmRpbmF0ZXMEc2tpbgV1aW50OAR0aWVyBXVpbnQ4BXN0YXRzCnNoaXBfc3RhdHMHbG9hZGVycwxsb2FkZXJfc3RhdHMKdHJhdmVscGxhbgx0cmF2ZWxfcGxhbj8Kc2hpcF9zdGF0cwAHCGNhcGFjaXR5BnVpbnQzMgVkcmFpbgZ1aW50MzIGZW5lcmd5BnVpbnQzMgRtYXNzBnVpbnQ2NAVvcmJpdAZ1aW50MTYIcmVjaGFyZ2UGdWludDMyBnRocnVzdAZ1aW50NjQJc3RhdGVfcm93AAUHZW5hYmxlZARib29sBWVwb2NoBnVpbnQ2NAllcG9jaHNlZWQLY2hlY2tzdW0yNTYHZ2VuZXNpcxRibG9ja190aW1lc3RhbXBfdHlwZQRzZWVkC2NoZWNrc3VtMjU2C3N1bW1hcnlfcm93AAIDa2V5BG5hbWUFdmFsdWUOdHJhdmVsX3N1bW1hcnkEdGVzdAABBGRhdGEGc3RyaW5nBnRyYXZlbAAEBW93bmVyBG5hbWUCaWQGdWludDY0C2Rlc3RpbmF0aW9uC2Nvb3JkaW5hdGVzCHJlY2hhcmdlBGJvb2wLdHJhdmVsX3BsYW4AAwtkZXN0aW5hdGlvbgtjb29yZGluYXRlcwlkZXBhcnR1cmUKdGltZV9wb2ludAhkdXJhdGlvbgZ1aW50MzIOdHJhdmVsX3N1bW1hcnkADAVzdGF0cwpzaGlwX3N0YXRzB2xvYWRlcnMMbG9hZGVyX3N0YXRzBm9yaWdpbgtjb29yZGluYXRlcwtkZXN0aW5hdGlvbgtjb29yZGluYXRlcwhkaXN0YW5jZQZ1aW50NjQJdG90YWxtYXNzBnVpbnQ2NAxhY2NlbGVyYXRpb24GdWludDY0CmZsaWdodHRpbWUGdWludDY0C2VuZXJneXVzYWdlBnVpbnQ2NAxyZWNoYXJnZXRpbWUGdWludDY0CGxvYWR0aW1lBnVpbnQ2NAR0aW1lBnVpbnQ2NAR3aXBlAAANAAAAQKFpdjIHYWR2YW5jZdMBLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IGFkdmFuY2UKc3VtbWFyeTogJ0FkdmFuY2UgdHVybicKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKQWR2YW5jZSB0aGUgZ2FtZSB0byB0aGUgbmV4dCB0dXJuLgAAAACo7e41BmFycml2ZQAAAAA4Ucq8PghidXlnb29kcwAAgIrH5GtURApjbGVhcnRhYmxlvgEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogY2xlYXJ0YWJsZQpzdW1tYXJ5OiAnREVCVUc6IGNsZWFydGFibGUgYWN0aW9uJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tAAAAAKh4zFQGZW5hYmxl4gEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogZW5hYmxlCnN1bW1hcnk6ICdTZXQgZW5hYmxlZCBzdGF0ZScKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKRW5hYmxlIG9yIGRpc2FibGUgdGhpcyBnYW1lIG9mIFNoaXBsb2FkLgoKLS0tAACIapubM1YJZXN0dHJhdmVsAAAAAAAA0LBpBGhhc2jqAS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBoYXNoCnN1bW1hcnk6ICdDYWxjdWxhdGUgaGFzaCcKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKQ2FsY3VsYXRlcyB0aGUgaGFzaCBvZiBhIHN0cmluZyBiYXNlZCB1c2luZyB0aGUgZ2FtZSBzZWVkLgAAAAAAkN10BGluaXT/AS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBpbml0CnN1bW1hcnk6ICdJbml0aWFsaXplIGdhbWUgc2VlZCcKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKSW5pdGlhbGl6ZSBhIHRoZSBnYW1lcyBzZWVkIGFuZCBlcG9jaHNlZWQgdmFsdWVzIHRvIGJvb3RzdHJhcCBnYW1lIHN0YXRlLgAAAAAAMB19BGpvaW7EAS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBqb2luCnN1bW1hcnk6ICdKb2luIGEgZ2FtZScKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKSm9pbiBhIGdhbWUgb2YgU2hpcGxvYWQAAMCJUhajwglzZWxsZ29vZHMAAAAAAACQscoEdGVzdLIBLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IHRlc3QKc3VtbWFyeTogJ0RFQlVHOiB0ZXN0IGFjdGlvbicKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQAAAABEtc3NBnRyYXZlbPgBLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IHRyYXZlbApzdW1tYXJ5OiAnTW92ZSBhIHNoaXAnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KCkluaXRpYXRlIHRyYXZlbCBvZiBhIHNoaXAgZnJvbSBpdHMgY3VycmVudCBsb2NhdGlvbiB0byBhIG5ldyBkZXN0aW5hdGlvbi4AAAAAAKCq4wR3aXBlsgEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogd2lwZQpzdW1tYXJ5OiAnREVCVUc6IHdpcGUgYWN0aW9uJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tBgAAAAAAyq5BA2k2NAAACWNhcmdvX3JvdwAAAABc5U2sA2k2NAAACnBsYXllcl9yb3cAAAAKTaWtwgNpNjQAAAxzZXF1ZW5jZV9yb3cAAAAAAFBdwwNpNjQAAAhzaGlwX3JvdwAAAAAAlU3GA2k2NAAACXN0YXRlX3JvdwAAAMBfI6XGA2k2NAAAC3N1bW1hcnlfcm93ARFTaGlwbG9hZCAoU2VydmVyKRFTaGlwbG9hZCAoU2VydmVyKQAAAAIAAIhqm5szVg50cmF2ZWxfc3VtbWFyeQAAAAAA0LBpC2NoZWNrc3VtNTEy'
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
    @Struct.type('buygoods')
    export class buygoods extends Struct {
        @Struct.field(Name)
        buyer!: Name
        @Struct.field(UInt64)
        ship_id!: UInt64
        @Struct.field(UInt64)
        good_id!: UInt64
        @Struct.field(UInt64)
        quantity!: UInt64
    }
    @Struct.type('cargo_row')
    export class cargo_row extends Struct {
        @Struct.field(UInt64)
        id!: UInt64
        @Struct.field(UInt64)
        ship_id!: UInt64
        @Struct.field(UInt64)
        good_id!: UInt64
        @Struct.field(UInt64)
        quantity!: UInt64
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
    @Struct.type('sellgoods')
    export class sellgoods extends Struct {
        @Struct.field(Name)
        seller!: Name
        @Struct.field(UInt64)
        ship_id!: UInt64
        @Struct.field(UInt64)
        good_id!: UInt64
        @Struct.field(UInt64)
        quantity!: UInt64
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
    @Struct.type('travel_plan')
    export class travel_plan extends Struct {
        @Struct.field(coordinates)
        destination!: coordinates
        @Struct.field(TimePoint)
        departure!: TimePoint
        @Struct.field(UInt32)
        duration!: UInt32
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
        @Struct.field(travel_plan, {optional: true})
        travelplan?: travel_plan
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
    @Struct.type('wipe')
    export class wipe extends Struct {}
}
export const TableMap = {
    cargo: Types.cargo_row,
    player: Types.player_row,
    sequence: Types.sequence_row,
    ship: Types.ship_row,
    state: Types.state_row,
    summary: Types.summary_row,
}
export interface TableTypes {
    cargo: Types.cargo_row
    player: Types.player_row
    sequence: Types.sequence_row
    ship: Types.ship_row
    state: Types.state_row
    summary: Types.summary_row
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
    export interface buygoods {
        buyer: NameType
        ship_id: UInt64Type
        good_id: UInt64Type
        quantity: UInt64Type
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
    export interface sellgoods {
        seller: NameType
        ship_id: UInt64Type
        good_id: UInt64Type
        quantity: UInt64Type
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
    buygoods: ActionParams.buygoods
    cleartable: ActionParams.cleartable
    enable: ActionParams.enable
    esttravel: ActionParams.esttravel
    hash: ActionParams.hash
    init: ActionParams.init
    join: ActionParams.join
    sellgoods: ActionParams.sellgoods
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
