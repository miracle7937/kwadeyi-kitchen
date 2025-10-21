import { useState } from 'react'
import { motion } from 'framer-motion'
import './SoupForm.css'
import { useCart } from '../context/CartContext'
import PriceList from './PriceList'

// Prices per litre (base price)
const soupPrices = {
  "Egusi soup": 15000,
  "Bitterleaf soup": 15000,
  "Afang soup": 15000,
  "Edikang ikong soup": 15000,
  "Efo riro": 13000,
  "Miyan taushe": 12000,
  "Marghi special": 12000,
  "Abak atama": 15000,
  "Oha soup": 15000,
  "Banga soup": 15000,
  "Gbegiri": 10000,
  "Ogbono soup": 15000,
  "Okro soup": 15000,
  "Seafood okro": 20000,
  "Miyan kuka (Baobab leaf soup)": 15000,
  "Ewedu": 10000,
  "White soup": 15000,
  "Fisherman soup": 12000,
  "Curry soup": 14000,
  "pepper soup": 15000,
  "Ofada sauce": 14000,
  "Stew": 14000
}

function SoupForm({ onBack }) {
  const { addToCart, setShowCart } = useCart()
  const [showPriceList, setShowPriceList] = useState(false)
  const [formData, setFormData] = useState({
    soupType: '',
    proteinType: '',
    soupExtras: [],
    soupExtrasOther: '',
    litres: 2, // Number of litres (minimum 2)
    hasAllergy: '',
    allergyDetails: '',
    hasHealthCondition: '',
    healthConditionDetails: '',
    deliveryDate: ''
  })

  const calculateEstimatedPrice = () => {
    // Get base price per litre
    const basePricePerLitre = soupPrices[formData.soupType] || 15000
    const litres = parseInt(formData.litres) || 2
    
    // Apply 5% discount if ordering ABOVE 2 litres (3+ litres)
    if (litres > 2) {
      const discountedPricePerLitre = basePricePerLitre * 0.95 // 5% off per litre
      return discountedPricePerLitre * litres
    }
    
    // 2 litres or less: full price
    return basePricePerLitre * litres
  }

  const getPricePerLitre = () => {
    const basePricePerLitre = soupPrices[formData.soupType] || 15000
    const litres = parseInt(formData.litres) || 2
    // Show discounted price per litre if ordering more than 2
    return litres > 2 ? basePricePerLitre * 0.95 : basePricePerLitre
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const orderItem = {
      ...formData,
      type: 'soup',
      emoji: '🍲',
      estimatedPrice: calculateEstimatedPrice()
    }
    
    addToCart(orderItem)
    alert('✅ Soup added to cart! Continue shopping or proceed to checkout.')
    onBack() // Return to main page
    setTimeout(() => setShowCart(true), 500) // Show cart after brief delay
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox' && name === 'soupExtras') {
      setFormData(prev => ({
        ...prev,
        soupExtras: checked 
          ? [...prev.soupExtras, value]
          : prev.soupExtras.filter(item => item !== value)
      }))
    } else if (name === 'litres') {
      // Parse litres as number and ensure minimum is 2
      const litres = parseInt(value) || 2
      setFormData(prev => ({
        ...prev,
        litres: Math.max(2, Math.min(50, litres))
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
      <PriceList isOpen={showPriceList} onClose={() => setShowPriceList(false)} />
      
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
          <h1>🍲 Soup Order Form</h1>
          <p className="form-mantra">Made with love, served with comfort.</p>
          <p>Kindly fill in the order form for your preferred soup. Please be specific about the details for your soup.</p>
          <button 
            type="button"
            className="view-prices-btn"
            onClick={() => setShowPriceList(true)}
          >
            💰 View Full Price List
          </button>
        </div>

        <form onSubmit={handleSubmit} className="soup-form">
          {/* Type of Soup */}
          <div className="form-section">
            <label className="form-label required">TYPE OF SOUP</label>
            <p className="form-help-text">Prices are per litre. Order more than 2 litres, get 5% off!</p>
            <div className="radio-grid">
              {[
                'Egusi soup', 'Bitterleaf soup', 'Afang soup', 'Edikang ikong soup',
                'Efo riro', 'Miyan taushe', 'Marghi special', 'Abak atama',
                'Oha soup', 'Banga soup', 'Gbegiri', 'Ogbono soup',
                'Okro soup', 'Seafood okro', 'Miyan kuka (Baobab leaf soup)', 'Ewedu',
                'White soup', 'Fisherman soup', 'Curry soup', 'Pepper soup',
                'Ofada sauce', 'Stew'
              ].map(soup => (
                <label key={soup} className="radio-label">
                  <input
                    type="radio"
                    name="soupType"
                    value={soup}
                    checked={formData.soupType === soup}
                    onChange={handleChange}
                    required
                  />
                  <span>{soup}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Protein Type */}
          <div className="form-section">
            <label className="form-label required">PROTEIN TYPE</label>
            <div className="radio-grid">
              {[
                'Chicken', 'Catfish', 'Mackerel', 'Panla fish',
                'Cow beef', 'Ram meat', 'Goat meat', 'Brisket bones'
              ].map(protein => (
                <label key={protein} className="radio-label">
                  <input
                    type="radio"
                    name="proteinType"
                    value={protein}
                    checked={formData.proteinType === protein}
                    onChange={handleChange}
                    required
                  />
                  <span>{protein}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Current Selection Price */}
          {formData.soupType && (
            <motion.div 
              className="price-preview"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="price-breakdown">
                <div className="breakdown-row">
                  <span>Soup:</span>
                  <span>{formData.soupType}</span>
                </div>
                <div className="breakdown-row">
                  <span>Price per litre:</span>
                  <span>₦{getPricePerLitre().toLocaleString()}</span>
                </div>
                <div className="breakdown-row">
                  <span>Quantity:</span>
                  <span>{formData.litres} litre{formData.litres > 1 ? 's' : ''}</span>
                </div>
                {formData.litres > 2 && (
                  <div className="breakdown-row discount-applied">
                    <span>🎉 Discount:</span>
                    <span>5% OFF Applied!</span>
                  </div>
                )}
                <div className="breakdown-total">
                  <span>Total Price:</span>
                  <span className="preview-price">₦{calculateEstimatedPrice().toLocaleString()}</span>
                </div>
              </div>
              {formData.litres <= 2 && (
                <p className="preview-note">💡 Order ABOVE 2 litres (3+) and save 5% per litre!</p>
              )}
              {formData.litres > 2 && (
                <p className="preview-note savings">
                  💰 You're saving ₦{((soupPrices[formData.soupType] || 15000) * 0.05 * formData.litres).toLocaleString()}!
                </p>
              )}
            </motion.div>
          )}

          {/* Soup Extras */}
          <div className="form-section">
            <label className="form-label required">SOUP EXTRAS</label>
            <div className="checkbox-grid">
              {[
                'Towel, Roundabout, Shaki',
                'Ponmo',
                'Shrimps',
                'Periwinkle',
                'Stock fish',
                'Smoked fish'
              ].map(extra => (
                <label key={extra} className="checkbox-label">
                  <input
                    type="checkbox"
                    name="soupExtras"
                    value={extra}
                    checked={formData.soupExtras.includes(extra)}
                    onChange={handleChange}
                  />
                  <span>{extra}</span>
                </label>
              ))}
            </div>
            <input
              type="text"
              className="form-input"
              placeholder="Other (please specify)"
              name="soupExtrasOther"
              value={formData.soupExtrasOther}
              onChange={handleChange}
            />
          </div>

          {/* Quantity in Litres */}
          <div className="form-section">
            <label className="form-label required">HOW MANY LITRES?</label>
            <p className="form-help-text">💡 Minimum 2 litres. Order ABOVE 2 litres (3+) and get 5% discount per litre!</p>
            <div className="quantity-selector">
              <button
                type="button"
                className="qty-btn"
                onClick={() => setFormData(prev => ({ ...prev, litres: Math.max(2, prev.litres - 1) }))}
              >
                −
              </button>
              <div className="qty-display">
                <input
                  type="number"
                  className="qty-input"
                  name="litres"
                  value={formData.litres}
                  onChange={handleChange}
                  min="2"
                  max="50"
                  required
                />
                <span className="qty-label">Litres</span>
              </div>
              <button
                type="button"
                className="qty-btn"
                onClick={() => setFormData(prev => ({ ...prev, litres: Math.min(50, prev.litres + 1) }))}
              >
                +
              </button>
            </div>
          </div>

          {/* Allergies */}
          <div className="form-section">
            <label className="form-label required">ADDITIONAL INFORMATION</label>
            <p className="form-help-text">Do you have any allergy(s)? e.g. Spices</p>
            <div className="radio-inline">
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasAllergy"
                  value="Yes"
                  checked={formData.hasAllergy === 'Yes'}
                  onChange={handleChange}
                  required
                />
                <span>Yes</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasAllergy"
                  value="No"
                  checked={formData.hasAllergy === 'No'}
                  onChange={handleChange}
                  required
                />
                <span>No</span>
              </label>
            </div>
            {formData.hasAllergy === 'Yes' && (
              <input
                type="text"
                className="form-input"
                placeholder="If your answer to the above question is Yes, please specify"
                name="allergyDetails"
                value={formData.allergyDetails}
                onChange={handleChange}
              />
            )}
          </div>

          {/* Health Conditions */}
          <div className="form-section">
            <label className="form-label required">Do you have any health condition you would like us to know about?</label>
            <p className="form-help-text">This is required to help us pay attention to your health need(s) while cooking for you.</p>
            <div className="radio-inline">
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasHealthCondition"
                  value="Yes"
                  checked={formData.hasHealthCondition === 'Yes'}
                  onChange={handleChange}
                  required
                />
                <span>Yes</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasHealthCondition"
                  value="No"
                  checked={formData.hasHealthCondition === 'No'}
                  onChange={handleChange}
                  required
                />
                <span>No</span>
              </label>
            </div>
            {formData.hasHealthCondition === 'Yes' && (
              <input
                type="text"
                className="form-input"
                placeholder="If yes, please specify"
                name="healthConditionDetails"
                value={formData.healthConditionDetails}
                onChange={handleChange}
              />
            )}
          </div>

          {/* Delivery Day */}
          <div className="form-section">
            <label className="form-label required">Delivery Day</label>
            <p className="form-help-text">Soups are only delivered on Thursdays and Saturdays</p>
            <div className="radio-inline">
              {(() => {
                // Get next Thursday and Saturday dates
                const today = new Date()
                const dates = []
                
                // Find next Thursday
                let nextThursday = new Date(today)
                nextThursday.setDate(today.getDate() + ((4 - today.getDay() + 7) % 7 || 7))
                dates.push({ day: 'Thursday', date: nextThursday.toISOString().split('T')[0], display: nextThursday.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) })
                
                // Find next Saturday
                let nextSaturday = new Date(today)
                nextSaturday.setDate(today.getDate() + ((6 - today.getDay() + 7) % 7 || 7))
                dates.push({ day: 'Saturday', date: nextSaturday.toISOString().split('T')[0], display: nextSaturday.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) })
                
                // Add following Thursday if current day is past Thursday
                if (today.getDay() >= 4) {
                  let followingThursday = new Date(nextThursday)
                  followingThursday.setDate(nextThursday.getDate() + 7)
                  dates.push({ day: 'Thursday', date: followingThursday.toISOString().split('T')[0], display: followingThursday.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) })
                }
                
                // Add following Saturday if current day is past Saturday
                if (today.getDay() === 0 || today.getDay() >= 6) {
                  let followingSaturday = new Date(nextSaturday)
                  followingSaturday.setDate(nextSaturday.getDate() + 7)
                  dates.push({ day: 'Saturday', date: followingSaturday.toISOString().split('T')[0], display: followingSaturday.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) })
                }
                
                return dates.map((option, idx) => (
                  <label key={idx} className="radio-label delivery-date-option">
                    <input
                      type="radio"
                      name="deliveryDate"
                      value={option.date}
                      checked={formData.deliveryDate === option.date}
                      onChange={handleChange}
                      required
                    />
                    <span>
                      <strong>{option.day}</strong>
                      <br />
                      <small>{option.display}</small>
                    </span>
                  </label>
                ))
              })()}
            </div>
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

export default SoupForm

