import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
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

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items (${quantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(itemsCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(beforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">Place your order</button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

  const headerLink = document.querySelector('.js-return-to-home-link');
  if (headerLink) {
    headerLink.innerHTML = `${quantity} ${quantity === 1 ? 'item' : 'items'}`;
  }
}