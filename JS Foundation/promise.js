// A. A Promise that immediately succeeds with "Success".

// B. A Promise that immediately fails with "Failed".

// C. A Promise that starts as pending and doesn't resolve or reject.

// const promiseA = new Promise((resolve, reject) => {
//   resolve("success");
// });
// console.log(promiseA);
// const promiseB = new Promise((resolve, reject) => {
//   reject("Failed");
// });
// console.log(promiseB);
// const promiseC = new Promise((resolve, reject) => {});
// console.log(promiseC);
// console.log("1");

// setTimeout(() => {
//   console.log("2");
// }, 0);

// Promise.resolve().then(() => {
//   console.log("3");

//   setTimeout(() => {
//     console.log("4");
//   }, 0);
// });

// Promise.resolve().then(() => {
//   console.log("5");
// });

// console.log("6");

// -------------------

const p1 = Promise.resolve("A");

const p2 = p1.then(() => {
  const innerPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("B");
    }, 5000);
  });
  console.log(innerPromise);
  return innerPromise;
});
console.log(p2);
p2.then((value) => {
  console.log(value);
});

// What is p1's state?
// What does the first .then() callback return?
// What is p2 doing while the 1-second timer runs?
// What does the final .then() receive?

// fulfilled
// returns a promise
// its in pending and waiting the p1 to be fulfilled
// final .then recvs the .then value whic adopts the innerpromise's value

// exec
// js sees a promise with resoleve and immediately fulfills the promise with value A (sync)
// .then() returns a promise immediately (sync) with pending state
// the promise starts with pending state
// js moves fwd
// p2 is pending and p2.then() again returns a promise with pending(sync)

// sync code finish

// since p1 fulfilled  and call stack empty p1.then() callback goes to stack through microtask queue
// a new innerPromise created with pending state
// settimeout comes to the stack register timer
// the timer is ticking (async)
// js moves fwd
// console(innerPromise) pending promise
// return innerPromise with pending which adopted by p2
// timer finishes
// setTimeout callback comes to callback queue
// inside the resolve ()
// now the stack is ()=>{} >> resolve()
// where this resolved value go?
// the resolved value fulfills the innerPromise of the p1.then() callback with the value "B"
// the first p1.then promise AKA p2 adopts the innerPromise's state and value
// if the the innerPromise pending p1.then() AKA p2 promise also pending
// only when innerPromise fulfilled or rejected p1.then promise also adopts the state value of the innerPromise
// p1.then() returns a promise not a value that adopts directly the innerPromise
// thus p2.then() callback executes when the innerPromise is resolved with a value and the p1.then() promise adopts the state and value
