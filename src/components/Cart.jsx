import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart({ onCheckout }) {
  const { cartItems, removeFromCart, showCart, setShowCart, getCartTotal, getCartCount } = useCart()

  if (!showCart) return null

  return (
    <AnimatePresence>
      <motion.div
        className="cart-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowCart(false)}
      >
        <motion.div
          className="cart-panel"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cart-header">
            <h2>🛒 Your Cart ({getCartCount()})</h2>
            <button className="close-cart" onClick={() => setShowCart(false)}>✕</button>
          </div>

          <div className="cart-content">
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-icon">🛒</div>
                <p>Your cart is empty</p>
                <button className="continue-shopping" onClick={() => setShowCart(false)}>
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      className="cart-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                    >
                      <div className="item-info">
                        <div className="item-emoji">{item.emoji || '🍽️'}</div>
                        <div className="item-details">
                          <h3>{item.type?.toUpperCase()}</h3>
                          {item.type === 'soup' && (
                            <>
                              <p>{item.soupType} • {item.proteinType}</p>
                              <p><strong>Qty:</strong> {item.litres || 2} litre{(item.litres || 2) > 1 ? 's' : ''}</p>
                              {(item.litres || 2) > 2 && <p className="discount-badge">🎉 5% Discount Applied!</p>}
                            </>
                          )}
                          {item.type === 'protein' && (
                            <p>{item.proteinType?.join(', ')} • {item.preparation}</p>
                          )}
                          {item.type === 'drinks' && (
                            <p>{item.drinkType?.join(', ')} • {item.drinkSize}</p>
                          )}
                          <p className="item-delivery">📅 {item.deliveryDate}</p>
                        </div>
                      </div>
                      <div className="item-actions">
                        <div className="item-price">₦{item.estimatedPrice?.toLocaleString() || '0'}</div>
                        <button
                          className="remove-item"
                          onClick={() => removeFromCart(item.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span className="total-amount">₦{getCartTotal().toLocaleString()}</span>
                  </div>
                  <motion.button
                    className="checkout-btn"
                    onClick={onCheckout}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Proceed to Checkout
                  </motion.button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Cart


