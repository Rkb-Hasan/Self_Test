// const numbers = [1, 2, 3];

// async function process(number) {
//   console.log("START", number);

//   await Promise.resolve();

//   console.log("END", number);
// }

// const OP = numbers.forEach(async (number) => {
//   await process(number);
// });
// console.log(OP); //undefined
// console.log("DONE");

// op: (START, 1)(START, 2)(START, 3) Done  "END", number....
// foreach doesnot wait for the promise to be fulfilled
// it exec the sync codes and doesnt wait for the promise
// after the foreach sync action finished teh async microtask resume

// forEach() vs map() + Promise.all() ----------------------------------------------------------

const numbers = [1, 2, 3];

async function process(number) {
  console.log("START", number);

  await Promise.resolve(number);

  console.log("END", number);

  return number * 10;
}

async function main() {
  const promises = numbers.map((number) => process(number));

  console.log("PROMISES", promises);
  let results;
  try {
    results = await Promise.all(promises);
  } catch (error) {
    console.error(error);
  }

  console.log("RESULTS", results);
  console.log("DONE");
}

main();

// OP: (START, 1)(START, 2)(START, 3) (PROMISES, all with pending) (END....) (RESULTS[10,20,30]) DONE
// unlike foreach map callback just doesnt see the pause and come back
// map callback collects the returned pending promise of process()
// map callback stops at teh await line; recv the pending promise of process()
// after the map() stops theres an array of promises
// .all() recvs the array and wait for all of them to be fulfilled
// if a promise is rejected results is undefined because the rejection happens in await
// which does not trigger the variable assignment instead it gives a throw error
// which does not do variable assignment
// instead it jumps to the catch block because an error is thrown from await
