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
    'DmVvc2lvOjphYmkvMS4yAB0HYWR2YW5jZQACBnJldmVhbAZzdHJpbmcGY29tbWl0C2NoZWNrc3VtMjU2BmFycml2ZQACBW93bmVyBG5hbWUCaWQGdWludDY0CGJ1eWdvb2RzAAMHc2hpcF9pZAZ1aW50NjQHZ29vZF9pZAZ1aW50NjQIcXVhbnRpdHkGdWludDY0CWNhcmdvX3JvdwAFAmlkBnVpbnQ2NAdzaGlwX2lkBnVpbnQ2NAdnb29kX2lkBnVpbnQ2NAhxdWFudGl0eQZ1aW50MTYGbG9hZGVkBnVpbnQxNgpjbGVhcnRhYmxlAAMKdGFibGVfbmFtZQRuYW1lBXNjb3BlBW5hbWU/CG1heF9yb3dzB3VpbnQ2ND8GY29tbWl0AAEGY29tbWl0C2NoZWNrc3VtMjU2C2Nvb3JkaW5hdGVzAAIBeAVpbnQ2NAF5BWludDY0BmVuYWJsZQABB2VuYWJsZWQEYm9vbApnb29kX3ByaWNlAAICaWQGdWludDE2BXByaWNlBnVpbnQ2NARoYXNoAAEFdmFsdWUGc3RyaW5nB2hhc2g1MTIAAQV2YWx1ZQZzdHJpbmcEaW5pdAABBHNlZWQLY2hlY2tzdW0yNTYEam9pbgABB2FjY291bnQEbmFtZQxsb2FkZXJfc3RhdHMAAwRtYXNzBnVpbnQzMghxdWFudGl0eQZ1aW50MTYGdGhydXN0BnVpbnQzMgttYXJrZXRwcmljZQACCGxvY2F0aW9uC2Nvb3JkaW5hdGVzB2dvb2RfaWQGdWludDE2DG1hcmtldHByaWNlcwABCGxvY2F0aW9uC2Nvb3JkaW5hdGVzCnBsYXllcl9yb3cAAwVvd25lcgRuYW1lB2JhbGFuY2UGdWludDY0BGRlYnQGdWludDY0BHNhbHQAAQRzYWx0BnVpbnQ2NAlzZWxsZ29vZHMAAwdzaGlwX2lkBnVpbnQ2NAdnb29kX2lkBnVpbnQ2NAhxdWFudGl0eQZ1aW50NjQMc2VxdWVuY2Vfcm93AAIDa2V5BG5hbWUFdmFsdWUGdWludDY0CHNoaXBfcm93AAoCaWQGdWludDY0BW93bmVyBG5hbWUEbmFtZQZzdHJpbmcIbG9jYXRpb24LY29vcmRpbmF0ZXMEc2tpbgV1aW50OAR0aWVyBXVpbnQ4BXN0YXRlCnNoaXBfc3RhdGUFc3RhdHMKc2hpcF9zdGF0cwdsb2FkZXJzDGxvYWRlcl9zdGF0cwp0cmF2ZWxwbGFuDHRyYXZlbF9wbGFuPwpzaGlwX3N0YXRlAAEGZW5lcmd5BnVpbnQzMgpzaGlwX3N0YXRzAAYIY2FwYWNpdHkGdWludDMyBWRyYWluBnVpbnQzMgRtYXNzBnVpbnQ2NAVvcmJpdAZ1aW50MTYIcmVjaGFyZ2UGdWludDMyBnRocnVzdAZ1aW50NjQJc3RhdGVfcm93AAUHZW5hYmxlZARib29sBWVwb2NoBnVpbnQ2NARzYWx0BnVpbnQ2NARzZWVkC2NoZWNrc3VtMjU2BmNvbW1pdAtjaGVja3N1bTI1NgZ0cmF2ZWwABAVvd25lcgRuYW1lAmlkBnVpbnQ2NAtkZXN0aW5hdGlvbgtjb29yZGluYXRlcwhyZWNoYXJnZQRib29sC3RyYXZlbF9wbGFuAAMLZGVzdGluYXRpb24LY29vcmRpbmF0ZXMJZGVwYXJ0dXJlCnRpbWVfcG9pbnQIZHVyYXRpb24GdWludDMyDnRyYXZlbF9zdW1tYXJ5AAwFc3RhdHMKc2hpcF9zdGF0cwdsb2FkZXJzDGxvYWRlcl9zdGF0cwZvcmlnaW4LY29vcmRpbmF0ZXMLZGVzdGluYXRpb24LY29vcmRpbmF0ZXMIZGlzdGFuY2UGdWludDY0CXRvdGFsbWFzcwZ1aW50NjQMYWNjZWxlcmF0aW9uBnVpbnQ2NApmbGlnaHR0aW1lBnVpbnQ2NAtlbmVyZ3l1c2FnZQZ1aW50NjQMcmVjaGFyZ2V0aW1lBnVpbnQ2NAhsb2FkdGltZQZ1aW50NjQEdGltZQZ1aW50NjQKdHJhdmVsdGltZQACAmlkBnVpbnQ2NAtkZXN0aW5hdGlvbgtjb29yZGluYXRlcwR3aXBlAAARAAAAQKFpdjIHYWR2YW5jZdMBLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IGFkdmFuY2UKc3VtbWFyeTogJ0FkdmFuY2UgdHVybicKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKQWR2YW5jZSB0aGUgZ2FtZSB0byB0aGUgbmV4dCB0dXJuLgAAAACo7e41BmFycml2ZbMCLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IGFycml2ZQpzdW1tYXJ5OiAnQ29tcGxldGUgdHJhdmVsJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tCgpDb21wbGV0ZSB0aGUgdHJhdmVsIG9mIGEgc2hpcCBieSB1cGRhdGluZyBpdHMgbG9jYXRpb24gdG8gdGhlIGRlc3RpbmF0aW9uIGNvb3JkaW5hdGVzIGFmdGVyIHRoZSB0cmF2ZWwgZHVyYXRpb24gaGFzIHBhc3NlZC4KCi0tLQAAADhRyrw+CGJ1eWdvb2Rz3QEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogYnV5Z29vZHMKc3VtbWFyeTogJ0J1eSBnb29kcycKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKUHVyY2hhc2UgZ29vZHMgYW5kIGFkZCB0aGVtIHRvIGEgc2hpcCdzIGNhcmdvLgCAisfka1RECmNsZWFydGFibGW+AS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBjbGVhcnRhYmxlCnN1bW1hcnk6ICdERUJVRzogY2xlYXJ0YWJsZSBhY3Rpb24nCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0AAAAAZCclRQZjb21taXTxAS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBjb21taXQKc3VtbWFyeTogJ1NldCBjb21taXQgdmFsdWUnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KClNldCB0aGUgaW5pdGlhbCBjb21taXQgdmFsdWUgZHVyaW5nIGdhbWUgaW5pdGlhbGl6YXRpb24uCgotLS0AAAAAqHjMVAZlbmFibGXiAS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBlbmFibGUKc3VtbWFyeTogJ1NldCBlbmFibGVkIHN0YXRlJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tCgpFbmFibGUgb3IgZGlzYWJsZSB0aGlzIGdhbWUgb2YgU2hpcGxvYWQuCgotLS0AAAAAANCwaQRoYXNo/QEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogaGFzaApzdW1tYXJ5OiAnQ2FsY3VsYXRlIHNoYTI1NiBoYXNoJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tCgpDYWxjdWxhdGVzIHRoZSBzaGEyNTYgaGFzaCBvZiBhIHN0cmluZyBiYXNlZCB1c2luZyB0aGUgZ2FtZSBzZWVkLgoKLS0tAAAAQITSsGkHaGFzaDUxMvsBLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IGhhc2g1MTIKc3VtbWFyeTogJ0NhbGN1bGF0ZSBzaGE1MTIgaGFzaCcKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKQ2FsY3VsYXRlcyB0aGUgc2hhNTEyIGhhc2ggb2YgYSBzdHJpbmcgYmFzZWQgdXNpbmcgdGhlIGdhbWUgc2VlZC4AAAAAAJDddARpbml0+gEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogaW5pdApzdW1tYXJ5OiAnSW5pdGlhbGl6ZSBnYW1lIHNlZWQnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KCkluaXRpYWxpemUgYSB0aGUgZ2FtZXMgc2VlZCBhbmQgc2VlZCB2YWx1ZXMgdG8gYm9vdHN0cmFwIGdhbWUgc3RhdGUuAAAAAAAwHX0Eam9pbskBLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IGpvaW4Kc3VtbWFyeTogJ0pvaW4gYSBnYW1lJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tCgpKb2luIGEgZ2FtZSBvZiBTaGlwbG9hZAoKLS0tABRyt2YFr5ELbWFya2V0cHJpY2WbAi0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBtYXJrZXRwcmljZQpzdW1tYXJ5OiAnR2V0IHByaWNlIG9mIGdvb2QgYXQgbG9jYXRpb24nCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KClRoaXMgYWN0aW9uIGRldGVybWluZXMgdGhlIG1hcmtldCBwcmljZSBvZiBhIHNwZWNpZmllZCBnb29kIGF0IGEgZ2l2ZW4gbG9jYXRpb24uCgotLS2AFXK3ZgWvkQxtYXJrZXRwcmljZXOVAi0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBtYXJrZXRwcmljZXMKc3VtbWFyeTogJ0dldCBwcmljZSBvZiBhbGwgZ29vZHMgYXQgbG9jYXRpb24nCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KClRoaXMgYWN0aW9uIGRldGVybWluZXMgdGhlIG1hcmtldCBwcmljZSBvZiBhbGwgZ29vZHMgYXQgYSBnaXZlbiBsb2NhdGlvbi4AAAAAAJCjwQRzYWx03QEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogc2FsdApzdW1tYXJ5OiAnQXBwZW5kIFNhbHQnCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0KCkFkZCBhZGRpdGlvbmFsIHNhbHQgdG8gdGhlIG5leHQgZXBvY2ggc2VlZC4KCi0tLQAAwIlSFqPCCXNlbGxnb29kc9UBLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IHNlbGxnb29kcwpzdW1tYXJ5OiAnU2VsbCBnb29kcycKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKU2VsbCBnb29kcyBmcm9tIGEgc2hpcCdzIGNhcmdvLgoKLS0tAAAAAES1zc0GdHJhdmVs/QEtLS0KCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogdHJhdmVsCnN1bW1hcnk6ICdNb3ZlIGEgc2hpcCcKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE0NzI5Mjg2MT9zPTQwMCZ1PTNiMWFmNjZlOTBkZDg1MWY0ZDdjMDk2ZWQ2YTJmYmI0YjllMTkwZGEKCi0tLQoKSW5pdGlhdGUgdHJhdmVsIG9mIGEgc2hpcCBmcm9tIGl0cyBjdXJyZW50IGxvY2F0aW9uIHRvIGEgbmV3IGRlc3RpbmF0aW9uLgoKLS0tAICSLke1zc0KdHJhdmVsdGltZYwCLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IHRyYXZlbHRpbWUKc3VtbWFyeTogJ0VzdGltYXRlIFRyYXZlbCBUaW1lJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTQ3MjkyODYxP3M9NDAwJnU9M2IxYWY2NmU5MGRkODUxZjRkN2MwOTZlZDZhMmZiYjRiOWUxOTBkYQoKLS0tCgpFc3RpbWF0ZSB0aGUgZHVyYXRpb24gb2YgYSBzaGlwIHRyYXZlbGluZyB3aXRob3V0IGNvbW1pdHRpbmcgdG8gdGhlIGFjdGlvbi4KCi0tLQAAAAAAoKrjBHdpcGWyAS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiB3aXBlCnN1bW1hcnk6ICdERUJVRzogd2lwZSBhY3Rpb24nCmljb246IGh0dHBzOi8vYXZhdGFycy5naXRodWJ1c2VyY29udGVudC5jb20vdS8xNDcyOTI4NjE/cz00MDAmdT0zYjFhZjY2ZTkwZGQ4NTFmNGQ3YzA5NmVkNmEyZmJiNGI5ZTE5MGRhCgotLS0FAAAAAADKrkEDaTY0AAAJY2FyZ29fcm93AAAAAFzlTawDaTY0AAAKcGxheWVyX3JvdwAAAApNpa3CA2k2NAAADHNlcXVlbmNlX3JvdwAAAAAAUF3DA2k2NAAACHNoaXBfcm93AAAAAACVTcYDaTY0AAAJc3RhdGVfcm93ARFTaGlwbG9hZCAoU2VydmVyKRFTaGlwbG9hZCAoU2VydmVyKQAAAAUAAAAAANCwaQtjaGVja3N1bTI1NgAAAECE0rBpC2NoZWNrc3VtNTEyABRyt2YFr5EKZ29vZF9wcmljZYAVcrdmBa+RDGdvb2RfcHJpY2VbXQCAki5Htc3NDnRyYXZlbF9zdW1tYXJ5'
)
export const abi = ABI.from(abiBlob)
export namespace Types {
    @Struct.type('advance')
    export class advance extends Struct {
        @Struct.field('string')
        reveal!: string
        @Struct.field(Checksum256)
        commit!: Checksum256
    }
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
        @Struct.field(UInt16)
        quantity!: UInt16
        @Struct.field(UInt16)
        loaded!: UInt16
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
    @Struct.type('commit')
    export class commit extends Struct {
        @Struct.field(Checksum256)
        commit!: Checksum256
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
    @Struct.type('hash512')
    export class hash512 extends Struct {
        @Struct.field('string')
        value!: string
    }
    @Struct.type('init')
    export class init extends Struct {
        @Struct.field(Checksum256)
        seed!: Checksum256
    }
    @Struct.type('join')
    export class join extends Struct {
        @Struct.field(Name)
        account!: Name
    }
    @Struct.type('loader_stats')
    export class loader_stats extends Struct {
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
    @Struct.type('salt')
    export class salt extends Struct {
        @Struct.field(UInt64)
        salt!: UInt64
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
        @Struct.field(UInt64)
        salt!: UInt64
        @Struct.field(Checksum256)
        seed!: Checksum256
        @Struct.field(Checksum256)
        commit!: Checksum256
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
    @Struct.type('traveltime')
    export class traveltime extends Struct {
        @Struct.field(UInt64)
        id!: UInt64
        @Struct.field(coordinates)
        destination!: coordinates
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
}
export interface TableTypes {
    cargo: Types.cargo_row
    player: Types.player_row
    sequence: Types.sequence_row
    ship: Types.ship_row
    state: Types.state_row
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
    export interface advance {
        reveal: string
        commit: Checksum256Type
    }
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
    export interface commit {
        commit: Checksum256Type
    }
    export interface enable {
        enabled: boolean
    }
    export interface hash {
        value: string
    }
    export interface hash512 {
        value: string
    }
    export interface init {
        seed: Checksum256Type
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
    export interface salt {
        salt: UInt64Type
    }
    export interface sellgoods {
        ship_id: UInt64Type
        good_id: UInt64Type
        quantity: UInt64Type
    }
    export interface travel {
        owner: NameType
        id: UInt64Type
        destination: Type.coordinates
        recharge: boolean
    }
    export interface traveltime {
        id: UInt64Type
        destination: Type.coordinates
    }
    export interface wipe {}
}
export interface ActionNameParams {
    advance: ActionParams.advance
    arrive: ActionParams.arrive
    buygoods: ActionParams.buygoods
    cleartable: ActionParams.cleartable
    commit: ActionParams.commit
    enable: ActionParams.enable
    hash: ActionParams.hash
    hash512: ActionParams.hash512
    init: ActionParams.init
    join: ActionParams.join
    marketprice: ActionParams.marketprice
    marketprices: ActionParams.marketprices
    salt: ActionParams.salt
    sellgoods: ActionParams.sellgoods
    travel: ActionParams.travel
    traveltime: ActionParams.traveltime
    wipe: ActionParams.wipe
}
export type ActionNames = keyof ActionNameParams
export interface ActionReturnValues {
    hash: Checksum256
    hash512: Checksum512
    marketprice: Types.good_price
    marketprices: Types.good_price[]
    traveltime: Types.travel_summary
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
