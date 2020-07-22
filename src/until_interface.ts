import {BInterface} from "./b_interface";

export interface UntilInterface {
    for (time: number): this
    attempts (times: number): this
    interval (interval: number): this
    throwError (value: boolean): this
    a (param: any): this
    b (param: any): this
    update (a: any): Promise<boolean>
    condition (param: Function): Promise<boolean>
    greater (a?: number, b?: number): Promise<boolean> | BInterface
    gt (a?: number, b?: number): Promise<boolean> | BInterface
    greaterOrEqual (a?: number, b?: number): Promise<boolean> | BInterface
    gte (a?: number, b?: number): Promise<boolean> | BInterface
    less (a?: number, b?: number): Promise<boolean> | BInterface
    lt (a?: number, b?: number): Promise<boolean> | BInterface
    lessOrEqual (a?: number, b?: number): Promise<boolean> | BInterface
    lte (a?: number, b?: number): Promise<boolean> | BInterface
    equals (a?: any, b?: any): Promise<boolean> | BInterface
    eq (a?: any, b?: any): Promise<boolean> | BInterface
    error (a?: Function): Promise<boolean>
    noError (a?: Function): Promise<boolean>
    date (a?: Date | number): Promise<boolean>
    isTrue (a?: any): Promise<boolean>
    isFalse (a?: any): Promise<boolean>
    includes (a?: Array<any>, b?: any): Promise<boolean> | BInterface
}
