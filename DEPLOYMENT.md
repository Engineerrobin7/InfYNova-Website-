# 🚀 InfYNova Website Deployment Guide

Deploy your premium InfYNova website to **infynova.in** domain using Vercel.

## 📋 Prerequisites

- ✅ GitHub repository: `https://github.com/Engineerrobin7/InfYNova-Website-.git`
- ✅ Domain: `infynova.in` (purchased)
- ✅ Vercel account (free)

## 🌐 **Method 1: Deploy with Vercel (Recommended)**

### **Step 1: Create Vercel Account**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Connect your GitHub repository

### **Step 2: Import Project**
1. Click "New Project" in Vercel dashboard
2. Import from GitHub: `Engineerrobin7/InfYNova-Website-`
3. Set **Root Directory** to `frontend`
4. Framework Preset: **Next.js** (auto-detected)
5. Build Command: `npm run build`
6. Output Directory: `.next`

### **Step 3: Configure Environment Variables**
Add these in Vercel project settings:
```
NEXT_PUBLIC_SITE_URL=https://infynova.in
NEXT_PUBLIC_GA_ID=G-E0Y5RMLEKL
NEXT_PUBLIC_CONTACT_EMAIL=infynovaindia@gmail.com
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### **Step 4: Deploy**
1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Get temporary Vercel URL (e.g., `infynova-website.vercel.app`)

### **Step 5: Connect Custom Domain**
1. Go to Project Settings → Domains
2. Add custom domain: `infynova.in`
3. Add `www.infynova.in` (optional)
4. Vercel will provide DNS records

## 🔧 **DNS Configuration**

### **For Domain Provider (where you bought infynova.in):**

Add these DNS records:

**A Records:**
```
Type: A
Name: @
Value: 76.76.19.61
TTL: 3600
```

**CNAME Records:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

**Alternative (if A record doesn't work):**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: 3600
```

## 🌟 **Method 2: Deploy with Netlify**

### **Step 1: Connect Repository**
1. Go to [netlify.com](https://netlify.com)
2. "New site from Git" → GitHub
3. Select `InfYNova-Website-` repository

### **Step 2: Build Settings**
```
Base directory: frontend
Build command: npm run build
Publish directory: frontend/.next
```

### **Step 3: Environment Variables**
Add in Netlify dashboard:
```
NEXT_PUBLIC_SITE_URL=https://infynova.in
NEXT_PUBLIC_GA_ID=G-E0Y5RMLEKL
```

### **Step 4: Custom Domain**
1. Site Settings → Domain Management
2. Add custom domain: `infynova.in`
3. Configure DNS as provided by Netlify

## 📱 **Method 3: Manual Steps (If you prefer manual deployment)**

### **Step 1: Build Locally**
```bash
cd frontend
npm install
npm run build
npm run export  # If using static export
```

### **Step 2: Upload to Hosting**
Upload the `frontend/.next` or `frontend/out` folder to your hosting provider.

## ✅ **Post-Deployment Checklist**

After deployment, verify:

- [ ] Website loads at `https://infynova.in`
- [ ] All animations work smoothly
- [ ] Mobile responsiveness
- [ ] Google Analytics tracking
- [ ] All sections display correctly
- [ ] Contact forms work (if implemented)
- [ ] SSL certificate is active (https)

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **Build Fails:**
   - Check Node.js version (use 18+)
   - Verify all dependencies in package.json
   - Check for TypeScript errors

2. **Domain Not Working:**
   - DNS propagation takes 24-48 hours
   - Check DNS records with online tools
   - Verify domain ownership

3. **Analytics Not Working:**
   - Check GA_ID in environment variables
   - Verify Google Analytics setup
   - Check browser console for errors

## 🚀 **Quick Deploy Commands**

```bash
# Clone repository
git clone https://github.com/Engineerrobin7/InfYNova-Website-.git
cd InfYNova-Website-/frontend

# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm start
```

## 📞 **Support**

If you need help with deployment:
- Email: infynovaindia@gmail.com
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)

---

**Your premium InfYNova website will be live at https://infynova.in! 🌟**