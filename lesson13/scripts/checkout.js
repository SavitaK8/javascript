import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
// export default so no {}-named import syntax
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js"

let cartSummaryHTML = "";

function deliveryHeading(option) {
  if (!option) return 'Choose a delivery option';
  const date = dayjs().add(option.deliveryDays, 'days').format('dddd, MMMM D');
  return `Delivery date: ${date}`;
}

cart.forEach((cartItem) => {

  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  if (!matchingProduct) return; 

  const deliveryOption = deliveryOptions.find((o) => o.id === cartItem.deliveryOptionId);
  

  cartSummaryHTML += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          ${deliveryHeading(deliveryOption)}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}"
                  type="number" min="1" max="99" value="${cartItem.quantity}">
              </span>
              <span class="update-quantity-link link-primary js-update-link"
                data-product-id="${matchingProduct.id}">Update</span>
              <span class="save-quantity-link link-primary js-save-link"
                data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link"
                data-product-id="${matchingProduct.id}">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>`
});

function deliveryOptionHTML(matchingProduct, cartItem) {

  let html = '';
  deliveryOptions.forEach((deliveryOption) => {

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)}`; 
    
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `<div class="delivery-option js-delivery-option"
    data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        
        
        <input type="radio" ${isChecked ? 'checked' : ''}
          autocomplete="off"
          class="delivery-option-input js-delivery-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
     </div>`
  });

  return html;
}

function updatePaymentSummary() {
  let itemsCents = 0;
  let shippingCents = 0;
  let quantity = 0;

  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    if (!product) return;

    const option = deliveryOptions.find((o) => o.id === cartItem.deliveryOptionId);

    itemsCents += product.priceCents * cartItem.quantity;
    shippingCents += option ? option.priceCents : 0;
    quantity += cartItem.quantity;

  });

  const beforeTaxCents = itemsCents + shippingCents;
  const taxCents = Math.round(beforeTaxCents * 0.1);
  const totalCents = beforeTaxCents + taxCents;

  document.querySelector('.js-return-to-home-link').innerHTML =
    `${quantity} ${quantity === 1 ? 'item' : 'items'}`;
  document.querySelector('.js-items-label').innerHTML = `Items (${quantity}):`;
  document.querySelector('.js-items-total').innerHTML = `$${formatCurrency(itemsCents)}`;
  document.querySelector('.js-shipping-total').innerHTML = `$${formatCurrency(shippingCents)}`;
  document.querySelector('.js-subtotal').innerHTML = `$${formatCurrency(beforeTaxCents)}`;
  document.querySelector('.js-tax').innerHTML = `$${formatCurrency(taxCents)}`;
  document.querySelector('.js-total').innerHTML = `$${formatCurrency(totalCents)}`;
}

const emptyCartHTML ='<div class="empty-cart-message">Your cart is empty. <a href="amazon.html">Continue shopping</a></div>';
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML || emptyCartHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    updatePaymentSummary();
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    if (cart.length === 0) {
    document.querySelector('.js-order-summary').innerHTML = emptyCartHTML;
    }
    
  });
});

document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    document.querySelector(`.js-cart-item-container-${productId}`)
      .classList.add('is-editing-quantity');
  });
});

document.querySelectorAll('.js-save-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    const input = document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity = Number(input.value);

    if (!Number.isInteger(newQuantity) || newQuantity < 1 || newQuantity > 99) {
      alert('Quantity must be a whole number from 1 to 99');
      return;
    }

    updateQuantity(productId, newQuantity);
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
    document.querySelector(`.js-cart-item-container-${productId}`)
      .classList.remove('is-editing-quantity');
    updatePaymentSummary();
  });
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);

    element.querySelector('.js-delivery-input').checked = true;

    const option = deliveryOptions.find((o) => o.id === deliveryOptionId);
    document.querySelector(`.js-cart-item-container-${productId} .delivery-date`)
      .innerHTML = deliveryHeading(option);

    updatePaymentSummary();
  });
});

updatePaymentSummary();

