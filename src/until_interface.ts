export interface UntilInterface {
    for (time: number): this
    attempts (times: number): this
    interval (interval: number): this
    a (param: any): this
    b (param: any): this
    update (a: any): Promise<boolean>
    condition (param: Function): Promise<boolean>
}
