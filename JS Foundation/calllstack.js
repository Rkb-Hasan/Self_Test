function hiAgain() {
  console.log("hiAgain");
}

function deepInsideHi() {
  console.log("deepInsideHi");
}

function insideHi() {
  deepInsideHi();
  console.log("insideHi");
}

function hi() {
  insideHi();
  console.log("hi");
}

function hello() {
  hi();
  hiAgain();
  console.log("hello");
}

// hello();

// console.log("first");

// setTimeout(() => {
//   console.log("timer");
// }, 1000);

// console.log("second");

// 2ms late
// setTimeout(() => {
//   console.log("init 5000");
// }, 5005);

// function fiveSec() {
//   const start = Date.now();
//   let lastLogged = -1;
//   while (Date.now() - start < 5000) {
//     const diff = Math.floor((Date.now() - start) / 1000);

//     if (diff !== lastLogged) {
//       lastLogged = diff;
//     }
//   }
//   console.log("finish");
// }
// fiveSec();
// stack empty timer finishes goes to stack immediate even if the first set was registered early
// setTimeout(() => {
//   console.log("fin 0");
// }, 0);

// console.log("third after 5s");

// ------------------------------

// console.log("1");

// setTimeout(() => {
//   console.log("2");

//   setTimeout(() => {
//     console.log("3");
//   }, 497);
// }, 0);

// function first() {
//   console.log("4");

//   setTimeout(() => {
//     console.log("5");
//   }, 500);

//   console.log("6");
// }

// first();

// console.log("7");

// "1">>"4 inside first">>"6 inside first" >>"7">>"2 first set">>"5" inside first because it was registered earlier>>"3" deep inside the first

// here first the su=ync codes exec
// inside first sees setTimeout registers a 500ms timer leaves
// sync code finishes
// first registered set with 0ms waiting in call back and moved to stack
// consoles and registers another timer for 495ms
// now if the difference between the registered time of first func set and the exec time of until  1st set and register another set of 495 is greater than 5ms than the first 500ms will report to the queue earlier because 5ms + 495 ==500ms
// but since first func set was registered earlier it will be ready to go to the stack first
// if the the timer 4ms + 495 = 499 <500 this time the deep set wins and report earlier than the firts()

// note the time is variable according to net speed or cache or other thing but the race condition is true

// -------------------------------------------------------
// function first(callback) {
//   console.log("1");

//   setTimeout(() => {
//     console.log("2");
//     callback();
//   }, 0);

//   console.log("3");
// }

// function second() {
//   console.log("4");
// }

// first(second);

// console.log("5");

// hell
