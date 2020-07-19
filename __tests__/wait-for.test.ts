//wait-for.test.ts
/// <reference types="jest" />
import * as wait from '../src';

it('should wait for 1 seconds', async () => {
    expect.assertions(1);

    const start: number = Date.now();

    await wait.for(1000);

    const delta: number = Math.abs(1000 - (Date.now() - start));

    expect(delta).toBeLessThan(100);
});
