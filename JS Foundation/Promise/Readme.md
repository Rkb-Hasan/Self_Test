# JavaScript Promises & Asynchronous JavaScript

## 1. Synchronous vs Asynchronous

JavaScript executes synchronous code on the **Call Stack**.

Asynchronous work is handled by the **host environment** (browser/Node.js), and its callback/continuation is later placed into a queue.

Important queues:

- **Microtask Queue** → Promise handlers, `await` continuations
- **Task/Macrotask Queue** → `setTimeout`, DOM events, etc.

Microtasks are processed **after the current synchronous code finishes and before the next task**.

---

## 2. Creating a Promise

```js
const promise = new Promise((resolve, reject) => {
  // executor runs immediately
});
```

The Promise executor runs **synchronously**.

```js
const promise = new Promise((resolve) => {
  console.log("A");
  resolve("Done");
});

console.log("B");
```

Output:

```text
A
B
```

Calling `resolve()` settles the Promise immediately, but `.then()` callbacks run later as microtasks.

---

## 3. Promise States

A Promise has three states:

```text
pending
fulfilled
rejected
```

Once settled:

```text
pending → fulfilled
pending → rejected
```

It cannot change state again.

```js
resolve("Done");
reject("Error"); // ignored
```

---

## 4. `.then()`

```js
promise.then(onFulfilled, onRejected);
```

`.then()` returns a **new Promise**.

```js
const p2 = p1.then((value) => {
  return value + 10;
});
```

The returned value becomes the fulfillment value of the new Promise.

### If handler returns a normal value

```js
return 10;
```

→ new Promise fulfills with `10`.

### If handler returns a Promise

```js
return anotherPromise;
```

→ new Promise waits for `anotherPromise`.

### If handler throws

```js
throw new Error("Failed");
```

→ new Promise becomes rejected.

---

## 5. Promise Chaining

```js
getUser()
  .then((user) => getOrders(user))
  .then((orders) => processOrders(orders))
  .catch((error) => console.log(error));
```

Each `.then()` works with the Promise returned by the previous step.

The chain propagates:

```text
return value
    ↓
fulfilled

throw / rejected Promise
    ↓
rejected
```

---

## 6. `.catch()`

```js
promise.catch((error) => {
  console.log(error);
});
```

Equivalent to:

```js
promise.then(undefined, errorHandler);
```

A `catch()` can **recover** from an error:

```js
.catch(error => {
  console.log(error);
  return "Recovered";
});
```

The next `.then()` receives:

```text
"Recovered"
```

If the catch throws again:

```js
.catch(error => {
  throw error;
});
```

the chain remains rejected.

---

## 7. `.finally()`

Runs regardless of fulfillment or rejection.

```js
promise
  .then(...)
  .catch(...)
  .finally(() => {
    console.log("Finished");
  });
```

Common use:

```text
start loading
    ↓
request
    ↓
success/error
    ↓
finally → stop loading
```

`finally()` normally passes the previous result through.

---

## 8. Promise Combinators

### `Promise.all()`

Waits for **all** Promises.

```js
const results = await Promise.all([getUser(), getOrders(), getProducts()]);
```

- All fulfill → fulfills with array of results
- One rejects → rejects
- Result order follows input order
- Does not cancel the other operations

### `Promise.allSettled()`

Waits for everything.

```js
const results = await Promise.allSettled(promises);
```

Returns:

```js
[
  { status: "fulfilled", value: ... },
  { status: "rejected", reason: ... }
]
```

### `Promise.race()`

Settles when the **first Promise settles**.

```text
first fulfilled OR first rejected
```

### `Promise.any()`

Settles when the **first Promise fulfills**.

If all reject:

```text
AggregateError
```

### Empty array

```js
Promise.all([]);
```

fulfills immediately with:

```js
[];
```

---

# Async / Await

## 9. `async`

An `async` function **always returns a Promise**.

```js
async function getData() {
  return 10;
}
```

Equivalent outcome:

```js
Promise.resolve(10);
```

No explicit return:

```js
async function test() {}
```

→ fulfilled with `undefined`.

If it throws:

```js
async function test() {
  throw new Error("Failed");
}
```

→ returned Promise is rejected.

---

## 10. `await`

```js
const result = await promise;
```

`await`:

1. Evaluates the expression on the right.
2. Pauses the current async function.
3. Lets other JavaScript work continue.
4. Resumes the async function later.
5. The continuation runs as a **microtask**.

Important:

> `await` pauses the async function, not JavaScript itself.

It does **not** make the Promise pending.

```js
const result = await alreadyFulfilledPromise;
```

Even an already-fulfilled Promise causes the async function to resume asynchronously.

---

## 11. `await` + Rejection

```js
try {
  const data = await getData();
} catch (error) {
  console.log(error);
}
```

A rejected Promise awaited with `await` behaves like a `throw` at the await point.

Therefore `try/catch` can catch it.

But this:

```js
try {
  return getData();
} catch (error) {
  // won't catch getData()'s later rejection
}
```

does not catch the asynchronous rejection.

Use:

```js
try {
  return await getData();
} catch (error) {
  // catches rejection
}
```

---

## 12. Sequential vs Concurrent

### Sequential

```js
const user = await getUser();
const orders = await getOrders();
```

`getOrders()` starts only after `getUser()` finishes.

```text
getUser
   ↓
getOrders
```

### Concurrent

```js
const userPromise = getUser();
const ordersPromise = getOrders();

const user = await userPromise;
const orders = await ordersPromise;
```

Both operations start before either is awaited.

Usually cleaner:

```js
const [user, orders] = await Promise.all([getUser(), getOrders()]);
```

---

## 13. `forEach()` + async

This does **not** wait:

```js
await items.forEach(async (item) => {
  await process(item);
});
```

`forEach()` does not use the Promises returned by the async callback.

### Sequential processing

```js
for (const item of items) {
  await process(item);
}
```

### Concurrent processing

```js
await Promise.all(items.map((item) => process(item)));
```

Remember:

```text
forEach → doesn't wait
map → creates an array of returned values/Promises
Promise.all → waits for those Promises
```

---

## 14. `try/catch` and Promises

`try/catch` catches:

```js
throw new Error("Error");
```

and:

```js
await rejectedPromise;
```

But not an unhandled asynchronous rejection simply because the Promise was created inside `try`.

```js
try {
  Promise.reject("Error");
} catch (error) {
  // doesn't run
}
```

---

## 15. Event Loop Mental Model

For:

```js
console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");
```

Order:

```text
A
D
C
B
```

Why:

```text
Synchronous code
    ↓
Microtasks
    ↓
Tasks / timers
```

Promise callbacks and `await` continuations have priority over timers once the current synchronous work finishes.

---

## 16. Real-world Async Flow

Typical application flow:

```text
User action
    ↓
Start async operation
    ↓
API request
    ↓
await response
    ↓
process result
    ↓
success
    ↓
finally → cleanup
```

Example:

```js
async function createOrder() {
  try {
    const orderId = await getOrderID();
    const paymentId = await getPaymentID(orderId);
    const confirmedId = await confirmOrder(paymentId);

    await notifyRestaurant(confirmedId);
  } catch (error) {
    console.error(error);
  } finally {
    enableButton();
  }
}
```

---

# Final Mental Model

When revising, remember this order:

```text
Promise
  ↓
Promise states
  ↓
then()
  ↓
Promise chaining
  ↓
catch()
  ↓
finally()
  ↓
Promise.all / allSettled / race / any
  ↓
async
  ↓
await
  ↓
await + try/catch
  ↓
sequential vs concurrent
  ↓
forEach vs map + Promise.all
  ↓
Microtask Queue
  ↓
Event Loop
```

### Most important rules

```text
Promise executor → synchronous

.then/.catch/.finally → microtasks

async function → always returns Promise

await → pauses only the current async function

await continuation → microtask

await rejected Promise → throws at await point

Promise.all → concurrent start + wait for all

forEach → doesn't wait for async callbacks

map → returns an array of callback results

Promise.all(map(...)) → wait for all async operations
```
