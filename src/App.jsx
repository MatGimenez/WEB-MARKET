import { useState } from 'react'
import './App.css'
import { CartProvider } from "./cart/CartContext";
import { AppRouter } from "./app/routes/AppRouter";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </>
  )
}

export default App
