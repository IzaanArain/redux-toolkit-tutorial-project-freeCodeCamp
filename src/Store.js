import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './feature/cart/cartSlice'
import modalReducer from './feature/modal/modalSlice'
export const Store=configureStore({
    reducer:{
        cart:cartReducer,
        modal:modalReducer,
    }
})