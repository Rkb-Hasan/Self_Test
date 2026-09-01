// async function getUser() {
//   return "Rakib";
// }
// async function rejectUser() {
//   throw new Error("Failed");
// }

// console.log("1");

// const result = getUser();
// result is fulfilled here with Rakib as value
// console.log("2", result);

// const rejectedResult = rejectUser();
// rejectedResult is rejected here with Failed as reason
// console.log("2", rejectedResult);

// result.then((value) => {
//   console.log("3", value);
// });

// rejectedResult.catch((err) => {
//   console.log(err);
// });

// console.log("4");

// OP: 1>>(2,{fulfilled, Rakib})>>(2,{rejected, Failed})>>4>>(3,Rakib)>>Failed

// the async func exec is not asynchronus, instead its synchronus but assures that the returned func val is always a promise
// async function getUser() {
//   return "Rakib";
// }
// is same as
// function getUser() {
//   return Promise.resolve("Rakib");
// }

// await ----------------------------------------------------
// await keyword pauses the async func execution until the sync code finishes and the promise attached with await resolved or rejected
// The await operator returns the resolved value of a promise, not a promise itself
// lines after the await keyword is also paused, only after the promise resolves these lines continues to be exec in the stack  through microtask
// these lines are made into a unit to move to the microtask rather the whole async func

// Note: the await exec line is sync but the promise must resolved before moving forward if resolved immediately the lines after the await have to wait until sync operation finishes

function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("A");
      resolve("DATA");
    }, 200);
  });
}
let value;
async function test() {
  console.log("B");

  value = await getData();

  console.log("C", value);

  return "DONE";
}
console.log("1");

const p = test();
console.log(p); // pending now after the return DONE line fulfilled with DONE
console.log(value); //undefined now later when promise finish it will be available with val DATA
console.log("2");

p.then((value) => {
  console.log("3", value);
});

console.log("4");

// Exact output order
// When test() starts, which lines execute synchronously?
// At exactly which point does test() pause?
// What is p immediately after test() is called?
// What happens after the 200ms timer finishes?
// Is "C", value executed as a Task or Microtask?
// What does p eventually fulfill with?
// Is the final .then() callback a Task or Microtask?

// OP: 1>>B>>2>>4>>A>>(C, DATA)>>(3,DONE)

// When test() starts the console(B) line and value declaration is performed sync
// test() pauses at the await line with promise returned in pending state
// after test() is called p is a promise with pending state because the async keyword creates a promise synchronusly
// after the 200ms timer finishes await promise fulfilled with a val DATA which assigned inside the variable value
// after that the remaining part of test() func is pushed in microtask for exec
// "C", value executed as a Microtask
// p eventually fulfill with DONE
// final .then() callback is a Microtask
