import { useState } from 'react'
import { motion } from 'framer-motion'
import './SoupForm.css'
import { useCart } from '../context/CartContext'

function ProteinForm({ onBack }) {
  const { addToCart, setShowCart } = useCart()
  const [formData, setFormData] = useState({
    proteinType: [],
    quantity: '',
    preparation: '',
    spiceLevel: '',
    deliveryDate: '',
    additionalNotes: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const orderItem = {
      ...formData,
      type: 'protein',
      emoji: '🍖',
      estimatedPrice: 5000 // Base price for protein box
    }
    
    addToCart(orderItem)
    alert('✅ Protein box added to cart! Continue shopping or proceed to checkout.')
    onBack()
    setTimeout(() => setShowCart(true), 500)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox' && name === 'proteinType') {
      setFormData(prev => ({
        ...prev,
        proteinType: checked 
          ? [...prev.proteinType, value]
          : prev.proteinType.filter(item => item !== value)
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
          <h1>🍖 Protein Box Order Form</h1>
          <p className="form-mantra">Made with love, served with comfort.</p>
          <p>Select your preferred proteins and let us know how you'd like them prepared. Premium quality meats and fish, perfectly seasoned and cooked to perfection.</p>
        </div>

        <form onSubmit={handleSubmit} className="soup-form">
          {/* Protein Selection */}
          <div className="form-section">
            <label className="form-label required">SELECT PROTEIN(S)</label>
            <p className="form-help-text">You can select multiple options</p>
            <div className="checkbox-grid">
              {[
                'Chicken (whole or parts)',
                'Catfish',
                'Mackerel',
                'Panla fish',
                'Cow beef',
                'Ram meat',
                'Goat meat',
                'Turkey',
                'Prawns',
                'Snail',
                'Assorted meat (mixed)'
              ].map(protein => (
                <label key={protein} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="proteinType"
                    value={protein}
                    checked={formData.proteinType.includes(protein)}
                    onChange={handleChange}
                  />
                  <span>{protein}</span>
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
              placeholder="e.g., 1kg chicken, 2 catfish, etc."
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          {/* Preparation Method */}
          <div className="form-section">
            <label className="form-label required">PREPARATION METHOD</label>
            <div className="radio-grid">
              {[
                'Grilled',
                'Fried',
                'Peppered',
                'Boiled',
                'Steamed',
                'Roasted',
                'Raw (not cooked)'
              ].map(method => (
                <label key={method} className="radio-label">
                  <input
                    type="radio"
                    name="preparation"
                    value={method}
                    checked={formData.preparation === method}
                    onChange={handleChange}
                    required
                  />
                  <span>{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Spice Level */}
          <div className="form-section">
            <label className="form-label required">SPICE LEVEL</label>
            <div className="radio-inline">
              {['Mild', 'Medium', 'Hot', 'Extra Hot'].map(level => (
                <label key={level} className="radio-label">
                  <input
                    type="radio"
                    name="spiceLevel"
                    value={level}
                    checked={formData.spiceLevel === level}
                    onChange={handleChange}
                    required
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
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

          {/* Additional Notes */}
          <div className="form-section">
            <label className="form-label">ADDITIONAL NOTES</label>
            <textarea
              className="form-textarea"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              placeholder="Any special instructions or preferences?"
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

export default ProteinForm

