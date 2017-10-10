# freestyler-observable

Creates a simple observale object, with the following API:

  - `.get(value)`
  - `.set()`
  - `.sub(listener) => unsub()`

You can add any number of listeners using `.sub()`, it returns and *unsubscribe* method.

```js
import {observable} from 'freestyle-observable';

const obs = observable(1);
console.log(obs.get()); // 1

const listener = (value) => {
    console.log(value); // 2
};
const unsubscribe = obs.sub(listener);

obs.set(2);
console.log(obs.get()); // 2
```
