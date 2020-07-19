import clone = require('fast-clone');
import { deepEqual } from 'fast-equals';
import { Options } from './options';
import { OptionsInterface } from "./options_interface";
import { UntilInterface } from "./until_interface";
import {exists, sleep} from './helpers';
import {Actions} from "./actions";
import {BInterface} from "./b_interface";

export class Until implements UntilInterface {
    private opts: Options = new Options();
    private actions: Actions = new Actions(this.opts);

    constructor (param?: OptionsInterface) {
        if (param) {
            this.opts.parse(param);
        }
    }

    public static async calculate (a: any): Promise<any> {
        return typeof a === 'function' ? (a.constructor.name === "AsyncFunction" ? await a() : a()) : a
    };

    private async checker (f: Function): Promise<boolean> {
        let i: number = 0;
        let end: number = Date.now() + this.opts.for;

        while (i++ < this.opts.attempts && Date.now() < end) {
            if (await f()) {
                return true;
            }

            await sleep(this.opts.interval);
        }

        if (this.opts.throwError) {
            throw new Error ('Too long to wait');
        } else {
            return false;
        }
    };

    private defineVariables (a?: any, b?: any, needOne: boolean = false): void | Function {
        if (typeof a !== "undefined" && typeof b !== "undefined") {
            this.opts.a = a;
            this.opts.b = b;
        } else if (typeof a !== "undefined" && !exists(this.opts.a)) {
            this.opts.a = a;
        } else if (typeof a !== "undefined" && !exists(this.opts.b) && !needOne) {
            this.opts.b = a;
        }

        if (!exists(this.opts.b) && !needOne) {
            return (fn: Function): BInterface => {
                return {
                    b: (b: any): Promise<boolean> => {
                        this.opts.b = b;
                        return fn();
                    }
                }
            };
        }
    }

    public for (time: number): this {
        this.opts.for = time;

        return this;
    }

    public attempts (times: number): this {
        this.opts.attempts = times;

        return this;
    }

    public interval (interval: number): this {
        this.opts.interval = interval;

        return this;
    }

    public throwError (value: boolean): this {
        this.opts.throwError = value;

        return this;
    }

    public a (param: any) {
        this.opts.a = param;

        return this;
    }

    public b (param: any) {
        this.opts.b = param;

        return this;
    }

    public async update (a: any): Promise<boolean> {
        this.opts.a = this.opts.a || a;
        this.opts.b = clone(await Until.calculate(this.opts.a));

        return this.checker(async () => !deepEqual(this.opts.b, await Until.calculate(this.opts.a)));
    }

    public async condition (param: Function): Promise<boolean> {
        return this.checker(async () => await Until.calculate(param));
    }

    public greater (a?: number, b?: number): Promise<boolean> | BInterface {
        let bRequest: void | Function = this.defineVariables(a, b);
        const fn: Function = () => this.checker(this.actions.greater());

        if (bRequest) {
            return bRequest(fn);
        }

        if (!exists(this.opts.a) || !exists(this.opts.b)) {
            throw new Error('You need to define variables');
        }

        return fn();
    }

    public gt (a?: number, b?: number): Promise<boolean> | BInterface {
        return this.greater(a, b);
    }

    public greaterOrEqual (a?: number, b?: number): Promise<boolean> | BInterface {
        let bRequest: void | Function = this.defineVariables(a, b);
        const fn: Function = () => this.checker(this.actions.greaterOrEqual());

        if (bRequest) {
            return bRequest(fn);
        }

        if (!exists(this.opts.a) || !exists(this.opts.b)) {
            throw new Error('You need to define variables');
        }

        return fn();
    }

    public gte (a?: number, b?: number): Promise<boolean> | BInterface {
        return this.greater(a, b);
    }

    public less (a?: number, b?: number): Promise<boolean> | BInterface {
        let bRequest: void | Function = this.defineVariables(a, b);
        const fn: Function = () => this.checker(this.actions.less());

        if (bRequest) {
            return bRequest(fn);
        }

        if (!exists(this.opts.a) || !exists(this.opts.b)) {
            throw new Error('You need to define variables');
        }

        return fn();
    }

    public lt (a?: number, b?: number): Promise<boolean> | BInterface {
        return this.greater(a, b);
    }

    public lessOrEqual (a?: number, b?: number): Promise<boolean> | BInterface {
        let bRequest: void | Function = this.defineVariables(a, b);
        const fn: Function = () => this.checker(this.actions.lessOrEqual());

        if (bRequest) {
            return bRequest(fn);
        }

        if (!exists(this.opts.a) || !exists(this.opts.b)) {
            throw new Error('You need to define variables');
        }

        return fn();
    }

    public lte (a?: number, b?: number): Promise<boolean> | BInterface {
        return this.greater(a, b);
    }

    public equals (a?: any, b?: any): Promise<boolean> | BInterface {
        let bRequest: void | Function = this.defineVariables(a, b);
        const fn: Function = () => this.checker(this.actions.equals());

        if (bRequest) {
            return bRequest(fn);
        }

        if (!exists(this.opts.a) || !exists(this.opts.b)) {
            throw new Error('You need to define variables');
        }

        return fn();
    }

    public eq (a?: any, b?: any): Promise<boolean> | BInterface {
        return this.greater(a, b);
    }

    public error (a?: Function): Promise<boolean> {
        this.defineVariables(a, null, true);

        if (!exists(this.opts.a)) {
            throw new Error('You need to define variable');
        }

        return this.checker(this.actions.error());
    }

    public noError (a?: Function): Promise<boolean> {
        this.defineVariables(a, null, true);

        if (!exists(this.opts.a)) {
            throw new Error('You need to define variable');
        }

        return this.checker(this.actions.noError());
    }

    public date (a?: Date | number): Promise<boolean> {
        this.defineVariables(a, null, true);

        if (!exists(this.opts.a)) {
            throw new Error('You need to define variable');
        }

        let time: number = this.opts.a instanceof Date ? this.opts.a.getTime() : this.opts.a;

        return sleep(Date.now() - time);
    }

    public isTrue (a?: any): Promise<boolean> {
        this.defineVariables(a, null, true);

        if (!exists(this.opts.a)) {
            throw new Error('You need to define variable');
        }

        return this.checker(this.actions.isTrue());
    }

    public isFalse (a?: any): Promise<boolean> {
        this.defineVariables(a, null, true);

        if (!exists(this.opts.a)) {
            throw new Error('You need to define variable');
        }

        return this.checker(this.actions.isFalse());
    }
}
