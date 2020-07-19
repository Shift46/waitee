import { Options } from "./options";
export declare class Actions {
    private opts;
    constructor(opts: Options);
    greater(): Function;
    greaterOrEqual(): Function;
    less(): Function;
    lessOrEqual(): Function;
    equals(): Function;
    error(): Function;
    noError(): Function;
    isTrue(): Function;
    isFalse(): Function;
}
