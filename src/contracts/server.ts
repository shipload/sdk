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
    'DmVvc2lvOjphYmkvMS4yABoHYWR2YW5jZQAABmFycml2ZQACBW93bmVyBG5hbWUCaWQGdWludDY0CGJ1eWdvb2RzAAMHc2hpcF9pZAZ1aW50NjQHZ29vZF9pZAZ1aW50NjQIcXVhbnRpdHkGdWludDY0CWNhcmdvX3JvdwAEAmlkBnVpbnQ2NAdzaGlwX2lkBnVpbnQ2NAdnb29kX2lkBnVpbnQ2NAhxdWFudGl0eQZ1aW50NjQKY2xlYXJ0YWJsZQADCnRhYmxlX25hbWUEbmFtZQVzY29wZQVuYW1lPwhtYXhfcm93cwd1aW50NjQ/C2Nvb3JkaW5hdGVzAAIBeAVpbnQ2NAF5BWludDY0BmVuYWJsZQABB2VuYWJsZWQEYm9vbAllc3R0cmF2ZWwAAgJpZAZ1aW50NjQLZGVzdGluYXRpb24LY29vcmRpbmF0ZXMEaGFzaAABBXZhbHVlBnN0cmluZwRpbml0AAIEc2VlZAtjaGVja3N1bTI1NgllcG9jaHNlZWQLY2hlY2tzdW0yNTYEam9pbgABB2FjY291bnQEbmFtZQxsb2FkZXJfc3RhdHMABAhjYXBhY2l0eQZ1aW50MTYEbWFzcwZ1aW50MzIIcXVhbnRpdHkGdWludDE2BnRocnVzdAZ1aW50MzILbWFya2V0cHJpY2UAAghsb2NhdGlvbgtjb29yZGluYXRlcwdnb29kX2lkBnVpbnQxNhJwYWlyX3VpbnQxNl91aW50NjQAAgVmaXJzdAZ1aW50MTYGc2Vjb25kBnVpbnQ2NApwbGF5ZXJfcm93AAMFb3duZXIEbmFtZQdiYWxhbmNlBnVpbnQ2NARkZWJ0BnVpbnQ2NAlzZWxsZ29vZHMAAwdzaGlwX2lkBnVpbnQ2NAdnb29kX2lkBnVpbnQ2NAhxdWFudGl0eQZ1aW50NjQMc2VxdWVuY2Vfcm93AAIDa2V5BG5hbWUFdmFsdWUGdWludDY0CHNoaXBfcm93AAkCaWQGdWludDY0BW93bmVyBG5hbWUEbmFtZQZzdHJpbmcIbG9jYXRpb24LY29vcmRpbmF0ZXMEc2tpbgV1aW50OAR0aWVyBXVpbnQ4BXN0YXRzCnNoaXBfc3RhdHMHbG9hZGVycwxsb2FkZXJfc3RhdHMKdHJhdmVscGxhbgx0cmF2ZWxfcGxhbj8Kc2hpcF9zdGF0cwAHCGNhcGFjaXR5BnVpbnQzMgVkcmFpbgZ1aW50MzIGZW5lcmd5BnVpbnQzMgRtYXNzBnVpbnQ2NAVvcmJpdAZ1aW50MTYIcmVjaGFyZ2UGdWludDMyBnRocnVzdAZ1aW50NjQJc3RhdGVfcm93AAUHZW5hYmxlZARib29sBWVwb2NoBnVpbnQ2NAllcG9jaHNlZWQLY2hlY2tzdW0yNTYHZ2VuZXNpcxRibG9ja190aW1lc3RhbXBfdHlwZQRzZWVkC2NoZWNrc3VtMjU2C3N1bW1hcnlfcm93AAIDa2V5BG5hbWUFdmFsdWUOdHJhdmVsX3N1bW1hcnkEdGVzdAABBGRhdGEGc3RyaW5nBnRyYXZlbAAEBW93bmVyBG5hbWUCaWQGdWludDY0C2Rlc3RpbmF0aW9uC2Nvb3JkaW5hdGVzCHJlY2hhcmdlBGJvb2wLdHJhdmVsX3BsYW4AAwtkZXN0aW5hdGlvbgtjb29yZGluYXRlcwlkZXBhcnR1cmUKdGltZV9wb2ludAhkdXJhdGlvbgZ1aW50MzIOdHJhdmVsX3N1bW1hcnkADAVzdGF0cwpzaGlwX3N0YXRzB2xvYWRlcnMMbG9hZGVyX3N0YXRzBm9yaWdpbgtjb29yZGluYXRlcwtkZXN0aW5hdGlvbgtjb29yZGluYXRlcwhkaXN0YW5jZQZ1aW50NjQJdG90YWxtYXNzBnVpbnQ2NAxhY2NlbGVyYXRpb24GdWludDY0CmZsaWdodHRpbWUGdWludDY0C2VuZXJneXVzYWdlBnVpbnQ2NAxyZWNoYXJnZXRpbWUGdWludDY0CGxvYWR0aW1lBnVpbnQ2NAR0aW1lBnVpbnQ2NAR3aXBlAAAOAAAAQKFpdjIHYWR2YW5jZdMBLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IGFkdmFuY2UKc3VtbWFyeTogJ0FkdmFuY2UgdHVybicKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKQWR2YW5jZSB0aGUgZ2FtZSB0byB0aGUgbmV4dCB0dXJuLgAAAACo7e41BmFycml2ZbMCLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IGFycml2ZQpzdW1tYXJ5OiAnQ29tcGxldGUgdHJhdmVsJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tCgpDb21wbGV0ZSB0aGUgdHJhdmVsIG9mIGEgc2hpcCBieSB1cGRhdGluZyBpdHMgbG9jYXRpb24gdG8gdGhlIGRlc3RpbmF0aW9uIGNvb3JkaW5hdGVzIGFmdGVyIHRoZSB0cmF2ZWwgZHVyYXRpb24gaGFzIHBhc3NlZC4KCi0tLQAAADhRyrw+CGJ1eWdvb2Rz4gEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogYnV5Z29vZHMKc3VtbWFyeTogJ0J1eSBnb29kcycKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKUHVyY2hhc2UgZ29vZHMgYW5kIGFkZCB0aGVtIHRvIGEgc2hpcCdzIGNhcmdvLgoKLS0tAICKx+RrVEQKY2xlYXJ0YWJsZb4BLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IGNsZWFydGFibGUKc3VtbWFyeTogJ0RFQlVHOiBjbGVhcnRhYmxlIGFjdGlvbicKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQAAAACoeMxUBmVuYWJsZeIBLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IGVuYWJsZQpzdW1tYXJ5OiAnU2V0IGVuYWJsZWQgc3RhdGUnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KCkVuYWJsZSBvciBkaXNhYmxlIHRoaXMgZ2FtZSBvZiBTaGlwbG9hZC4KCi0tLQAAiGqbmzNWCWVzdHRyYXZlbAAAAAAAANCwaQRoYXNo6gEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogaGFzaApzdW1tYXJ5OiAnQ2FsY3VsYXRlIGhhc2gnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KCkNhbGN1bGF0ZXMgdGhlIGhhc2ggb2YgYSBzdHJpbmcgYmFzZWQgdXNpbmcgdGhlIGdhbWUgc2VlZC4AAAAAAJDddARpbml0/wEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogaW5pdApzdW1tYXJ5OiAnSW5pdGlhbGl6ZSBnYW1lIHNlZWQnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KCkluaXRpYWxpemUgYSB0aGUgZ2FtZXMgc2VlZCBhbmQgZXBvY2hzZWVkIHZhbHVlcyB0byBib290c3RyYXAgZ2FtZSBzdGF0ZS4AAAAAADAdfQRqb2luxAEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogam9pbgpzdW1tYXJ5OiAnSm9pbiBhIGdhbWUnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KCkpvaW4gYSBnYW1lIG9mIFNoaXBsb2FkABRyt2YFr5ELbWFya2V0cHJpY2XDAi0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBtYXJrZXRwcmljZQpzdW1tYXJ5OiAnR2V0IG1hcmtldCBwcmljZSBhdCBhIGxvY2F0aW9uJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tCgpUaGlzIGFjdGlvbiBkZXRlcm1pbmVzIHRoZSBtYXJrZXQgcHJpY2Ugb2YgYSBzcGVjaWZpZWQgZ29vZCBvciBvZiBhbGwgZ29vZHMgYXQgYSBnaXZlbiBsb2NhdGlvbiBiYXNlZCBvbiB0aGUgZ2FtZSBzZWVkLgoKLS0tAADAiVIWo8IJc2VsbGdvb2Rz1QEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogc2VsbGdvb2RzCnN1bW1hcnk6ICdTZWxsIGdvb2RzJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tCgpTZWxsIGdvb2RzIGZyb20gYSBzaGlwJ3MgY2FyZ28uCgotLS0AAAAAAJCxygR0ZXN0sgEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogdGVzdApzdW1tYXJ5OiAnREVCVUc6IHRlc3QgYWN0aW9uJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tAAAAAES1zc0GdHJhdmVs+AEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogdHJhdmVsCnN1bW1hcnk6ICdNb3ZlIGEgc2hpcCcKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKSW5pdGlhdGUgdHJhdmVsIG9mIGEgc2hpcCBmcm9tIGl0cyBjdXJyZW50IGxvY2F0aW9uIHRvIGEgbmV3IGRlc3RpbmF0aW9uLgAAAAAAoKrjBHdpcGWyAS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiB3aXBlCnN1bW1hcnk6ICdERUJVRzogd2lwZSBhY3Rpb24nCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0GAAAAAADKrkEDaTY0AAAJY2FyZ29fcm93AAAAAFzlTawDaTY0AAAKcGxheWVyX3JvdwAAAApNpa3CA2k2NAAADHNlcXVlbmNlX3JvdwAAAAAAUF3DA2k2NAAACHNoaXBfcm93AAAAAACVTcYDaTY0AAAJc3RhdGVfcm93AAAAwF8jpcYDaTY0AAALc3VtbWFyeV9yb3cBEVNoaXBsb2FkIChTZXJ2ZXIpEVNoaXBsb2FkIChTZXJ2ZXIpAAAAAwAAiGqbmzNWDnRyYXZlbF9zdW1tYXJ5AAAAAADQsGkLY2hlY2tzdW01MTIAFHK3ZgWvkQZ1aW50NjQ='
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
    @Struct.type('marketprice')
    export class marketprice extends Struct {
        @Struct.field(coordinates)
        location!: coordinates
        @Struct.field(UInt16)
        good_id!: UInt16
    }
    @Struct.type('pair_uint16_uint64')
    export class pair_uint16_uint64 extends Struct {
        @Struct.field(UInt16)
        first!: UInt16
        @Struct.field(UInt64)
        second!: UInt64
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
    sellgoods: ActionParams.sellgoods
    test: ActionParams.test
    travel: ActionParams.travel
    wipe: ActionParams.wipe
}
export type ActionNames = keyof ActionNameParams
export interface ActionReturnValues {
    esttravel: Types.travel_summary
    hash: Checksum512
    marketprice: UInt64
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
