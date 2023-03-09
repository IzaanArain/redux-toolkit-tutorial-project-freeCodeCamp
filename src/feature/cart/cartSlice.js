import { createSlice } from "@reduxjs/toolkit";
import cartItems from '../../cartItems';

const initialState={
    cartItems:cartItems,
    amount:4,
    total:0,
    isLoading:true,
}
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        clearCart:(state)=>{
            state.cartItems=[]
            // return {cartItems:[]} will remove all intial state property values
        },
        removeItem:(state,action)=>{
            const itemId=action.payload;
            // console.log(`payload : ${itemId}`)
            // for(let i=0;i<state.amount;i++){
            //     console.log(`state CartItems: ${state.cartItems[i].id}`)
            // }
            // console.log(`state ID: ${state.cartItems[0].id}`)
            state.cartItems=state.cartItems.filter((item)=>item.id!==itemId)
                // state.cartItems.splice(state.cartItems.findIndex((arrow) => arrow.id === itemId), 1);

            //Explaination for line 26 'state.cartItems=state.cartItems.filter((item)=>item.id!==itemId)'
            //the removeItem reducer function of the Redux slice that manages a shopping cart. It updates the cartItems property of the state by removing a cart item from the array that has a specific ID.
            //state.cartItems is the cartItems property of the current state.
            //filter is a method of arrays in JavaScript that creates a new array containing all elements that pass a test. In this case, the test is that the id property of each element in the array is not equal to itemId.
            //The filter method returns a new array that contains all cart items except the one with the specified ID.
            //The new array returned by filter is then assigned to state.cartItems, effectively replacing the old array with the updated one.
        },
        increase:(state,{payload})=>{
            const cartItem=state.cartItems.find((item)=>
            item.id===payload.id);

            console.log(cartItem.id)
            cartItem.amount=cartItem.amount + 1;
        },
        decrease:(state,{payload})=>{
            const cartItem=state.cartItems.find((item)=>
            item.id===payload.id);
            cartItem.amount=cartItem.amount - 1;
        }
    },
})

// console.log(cartSlice);

export const {clearCart,removeItem,increase,decrease}=cartSlice.actions
export default cartSlice.reducer;