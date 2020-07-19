//wait-timer.test.ts
/// <reference types="jest" />
import * as wait from '../src';

it('should return how many time passed after timer start', async () => {
    expect.assertions(1);

    const timer = wait.timer();

    await wait.for(1000);

    const delta: number = Math.abs(1000 - timer.stop());

    expect(delta).toBeLessThan(100);
});
