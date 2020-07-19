import { TimerInterface } from "./timer_interface";
declare const sleep: (time: number) => Promise<any>;
declare const timer: (instantStart?: boolean) => TimerInterface;
declare const exists: (a: any) => boolean;
export { sleep, timer, exists };
