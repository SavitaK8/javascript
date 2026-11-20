import { cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
// export default so no {}-named import syntax
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { renderPaymentSummary } from "./paymentSummary.js";

const emptyCartHTML =
  '<div class="empty-cart-message">Your cart is empty. <a href="amazon.html">Continue shopping</a></div>';

function deliveryHeading(option) {
  if (!option) return 'Choose a delivery option';
  const date = dayjs().add(option.deliveryDays, 'days').format('dddd, MMMM D');
  return `Delivery date: ${date}`;
}

function deliveryOptionHTML(matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const dateString = dayjs()
      .add(deliveryOption.deliveryDays, 'days')
      .format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)}`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `<div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''}
          autocomplete="off"
          class="delivery-option-input js-delivery-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} - Shipping</div>
        </div>
      </div>`;
  });

  return html;
}

export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const matchingProduct = products.find((p) => p.id === cartItem.productId);
    if (!matchingProduct) return;

    const deliveryOption = deliveryOptions.find((o) => o.id === cartItem.deliveryOptionId);

    cartSummaryHTML += `<div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          ${deliveryHeading(deliveryOption)}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}"
                  type="number" min="1" max="99" value="${cartItem.quantity}">
              </span>
              <span class="update-quantity-link link-primary js-update-link"
                data-product-id="${matchingProduct.id}">Update</span>
              <span class="save-quantity-link link-primary js-save-link"
                data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}"
                data-product-id="${matchingProduct.id}">Delete</span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>`;
  });

  document.querySelector('.js-order-summary').innerHTML =
    cartSummaryHTML || emptyCartHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      removeFromCart(link.dataset.productId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelector(`.js-cart-item-container-${link.dataset.productId}`)
        .classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const newQuantity = Number(
        document.querySelector(`.js-quantity-input-${productId}`).value
      );

      if (!Number.isInteger(newQuantity) || newQuantity < 1 || newQuantity > 99) {
        alert('Quantity must be a whole number from 1 to 99');
        return;
      }

      updateQuantity(productId, newQuantity);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}