import './App.css';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import { useSelector,useDispatch } from 'react-redux';
import { calculateTotals,getCartItems } from './feature/cart/cartSlice';
import { useEffect } from 'react';
import Modal from './components/Modal';

function App() {
  const {cartItems,isLoading}=useSelector((state)=>state.cart);
  const {isOpen}=useSelector((state)=>state.modal)
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(calculateTotals());
  },[cartItems]);

  useEffect(()=>{
    dispatch(getCartItems())
  },[])

  if(isLoading){
    return(
      <div className='loading'>
        <h1>Loading</h1>
      </div>
    )
  }

  return (
    <div className="App">
      <main>
        {isOpen && <Modal/> }
        <Navbar/>
        <CartContainer/>
      </main>
    </div>
  );
}

export default App;
