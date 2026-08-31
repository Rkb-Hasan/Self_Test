const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("300ms passed");
    console.log("p1 finished");
    resolve("A");
  }, 300);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("100ms passed");
    console.log("p2 finished");
    resolve("B");
  }, 100);
});

const p3 = new Promise((resolve) => {
  setTimeout(resolve, 200, "C");
});

const all = Promise.all([p1, p2, p3]);

all.then((values) => {
  console.log("ALL:", values);
});
console.log(all);
console.log("END");

//
