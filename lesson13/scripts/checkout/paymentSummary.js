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

  document.querySelector('.js-return-to-home-link').innerHTML =
    `${quantity} ${quantity === 1 ? 'item' : 'items'}`;
  document.querySelector('.js-items-label').innerHTML = `Items (${quantity}):`;
  document.querySelector('.js-items-total').innerHTML = `$${formatCurrency(itemsCents)}`;
  document.querySelector('.js-shipping-total').innerHTML = `$${formatCurrency(shippingCents)}`;
  document.querySelector('.js-subtotal').innerHTML = `$${formatCurrency(beforeTaxCents)}`;
  document.querySelector('.js-tax').innerHTML = `$${formatCurrency(taxCents)}`;
  document.querySelector('.js-total').innerHTML = `$${formatCurrency(totalCents)}`;
}