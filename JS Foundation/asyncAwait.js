async function getUser() {
  return "Rakib";
}

console.log("1");

const result = getUser();

console.log("2", result);

result.then((value) => {
  console.log("3", value);
});

console.log("4");
