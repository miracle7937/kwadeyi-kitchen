import { useState } from 'react'
import { motion } from 'framer-motion'
import './CheckoutPage.css'
import emailjs from '@emailjs/browser'

function CheckoutPage({ cartItems, onBack, onSubmit }) {
  const [paymentMethod, setPaymentMethod] = useState('transfer') // Auto-select bank transfer
  const [deliveryMethod, setDeliveryMethod] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [contactInfo, setContactInfo] = useState('')

  // Calculate total from all cart items
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.estimatedPrice || 0), 0)
  }

  const total = calculateTotal()

  const handlePayment = async () => {
    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }

    if (!paymentMethod) {
      alert('Please select a payment method')
      return
    }

    setIsProcessing(true)

    if (!contactInfo.trim()) {
      alert('Please provide your contact information')
      return
    }

    if (!deliveryMethod) {
      alert('Please select a delivery method')
      return
    }

    console.log('🚀 Starting order submission...')
    console.log('Cart items:', cartItems)
    console.log('Payment method:', paymentMethod)
    console.log('Total:', total)

    // Build order summary for multiple items
    let orderSummary = '═══════════════════════\nORDER SUMMARY\n═══════════════════════\n\n'
    
    cartItems.forEach((item, index) => {
      orderSummary += `📦 ITEM ${index + 1}: ${item.type.toUpperCase()}\n`
      orderSummary += `Price: ₦${item.estimatedPrice?.toLocaleString()}\n`
      
      if (item.type === 'soup') {
        orderSummary += `Soup: ${item.soupType}\n`
        orderSummary += `Protein: ${item.proteinType}\n`
        if (item.soupExtras?.length > 0) orderSummary += `Extras: ${item.soupExtras.join(', ')}\n`
        orderSummary += `Quantity: ${item.litres || 2} litre(s)\n`
        if ((item.litres || 2) > 2) orderSummary += `🎉 5% Bulk Discount Applied!\n`
        if (item.allergyDetails) orderSummary += `Allergies: ${item.allergyDetails}\n`
      } else if (item.type === 'protein') {
        orderSummary += `Proteins: ${item.proteinType?.join(', ')}\n`
        orderSummary += `Quantity: ${item.quantity}\n`
        orderSummary += `Preparation: ${item.preparation}\n`
        orderSummary += `Spice Level: ${item.spiceLevel}\n`
        if (item.additionalNotes) orderSummary += `Notes: ${item.additionalNotes}\n`
      } else if (item.type === 'drinks') {
        orderSummary += `Drinks: ${item.drinkType?.join(', ')}\n`
        orderSummary += `Size: ${item.drinkSize}\n`
        orderSummary += `Quantity: ${item.quantity}\n`
        if (item.specialRequests) orderSummary += `Special Requests: ${item.specialRequests}\n`
      }
      
      orderSummary += `Delivery Date: ${item.deliveryDate}\n`
      orderSummary += '\n─────────────────────\n\n'
    })
    
    orderSummary += `\n💰 TOTAL AMOUNT: ₦${total.toLocaleString()}\n`
    orderSummary += `💳 PAYMENT METHOD: ${paymentMethod}\n`
    orderSummary += `🚚 DELIVERY METHOD: ${deliveryMethod}\n`

    try {
      console.log('📧 Attempting to send email via FormSubmit...')
      
      // Format data for beautiful email
      const customerName = contactInfo.split('\n')[0]?.replace('Name:', '').trim() || 'Customer'
      
      // Use FormSubmit - Simple and reliable
      const formData = new FormData()
      
      // Email Settings
      formData.append('_subject', `🍲 Harey's Kitchen - New Order from ${customerName} - ${cartItems.length} item(s)`)
      formData.append('_template', 'table')
      formData.append('_captcha', 'false')
      
      // Order Summary
      formData.append('👤 CUSTOMER NAME', customerName)
      formData.append('📦 ITEMS IN ORDER', `${cartItems.length} item(s)`)
      formData.append('💰 TOTAL AMOUNT', `₦${total.toLocaleString()}`)
      formData.append('💳 PAYMENT METHOD', paymentMethod)
      formData.append('🚚 DELIVERY METHOD', deliveryMethod)
      
      // Add each item details
      cartItems.forEach((item, index) => {
        formData.append(`━━━ ITEM ${index + 1} ━━━`, `${item.type.toUpperCase()} - ₦${item.estimatedPrice?.toLocaleString()}`)
        
        if (item.type === 'soup') {
          formData.append(`${index + 1}. Soup`, item.soupType)
          formData.append(`${index + 1}. Protein`, item.proteinType)
          formData.append(`${index + 1}. Quantity`, `${item.litres || 2} litre(s)`)
          if ((item.litres || 2) > 2) {
            formData.append(`${index + 1}. Discount`, '🎉 5% Bulk Discount Applied')
          }
        } else if (item.type === 'protein') {
          formData.append(`${index + 1}. Proteins`, item.proteinType?.join(', '))
          formData.append(`${index + 1}. Preparation`, item.preparation)
        } else if (item.type === 'drinks') {
          formData.append(`${index + 1}. Drinks`, item.drinkType?.join(', '))
          formData.append(`${index + 1}. Size`, item.drinkSize)
        }
        
        formData.append(`${index + 1}. Delivery Date`, item.deliveryDate)
      })
      
      // Contact Information
      formData.append('━━━━━━━━━━━━━━━━━━━━', '━━━━━━━━━━━━━━━━━━━━')
      formData.append('📞 CUSTOMER CONTACT', contactInfo.replace(/\n/g, ' | '))
      
      const response = await fetch('https://formsubmit.co/ajax/estherasala@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      const result = await response.json()
      console.log('✅ FormSubmit Response:', result)

      if (result.success) {
        console.log('✅ Email sent successfully!')
        alert('🎉 Order submitted successfully! You will receive a confirmation shortly.')
      } else {
        console.log('⚠️ FormSubmit responded but with issue:', result)
        alert('Order submitted! Please check your email for confirmation. If you don\'t receive it, we\'ll contact you via WhatsApp.')
      }

      setTimeout(() => {
        setIsProcessing(false)
        onSubmit()
      }, 1500)

    } catch (error) {
      console.error('❌ Error sending order:', error)
      console.error('Error details:', error.text || error.message || error)
      setIsProcessing(false)
      
      // Still complete the order even if email fails
      alert('⚠️ Order saved! However, email notification may have failed. Please screenshot your order details and contact us via WhatsApp to confirm.')
      
      // Continue to success
      setTimeout(() => {
        onSubmit()
      }, 1000)
    }
  }

  return (
    <div className="checkout-container">
      <motion.button
        className="back-button"
        onClick={onBack}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        ← Edit Order
      </motion.button>

      <div className="checkout-wrapper">
        <motion.div
          className="checkout-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="checkout-header">
            <h1>🛒 Order Summary & Checkout</h1>
            <p>Review your order details and proceed to payment</p>
          </div>

          {/* Order Summary */}
          <div className="order-summary-card">
            <h2>📋 Order Summary ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})</h2>
            
            <div className="summary-section">
              {cartItems.map((item, index) => (
                <div key={item.id} className="cart-item-summary">
                  <h3 className="item-number">Item {index + 1}: {item.emoji} {item.type?.toUpperCase()}</h3>
                  
                  {item.type === 'soup' && (
                    <>
                      <div className="summary-row">
                        <span className="label">Soup:</span>
                        <span className="value">{item.soupType}</span>
                      </div>
                      <div className="summary-row">
                        <span className="label">Protein:</span>
                        <span className="value">{item.proteinType}</span>
                      </div>
                      <div className="summary-row">
                        <span className="label">Quantity:</span>
                        <span className="value">{item.litres || 2} litre{(item.litres || 2) > 1 ? 's' : ''}</span>
                      </div>
                      {(item.litres || 2) > 2 && (
                        <div className="summary-row discount-row">
                          <span className="label">Discount:</span>
                          <span className="value">🎉 5% OFF Applied!</span>
                        </div>
                      )}
                    </>
                  )}

                  {item.type === 'protein' && (
                    <>
                      <div className="summary-row">
                        <span className="label">Proteins:</span>
                        <span className="value">{item.proteinType?.join(', ')}</span>
                      </div>
                      <div className="summary-row">
                        <span className="label">Preparation:</span>
                        <span className="value">{item.preparation}</span>
                      </div>
                    </>
                  )}

                  {item.type === 'drinks' && (
                    <>
                      <div className="summary-row">
                        <span className="label">Drinks:</span>
                        <span className="value">{item.drinkType?.join(', ')}</span>
                      </div>
                      <div className="summary-row">
                        <span className="label">Size:</span>
                        <span className="value">{item.drinkSize}</span>
                      </div>
                    </>
                  )}

                  <div className="summary-row">
                    <span className="label">Delivery Date:</span>
                    <span className="value">{item.deliveryDate}</span>
                  </div>
                  <div className="summary-row">
                    <span className="label">Price:</span>
                    <span className="value price-highlight">₦{item.estimatedPrice?.toLocaleString()}</span>
                  </div>
                  
                  {index < cartItems.length - 1 && <div className="summary-divider"></div>}
                </div>
              ))}
            </div>

            <div className="summary-total">
              <span>Estimated Total:</span>
              <span className="total-amount">₦{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="payment-section">
            <h2>🚚 Delivery Method</h2>
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="Delivery"
                  checked={deliveryMethod === 'Delivery'}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />
                <div className="option-content">
                  <span className="option-icon">🚚</span>
                  <div>
                    <div className="option-title">Home Delivery</div>
                    <div className="option-desc">We'll deliver to your address</div>
                  </div>
                </div>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="Pick up"
                  checked={deliveryMethod === 'Pick up'}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />
                <div className="option-content">
                  <span className="option-icon">🏪</span>
                  <div>
                    <div className="option-title">Pick Up</div>
                    <div className="option-desc">Collect from our location</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Contact Information */}
          <div className="payment-section">
            <h2>📞 Contact Information</h2>
            <textarea
              className="contact-textarea"
              placeholder="Name:&#10;Address:&#10;Phone Number:"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              rows="5"
              required
            />
          </div>

          {/* Payment Method - Only show after contact info and delivery method are filled */}
          {contactInfo.trim() && deliveryMethod && (
            <motion.div
              className="payment-section"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>💳 Payment Instructions</h2>
              <p className="payment-note">💡 All orders require bank transfer payment before processing</p>

              <div className="bank-details">
                <div className="bank-details-card">
                  <h3>🏦 Bank Account Details</h3>
                  <div className="account-info">
                    <div className="info-row">
                      <span className="info-label">Bank Name:</span>
                      <span className="info-value">First Bank</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Account Name:</span>
                      <span className="info-value">Esther Asala</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Account Number:</span>
                      <span className="info-value account-number">3107615869</span>
                    </div>
                  </div>
                  
                  <div className="payment-instructions">
                    <h4>📝 Payment Instructions:</h4>
                    <ol>
                      <li>Transfer <strong>₦{total.toLocaleString()}</strong> to the account above</li>
                      <li>Take a screenshot or save your receipt</li>
                      <li>Click the WhatsApp button below to send your receipt</li>
                      <li>We'll confirm your payment and process your order</li>
                    </ol>
                  </div>

                  <motion.a
                    href={(() => {
                      // Build detailed WhatsApp message with all items
                      let message = `Hello Harey's Kitchen! 🍲\n\nI just placed an order on your website:\n\n`
                      
                      cartItems.forEach((item, index) => {
                        message += `━━━━━━━━━━━━━━━━━━\n`
                        message += `📦 ITEM ${index + 1}: ${item.type.toUpperCase()} ${item.emoji}\n`
                        
                        if (item.type === 'soup') {
                          message += `Soup: ${item.soupType}\n`
                          message += `Protein: ${item.proteinType}\n`
                          message += `Quantity: ${item.litres || 2} litre(s)\n`
                          if ((item.litres || 2) > 2) message += `🎉 5% Discount Applied!\n`
                        } else if (item.type === 'protein') {
                          message += `Proteins: ${item.proteinType?.join(', ')}\n`
                          message += `Preparation: ${item.preparation}\n`
                        } else if (item.type === 'drinks') {
                          message += `Drinks: ${item.drinkType?.join(', ')}\n`
                          message += `Size: ${item.drinkSize}\n`
                        }
                        
                        message += `Delivery: ${item.deliveryDate}\n`
                        message += `Price: ₦${item.estimatedPrice?.toLocaleString()}\n`
                      })
                      
                      message += `\n━━━━━━━━━━━━━━━━━━\n`
                      message += `💰 TOTAL: ₦${total.toLocaleString()}\n`
                      message += `🚚 Delivery Method: ${deliveryMethod}\n\n`
                      message += `Customer: ${contactInfo.split('\n')[0]?.replace('Name:', '').trim()}\n\n`
                      message += `I'm sending my payment receipt now...`
                      
                      return `https://wa.me/2348135957675?text=${encodeURIComponent(message)}`
                    })()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="whatsapp-icon">💬</span>
                    Send Receipt via WhatsApp
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Terms and Conditions */}
          <div className="terms-section">
            <label className="terms-checkbox">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span>I agree to the terms and conditions and confirm my order details are correct</span>
            </label>
          </div>

          {/* Submit Button - Only enabled when all info is provided */}
          <motion.button
            className="checkout-button"
            onClick={handlePayment}
            disabled={isProcessing || !contactInfo.trim() || !deliveryMethod}
            whileHover={!isProcessing && contactInfo.trim() && deliveryMethod ? { scale: 1.02 } : {}}
            whileTap={!isProcessing && contactInfo.trim() && deliveryMethod ? { scale: 0.98 } : {}}
          >
            {isProcessing ? (
              <>
                <span className="spinner"></span>
                Processing...
              </>
            ) : !contactInfo.trim() || !deliveryMethod ? (
              <>Please fill in delivery method and contact information above</>
            ) : (
              <>Confirm Order & Notify Me ✅</>
            )}
          </motion.button>

          {contactInfo.trim() && deliveryMethod && (
            <p className="secure-text">📧 Order confirmation will be sent to estherasala@gmail.com • Made with love, served with comfort ❤️</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default CheckoutPage

