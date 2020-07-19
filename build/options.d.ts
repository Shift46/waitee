import { OptionsInterface } from './options_interface';
export declare class Options implements OptionsInterface {
    private _for;
    private _attempts;
    private _interval;
    private _a;
    private _b;
    private _throwError;
    get for(): number;
    set for(value: number);
    get attempts(): number;
    set attempts(value: number);
    get interval(): number;
    set interval(value: number);
    get a(): any;
    set a(value: any);
    get b(): any;
    set b(value: any);
    get throwError(): boolean;
    set throwError(value: boolean);
    setDefaults(): void;
    parse(opts: OptionsInterface): void;
}
