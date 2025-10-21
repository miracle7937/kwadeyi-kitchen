import { useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'
import SoupForm from './components/SoupForm'
import ProteinForm from './components/ProteinForm'
import DrinksForm from './components/DrinksForm'
import Cart from './components/Cart'
import CheckoutPage from './components/CheckoutPage'
import PriceList from './components/PriceList'
import { useCart } from './context/CartContext'

function App() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [showSoupForm, setShowSoupForm] = useState(false)
  const [showProteinForm, setShowProteinForm] = useState(false)
  const [showDrinksForm, setShowDrinksForm] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showPriceList, setShowPriceList] = useState(false)
  
  const { setShowCart, getCartCount, cartItems, clearCart } = useCart()

  // Replace these with your actual Google Form URLs
  const products = [
    {
      id: 1,
      title: 'Premium Soups',
      description: 'Authentic Nigerian soups made with fresh ingredients. Choose from Egusi, Ogbono, Efo Riro, and more.',
      image: '🍲',
      price: 'From ₦2,500',
      formUrl: 'https://forms.google.com/your-soup-form',
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
      badge: 'Most Popular',
    },
    {
      id: 2,
      title: 'Protein Box',
      description: 'Premium selection of assorted meats and fish. Perfectly seasoned and cooked to perfection.',
      image: '🍖',
      price: 'From ₦3,500',
      formUrl: 'https://forms.google.com/your-protein-form',
      gradient: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      badge: 'Chef Special',
    },
    {
      id: 3,
      title: 'Refreshing Drinks',
      description: 'Fresh juices, smoothies, and traditional beverages to complement your meal perfectly.',
      image: '🥤',
      price: 'From ₦800',
      formUrl: 'https://forms.google.com/your-drinks-form',
      gradient: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)',
      badge: 'Refreshing',
    },
  ]

  const handleOrderClick = (formUrl, productId) => {
    window.scrollTo(0, 0)
    
    if (productId === 1) {
      setShowSoupForm(true)
    } else if (productId === 2) {
      setShowProteinForm(true)
    } else if (productId === 3) {
      setShowDrinksForm(true)
    }
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty! Please add items first.')
      return
    }
    setShowCheckout(true)
    setShowCart(false)
  }

  const handleCheckoutComplete = () => {
    clearCart()
    setShowCheckout(false)
  }

  if (showCheckout) {
    return (
      <CheckoutPage
        cartItems={cartItems}
        onBack={() => setShowCheckout(false)}
        onSubmit={handleCheckoutComplete}
      />
    )
  }

  if (showSoupForm) {
    return <SoupForm onBack={() => setShowSoupForm(false)} />
  }

  if (showProteinForm) {
    return <ProteinForm onBack={() => setShowProteinForm(false)} />
  }

  if (showDrinksForm) {
    return <DrinksForm onBack={() => setShowDrinksForm(false)} />
  }

  return (
    <div className="app">
      {/* Floating Cart Badge - Only show on mobile for easy access */}
      {getCartCount() > 0 && (
        <motion.button
          className="cart-badge mobile-only"
          onClick={() => setShowCart(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          🛒
          <span className="cart-count">{getCartCount()}</span>
        </motion.button>
      )}

      {/* Cart Panel */}
      <Cart onCheckout={handleCheckout} />

      {/* Price List Modal */}
      <PriceList isOpen={showPriceList} onClose={() => setShowPriceList(false)} />

      {/* Navigation */}
      <motion.nav 
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="nav-content">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <img src="/logo-new.jpeg" alt="Harey's Kitchen" className="logo-img" />
            <span className="logo-text">Harey's Kitchen</span>
          </motion.div>
          <div className="nav-links">
            <a href="#menu">Menu</a>
            <button className="nav-link-button" onClick={() => setShowPriceList(true)}>
              💰 Prices
            </button>
            <a href="#contact">Contact</a>
            <motion.button
              className="nav-cart-button"
              onClick={() => setShowCart(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="cart-icon">🛒</span>
              {getCartCount() > 0 && (
                <motion.span 
                  className="nav-cart-count"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={getCartCount()}
                >
                  {getCartCount()}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            🔥 Now Delivering Fresh & Hot
          </motion.div>
          <motion.h2 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Taste the <span className="highlight">Authentic</span>
          </motion.h2>
          <motion.h3 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Nigerian Delicacies
          </motion.h3>
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Made with love, served with comfort.
          </motion.p>
          <motion.p 
            className="hero-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            Experience the rich flavors of home-cooked Nigerian meals, delivered fresh to your doorstep
          </motion.p>
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Menu Items</span>
            </div>
            <div className="stat">
              <span className="stat-number">4.8★</span>
              <span className="stat-label">Rating</span>
            </div>
          </motion.div>
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <button 
              className="cta-button primary"
              onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
            >
              <span>🍽️ Order Now</span>
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => document.getElementById('menu').scrollIntoView({ behavior: 'smooth' })}
            >
              View Menu
            </button>
          </motion.div>
        </motion.div>
        
        <div className="hero-overlay"></div>
        <div className="hero-pattern"></div>
        <div className="floating-emoji emoji-1">🌶️</div>
        <div className="floating-emoji emoji-2">🍲</div>
        <div className="floating-emoji emoji-3">🥘</div>
        <div className="floating-emoji emoji-4">🍗</div>
        <div className="floating-emoji emoji-5">🥗</div>
        <div className="floating-emoji emoji-6">🍛</div>
      </section>

      {/* Products Section */}
      <section id="menu" className="products-section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Our Menu</h2>
          <p className="section-subtitle">Choose your favorite and place your order</p>
        </motion.div>

        <div className="products-grid">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="product-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              onHoverStart={() => setHoveredCard(product.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div className="card-background" style={{ background: product.gradient }}></div>
              <div className="product-badge">{product.badge}</div>
              
              <div className="card-content">
                <motion.div 
                  className="product-emoji"
                  animate={{ 
                    scale: hoveredCard === product.id ? [1, 1.2, 1] : 1,
                    rotate: hoveredCard === product.id ? [0, 10, -10, 0] : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {product.image}
                </motion.div>
                
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="product-info">
                  <div className="product-rating">
                    <span>⭐ 4.8</span>
                  </div>
                </div>
                
                <motion.button
                  className="order-button"
                  onClick={() => handleOrderClick(product.formUrl, product.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Order Now</span>
                  <motion.span
                    className="arrow"
                    animate={{ x: hoveredCard === product.id ? 5 : 0 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </div>
              
              <motion.div 
                className="card-shine"
                animate={{
                  x: hoveredCard === product.id ? ['0%', '200%'] : '0%',
                }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Why Choose Us?</h2>
        </motion.div>

        <div className="features-grid">
          {[
            { icon: '🔥', title: 'Fresh Ingredients', desc: 'Only the finest and freshest ingredients' },
            { icon: '⚡', title: 'Fast Delivery', desc: 'Quick delivery to your doorstep' },
            { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Prepared by experienced cooks' },
            { icon: '💯', title: 'Quality Assured', desc: '100% satisfaction guaranteed' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/logo-new.jpeg" alt="Harey's Kitchen" className="footer-logo-img" />
              <h3>Harey's Kitchen</h3>
            </div>
            <p>Made with love, served with comfort.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#menu">Menu</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>📧 estherasala@gmail.com</p>
            <p>📱 +234 813 595 7675</p>
            <p>
              <motion.a 
                href="https://wa.me/2348135957675?text=Hello%20Harey's%20Kitchen!%20I%20have%20a%20question..." 
                target="_blank" 
                rel="noopener noreferrer"
                style={{color: '#25D366', fontWeight: 'bold', textDecoration: 'none'}}
                whileHover={{scale: 1.05}}
              >
                💬 WhatsApp Us
              </motion.a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Harey's Kitchen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

