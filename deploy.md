# 🚀 InfYNova Deployment Guide

## Quick Vercel Deployment

### Method 1: Via Vercel Dashboard (Recommended)

1. **Go to**: https://vercel.com/dashboard
2. **Click**: "Add New..." → "Project"
3. **Import**: Your GitHub repository
4. **Configure**:
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **Environment Variables** (Add these):
   ```
   NEXT_PUBLIC_GA_ID=G-E0Y5RMLEKL
   NEXT_PUBLIC_SITE_URL=https://infynova-website.vercel.app
   NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_project_id
   NEXT_PUBLIC_CONTACT_EMAIL=infynovaindia@gmail.com
   ```

6. **Click**: "Deploy"

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Link to existing project? N
# - Project name: infynova-website
# - Directory: ./
# - Override settings? N
```

## Troubleshooting

### If deployment fails:
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in package.json
3. Verify environment variables are set
4. Check that the repository is public or Vercel has access

### Common Issues:
- **Build fails**: Check `npm run build` works locally
- **404 errors**: Ensure `app/page.tsx` exists
- **Environment variables**: Must start with `NEXT_PUBLIC_` for client-side

## Expected Result
- Live URL: `https://infynova-website.vercel.app`
- Auto-deployment on GitHub pushes
- SSL certificate (HTTPS)
- Global CDN