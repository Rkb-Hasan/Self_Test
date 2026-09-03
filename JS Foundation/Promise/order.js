const order = document.querySelector("#order");
const succeed = true;
async function getOrderID() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      succeed ? resolve("1") : reject("Could not get orderid");
    }, 100);
  });
}
function getPaymentID(orderID) {
  if (!orderID) return Promise.reject(new Error("Can't get Order ID"));

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      succeed ? resolve("2") : reject("payment failed");
    }, 200);
  });
}

async function notifyRestaurant(confirmedId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`Order Confirmed with id: ${confirmedId}`);
    }, 100);
  });
}

async function confirmOrder(orderId, paymentId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(
        `confirming order for orderid:${orderId} with paymnetid: ${paymentId}`,
      );
      resolve("3");
    });
  });
}
async function createOrder(e) {
  e.target.disabled = true;
  try {
    console.log("Getting orderID");
    const orderId = await getOrderID();
    console.log(`orderID is ${orderId}`);

    console.log("Getting PaymentID");
    const paymentId = await getPaymentID(orderId);
    console.log(`paymentid is ${paymentId}`);

    console.log("Confirming order");
    const confirmedId = await confirmOrder(orderId, paymentId);
    console.log(`confirmedId is ${confirmedId}`);

    console.log("sending Notification to Restaurant");
    const notification = await notifyRestaurant(confirmedId);
    console.log({ notification });
    console.log("Notification succeeds");

    console.log("Order Placed");
    return { orderId, paymentId };
  } catch (error) {
    console.error(error);
  } finally {
    e.target.disabled = false;
  }
}

order.addEventListener("click", createOrder);
