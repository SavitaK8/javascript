import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { fetchProducts } from "../data/products.js";
// import '../data/cart-class.js'
// import '../data/backend-practice.js'

/*
async function loadPage() {
  console.log('load page');
}

loadPage().then(() => {
  console.log('next step');
});

Promise.all([
  fetchProducts()
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

async function loadPage() {

  // throw 'error1';
  try {
    await fetchProducts();
  } catch(error) {
    console.log('Unexpected error');
  }
  
  renderOrderSummary();
  renderPaymentSummary();

}

loadPage();
