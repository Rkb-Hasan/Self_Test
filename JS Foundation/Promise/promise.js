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

// const p1 = Promise.resolve("A");

// const p2 = p1.then(() => {
//   const innerPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("B");
//     }, 5000);
//   });
//   console.log(innerPromise);
//   return innerPromise;
// });
// console.log(p2);
// p2.then((value) => {
//   console.log(value);
// });

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

// gpt test----------------------------------------------------------------------------
// console.log("1");

// const p1 = Promise.resolve("A");
// console.log(p1);
// const p2 = p1.then((value) => {
//   console.log("2", value);

//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log("3");
//       resolve("B");
//     }, 0);
//   });
// });

// console.log("4");

// const p3 = p2.then((value) => {
//   console.log("5", value);
//   return "C";
// });

// p3.then((value) => {
//   console.log("6", value);
// });

// console.log("7");

// op: "1>>4>>7">>("2","A")>>"3">>("5","B")>>("6","C")

// const p = Promise.resolve("A");

// const p2 = p
//   .then((value) => {
//     console.log(value);
//     return "B";
//   })
//   .then((val) => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         console.log(val);
//         reject("failed");
//       }, 200);
//     });
//   })
//   .then((val) => {
//     console.log(val);
//     return "C";
//   })
//   .catch((err) => {
//     console.log(err);
//     return "Default";
//   })
//   .then((val) => {
//     console.log(val);
//   })
//   .finally(() => {
//     console.log("print from final");
//   });

// console.log(p2);

// OP:
// Promise ​<state>: "fulfilled" <value>: undefined
// A
// B
// failed
// Default
// print from final

// the .catch() callback recvs the err and makes the promise state fulfilled from reject weather with a returned val from catch() callback or with undefined if nothing returned ,
// thus the chain continues with a fulfilled state and the returned val from .catch() callback
// .finally() doesnt recv a val or state it just pass through the previues state and val untouched in the chain.

// gpt another tricky-------------------------------------------------------------------------------
// const userPromise = Promise.resolve({ id: 1, name: "Rakib" });

// const dashboardPromise = userPromise
//   .then((user) => {
//     console.log("1:", user.name);

//     return new Promise((resolve) => {
//       setTimeout(() => {
//         console.log("2: orders loaded");

//         resolve([
//           { id: 101, total: 500 },
//           { id: 102, total: 800 },
//         ]);
//       }, 300);
//     });
//   })
//   .then((orders) => {
//     console.log("3:", orders.length);

//     if (orders.length > 1) {
//       throw "Too many orders";
//     }

//     return orders;
//   })
//   .then((orders) => {
//     console.log("4:", orders);
//     return "Dashboard ready";
//   })
//   .catch((error) => {
//     console.log("5:", error);
//     return "Dashboard fallback";
//   })
//   .then((message) => {
//     console.log("6:", message);
//   })
//   .finally(() => {
//     console.log("7: loading finished");
//   });

// console.log("8:", dashboardPromise);

// OP: "8:", <Pending> >> ("1:", Rakib);>> "2: orders loaded">> console.log("3:", 2); >>("5:", Too many orders) >>("6:", Dashboard callback); >> ("7: loading finished") and the first console >> "8:", <fulfilled , undefined> updates now

// at first console.log("8:", dashboardPromise); is pending because the the chain yet not completed because of the timer all .then and catch and finally attached but for the first.then() pending state they can be exec so as the dashboardPromise is pending at first

// userPromise >> fulfilled, { id: 1, name: "Rakib" }
// ↓
// first .then() returned Promise >> fulfilled, [ { id: 101, total: 500 },{ id: 102, total: 800 },]

//       ↓
// second .then() returned Promise rejected, resason:too many orders
//       ↓
// third .then() returned Promise skipped
//       ↓
// .catch() returned Promise fulfilled dashboard fallback
//       ↓
// next .then() returned Promise fulfilled undefined
//       ↓
// .finally() returned Promise  fulfilled undefined

// 2nd.the() promise rejected and 3rd .then() gets skipped

// When .catch() does: return "Dashboard fallback";
// state = fulfilled
// value = "Dashboard fallback"

// dashboardPromise - <fulfilled , undefined>

// exec order : 8,1,2,3,5,6,7
