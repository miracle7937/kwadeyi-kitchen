# 📧 Setup Gmail Notifications - Step by Step

## ✅ **Best Option: EmailJS with Your Gmail Account**

EmailJS lets you send emails directly from your website using your Gmail account - **NO BACKEND NEEDED!**

---

## 🚀 Quick Setup (5 Minutes)

### **Step 1: Create EmailJS Account**

1. Go to **[https://www.emailjs.com](https://www.emailjs.com)**
2. Click **"Sign Up"** (it's FREE - 200 emails/month)
3. Create account with your email

---

### **Step 2: Connect Your Gmail**

1. **In EmailJS Dashboard**, click **"Email Services"** in left sidebar
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. **Sign in with your Google/Gmail account**
6. **Allow EmailJS** to send emails on your behalf
7. Copy your **Service ID** (looks like: `service_xxxxxxx`)

---

### **Step 3: Create Email Template**

1. Click **"Email Templates"** in left sidebar
2. Click **"Create New Template"**
3. **Template Name:** `kwadeyi_order_notification`
4. **Subject:** `🍲 New Order from Kwadeyi Kitchen - {{order_type}}`
5. **Content (use this exactly):**

```
Hello Kwadeyi Kitchen Team!

You have received a new order!

📋 ORDER SUMMARY
================
Order Type: {{order_type}}
Customer: {{customer_name}}
Delivery Date: {{delivery_date}}
Payment Method: {{payment_method}}

💰 TOTAL: {{total_amount}}

📝 FULL ORDER DETAILS
=====================
{{order_details}}

👤 CUSTOMER CONTACT
===================
{{contact_info}}

---
This is an automated email from your Kwadeyi Kitchen website.
```

6. Click **"Save"**
7. Copy your **Template ID** (looks like: `template_xxxxxxx`)

---

### **Step 4: Get Your Public Key**

1. Click **"Account"** in left sidebar
2. Find **"Public Key"** section
3. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxx`)

---

### **Step 5: Update Your Website**

1. **Open:** `src/components/CheckoutPage.jsx`

2. **Find lines 88-90** and replace with your credentials:

```javascript
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'     // From Step 2
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxx'   // From Step 3
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxx'      // From Step 4
```

3. **Update line 96** with your actual Gmail:

```javascript
to_email: 'your-actual-email@gmail.com',  // Your Gmail address
```

4. **Save the file**

---

### **Step 6: Test It!**

1. **Run your website:**
   ```bash
   npm run dev
   ```

2. **Place a test order:**
   - Select any product
   - Fill the form
   - Go through checkout
   - Click "Confirm & Pay"

3. **Check your Gmail inbox!** 📬
   - You should receive an email within seconds
   - Check spam folder if you don't see it

---

## 📧 Email Delivery Limits

### **EmailJS Free Plan:**
- ✅ 200 emails per month
- ✅ Unlimited email templates
- ✅ Use your own Gmail
- ✅ No credit card required

### **If you need more:**
- Personal Plan: $9/month (1,000 emails)
- Professional Plan: $25/month (10,000 emails)

---

## 🔄 Alternative: FormSubmit (Even Simpler)

If you don't want to setup EmailJS, you can use **FormSubmit** instead:

### **Setup (1 Minute):**

1. **Open:** `src/components/CheckoutPage.jsx`

2. **Comment out EmailJS code** (lines 86-106)

3. **Uncomment FormSubmit code** (lines 111-122)

4. **Update line 118:**
   ```javascript
   await fetch('https://formsubmit.co/ajax/your-email@gmail.com', {
   ```
   Change to:
   ```javascript
   await fetch('https://formsubmit.co/ajax/your-actual-email@gmail.com', {
   ```

5. **That's it!** FormSubmit will send you an email on first order and ask you to verify your email address.

---

## 🆚 EmailJS vs FormSubmit

| Feature | EmailJS | FormSubmit |
|---------|---------|------------|
| **Setup Time** | 5 minutes | 1 minute |
| **Uses Your Gmail** | ✅ Yes | ❌ No (uses FormSubmit domain) |
| **Custom Templates** | ✅ Full control | ⚠️ Limited |
| **Professional Look** | ✅ Your email | ⚠️ FormSubmit email |
| **Monthly Limit** | 200 (free) | Unlimited |
| **Best For** | Professional use | Quick testing |

---

## 💡 Pro Tips

1. **For Production:** Use EmailJS with your business Gmail
2. **For Testing:** Use FormSubmit to test quickly
3. **Create Gmail Filter:** Auto-label orders with ⭐ star
4. **Setup Auto-Reply:** Send customers a confirmation email
5. **Mobile Notifications:** Enable Gmail notifications on your phone

---

## 🔧 Troubleshooting

### **Not receiving emails?**

1. ✅ Check spam/junk folder
2. ✅ Verify EmailJS credentials are correct
3. ✅ Check browser console for errors (F12)
4. ✅ Make sure you verified your email with FormSubmit (if using it)

### **EmailJS Error "Public Key Invalid"**

- Go to EmailJS Account → Copy Public Key again
- Make sure there are no extra spaces when pasting

### **Gmail not connected?**

- Reconnect your Gmail in EmailJS dashboard
- Make sure you allowed all permissions

---

## 📱 Bonus: SMS Notifications

Want SMS notifications too? Use **Termii** (Nigerian SMS service):

1. Sign up at [termii.com](https://termii.com)
2. Get API key
3. Add SMS sending code to CheckoutPage.jsx

Let me know if you want me to add this! 📲

---

## 🎉 You're All Set!

Your customers can now place orders and you'll receive instant email notifications to your Gmail!

**Questions?** Check the main README.md or the SETUP_NOTIFICATIONS.md file.




