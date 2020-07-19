import {TimerInterface} from "./timer_interface";

const sleep = (time: number): Promise<any> => new Promise(r => setTimeout(r, time));

const timer = (instantStart: boolean = true): TimerInterface => {
    let start_time: number;

    const start = (): void => {
        start_time = Date.now();
    };

    const stop = (): number => {
        return Date.now() - start_time;
    };

    if (instantStart) {
        start();

        return {
            stop
        };
    } else {
        return {
            start,
            stop
        };
    }
};

const exists = (a: any): boolean => a !== undefined && a !== null;

export { sleep, timer, exists };
