

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
} 

export function addToCart(productId, quantity = 1) {
  const matchingItem = cart.find((cartItem) => cartItem.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity, deliveryOptionId: null });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  saveToStorage();
}

export function updateQuantity(productId, newQuantity) {
  const matchingItem = cart.find((item) => item.productId === productId);
  if (matchingItem) {
    matchingItem.quantity = newQuantity;
    saveToStorage();
  }
}

export function updateDeliveryOption(productId, deliveryOptionId) {

  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId == cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (!matchingItem) return;

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();

};