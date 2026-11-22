import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { fetchProducts } from "../data/products.js";
// import '../data/cart-class.js'
// import '../data/backend-practice.js  '

Promise.all([
  fetchProducts()
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
