# InfYNova Frontend

This is the frontend application for InfYNova's website built with Next.js 14, React 18, and TypeScript.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
frontend/
├── app/
│   ├── components/          # React components
│   │   ├── HeroSection.tsx         # Hero section with 3D phone
│   │   ├── FeaturesSection.tsx     # Interactive feature cards
│   │   ├── VisionSection.tsx       # AI ecosystem visualization
│   │   ├── AboutSection.tsx        # Timeline and founder info
│   │   ├── CareersSection.tsx      # Job listings with filters
│   │   ├── CommunitySection.tsx    # Impact metrics and initiatives
│   │   ├── Footer.tsx              # Interactive footer
│   │   ├── Phone3D.tsx             # 3D phone model
│   │   └── ParticleBackground.tsx  # Animated particle system
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.js           # Next.js configuration
```

## 🎨 Key Features

### Interactive Components
- **3D Phone Model**: Interactive Three.js phone with hover effects
- **Particle System**: Animated background particles
- **Smooth Animations**: Framer Motion and GSAP animations
- **Glassmorphism UI**: Modern glass-like interface elements

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interactions
- Performance optimized animations

### Modern Tech Stack
- **Next.js 14**: Latest React framework with app directory
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready motion library
- **Three.js**: 3D graphics and animations

## 🛠 Development

### Adding New Components
1. Create component in `app/components/`
2. Export from component file
3. Import in `page.tsx` or other components

### Styling Guidelines
- Use Tailwind CSS classes for styling
- Custom animations in `globals.css`
- Follow the established color scheme (Nova colors)

### Animation Guidelines
- Use Framer Motion for component animations
- GSAP for complex scroll-triggered animations
- Keep animations smooth and performant

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
```bash
npm run build
# Deploy the .next folder
```

## 📱 Mobile Optimization

- Responsive grid layouts
- Touch-optimized interactions
- Optimized animation performance
- Mobile-specific UI adjustments

## 🎯 Performance

- Optimized bundle size
- Lazy loading for components
- Efficient animation rendering
- Image optimization with Next.js

---

Built with modern web technologies for InfYNova's premium brand experience.