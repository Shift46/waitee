import { sleep, timer } from './helpers';
import { Until } from './until';
import { OptionsInterface } from "./options_interface";

export { sleep as for, timer };

const until = (param1?: object | Function, param2?: object): any => {
    if (param1 instanceof Function) {
        return new Until(<OptionsInterface>param2 || null).condition(param1);
    } else {
        return new Until(<OptionsInterface>param1);
    }
};

export { until };




