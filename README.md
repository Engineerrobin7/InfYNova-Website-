# 🚀 InfYNova - India's First AI-Powered Smartphone

> Redefining technology, one smart move at a time. InfYNova creates AI-powered smartphones that feel alive, intuitive, and human-centric.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://infynova.in)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

### 🎯 Core Features
- **Modern Design**: Sleek, responsive design with dark/light theme support
- **Interactive UI**: Smooth animations and transitions using Framer Motion
- **Performance Optimized**: Built with Next.js 15 and optimized for speed
- **Mobile First**: Fully responsive design for all devices
- **SEO Optimized**: Comprehensive structured data, sitemap, and meta tags

### 📊 Analytics & Tracking
- **Google Tag Manager**: Complete GTM integration (GTM-WLND224Z)
- **Google Analytics**: GA4 tracking (G-E0Y5RMLEKL)
- **Apollo.io**: Website visitor tracking
- **Microsoft Clarity**: User behavior analytics
- **Custom Events**: Challenge submissions, pre-orders, newsletter signups

### 🎮 Viral Challenges System
- **User Submission**: Users can submit their social media posts
- **Admin Dashboard**: Review and verify challenge entries at `/admin/challenges`
- **Engagement Tracking**: Automatic calculation of likes, comments, shares
- **Duplicate Prevention**: Smart detection of duplicate submissions
- **Real-time Stats**: Live statistics and filtering

### 🔐 Authentication & User Management
- **Firebase Authentication**: Email/password authentication
- **User Dashboard**: Personalized dashboard for registered users
- **Secure Storage**: User data stored in Cloud Firestore
- **Email Verification**: Secure account verification

### 🏆 Product Hunt Integration
- **Featured Badges**: Product Hunt badges on 5 strategic locations
- **Optimized Images**: Next.js Image optimization for fast loading
- **Social Proof**: Showcase Product Hunt feature across the site

### 🔍 SEO & Performance
- **Structured Data**: Organization, Product, Website, Breadcrumb schemas
- **Optimized Sitemap**: Comprehensive sitemap with all pages
- **Robots.txt**: Optimized for search engine crawling
- **Image Optimization**: AVIF/WebP format support
- **Compression**: Gzip compression enabled
- **Performance Monitoring**: Web Vitals tracking

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.1.3 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **3D Graphics**: Three.js + React Three Fiber

### Backend & Database
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **Admin SDK**: Firebase Admin (server-side)
- **API Routes**: Next.js API Routes

### Analytics & Tracking
- **Tag Management**: Google Tag Manager
- **Analytics**: Google Analytics 4
- **Visitor Tracking**: Apollo.io
- **Behavior Analytics**: Microsoft Clarity

### Deployment & Infrastructure
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions (auto-deploy)
- **Domain**: Custom domain support
- **SSL**: Automatic HTTPS

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase account
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/infynova-website.git
   cd infynova-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

   Add your credentials:
   ```env
   # Firebase (Client-side)
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Firebase Admin (Server-side)
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

   # Analytics
   NEXT_PUBLIC_GTM_ID=GTM-WLND224Z
   NEXT_PUBLIC_GA_ID=G-E0Y5RMLEKL
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

## 📦 Build & Deploy

### Local Build
```bash
npm run build
npm start
```

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Add Environment Variables in Vercel**
   - Go to Project Settings → Environment Variables
   - Add all variables from `.env.local`
   - Redeploy

## 🎯 Key Pages & Routes

### Public Pages
- `/` - Homepage with all features
- `/about` - About InfYNova
- `/features` - Product features
- `/novaos` - NovaOS information
- `/pre-order` - Pre-order page
- `/blog` - Blog posts
- `/press` - Press kit
- `/contact` - Contact form
- `/careers` - Career opportunities

### User Pages
- `/dashboard` - User dashboard (requires auth)

### Admin Pages
- `/admin/challenges` - Challenge management dashboard

### API Routes
- `/api/track-hashtag` - Submit/retrieve challenge entries
- `/api/verify-entry` - Verify and reward entries (admin)
- `/api/cron/track-hashtags` - Automated hashtag tracking

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Generate service account key for Admin SDK
5. Add credentials to `.env.local`

### GTM Setup

1. Create GTM container at [tagmanager.google.com](https://tagmanager.google.com/)
2. Add GTM ID to environment variables
3. Configure tags in GTM dashboard
4. Publish container

### Firestore Collections

The app uses these Firestore collections:
- `users` - User profiles
- `newsletter_subscribers` - Newsletter signups
- `hashtag_entries` - Challenge submissions

## 📊 Analytics Events

The following events are tracked:
- `pageview` - Page views (automatic)
- `challenge_submission` - Challenge form submissions
- `newsletter_signup` - Newsletter subscriptions
- `pre_order` - Pre-order submissions
- `button_click` - Important button clicks
- `form_submission` - Form submissions

## 🎨 Customization

### Challenges

Edit challenges in `app/components/viral-challenges.tsx`:
```typescript
const challenges = [
  {
    id: 1,
    title: "#YourChallenge",
    description: "Your description",
    prize: "₹10,000",
    // ... more config
  }
];
```

### Theme

Customize colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#00d4ff',
      accent: '#ff00ff',
      // ... more colors
    }
  }
}
```

## 🐛 Troubleshooting

### GTM Not Loading
- Verify `NEXT_PUBLIC_GTM_ID` is set in Vercel
- Check browser console for errors
- Test with GTM Preview mode

### Challenge Submissions Failing
- Verify Firebase Admin credentials are set
- Check Firestore security rules
- Review API logs in Vercel

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Links

- **Website**: [https://infynova.in](https://infynova.in)
- **Product Hunt**: [https://www.producthunt.com/products/infynova](https://www.producthunt.com/products/infynova)
- **Instagram**: [@infynova_tech](https://instagram.com/infynova_tech)
- **Twitter**: [@infynova_tech](https://twitter.com/infynova_tech)
- **LinkedIn**: [InfYNova](https://linkedin.com/company/infynova-tech)

## 📞 Support

For support, email [infynovaindia@gmail.com](mailto:infynovaindia@gmail.com) or join our community.

---

**Built with ❤️ by the InfYNova Team**

Made in India 🇮🇳 | Powered by Next.js ⚡ | Deployed on Vercel 🚀