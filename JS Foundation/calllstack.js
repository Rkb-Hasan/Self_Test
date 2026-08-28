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

hello();
