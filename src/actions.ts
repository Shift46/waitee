import { deepEqual } from 'fast-equals';
import {Options} from "./options";
import {Until} from "./until";
//import * as vm from 'vm';

export class Actions {

    private opts: Options = new Options();

    constructor (opts: Options) {
        this.opts = opts;
    }

    public greater (): Function {
        return async () => await Until.calculate(this.opts.a) > await Until.calculate(this.opts.b);
    }

    public greaterOrEqual (): Function {
        return async () => await Until.calculate(this.opts.a) >= await Until.calculate(this.opts.b);
    }

    public less (): Function {
        return async () => await Until.calculate(this.opts.a) < await Until.calculate(this.opts.b);
    }

    public lessOrEqual (): Function {
        return async () => await Until.calculate(this.opts.a) <= await Until.calculate(this.opts.b);
    }

    public equals (): Function {
        return async () => deepEqual(await Until.calculate(this.opts.a), await Until.calculate(this.opts.b))
    }

    public error (): Function {
        return async () => await Until.calculate(this.opts.a).then(() => false).catch(() => true);
    }

    public noError (): Function {
        return async () => await Until.calculate(this.opts.a).then(() => true).catch(() => false);
    }

    public isTrue (): Function {
        return async () => await Until.calculate(this.opts.a) === true;
    }

    public isFalse (): Function {
        return async () => await Until.calculate(this.opts.a) === false;
    }

    /* Maybe I will add it after a while
    public async raw (text): Promise<Function> {
        const script: any = new vm.Script(text);

        const context: object = {
            a: this.opts.a,
            b: this.opts.b
        };

        vm.createContext(context);

        return async () => await Until.calculate(script.runInContext(context))
    } */

}
