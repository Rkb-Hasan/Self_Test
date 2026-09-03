const users = [
  { id: 1, name: "Rakib" },
  { id: 2, name: "Hasan" },
  { id: 3, name: "Karim" },
];

const orders = [
  { id: 101, userId: 1, product: "Laptop" },
  { id: 102, userId: 1, product: "Mouse" },
  { id: 103, userId: 2, product: "Keyboard" },
];

// getUser() should find the user by userId.
// getOrders() should find all orders belonging to that user.
// Both functions must use a callback to return their result.
// Don't use Promises or async/await.
// For now, make them synchronous. We're testing your callback understanding first.

// getUser(1, (user) => {
//   getOrders(user, (orders) => {
//     console.log(orders);
//   });
// });

// function printOrders(orders) {
//   console.log(orders);
// }

// function getUser(id, callback) {
//   setTimeout(() => {
//     const user = users.find((user) => user.id === id);

//     callback(user);
//   }, 1000);
// }

// function getOrders(user, callback) {
//   setTimeout(() => {
//     const userOrders = orders.filter((order) => order.userId === user.id);

//     callback(userOrders);
//   }, 1000);
// }

// getUser(1, (man) => {
//   getOrders(man, (manOrders) => {
//     printOrders(manOrders);
//   });
// });
