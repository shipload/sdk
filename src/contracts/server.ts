import type {
    Action,
    Checksum256Type,
    Int64Type,
    NameType,
    UInt16Type,
    UInt64Type,
} from '@wharfkit/antelope'
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
    'DmVvc2lvOjphYmkvMS4yABwHYWR2YW5jZQAABmFycml2ZQACBW93bmVyBG5hbWUCaWQGdWludDY0CGJ1eWdvb2RzAAMHc2hpcF9pZAZ1aW50NjQHZ29vZF9pZAZ1aW50NjQIcXVhbnRpdHkGdWludDY0CWNhcmdvX3JvdwAFAmlkBnVpbnQ2NAdzaGlwX2lkBnVpbnQ2NAdnb29kX2lkBnVpbnQ2NAhxdWFudGl0eQZ1aW50NjQGbG9hZGVkBnVpbnQ2NApjbGVhcnRhYmxlAAMKdGFibGVfbmFtZQRuYW1lBXNjb3BlBW5hbWU/CG1heF9yb3dzB3VpbnQ2ND8LY29vcmRpbmF0ZXMAAgF4BWludDY0AXkFaW50NjQGZW5hYmxlAAEHZW5hYmxlZARib29sCWVzdHRyYXZlbAACAmlkBnVpbnQ2NAtkZXN0aW5hdGlvbgtjb29yZGluYXRlcwpnb29kX3ByaWNlAAICaWQGdWludDE2BXByaWNlBnVpbnQ2NARoYXNoAAEFdmFsdWUGc3RyaW5nBGluaXQAAgRzZWVkC2NoZWNrc3VtMjU2CWVwb2Noc2VlZAtjaGVja3N1bTI1NgRqb2luAAEHYWNjb3VudARuYW1lDGxvYWRlcl9zdGF0cwAECGNhcGFjaXR5BnVpbnQxNgRtYXNzBnVpbnQzMghxdWFudGl0eQZ1aW50MTYGdGhydXN0BnVpbnQzMgttYXJrZXRwcmljZQACCGxvY2F0aW9uC2Nvb3JkaW5hdGVzB2dvb2RfaWQGdWludDE2DG1hcmtldHByaWNlcwABCGxvY2F0aW9uC2Nvb3JkaW5hdGVzCnBsYXllcl9yb3cAAwVvd25lcgRuYW1lB2JhbGFuY2UGdWludDY0BGRlYnQGdWludDY0CXNlbGxnb29kcwADB3NoaXBfaWQGdWludDY0B2dvb2RfaWQGdWludDY0CHF1YW50aXR5BnVpbnQ2NAxzZXF1ZW5jZV9yb3cAAgNrZXkEbmFtZQV2YWx1ZQZ1aW50NjQIc2hpcF9yb3cACgJpZAZ1aW50NjQFb3duZXIEbmFtZQRuYW1lBnN0cmluZwhsb2NhdGlvbgtjb29yZGluYXRlcwRza2luBXVpbnQ4BHRpZXIFdWludDgFc3RhdGUKc2hpcF9zdGF0ZQVzdGF0cwpzaGlwX3N0YXRzB2xvYWRlcnMMbG9hZGVyX3N0YXRzCnRyYXZlbHBsYW4MdHJhdmVsX3BsYW4/CnNoaXBfc3RhdGUAAQZlbmVyZ3kGdWludDMyCnNoaXBfc3RhdHMABghjYXBhY2l0eQZ1aW50MzIFZHJhaW4GdWludDMyBG1hc3MGdWludDY0BW9yYml0BnVpbnQxNghyZWNoYXJnZQZ1aW50MzIGdGhydXN0BnVpbnQ2NAlzdGF0ZV9yb3cABQdlbmFibGVkBGJvb2wFZXBvY2gGdWludDY0CWVwb2Noc2VlZAtjaGVja3N1bTI1NgdnZW5lc2lzFGJsb2NrX3RpbWVzdGFtcF90eXBlBHNlZWQLY2hlY2tzdW0yNTYLc3VtbWFyeV9yb3cAAgNrZXkEbmFtZQV2YWx1ZQ50cmF2ZWxfc3VtbWFyeQR0ZXN0AAEEZGF0YQZzdHJpbmcGdHJhdmVsAAQFb3duZXIEbmFtZQJpZAZ1aW50NjQLZGVzdGluYXRpb24LY29vcmRpbmF0ZXMIcmVjaGFyZ2UEYm9vbAt0cmF2ZWxfcGxhbgADC2Rlc3RpbmF0aW9uC2Nvb3JkaW5hdGVzCWRlcGFydHVyZQp0aW1lX3BvaW50CGR1cmF0aW9uBnVpbnQzMg50cmF2ZWxfc3VtbWFyeQAMBXN0YXRzCnNoaXBfc3RhdHMHbG9hZGVycwxsb2FkZXJfc3RhdHMGb3JpZ2luC2Nvb3JkaW5hdGVzC2Rlc3RpbmF0aW9uC2Nvb3JkaW5hdGVzCGRpc3RhbmNlBnVpbnQ2NAl0b3RhbG1hc3MGdWludDY0DGFjY2VsZXJhdGlvbgZ1aW50NjQKZmxpZ2h0dGltZQZ1aW50NjQLZW5lcmd5dXNhZ2UGdWludDY0DHJlY2hhcmdldGltZQZ1aW50NjQIbG9hZHRpbWUGdWludDY0BHRpbWUGdWludDY0BHdpcGUAAA8AAABAoWl2MgdhZHZhbmNl0wEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogYWR2YW5jZQpzdW1tYXJ5OiAnQWR2YW5jZSB0dXJuJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tCgpBZHZhbmNlIHRoZSBnYW1lIHRvIHRoZSBuZXh0IHR1cm4uAAAAAKjt7jUGYXJyaXZlswItLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogYXJyaXZlCnN1bW1hcnk6ICdDb21wbGV0ZSB0cmF2ZWwnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KCkNvbXBsZXRlIHRoZSB0cmF2ZWwgb2YgYSBzaGlwIGJ5IHVwZGF0aW5nIGl0cyBsb2NhdGlvbiB0byB0aGUgZGVzdGluYXRpb24gY29vcmRpbmF0ZXMgYWZ0ZXIgdGhlIHRyYXZlbCBkdXJhdGlvbiBoYXMgcGFzc2VkLgoKLS0tAAAAOFHKvD4IYnV5Z29vZHPdAS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBidXlnb29kcwpzdW1tYXJ5OiAnQnV5IGdvb2RzJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tCgpQdXJjaGFzZSBnb29kcyBhbmQgYWRkIHRoZW0gdG8gYSBzaGlwJ3MgY2FyZ28uAICKx+RrVEQKY2xlYXJ0YWJsZb4BLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IGNsZWFydGFibGUKc3VtbWFyeTogJ0RFQlVHOiBjbGVhcnRhYmxlIGFjdGlvbicKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQAAAACoeMxUBmVuYWJsZeIBLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IGVuYWJsZQpzdW1tYXJ5OiAnU2V0IGVuYWJsZWQgc3RhdGUnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KCkVuYWJsZSBvciBkaXNhYmxlIHRoaXMgZ2FtZSBvZiBTaGlwbG9hZC4KCi0tLQAAiGqbmzNWCWVzdHRyYXZlbAAAAAAAANCwaQRoYXNo6gEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogaGFzaApzdW1tYXJ5OiAnQ2FsY3VsYXRlIGhhc2gnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KCkNhbGN1bGF0ZXMgdGhlIGhhc2ggb2YgYSBzdHJpbmcgYmFzZWQgdXNpbmcgdGhlIGdhbWUgc2VlZC4AAAAAAJDddARpbml0/wEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogaW5pdApzdW1tYXJ5OiAnSW5pdGlhbGl6ZSBnYW1lIHNlZWQnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KCkluaXRpYWxpemUgYSB0aGUgZ2FtZXMgc2VlZCBhbmQgZXBvY2hzZWVkIHZhbHVlcyB0byBib290c3RyYXAgZ2FtZSBzdGF0ZS4AAAAAADAdfQRqb2luyQEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogam9pbgpzdW1tYXJ5OiAnSm9pbiBhIGdhbWUnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KCkpvaW4gYSBnYW1lIG9mIFNoaXBsb2FkCgotLS0AFHK3ZgWvkQttYXJrZXRwcmljZZsCLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IG1hcmtldHByaWNlCnN1bW1hcnk6ICdHZXQgcHJpY2Ugb2YgZ29vZCBhdCBsb2NhdGlvbicKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKVGhpcyBhY3Rpb24gZGV0ZXJtaW5lcyB0aGUgbWFya2V0IHByaWNlIG9mIGEgc3BlY2lmaWVkIGdvb2QgYXQgYSBnaXZlbiBsb2NhdGlvbi4KCi0tLYAVcrdmBa+RDG1hcmtldHByaWNlc5UCLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IG1hcmtldHByaWNlcwpzdW1tYXJ5OiAnR2V0IHByaWNlIG9mIGFsbCBnb29kcyBhdCBsb2NhdGlvbicKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKVGhpcyBhY3Rpb24gZGV0ZXJtaW5lcyB0aGUgbWFya2V0IHByaWNlIG9mIGFsbCBnb29kcyBhdCBhIGdpdmVuIGxvY2F0aW9uLgAAwIlSFqPCCXNlbGxnb29kc9UBLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IHNlbGxnb29kcwpzdW1tYXJ5OiAnU2VsbCBnb29kcycKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKU2VsbCBnb29kcyBmcm9tIGEgc2hpcCdzIGNhcmdvLgoKLS0tAAAAAACQscoEdGVzdLIBLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IHRlc3QKc3VtbWFyeTogJ0RFQlVHOiB0ZXN0IGFjdGlvbicKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQAAAABEtc3NBnRyYXZlbP0BLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IHRyYXZlbApzdW1tYXJ5OiAnTW92ZSBhIHNoaXAnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KCkluaXRpYXRlIHRyYXZlbCBvZiBhIHNoaXAgZnJvbSBpdHMgY3VycmVudCBsb2NhdGlvbiB0byBhIG5ldyBkZXN0aW5hdGlvbi4KCi0tLQAAAAAAoKrjBHdpcGWyAS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiB3aXBlCnN1bW1hcnk6ICdERUJVRzogd2lwZSBhY3Rpb24nCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0GAAAAAADKrkEDaTY0AAAJY2FyZ29fcm93AAAAAFzlTawDaTY0AAAKcGxheWVyX3JvdwAAAApNpa3CA2k2NAAADHNlcXVlbmNlX3JvdwAAAAAAUF3DA2k2NAAACHNoaXBfcm93AAAAAACVTcYDaTY0AAAJc3RhdGVfcm93AAAAwF8jpcYDaTY0AAALc3VtbWFyeV9yb3cBEVNoaXBsb2FkIChTZXJ2ZXIpEVNoaXBsb2FkIChTZXJ2ZXIpAAAABAAAiGqbmzNWDnRyYXZlbF9zdW1tYXJ5AAAAAADQsGkLY2hlY2tzdW01MTIAFHK3ZgWvkQpnb29kX3ByaWNlgBVyt2YFr5EMZ29vZF9wcmljZVtd'
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
        @Struct.field(UInt64)
        loaded!: UInt64
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
    @Struct.type('good_price')
    export class good_price extends Struct {
        @Struct.field(UInt16)
        id!: UInt16
        @Struct.field(UInt64)
        price!: UInt64
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
    @Struct.type('marketprice')
    export class marketprice extends Struct {
        @Struct.field(coordinates)
        location!: coordinates
        @Struct.field(UInt16)
        good_id!: UInt16
    }
    @Struct.type('marketprices')
    export class marketprices extends Struct {
        @Struct.field(coordinates)
        location!: coordinates
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
    @Struct.type('ship_state')
    export class ship_state extends Struct {
        @Struct.field(UInt32)
        energy!: UInt32
    }
    @Struct.type('ship_stats')
    export class ship_stats extends Struct {
        @Struct.field(UInt32)
        capacity!: UInt32
        @Struct.field(UInt32)
        drain!: UInt32
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
        @Struct.field(ship_state)
        state!: ship_state
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
    export interface marketprice {
        location: Type.coordinates
        good_id: UInt16Type
    }
    export interface marketprices {
        location: Type.coordinates
    }
    export interface sellgoods {
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
    marketprice: ActionParams.marketprice
    marketprices: ActionParams.marketprices
    sellgoods: ActionParams.sellgoods
    test: ActionParams.test
    travel: ActionParams.travel
    wipe: ActionParams.wipe
}
export type ActionNames = keyof ActionNameParams
export interface ActionReturnValues {
    esttravel: Types.travel_summary
    hash: Checksum512
    marketprice: Types.good_price
    marketprices: Types.good_price[]
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
