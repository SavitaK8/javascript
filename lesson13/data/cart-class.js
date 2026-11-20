class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(`${this.#localStorageKey}`)) || [];
  }

  saveToStorage() {
    localStorage.setItem(`${this.#localStorageKey}`, JSON.stringify(this.cartItems));
  }

  addToCart(productId, quantity = 1) {
    const matchingItem = this.cartItems.find((cartItem) => cartItem.productId === productId);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({ productId, quantity, deliveryOptionId: '1' });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.productId !== productId);
    this.saveToStorage();
  }

  updateQuantity(productId, newQuantity) {
    const matchingItem = this.cartItems.find((item) => item.productId === productId);
    if (matchingItem) {
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    }
  }

  updateDeliveryOption(productId, deliveryOptionId) {

    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if(productId == cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (!matchingItem) return;

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart');

console.log(cart);
console.log(businessCart);  