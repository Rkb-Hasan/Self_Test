// 1
const products = [
  { name: "iPhone 15", category: "phone", price: 900, stock: 5 },
  { name: "Galaxy S24", category: "phone", price: 850, stock: 0 },
  { name: "MacBook Air", category: "laptop", price: 1200, stock: 3 },
  { name: "Dell XPS", category: "laptop", price: 1100, stock: 7 },
  { name: "AirPods", category: "accessory", price: 200, stock: 15 },
];

// A customer wants to see only products that are currently in stock.
// Create a new array containing their names.

const inStocks = products
  .filter((product) => product.stock > 0)
  .map((inStock) => inStock.name);
console.log(inStocks);

// 3
const employees = [
  { name: "Rahim", salary: 40000, experience: 3 },
  { name: "Karim", salary: 55000, experience: 5 },
  { name: "Hasan", salary: 35000, experience: 2 },
  { name: "Nabil", salary: 70000, experience: 7 },
  { name: "Sakib", salary: 45000, experience: 4 },
];
// Your company wants to know who is eligible for a salary bonus.
// An employee qualifies if:
// They have at least 4 years of experience
// AND their salary is less than 60,000
// Create an array containing the names of all qualifying employees.

const quilifieds = employees
  .filter((employee) => employee.experience >= 4 && employee.salary < 60000)
  .map((quilified) => quilified.name);
console.log(quilifieds);

// 4
const orders = [
  { id: 101, customer: "Rahim", status: "delivered", total: 1200 },
  { id: 102, customer: "Karim", status: "pending", total: 800 },
  { id: 103, customer: "Hasan", status: "shipped", total: 2500 },
  { id: 104, customer: "Nabil", status: "delivered", total: 600 },
  { id: 105, customer: "Sakib", status: "cancelled", total: 1500 },
];

// A customer provides order ID 103.

// Find that order and print:
// Customer: Hasan
// Status: shipped
// Total: 2500

function printOrder(orders, orderId) {
  let text = "";
  const requestedOrder = orders?.find(
    (order) => order.id === parseFloat(orderId),
  );

  if (requestedOrder) {
    Object.keys(requestedOrder).forEach((key) => {
      if (key === "id") return;
      text += `${key}: ${requestedOrder[key]} \n`;
    });
  } else {
    text = `Order with ${orderId} not found!`;
  }
  return text;
}

console.log(printOrder(orders, 103));

// 5
const expenses = [
  { title: "Lunch", category: "food", amount: 250 },
  { title: "Bus", category: "transport", amount: 80 },
  { title: "Dinner", category: "food", amount: 400 },
  { title: "Uber", category: "transport", amount: 350 },
  { title: "Movie", category: "entertainment", amount: 500 },
  { title: "Coffee", category: "food", amount: 150 },
];

// Calculate how much was spent on food only.

const foodExpense = expenses
  .filter((expense) => expense.category === "food")
  .reduce((total, expense) => total + expense.amount, 0);

console.log(foodExpense);
