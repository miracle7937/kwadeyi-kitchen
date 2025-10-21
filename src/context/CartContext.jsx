import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

const CART_STORAGE_KEY = 'kwadeyi_kitchen_cart'

export function CartProvider({ children }) {
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
      return []
    }
  })
  
  const [showCart, setShowCart] = useState(false)

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [cartItems])

  const addToCart = (item) => {
    setCartItems(prev => [...prev, { ...item, id: Date.now() }])
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem(CART_STORAGE_KEY)
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.estimatedPrice || 0), 0)
  }

  const getCartCount = () => {
    return cartItems.length
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      getCartTotal,
      getCartCount,
      showCart,
      setShowCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}


