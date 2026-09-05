const fruits = ["apple", "banana", "mango", "orange", "grape"];
// Do the following:
// Print "mango"
console.log(fruits[2]);
// Change "banana" to "watermelon"
if (fruits.includes("banana")) {
  const index = fruits.findIndex((fruit) => fruit === "banana");
  fruits.splice(index, 1, "watermelon");
}
// Add "pineapple" to the end
fruits.push("pineapple");
// Remove "apple" from the beginning
fruits.shift();
// Print the final array
console.log(fruits);

//
const numbers = [10, 20, 30, 40, 50];
// print every number using:
let len = numbers.length;
// a for loop
const obj = {};
for (let i = 0; i < len; i++) {
  obj[i + 1] = numbers[i];
}
console.log(obj);
// a for...of loop
const newObj = {};
for (const number of numbers) {
  newObj[number] = number;
}
console.log(newObj);

// find the max !use math.max()
const digits = [12, 45, 7, 89, 23, 56];
let max = -Infinity;

for (const digit of digits) {
  if (digit > max) {
    max = digit;
  }
}
console.log(max);

// Create a new array containing only numbers greater than 10.
const nums = [3, 8, 12, 5, 20, 7, 14, 9];

const numsabove10 = nums.filter((num) => num > 10).sort((a, b) => a - b);
console.log(numsabove10);

const numbrs = [2, 4, 6, 8, 10];
// Create a new array where every number is multiplied by 3

const newNum = numbrs.map((num) => num * 3);
console.log(newNum);

const users = [
  { name: "Rahim", age: 17 },
  { name: "Karim", age: 22 },
  { name: "Hasan", age: 19 },
  { name: "Sakib", age: 15 },
  { name: "Nabil", age: 25 },
];

// Create a new array containing only the names of users who are 18 or older

const olderUsers = users
  .filter((user) => user.age >= 18)
  .map((olderUser) => olderUser.name);

console.log(olderUsers);

const nmbers = [1, 2, 3, 2, 4, 1, 5, 3, 6];
// create a new array containing only unique nums
// const uniqueArr = [];

// let length = nmbers.length;
// for (const nmb of nmbers) {
//   if (!uniqueArr.includes(nmb)) {
//     uniqueArr.push(nmb);
//   }
// }

const uniqueArr = nmbers.filter((nmb, index) => {
  return nmbers.indexOf(nmb) === index;
});

console.log(uniqueArr);

const products = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Keyboard", price: 100 },
  { id: 4, name: "Mouse", price: 50 },
];

// Find the product whose id is 3.
console.log(products.find((product) => product.id === 3));

const cart = [
  { name: "Laptop", price: 800, quantity: 1 },
  { name: "Mouse", price: 50, quantity: 2 },
  { name: "Keyboard", price: 100, quantity: 1 },
];

// Calculate the total cost of everything in the cart.
let totalPrice = cart.reduce((total, product) => {
  return total + product.price * product.quantity;
}, 0);
console.log(totalPrice);
