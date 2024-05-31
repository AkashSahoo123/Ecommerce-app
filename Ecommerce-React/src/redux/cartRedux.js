import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      const index = state.products.findIndex(product => product._id === action.payload);
      if (index !== -1) {
        const removedProduct = state.products[index];
        state.products.splice(index, 1);
        state.quantity -= 1 // Subtracting the removed product's quantity
        state.total -= removedProduct.price * removedProduct.quantity; // Subtracting the removed product's total price
    
        // Ensure quantity and total are not negative
        state.quantity = Math.max(state.quantity, 0);
        state.total = Math.max(state.total, 0);
      }
    }
  },
});

export const { addProduct,removeProduct } = cartSlice.actions;
export default cartSlice.reducer;