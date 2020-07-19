//wait-until.test.ts
/// <reference types="jest" />
import * as wait from '../src';


it('should wait until variable updates. Option 1', async () => {
    expect.assertions(1);

    let a = {
        test: 1
    };

    setTimeout(() => a.test = 2, 1000);

    await wait.until().update(a);

    expect(a.test).toBe(2);
});


it('should wait until variable updates. Option 2', async () => {
    expect.assertions(1);

    let a = {
        test: 1
    };

    setTimeout(() => a.test = 2, 1000);

    await wait.until().a(a).update();

    expect(a.test).toBe(2);
});


it('should wait until "a" becomes greater than 1. Option 1', async () => {
    expect.assertions(1);

    let a = 1;

    setTimeout(() => a = 2, 1000);

    await wait.until().a(() => a).greater(1);

    expect(a).toBeGreaterThan(1);
});


it('should wait until "a" becomes greater than 1. Option 2', async () => {
    expect.assertions(1);

    let a = 1;

    setTimeout(() => a = 2, 1000);

    await wait.until().greater(() => a, 1);

    expect(a).toBeGreaterThan(1);
});


it('should wait until "a" becomes greater than 1. Option 3', async () => {
    expect.assertions(1);

    let a = 1;

    setTimeout(() => a = 2, 1000);

    await wait.until().a(() => a).greater().b(1);

    expect(a).toBeGreaterThan(1);
});


it('should wait until "a" becomes greater than 1. But it won\'t', async () => {
    expect.assertions(1);

    let a = 1;

    await expect(wait.until().for(2000).a(() => a).greater().b(1)).rejects.toThrow();
});


it('should wait until "a" becomes greater than 1. But it won\'t. Without error.', async () => {
    expect.assertions(1);

    let a = 1;

    expect(await wait.until().throwError(false).for(2000).a(() => a).greater().b(1)).toBeFalsy();
});


it('should wait until "a" becomes greater or equal 2. Option 1', async () => {
    expect.assertions(1);

    let a = 1;

    setTimeout(() => a = 3, 1000);

    await wait.until().a(() => a).greaterOrEqual(2);

    expect(a).toBeGreaterThanOrEqual(2);
});


it('should wait until "a" becomes greater or equal 2. Option 2', async () => {
    expect.assertions(1);

    let a = 1;

    setTimeout(() => a = 3, 1000);

    await wait.until().greaterOrEqual(() => a, 2);

    expect(a).toBeGreaterThanOrEqual(2);
});


it('should wait until "a" becomes greater or equal 2. Option 3', async () => {
    expect.assertions(1);

    let a = 1;

    setTimeout(() => a = 3, 1000);

    await wait.until().a(() => a).greaterOrEqual().b(2);

    expect(a).toBeGreaterThanOrEqual(2);
});


it('should wait until "a" becomes less than 2. Option 1', async () => {
    expect.assertions(1);

    let a = 2;

    setTimeout(() => a = 1, 1000);

    await wait.until().a(() => a).less(2);

    expect(a).toBeLessThan(2);
});


it('should wait until "a" becomes less than 2. Option 2', async () => {
    expect.assertions(1);

    let a = 2;

    setTimeout(() => a = 1, 1000);

    await wait.until().less(() => a, 2);

    expect(a).toBeLessThan(2);
});


it('should wait until "a" becomes less than 2. Option 3', async () => {
    expect.assertions(1);

    let a = 2;

    setTimeout(() => a = 1, 1000);

    await wait.until().a(() => a).less().b(2);

    expect(a).toBeLessThan(2);
});


it('should wait until "a" becomes less or equal 2. Option 1', async () => {
    expect.assertions(1);

    let a = 3;

    setTimeout(() => a = 2, 1000);

    await wait.until().a(() => a).lessOrEqual(2);

    expect(a).toBeLessThanOrEqual(2);
});


it('should wait until "a" becomes less or equal 2. Option 2', async () => {
    expect.assertions(1);

    let a = 3;

    setTimeout(() => a = 2, 1000);

    await wait.until().lessOrEqual(() => a, 2);

    expect(a).toBeLessThanOrEqual(2);
});


it('should wait until "a" becomes less or equal 2. Option 3', async () => {
    expect.assertions(1);

    let a = 3;

    setTimeout(() => a = 2, 1000);

    await wait.until().a(() => a).lessOrEqual().b(2);

    expect(a).toBeLessThanOrEqual(2);
});


it('should wait until "a" equals string "yes". Option 1', async () => {
    expect.assertions(1);

    let a = 'no';

    setTimeout(() => a = 'yes', 1000);

    await wait.until().a(() => a).equals('yes');

    expect(a).toBe('yes');
});


it('should wait until "a" equals string "yes". Option 2', async () => {
    expect.assertions(1);

    let a = 'no';

    setTimeout(() => a = 'yes', 1000);

    await wait.until().equals(() => a, 'yes');

    expect(a).toBe('yes');
});


it('should wait until "a" equals string "yes". Option 3', async () => {
    expect.assertions(1);

    let a = 'no';

    setTimeout(() => a = 'yes', 1000);

    await wait.until().a(() => a).equals().b('yes');

    expect(a).toBe('yes');
});


it('should wait until function throws error. Option 1', async () => {
    expect.assertions(1);

    let max = 20;

    const some_function = async () => {
        if (--max === 0) {
            throw new Error('Some error');
        }

        await wait.for(100);
    };

    await expect(wait.until().error(some_function)).resolves.toBe(true);
});


it('should wait until function throws error. Option 2', async () => {
    expect.assertions(1);

    let max = 20;

    const some_function = async () => {
        if (--max === 0) {
            throw new Error('Some error');
        }

        await wait.for(100);
    };

    await expect(wait.until().a(some_function).error()).resolves.toBe(true);
});


it('should wait until function finishes without error. Option 1', async () => {
    expect.assertions(1);

    let max = 20;

    const some_function = async () => {
        if (--max === 0) {
            return 1;
        }

        await wait.for(100);

        throw new Error('Some error');
    };

    await expect(wait.until().noError(some_function)).resolves.toBe(true);
});


it('should wait until function finishes without error. Option 2', async () => {
    expect.assertions(1);

    let max = 20;

    const some_function = async () => {
        if (--max === 0) {
            return 1;
        }

        await wait.for(100);

        throw new Error('Some error');
    };

    await expect(wait.until().a(some_function).noError()).resolves.toBe(true);
});


it('should wait until function returns true. Option 1', async () => {
    expect.assertions(1);

    let a = false;

    setTimeout(() => a = true, 1000);

    await expect(wait.until().isTrue(() => a)).resolves.toBe(true);
});


it('should wait until function returns true. Option 2', async () => {
    expect.assertions(1);

    let a = false;

    setTimeout(() => a = true, 1000);

    await expect(wait.until().a(() => a).isTrue()).resolves.toBe(true);
});


it('should wait until function returns false. Option 1', async () => {
    expect.assertions(1);

    let a = true;

    setTimeout(() => a = false, 1000);

    await expect(wait.until().isFalse(() => a)).resolves.toBe(true);
});


it('should wait until function returns false. Option 2', async () => {
    expect.assertions(1);

    let a = true;

    setTimeout(() => a = false, 1000);

    await expect(wait.until().a(() => a).isFalse()).resolves.toBe(true);
});


it('should wait until custom function returns true.', async () => {
    expect.assertions(1);

    let max = 20;

    const custom_function = async () => {
        if (--max === 0) {
            return true;
        }

        await wait.for(100);

        return false
    };

    await expect(wait.until(custom_function)).resolves.toBe(true);
});

it('should wait 10 times for 200 ms. and throw the error. Option 1', async () => {
    expect.assertions(1);

    let a = 0;

    await expect(wait.until({ attempts: 10, interval: 200 }).a(() => ++a).gt(11)).rejects.toThrow();
});

it('should wait 10 times for 200 ms. and throw the error. Option 2', async () => {
    expect.assertions(1);

    let a = 0;

    await expect(wait.until().attempts(10).interval(200).a(() => ++a).gt(11)).rejects.toThrow();
});



