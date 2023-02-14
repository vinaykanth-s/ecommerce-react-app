export function getItemsCount(cartItems) {
  return cartItems.reduce((sum, item) => item.quantity + sum, 0)
}

export function getSubtotal(cartItem) {
  console.log({ utils: cartItem })
  return cartItem.reduce(
    (sum, { product, quantity }) => product.price * quantity + sum,
    0
  )
}
