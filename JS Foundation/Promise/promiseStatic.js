// ---------------------------------------------------------------
// all
// → ALL must succeed (all resolve)

// allSettled
// → ALL must finish (reject or resolve)

// race
// → FIRST to finish wins (reject or resolve)

// any
// → FIRST success wins (First resolve)
// ----------------------------------------------------------------

// Promise.all()---------------------------------
// const p1 = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log("300ms passed");
//     console.log("p1 finished");
//     resolve("A");
//   }, 300);
// });

// const p2 = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log("100ms passed");
//     console.log("p2 finished");
//     resolve("B");
//   }, 100);
// });

// const p3 = new Promise((resolve) => {
//   setTimeout(resolve, 200, "C");
// });

// const all = Promise.all([p1, p2, p3]);

// all.then((values) => {
//   console.log("ALL:", values);
// });
// console.log(all);
// console.log("END");

// Promise.allSettled()-------------------------------------------------------------------------------------------------
// Promise.allSettled()
// This exists because Promise.all() has a limitation: // Fulfill only if ALL fulfill. Reject as soon as ANY rejects

// Promise.allSettled() is different: // Wait until ALL inputs have finished, regardless of whether they fulfilled or rejected.

// Promise.all()
// → wait for all to fulfill
// → reject early if one rejects

// Promise.allSettled()
// → wait for all to settle
// → always fulfills (never rejects)

// const p1 = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log("A finished");
//     resolve("A");
//   }, 300);
// });

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("B finished");
//     reject("B failed");
//   }, 100);
// });

// const p3 = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log("C finished");
//     resolve("C");
//   }, 200);
// });

// const result = Promise.allSettled([p1, p2, p3]);

// result.then((values) => {
//   console.log("RESULT:", values);
// });

// console.log("END");

// Exact output order.
// What is result's initial state?
// Does result reject when p2 rejects?
// When does result settle?
// What exact array does values receive?
// Is the array in completion order or input order?

// OP: "END">>B failed>>"C finished">>A Finished>>("RESULT:", [ { status: "fulfilled", value: "A" },{ status: "rejected", reason: "B failed" },{ status: "fulfilled", value: "C" }]);
// Result init state is pending
// Result doesnt reject when p reject
// result settle after the last timer exec(p1)
// [ { status: "fulfilled", value: "A" },{ status: "rejected", reason: "B failed" },{ status: "fulfilled", value: "C" } instead of the exec the values are recvd in input order
// Unlike the .all() which gives resolved val or reject reason of promises .allSettled() gives an array of objects with state and val for each promise
// the values is always in input order

// Promise.race() -----------------------------------------------------------------------------------------------------
// Whichever input Promise settles (either fulfilled or reject) first determines the result of the race Promise.
// Promise.all()
// → wait for ALL
// → one rejection can make it reject
// returns a promise with a value of an array of fulfilled values according to the i/p order or a rejected promise with the reason

// Promise.allSettled()
// → wait for ALL
// → always fulfills with result objects in an array accord to the i/p order

// Promise.race()
// → wait for FIRST settlement
// → first fulfillment OR rejection wins
// returns the promise that wins

// const p1 = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log("A");
//     resolve("A");
//   }, 300);
// });

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("B");
//     reject("B failed");
//   }, 100);
// });

// const p3 = new Promise((resolve) => {
//   setTimeout(() => {
//     console.log("C");
//     resolve("C");
//   }, 200);
// });

// const result = Promise.race([p1, p2, p3]);

// result
//   .then((value) => {
//     console.log("SUCCESS:", value);
//   })
//   .catch((error) => {
//     console.log("ERROR:", error);
//   });

// console.log("END");

// OP: "END">>B>>("ERROR:", "B failed")>>C>>A
// Inital state of result is pending
// Sync code finishes all the promises including result started with pending
// three timers registered
// p2 finised first goes to the stack
// p2 rejecetd
// result promise rejected and reason is B failed as the p2 wins the race
// prinst the error
// Other promise fulfilled according to when their timers become ready, not their registration order.

// race() cares about settlement time, not whether the winner fulfills or rejects.

// Promise.any()--------------------------------------------------------------
// the first promise that fulfills
// a race between the  fulfilled promises
// rejected promises skipped

// if all the promises rejected?
// The result becomes: // rejected // with an AggregateError containing all the rejection reasons.
// so there is only one case any() will be rejected and that is reject of all the i/p promises.

// race() vs any()
// race(): // first to settle// fulfilled OR rejected
// any(): //first to fulfill //fulfilled

// So a rejection does not make Promise.any() reject immediately

// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("A");
//     reject("A failed");
//   }, 100);
// });

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("B");
//     reject("B failed");
//   }, 200);
// });

// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("C");
//     reject("C");
//   }, 300);
// });

// const result = Promise.any([p1, p2, p3]);

// result
//   .then((value) => {
//     console.log("SUCCESS:", value);
//   })
//   .catch((error) => {
//     console.log("ERROR:", error);
//   });

// console.log("END");

// OP: "END">>A>>"B">>"C">>("SUCCESS:", "C")
// although the rejected promise exec earlier the p3 promise wins because of its fulfilled state
