import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './feature/cart/cartSlice'

export const Store=configureStore({
    reducer:{
        cart:cartReducer,
    }
})