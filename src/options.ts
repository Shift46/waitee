import { OptionsInterface } from './options_interface';

export class Options implements OptionsInterface {
    private _for: number = Infinity;
    private _attempts: number = Infinity;
    private _interval: number = 100;
    private _a: any = null;
    private _b: any = null;
    //private _autotimer: boolean = true;
    private _throwError: boolean = true;

    get for(): number {
        return this._for;
    }

    set for(value: number) {
        this._for = value || Infinity;
    }

    get attempts(): number {
        return this._attempts;
    }

    set attempts(value: number) {
        this._attempts = value || Infinity;
    }

    get interval(): number {
        return this._interval;
    }

    set interval(value: number) {
        this._interval = value;
    }

    get a(): any {
        return this._a;
    }

    set a(value: any) {
        this._a = value;
    }

    get b(): any {
        return this._b;
    }

    set b(value: any) {
        this._b = value;
    }

    get throwError(): boolean {
        return this._throwError;
    }

    set throwError(value: boolean) {
        this._throwError = value;
    }

    /*get autotimer(): boolean {
        return this._autotimer;
    }

    set autotimer(value: boolean) {
        this._autotimer = value;
    }*/

    setDefaults (): void {
        this._for = Infinity;
        this._attempts = Infinity;
        this._interval = 100;
        this._a = null;
        this._b = null;
        //this._autotimer = true;
        this._throwError = true;
    }

    parse (opts: OptionsInterface): void {
        this._for = opts.for || Infinity;
        this._attempts = opts.attempts || Infinity;
        this._interval = opts.interval || 100;
        this._a = opts.a || null;
        this._b = opts.b || null;
        //this._autotimer = true;
        this._throwError = opts.throwError || true;
    }
}
