import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
// import cartItems from '../../cartItems';

const url='https://course-api.com/react-useReducer-cart-project'

const initialState={
    cartItems:[],
    amount:0,
    total:0,
    isLoading:true,
}

export const getCartItems=createAsyncThunk(
    'cart/getCartItems',
    // ()=>{
    //     return fetch(url)
    //     .then(res=>res.json())
    //     .catch((err)=>console.log(err));
    // }
    async ()=>{
            try {
                const res = await fetch(url);
                return await res.json();//this will be stored in action.paylaod of the fulfilled lifecycle function in the extra reducers
            } catch (err) {
                return console.log(err);
            }
        }
        )
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
            const cartItem=state.cartItems.find((item)=>item.id===payload.id);
            cartItem.amount=cartItem.amount + 1;
            //This code finds the cart item with the specified id passed in as the payload of the increase action, increments its amount property by one, and then updates the state.
            //First, state.cartItems.find((item) => item.id === payload.id) is used to find the cart item object with the matching id. The find method searches the state.cartItems array and returns the first item that satisfies the condition specified in the callback function, which in this case is the id of the cart item matching the payload.id.
            //The found cart item object is assigned to a new constant cartItem. Then, its amount property is incremented by one using the += operator, which adds 1 to the current amount value. This increases the quantity of the item in the cart.
            //Finally, the state object is updated immutably by creating a new cartItems array with the updated cart item object, and returning a new state object that replaces the cartItems property with this new array. This updated state object will be used to render the updated state in the React components subscribed to the store.
        },
        decrease:(state,{payload})=>{
            const cartItem=state.cartItems.find((item)=>item.id===payload.id);
            cartItem.amount=cartItem.amount - 1;
        },
        calculateTotals:(state)=>{
            let amount=0;
            let total=0;
            state.cartItems.forEach((item)=>{
                amount+=item.amount;
                total+=item.amount*item.price;
            });
            state.amount=amount;
            state.total=total;
            //The calculateTotals reducer function is a Redux Toolkit reducer defined in the cartSlice slice. This function calculates the total quantity and total price of all items in the cart, and then updates the amount and total properties of the state object with these values.
            //First, two variables are declared and initialized to 0 - amount and total. These variables will be used to calculate the total quantity and price of all items in the cart.
            //Then, a forEach loop is used to iterate through the state.cartItems array. For each item in the array, the amount variable is incremented by the amount property of the item, and the total variable is incremented by the product of the total and price properties of the item.
            //After the loop completes, the amount and total variables represent the total quantity and price of all items in the cart, respectively. Then, the state.amount and state.total properties are updated with these values, respectively, to reflect the updated total quantity and price in the Redux store.
        },
    },
    extraReducers:{
        [getCartItems.pending]:(state,action)=>{
            state.isLoading=true;
        },
        [getCartItems.fulfilled]:(state,action)=>{
            console.log(action)
            state.isLoading=false;
            state.cartItems=action.payload; //res.json() or data in a array of javascript object notation is located here 
        },
        [getCartItems.rejected]:(state,action)=>{
            state.isLoading=false;
        },
    },
})

// console.log(cartSlice);

export const {clearCart,removeItem,increase,decrease,calculateTotals}=cartSlice.actions
export default cartSlice.reducer;