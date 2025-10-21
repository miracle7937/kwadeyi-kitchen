# 🔐 GitHub Authentication & Deployment

## ⚠️ Permission Issue Detected

You're trying to push to `Chukwude-ebuka/kwadeyi-kitchen` but your computer is authenticated as a different user.

---

## ✅ **Solution - Choose One:**

### **OPTION 1: Use GitHub Personal Access Token (Easiest)**

1. **Go to:** https://github.com/settings/tokens
2. **Click:** "Generate new token" → "Generate new token (classic)"
3. **Fill in:**
   - Note: `Kwadeyi Kitchen Deployment`
   - Expiration: `No expiration` (or choose duration)
   - Select scopes: Check **`repo`** (gives full control of repositories)
4. **Click:** "Generate token"
5. **COPY THE TOKEN** (you'll only see it once!)

6. **Update Git Remote:**
   ```bash
   cd "/Users/nombauser/Desktop/side/kwadeyi kitchen"
   
   git remote remove origin
   git remote add origin https://YOUR_TOKEN@github.com/Chukwude-ebuka/kwadeyi-kitchen.git
   ```
   
   Replace `YOUR_TOKEN` with the token you copied!

7. **Push to GitHub:**
   ```bash
   git push -u origin main
   ```

---

### **OPTION 2: GitHub CLI (Recommended)**

1. **Install GitHub CLI:**
   ```bash
   brew install gh
   ```

2. **Login:**
   ```bash
   gh auth login
   ```
   - Choose: **GitHub.com**
   - Choose: **HTTPS**
   - Authenticate: **Login with a web browser**
   - Follow the prompts

3. **Push Code:**
   ```bash
   git push -u origin main
   ```

---

### **OPTION 3: SSH Key (Advanced)**

1. **Generate SSH Key:**
   ```bash
   ssh-keygen -t ed25519 -C "your-email@example.com"
   ```

2. **Add to GitHub:**
   - Copy key: `cat ~/.ssh/id_ed25519.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste and save

3. **Update Remote:**
   ```bash
   git remote remove origin
   git remote add origin git@github.com:Chukwude-ebuka/kwadeyi-kitchen.git
   git push -u origin main
   ```

---

## 🚀 **After Successful Push:**

Once the code is on GitHub, deploy to GitHub Pages:

```bash
npm run deploy
```

Your site will be live at:
**https://Chukwude-ebuka.github.io/kwadeyi-kitchen** 🎉

---

## 💡 **Which Option Should You Choose?**

- **Easiest:** Personal Access Token (Option 1)
- **Most Secure:** GitHub CLI (Option 2)
- **For Developers:** SSH Key (Option 3)

I recommend **Option 2 (GitHub CLI)** if you have Homebrew installed!

---

Let me know which option you want to try, and I can help you with the exact commands! 😊

