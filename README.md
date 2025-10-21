# Harey's Kitchen - Landing Page

**"Rooted in taste, refined in style."**

A beautiful, food-focused landing page for Harey's Kitchen, featuring animated product cards for soups, protein boxes, and drinks.

## Features

- 🎨 Modern, food-focused design with warm gradients
- ✨ Smooth animations using Framer Motion
- 📱 Fully responsive design
- 🎯 Interactive product cards with hover effects
- 📋 Custom order forms for each product type
- 🛒 Complete checkout page with order preview
- 💳 Multiple payment options (Card, Transfer, Cash)
- 📧 Email notifications (no backend required)
- 🖼️ Custom logo integration in navbar and footer
- 🚀 Built with React.js and Vite

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Email Notifications**
   📧 **See `GMAIL_SETUP_GUIDE.md` for detailed step-by-step instructions**
   
   Quick options:
   - **Option 1 (Recommended):** EmailJS with your Gmail account (5 mins setup)
   - **Option 2 (Fastest):** FormSubmit (1 min setup)
   
   Both options require NO BACKEND!

3. **Customize Pricing** (Optional)
   Edit pricing in `src/components/CheckoutPage.jsx` to match your actual prices

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`

5. **Build for Production**
   ```bash
   npm run build
   ```

## 📦 Order Flow

1. **Customer Journey:**
   - Browses landing page
   - Clicks "Order Now" on a product
   - Fills detailed order form
   - Reviews order in checkout page
   - Selects payment method
   - Confirms order

2. **You Receive:**
   - Instant email notification with full order details
   - Customer contact information
   - Selected items and preferences
   - Delivery date and method
   - Payment method chosen

## Customization

### Colors
The primary brand colors (orange/amber gradients) can be changed in `src/App.css` by replacing `#ff6b35` and `#f7931e` with your preferred colors.

### Product Information
Update the `products` array in `src/App.jsx` to modify:
- Titles
- Descriptions
- Badges
- Emojis
- Gradient colors

### Pricing
Update pricing logic in `src/components/CheckoutPage.jsx` (lines 15-32)

### Contact Information
Update the footer section in `src/App.jsx` with your actual contact details.

### Payment Integration
See `SETUP_NOTIFICATIONS.md` for integrating Paystack or Flutterwave for automated payments.

## Technologies Used

- React 18
- Vite
- Framer Motion (for animations)
- Modern CSS with gradients and animations

## Browser Support

Works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

---

Enjoy your beautiful landing page! 🎉

