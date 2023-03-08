import './App.css';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';

function App() {
  return (
    <div className="App">
      <main>
        <Navbar/>
        <CartContainer/>
      </main>
    </div>
  );
}

export default App;
