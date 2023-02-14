import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: [],
  },
  reducers: {
    addToCart(state, action) {
      // console.log(action);
      const { product, quanity } = action.payload
      const existingItem = state.value.find(
        ({ product: prod }) => prod.id === prod.id
      )
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.value.push(action.payload)
      }
    },
    removeFromCart(state, action) {
      const { product } = action.payload
      const index = state.value.findIndex(
        ({ product: prod }) => prod.id === prod.id
      )
      if (index > -1) {
        const existingItem = state.value[index]
        if (existingItem.quantity === 1) {
          state.value.splice(index, 1)
        } else {
          existingItem.quantity -= 1
        }
      }
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions
export default cartSlice.reducer
