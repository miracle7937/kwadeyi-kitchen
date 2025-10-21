import { motion, AnimatePresence } from 'framer-motion'
import './PriceList.css'

// Prices per litre
const soupPrices = [
  { name: "Egusi Soup", basePrice: 15000, discountPrice: 14250 },
  { name: "Bitterleaf Soup", basePrice: 15000, discountPrice: 14250 },
  { name: "Afang Soup", basePrice: 15000, discountPrice: 14250 },
  { name: "Edikang Ikong Soup", basePrice: 15000, discountPrice: 14250 },
  { name: "Efo Riro", basePrice: 13000, discountPrice: 12350 },
  { name: "Miyan Taushe", basePrice: 12000, discountPrice: 11400 },
  { name: "Marghi Special", basePrice: 12000, discountPrice: 11400 },
  { name: "Abak Atama", basePrice: 15000, discountPrice: 14250 },
  { name: "Oha Soup", basePrice: 15000, discountPrice: 14250 },
  { name: "Banga Soup", basePrice: 15000, discountPrice: 14250 },
  { name: "Ewedu & Gbegiri Combo", basePrice: 10000, discountPrice: 9500 },
  { name: "Ogbono Soup", basePrice: 15000, discountPrice: 14250 },
  { name: "Okro Soup", basePrice: 15000, discountPrice: 14250 },
  { name: "Seafood Okro", basePrice: 20000, discountPrice: 19000 },
  { name: "Miyan Kuka (Baobab Leaf)", basePrice: 15000, discountPrice: 14250 },
  { name: "White Soup", basePrice: 15000, discountPrice: 14250 },
  { name: "Fisherman Soup", basePrice: 12000, discountPrice: 11400 },
  { name: "Curry Soup (Stew)", basePrice: 14000, discountPrice: 13300 },
  { name: "Pepper Soup", basePrice: 15000, discountPrice: 14250 }
]

function PriceList({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="price-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="price-modal"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="price-modal-header">
            <h2>🍲 Soup Price List</h2>
            <button className="close-modal" onClick={onClose}>✕</button>
          </div>

          <div className="price-badge-info">
            <div className="badge-item">
              <span className="badge">💰</span>
              <span>All prices are PER LITRE</span>
            </div>
            <div className="badge-item">
              <span className="badge discount">🎉</span>
              <span>Order ABOVE 2 litres = 5% OFF per litre!</span>
            </div>
          </div>

          <div className="price-list-content">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Soup Name</th>
                  <th>Per Litre (1-2L)</th>
                  <th className="discount-col">Per Litre (Above 2L)</th>
                </tr>
              </thead>
              <tbody>
                {soupPrices.map((soup, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="soup-name">{soup.name}</td>
                    <td className="base-price">₦{soup.basePrice.toLocaleString()}</td>
                    <td className="discount-price">₦{soup.discountPrice.toLocaleString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="price-modal-footer">
            <p>💡 <strong>Bulk Order Discount:</strong> Order more than 2 litres and save 5% per litre!</p>
            <p>📦 Minimum order: 2 litres</p>
            <p><strong>Example:</strong> 3 litres of Egusi = ₦14,250/L × 3 = ₦42,750 (instead of ₦45,000)</p>
          </div>

          <motion.button
            className="close-price-btn"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Got it! Let's Order
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PriceList

