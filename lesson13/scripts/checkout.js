import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js'
// import '../data/backend-practice.js  '

Promise.all([new Promise((resolve) => {
  console.log('start promise');
  loadProducts(() => {
    resolve();
  });
})]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
