import * as wait from './';

(async function () {
    let a = 0;

    let start = Date.now();

    await wait.until({ attempts: 10, interval: 200 }).a(() => { console.log(a); return ++a; }).gt(11);

    console.log(Date.now() - start);
})();
