import type {Action, NameType, UInt64Type} from '@wharfkit/antelope'
import {ABI, Blob, Name, Struct, UInt64} from '@wharfkit/antelope'
import type {ActionOptions, ContractArgs, PartialBy, Table} from '@wharfkit/contract'
import {Contract as BaseContract} from '@wharfkit/contract'
export const abiBlob = Blob.from(
    'DmVvc2lvOjphYmkvMS4yAAcKY2xlYXJ0YWJsZQADCnRhYmxlX25hbWUEbmFtZQVzY29wZQVuYW1lPwhtYXhfcm93cwd1aW50NjQ/C2NvbXBhbnlfcm93AAIHYWNjb3VudARuYW1lBG5hbWUGc3RyaW5nBmVuYWJsZQABB2VuYWJsZWQEYm9vbAxmb3VuZGNvbXBhbnkAAgdhY2NvdW50BG5hbWUEbmFtZQZzdHJpbmcJc3RhdGVfcm93AAEHZW5hYmxlZARib29sBHRlc3QAAQRkYXRhBnN0cmluZwR3aXBlAAAFAICKx+RrVEQKY2xlYXJ0YWJsZQAAAAAAqHjMVAZlbmFibGXzAS0tLQoKc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBlbmFibGUKc3VtbWFyeTogJ0VuYWJsZS9kaXNhYmxlIHBsYXRmb3JtJwppY29uOiBodHRwczovL2F2YXRhcnMuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3UvMTU4MTEzNzgyI2QzYmYyOTBmZGRlZGRiYjdkMzJhYTg5N2U5ZjdlOWUxM2EyYWU0NDk1NjE0MmUyM2ViNDdiNzcwOTZhMmVhOGQKCi0tLQoKRW5hYmxlIG9yIGRpc2FibGUgdGhlIHBsYXRmb3JtIGNvbnRyYWN0LuCnqZKiNDVdDGZvdW5kY29tcGFueYMCLS0tCgpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IGZvdW5kY29tcGFueQpzdW1tYXJ5OiAnRm91bmQgYSBuZXcgY29tcGFueScKaWNvbjogaHR0cHM6Ly9hdmF0YXJzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzE1ODExMzc4MiNkM2JmMjkwZmRkZWRkYmI3ZDMyYWE4OTdlOWY3ZTllMTNhMmFlNDQ5NTYxNDJlMjNlYjQ3Yjc3MDk2YTJlYThkCgotLS0KCkZvdW5kIGEgbmV3IGNvbXBhbnkgaW4gdGhlIFNoaXBsb2FkIHBsYXRmb3JtIGNvbnRyYWN0LgAAAAAAkLHKBHRlc3QAAAAAAACgquMEd2lwZQACAAAAwE9TJUUDaTY0AAALY29tcGFueV9yb3cAAAAAAJVNxgNpNjQAAAlzdGF0ZV9yb3cBE1NoaXBsb2FkIChQbGF0Zm9ybSkTU2hpcGxvYWQgKFBsYXRmb3JtKQAAAAA='
)
export const abi = ABI.from(abiBlob)
export namespace Types {
    @Struct.type('cleartable')
    export class cleartable extends Struct {
        @Struct.field(Name)
        table_name!: Name
        @Struct.field(Name, {optional: true})
        scope?: Name
        @Struct.field(UInt64, {optional: true})
        max_rows?: UInt64
    }
    @Struct.type('company_row')
    export class company_row extends Struct {
        @Struct.field(Name)
        account!: Name
        @Struct.field('string')
        name!: string
    }
    @Struct.type('enable')
    export class enable extends Struct {
        @Struct.field('bool')
        enabled!: boolean
    }
    @Struct.type('foundcompany')
    export class foundcompany extends Struct {
        @Struct.field(Name)
        account!: Name
        @Struct.field('string')
        name!: string
    }
    @Struct.type('state_row')
    export class state_row extends Struct {
        @Struct.field('bool')
        enabled!: boolean
    }
    @Struct.type('test')
    export class test extends Struct {
        @Struct.field('string')
        data!: string
    }
    @Struct.type('wipe')
    export class wipe extends Struct {}
}
export const TableMap = {
    company: Types.company_row,
    state: Types.state_row,
}
export interface TableTypes {
    company: Types.company_row
    state: Types.state_row
}
export type RowType<T> = T extends keyof TableTypes ? TableTypes[T] : any
export type TableNames = keyof TableTypes
export namespace ActionParams {
    export namespace Type {}
    export interface cleartable {
        table_name: NameType
        scope?: NameType
        max_rows?: UInt64Type
    }
    export interface enable {
        enabled: boolean
    }
    export interface foundcompany {
        account: NameType
        name: string
    }
    export interface test {
        data: string
    }
    export interface wipe {}
}
export interface ActionNameParams {
    cleartable: ActionParams.cleartable
    enable: ActionParams.enable
    foundcompany: ActionParams.foundcompany
    test: ActionParams.test
    wipe: ActionParams.wipe
}
export type ActionNames = keyof ActionNameParams
export class Contract extends BaseContract {
    constructor(args: PartialBy<ContractArgs, 'abi' | 'account'>) {
        super({
            client: args.client,
            abi: abi,
            account: args.account || Name.from('platform.gm'),
        })
    }
    action<T extends ActionNames>(
        name: T,
        data: ActionNameParams[T],
        options?: ActionOptions
    ): Action {
        return super.action(name, data, options)
    }
    table<T extends TableNames>(name: T, scope?: NameType): Table<RowType<T>> {
        return super.table(name, scope, TableMap[name])
    }
}
