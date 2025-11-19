# 🎨 Create Missing Images

## Required Images

### 1. OG Image (Social Media Sharing)
**File:** `/public/og-image.jpg`  
**Size:** 1200 x 630 pixels  
**Format:** JPG or PNG  
**Purpose:** Shows when sharing on Facebook, Twitter, LinkedIn

**Content:**
- InfYNova logo
- Phone image
- Text: "India's First AI-Powered Smartphone"
- Background: Gradient (primary colors)

**Tools:**
- Canva: https://canva.com (use "Facebook Post" template, resize to 1200x630)
- Figma: https://figma.com
- Photoshop/GIMP

### 2. Logo
**File:** `/public/logo.png`  
**Size:** 512 x 512 pixels  
**Format:** PNG with transparency  
**Purpose:** Structured data, general branding

**Content:**
- InfYNova logo
- Transparent background
- High resolution

### 3. Favicon
**File:** `/public/favicon.ico`  
**Size:** 32 x 32 pixels (and 16x16)  
**Format:** ICO file  
**Purpose:** Browser tab icon

**Content:**
- Simple InfYNova icon
- Recognizable at small size

**Tools:**
- Favicon Generator: https://favicon.io/
- Upload your logo, it will generate all sizes

## Quick Fix (Temporary)

If you don't have images ready, you can:

1. **Use text-based OG image:**
   - Go to https://og-image.vercel.app/
   - Enter: "InfYNova - India's First AI Smartphone"
   - Download and save as og-image.jpg

2. **Use simple logo:**
   - Create 512x512 PNG with text "INFYNOVA"
   - Save as logo.png

3. **Use favicon generator:**
   - Go to https://favicon.io/favicon-generator/
   - Text: "IN"
   - Generate and download
   - Rename to favicon.ico

## After Creating

1. Place files in `/public/` folder:
   ```
   /public/
     ├── og-image.jpg
     ├── logo.png
     └── favicon.ico
   ```

2. Commit and push:
   ```bash
   git add public/
   git commit -m "Add missing images"
   git push origin main
   ```

3. Vercel will auto-deploy

## Verify

- OG Image: Share your site on Facebook/Twitter
- Logo: Check structured data with Google Rich Results Test
- Favicon: Check browser tab icon
