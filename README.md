# InfYNova - Building India's Next AI Smartphone

A premium, futuristic, and interactive website for InfYNova, an Indian AI-powered smartphone brand founded by Robin Singh. The website blends the minimal elegance of Apple, the futuristic glow and glassmorphism of Nothing, and the dynamic storytelling of OnePlus.

Welcome to InfYNova, the flagship web experience for India's next-generation AI smartphone brand.

## 🚀 Project Structure

```
InfYNova-Website/
├── frontend/                 # Next.js React frontend
│   ├── app/                 # Next.js 13+ app directory
│   │   ├── components/      # React components
│   │   │   ├── HeroSection.tsx         # Hero with 3D phone
│   │   │   ├── FeaturesSection.tsx     # Interactive features
│   │   │   ├── VisionSection.tsx       # AI ecosystem
│   │   │   ├── AboutSection.tsx        # Timeline & founder
│   │   │   ├── CareersSection.tsx      # Job listings
│   │   │   ├── CommunitySection.tsx    # Impact metrics
│   │   │   ├── Footer.tsx              # Interactive footer
│   │   │   ├── Phone3D.tsx             # 3D phone model
│   │   │   └── ParticleBackground.tsx  # Particle system
│   │   ├── globals.css      # Global styles & animations
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page
│   ├── .env.example         # Environment variables template
│   ├── .gitignore          # Git ignore rules
│   ├── package.json         # Frontend dependencies
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   ├── tsconfig.json        # TypeScript configuration
│   ├── next.config.js       # Next.js configuration
│   └── README.md           # Frontend documentation
├── backend/                 # Future backend API (Node.js/Express)
│   └── README.md           # Backend planning documentation
├── docs/                    # Project documentation
│   └── README.md           # Documentation structure
├── assets/                  # Static assets (images, videos, 3D models)
│   └── README.md           # Asset guidelines
└── README.md               # Main project documentation
```

## ✨ Features

### 🎨 Design & UI
- **Premium Glassmorphism**: Nothing-inspired transparent elements with blur effects
- **Futuristic Animations**: Smooth scroll animations, parallax effects, and micro-interactions
- **3D Interactive Elements**: Three.js/React Three Fiber 3D phone models
- **Responsive Design**: Mobile-first approach with seamless cross-device experience

### 🧠 Interactive Sections
1. **Hero Section**: 3D rotating phone with cursor-reactive lighting
2. **Features Section**: Expandable cards with micro-preview videos
3. **Vision Section**: Cinematic storytelling with AI ecosystem visualization
4. **About Section**: Horizontal draggable timeline with founder story
5. **Careers Section**: Dynamic job filtering with animated transitions
6. **Community Section**: Live impact meter with real-time statistics
7. **Footer Section**: Interactive 3D elements that react to scroll speed

### 🛠 Tech Stack
- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS animations
- **Animations**: Framer Motion, GSAP
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Icons**: Lucide React
- **Deployment**: Ready for Vercel/Netlify

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Engineerrobin7/InfYNova-Website-.git
   cd InfYNova-Website
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Key Features Implementation

### Hero Section
- 3D rotating NovaOS smartphone with hover tilt effects
- Cursor-reactive lighting and shadow effects
- Scroll-triggered phone morphing animation
- Animated background with neon gradient lines

### Features Section
- 5 interactive feature cards with hover animations
- Micro-preview videos revealed on card expansion
- Asymmetric grid layout inspired by Apple
- Smooth scroll-triggered animations

### Vision Section
- Split-screen layout with animated AI ecosystem
- Progressive text and visual reveals based on scroll depth
- Floating particle system with parallax effects
- Cinematic storytelling approach

### About Section
- Interactive horizontal timeline with drag functionality
- Founder profile with animated statistics
- Milestone cards with hover micro-interactions
- Smooth navigation controls

### Careers Section
- Dynamic job filtering by category (Tech/Design/Marketing)
- Expandable job cards with requirements and apply buttons
- Animated icons and smooth filter transitions
- Responsive grid layout

### Community Section
- Live impact meter with real-time counting animations
- Initiative cards with hover effects and statistics
- Particle background that reacts to user interaction
- Community engagement metrics

### Footer Section
- 3D interactive elements that respond to scroll speed
- Newsletter signup with animated validation
- Social media links with hover animations
- Particle system that accelerates based on scroll velocity

## 🎨 Design System

### Colors
- **Nova Black**: `#0a0a0a` - Primary background
- **Nova Midnight**: `#1a1a2e` - Secondary background
- **Nova Blue**: `#00d4ff` - Primary accent
- **Nova Purple**: `#8b5cf6` - Secondary accent
- **Nova Silver**: `#e5e7eb` - Text color
- **Nova Glow**: `#00ffff` - Highlight color

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Fallbacks**: SF Pro Display, system-ui, sans-serif
- **Weights**: 300, 400, 500, 600, 700, 800, 900

### Animations
- **Smooth Scroll**: Custom scroll behavior with easing
- **Hover Effects**: Scale, glow, and lift animations
- **Micro-interactions**: Button ripples, card expansions
- **3D Elements**: Rotation, tilt, and lighting effects

## 📱 Mobile Optimization

- **Mobile-first Design**: Optimized for touch interactions
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Touch Gestures**: Swipe navigation for timeline and carousels
- **Performance**: Optimized animations for mobile devices

## 🔧 Customization

### Adding New Sections
1. Create component in `frontend/app/components/`
2. Import and add to `frontend/app/page.tsx`
3. Add corresponding styles in `frontend/app/globals.css`

### Modifying Animations
- Edit Framer Motion configurations in component files
- Adjust GSAP animations in `useEffect` hooks
- Customize Tailwind animations in `tailwind.config.js`

### Updating Content
- Modify text content directly in component files
- Update job listings in `CareersSection.tsx`
- Change milestone data in `AboutSection.tsx`

## 🚀 Deployment

### Vercel (Recommended)
```bash
cd frontend
npm run build
# Deploy to Vercel
```

### Netlify
```bash
cd frontend
npm run build
# Deploy build folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

**InfYNova Team**
- Email: infynovaindia@gmail.com
- Website: [InfYNova.in](https://infynova.in)

---

**Built with ❤️ for India's Tech Revolution**