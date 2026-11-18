export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
} 

export function addToCart(productId, quantity=1) {

  let matchingItem;

    cart.forEach((cartItem) => {
      if(productId == cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if(matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId : productId,
        quantity : quantity
      });
    }

    saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();

  if (cart.length === 0) {
  document.querySelector('.js-order-summary').innerHTML =
    '<div class="empty-cart-message">Your cart is empty. <a href="amazon.html">Continue shopping</a></div>';
  }
}

export function updateQuantity(productId, newQuantity) {
  const matchingItem = cart.find((item) => item.productId === productId);
  if (matchingItem) {
    matchingItem.quantity = newQuantity;
    saveToStorage();
  }
}