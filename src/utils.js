export function getItemsCount(cartItems) {
  return cartItems.reduce((sum, item) => item.quantity + sum, 0);
}
