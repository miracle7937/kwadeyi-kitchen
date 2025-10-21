import { useState } from 'react'
import { motion } from 'framer-motion'
import './SoupForm.css'
import { useCart } from '../context/CartContext'

function DrinksForm({ onBack }) {
  const { addToCart, setShowCart } = useCart()
  const [formData, setFormData] = useState({
    drinkType: [],
    drinkSize: '',
    quantity: '',
    deliveryDate: '',
    specialRequests: ''
  })

  const calculateEstimatedPrice = () => {
    const sizePrice = {
      'Small (350ml)': 800,
      'Medium (500ml)': 1200,
      'Large (750ml)': 1800,
      'Extra Large (1L)': 2500
    }
    return (sizePrice[formData.drinkSize] || 800) * (formData.drinkType?.length || 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const orderItem = {
      ...formData,
      type: 'drinks',
      emoji: '🥤',
      estimatedPrice: calculateEstimatedPrice()
    }
    
    addToCart(orderItem)
    alert('✅ Drinks added to cart! Continue shopping or proceed to checkout.')
    onBack()
    setTimeout(() => setShowCart(true), 500)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox' && name === 'drinkType') {
      setFormData(prev => ({
        ...prev,
        drinkType: checked 
          ? [...prev.drinkType, value]
          : prev.drinkType.filter(item => item !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <div className="soup-form-container">
      <motion.button
        className="back-button"
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        ← Back to Menu
      </motion.button>

      <motion.div 
        className="soup-form-wrapper"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="form-header">
          <h1>🥤 Drinks Order Form</h1>
          <p className="form-mantra">Rooted in taste, refined in style.</p>
          <p>Choose from our selection of traditional Nigerian beverages. All made fresh to order!</p>
        </div>

        <form onSubmit={handleSubmit} className="soup-form">
          {/* Drink Selection */}
          <div className="form-section">
            <label className="form-label required">SELECT DRINK(S)</label>
            <p className="form-help-text">You can select multiple drinks</p>
            <div className="checkbox-grid">
              {[
                'Zobo (Hibiscus drink)',
                'Kunu Zaki (Tiger nut/Millet drink)',
                'Ginger Drink',
                'Soursop Juice',
                'Tiger Nut Milk',
                'Fura da Nono'
              ].map(drink => (
                <label key={drink} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="drinkType"
                    value={drink}
                    checked={formData.drinkType.includes(drink)}
                    onChange={handleChange}
                  />
                  <span>{drink}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="form-section">
            <label className="form-label required">SIZE PER DRINK</label>
            <div className="radio-inline">
              {['Small (350ml)', 'Medium (500ml)', 'Large (750ml)', 'Extra Large (1L)'].map(size => (
                <label key={size} className="radio-label">
                  <input
                    type="radio"
                    name="drinkSize"
                    value={size}
                    checked={formData.drinkSize === size}
                    onChange={handleChange}
                    required
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="form-section">
            <label className="form-label required">QUANTITY</label>
            <input
              type="text"
              className="form-input"
              name="quantity"
              placeholder="e.g., 2 Chapman, 1 Zobo, etc."
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Delivery Date */}
          <div className="form-section">
            <label className="form-label required">When do you want your order?</label>
            <p className="form-help-text">Select your preferred delivery date (click the calendar icon)</p>
            <input
              type="date"
              className="form-input date-picker"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* Special Requests */}
          <div className="form-section">
            <label className="form-label">SPECIAL REQUESTS</label>
            <textarea
              className="form-textarea"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Any special preferences? (e.g., less sugar, extra ice, etc.)"
              rows="4"
            />
          </div>

          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Add to Cart 🛒
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default DrinksForm

