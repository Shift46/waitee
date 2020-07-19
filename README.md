#### Description

Small library to manage moments when you need to wait something to happen. So you don't need to write wait-events by yourself. 

#### Install

```npm install waitee```

or 

```yarn install waitee```

#### Options

```
for - how long to wait for some event to happen in ms. Zero means to wait for unlimited time. (default Infinity)
attempts - how many attempts to do before throwing the error. Zero means unlimited attempts. (default Infinity)
interval - how often to check the event in ms. (default 100 ms.)
a - variable 'a', see examples (default null)
b - variable 'b', see examples (default null)
noerror - when time passed in 'for' option was over or all attempts were done, doesn't throw the error. Instead it will return ```false``` when wait-function finishes without success condition. (default false)
```

You can pass options using 2 ways:

```javascript
const wait = require('waitee');

(async function example() {
    await wait.until({
                for: 10000, // 10 seconds
                interval: 500, // every 500 ms.
                a: some_variable
            })
            .updates();
})();
```

or 

```javascript
const wait = require('waitee');

(async function example() {
    await wait.until()
            .for(10000)
            .interval(500)
            .a(some_variable)
            .updates();
})();
```

#### Examples

##### Wait for 2000 ms.

```javascript
const wait = require('waitee');

(async function example() {
    await wait.for(2000);
})();
```

##### Basic wait for some function to return true

```javascript
const wait = require('waitee');

(async function example() {
    let max = 20;

    const custom_function = async () => {
        if (--max === 0) {
            return true;
        }

        await wait.for(100);

        return false
    };

    await wait.until(custom_function)
})();
```

In such case you can pass options like this

```javascript
const wait = require('waitee');

(async function example() {
    let max = 20;

    const custom_function = async () => {
        if (--max === 0) {
            return true;
        }

        await wait.for(100);

        return false
    };

    await wait.until(custom_function, { attempts: 100 });
})();
```

##### Wait until new element appears in dom using selenium-webdriver.

```javascript
const wait = require('waitee');

(async function example() {
    // Driver initialization

    let elements = await driver.findElements(By.css('td'));

    await wait.until()
        .a(async () => (await driver.findElements(By.css('td'))).length)
        .greater(elements.length);
})();
```

You can call this function with 4 ways.

<table>
<tr>
<td>
       
```javascript
await wait.until()
        .a(async () => (await driver.findElements(By.css('td'))).length)
        .greater(elements.length);
```
</td>   
</tr> 
<tr>
<td align="center"> equals </td>  
</tr>  
<tr> 
<td>
       
```javascript
await wait.until()
        .a(async () => (await driver.findElements(By.css('td'))).length)
        .greater()
        .b(elements.length);
```
</td>
</tr>
<tr>
<td align="center"> equals </td>  
</tr>  
<tr> 
<td>
       
```javascript
await wait.until()
        .greater(async () => (await driver.findElements(By.css('td'))).length, elements.length);
```
</td>
</tr>
<tr>
<td align="center"> equals </td>  
</tr>  
<tr> 
<td>
       
```javascript
await wait.until({
            a: async () => (await driver.findElements(By.css('td'))).length,
            b: elements.length
        })
        .greater();
```
</td>
</tr>
</table>

These methods work for all wait events.

##### Wait until variable updates. 
It uses [fast-clone](https://www.npmjs.com/package/fast-clone) and [fast-equals](https://www.npmjs.com/package/fast-equals) to compare old result with the new one.

```javascript
const wait = require('waitee');

(async function example() {
    let a = {
        value: 1   
    };
    
    setTimeout(() => a.value = 2, 2000);

    await wait.until()
        .a(a)
        .updates();
})();
```

<table>
<tr>
<td>
       
```javascript
await wait.until()
          .a(a)
          .updates();
```
</td>    
<td> equals </td>    
<td>
       
```javascript
await wait.until()
          .updates(a);
```
</td>    
<td> equals </td>    
<td>
       
```javascript
await wait.until({ a: a })
          .updates();
```
</td>
</tr>
</table>

You can find more examples in tests folder.

#### TBD

 1. Update README (fix eng. mistakes, add more examples)
