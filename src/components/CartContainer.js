import CartItem from "./CartItem"
import { useSelector,useDispatch } from "react-redux"
import { clearCart } from "../feature/cart/cartSlice";
import { OpenModal } from "../feature/modal/modalSlice";

const CartContainer = () => {
    const dispatch=useDispatch();
    const {cartItems,total,amount}=useSelector((state)=>state.cart);

    if(amount<1){
        return (
            <section className="cart">
                {/* car header */}
                <header>
                    <h2>your bag</h2>
                    <h4 className="empt-cart">is currently empty</h4>
                </header>
            </section>
          );
    }else{
    return(
        <section className="cart">
            {/* cart header */}
            <header>
                <h2>Your Bag</h2>
            </header>
            {/* cart Items */}
            <div>
                {cartItems.map((item)=>{
                    // console.log(item.title)
                    // console.log(item)
                    return <CartItem key={item.id} {...item}/>
                    })}
            </div>
            {/* cart footer */}
            <footer>
                <hr/>
                <div className="cart-total">
                    <h4>
                        total <span>${total.toFixed(2)}</span>
                    </h4>
                </div>
                <button 
                className="btn clear-btn"
                onClick={()=>{
                    dispatch(OpenModal());
                }}>
                    Clear Cart
                </button>
            </footer>
        </section>
    ) 
}

}


export default CartContainer;