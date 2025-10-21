# 🚀 Deploy to GitHub Pages - Step by Step

## ✅ Setup Complete!

I've already configured your project for GitHub Pages. Here's what you need to do:

---

## 📋 **Step-by-Step Deployment:**

### **Step 1: Update Your GitHub Username**

1. **Open:** `package.json`
2. **Find line 6:** `"homepage": "https://yourusername.github.io/kwadeyi-kitchen",`
3. **Replace** `yourusername` with your actual GitHub username
   - Example: If your GitHub username is `estherasala`
   - Change to: `"homepage": "https://estherasala.github.io/kwadeyi-kitchen",`

---

### **Step 2: Create GitHub Repository**

1. **Go to:** [github.com](https://github.com)
2. **Sign in** (or create account if you don't have one)
3. **Click** the **"+"** button (top right)
4. **Select** "New repository"
5. **Fill in:**
   - Repository name: `kwadeyi-kitchen`
   - Description: "Kwadeyi Kitchen - Made with love, served with comfort"
   - Public or Private: **Public** (required for free GitHub Pages)
6. **DON'T** check "Add README" (we already have one)
7. **Click** "Create repository"

---

### **Step 3: Push Your Code to GitHub**

Copy and run these commands in your terminal:

```bash
cd "/Users/nombauser/Desktop/side/kwadeyi kitchen"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Kwadeyi Kitchen website"

# Add GitHub remote (REPLACE 'yourusername' with your GitHub username!)
git remote add origin https://github.com/yourusername/kwadeyi-kitchen.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

### **Step 4: Deploy to GitHub Pages**

Once your code is on GitHub, run:

```bash
npm run deploy
```

**That's it!** 🎉

Your site will be live at:
```
https://yourusername.github.io/kwadeyi-kitchen
```

*(Replace 'yourusername' with your actual GitHub username)*

---

## ⚡ **Quick Commands Reference:**

```bash
# Build and deploy
npm run deploy

# Just build (without deploying)
npm run build

# Test production build locally
npm run preview
```

---

## 🔄 **Update Your Live Site:**

Whenever you make changes:

```bash
# 1. Save your changes
# 2. Commit to git
git add .
git commit -m "Update menu/prices/etc"
git push

# 3. Deploy
npm run deploy
```

Your site updates in ~30 seconds!

---

## 🌐 **After Deployment:**

### **Your Live URLs:**
- **GitHub Pages:** `https://yourusername.github.io/kwadeyi-kitchen`
- **Share with customers!** 📱

### **Features That Work:**
- ✅ All animations
- ✅ Cart system (localStorage)
- ✅ Email notifications
- ✅ WhatsApp integration
- ✅ Price list modal
- ✅ Everything!

---

## 🎨 **Custom Domain (Optional):**

Want `kwadeyikitchen.com` instead of GitHub URL?

1. **Buy domain** from Namecheap/GoDaddy (~$10/year)
2. **In GitHub repo:** Settings → Pages → Custom domain
3. **Add DNS records** from your domain provider
4. **DONE!** ✅

---

## 🆘 **Troubleshooting:**

### **"gh-pages not found"**
```bash
npm install --save-dev gh-pages
```

### **"remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/yourusername/kwadeyi-kitchen.git
```

### **"Permission denied"**
- Make sure you're logged into GitHub
- Check repository name is correct
- Make sure repo is public

---

## 📞 **Need Help?**

Just let me know which step you're on and I'll guide you! 😊

---

**Ready to deploy? Just:**
1. Update your GitHub username in `package.json`
2. Create GitHub repo
3. Run the git commands
4. Run `npm run deploy`

**Your site will be LIVE!** 🚀

