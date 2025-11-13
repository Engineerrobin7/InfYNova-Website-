import type { Metadata } from 'next'
import Analytics from './components/Analytics'
import { ThemeProvider } from './components/theme-provider'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'
import { SEOSchema } from './components/seo-schema'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'InfYNova - India\'s First AI-Powered Smartphone | NovaOS',
    template: '%s | InfYNova'
  },
  description: 'Experience India\'s first AI-powered smartphone with NovaOS. Revolutionary AI features, 108MP camera, 5-year updates. Pre-order now from ₹29,999. Made in India for the world.',
  keywords: [
    // Brand Keywords
    'InfYNova', 'InfyNova', 'Infynova phone', 'NovaOS', 'Nova OS',
    
    // AI Keywords (High Volume)
    'AI smartphone', 'AI phone', 'AI powered smartphone', 'artificial intelligence phone',
    'AI smartphone India', 'AI phone India', 'smartphone with AI', 'AI mobile phone',
    'AI camera phone', 'AI assistant phone', 'AI features phone',
    
    // India Keywords (High Intent)
    'made in India phone', 'Indian smartphone', 'Indian phone brand', 'India smartphone',
    'best Indian smartphone', 'Indian mobile phone', 'made in India mobile',
    'Indian tech startup', 'Indian smartphone brand', 'Atmanirbhar phone',
    
    // Price Keywords (High Conversion)
    'best smartphone under 50000', 'best phone under 50000', 'smartphone under 50k',
    'best smartphone under 40000', 'best phone under 40000', 'affordable AI phone',
    'best value smartphone', 'budget AI smartphone', 'cheap AI phone',
    
    // Feature Keywords
    '108MP camera phone', '5000mAh battery phone', '120Hz display phone',
    'Snapdragon 8 Gen 3 phone', 'fast charging phone', 'wireless charging phone',
    '5G smartphone India', 'dual SIM phone', 'expandable storage phone',
    
    // Comparison Keywords (High Intent)
    'InfyNova vs iPhone', 'InfyNova vs Samsung', 'InfyNova vs OnePlus',
    'best alternative to iPhone', 'iPhone competitor India', 'Samsung alternative',
    'OnePlus alternative', 'Xiaomi alternative', 'best phone 2024',
    
    // Trending Keywords
    'smartphone 2024', 'new smartphone launch', 'latest smartphone', 'upcoming phone',
    'phone launch 2024', 'new phone India', 'latest mobile phone', 'trending phone',
    
    // Long-tail Keywords (Easy to Rank)
    'smartphone with phone builder game', 'AR try-on smartphone', 'phone with AR',
    'smartphone community voting', 'interactive smartphone website', 'gamified phone',
    'smartphone with challenges', 'phone referral program', 'earn money phone',
    
    // OS Keywords
    'custom Android OS', 'Android 14 phone', 'best Android phone', 'Android smartphone',
    'custom ROM phone', 'stock Android phone', 'clean Android phone',
    
    // Tech Keywords
    'tech startup India', 'Indian tech company', 'startup phone', 'tech innovation India',
    'Indian innovation', 'Make in India phone', 'Aatmanirbhar Bharat phone',
    
    // Use Case Keywords
    'best phone for photography', 'best phone for gaming', 'best phone for students',
    'best phone for professionals', 'best phone for content creators',
    
    // Problem-Solution Keywords
    'phone with best battery life', 'phone with best camera', 'fastest phone',
    'most secure phone', 'privacy focused phone', 'phone with best AI',
    
    // Location Keywords
    'smartphone Mumbai', 'smartphone Delhi', 'smartphone Bangalore', 'smartphone India',
    'buy smartphone online India', 'smartphone online shopping',
    
    // Action Keywords (High Intent)
    'pre-order smartphone', 'buy AI phone', 'order smartphone online',
    'smartphone pre-booking', 'reserve smartphone', 'book phone online',
    
    // Review Keywords
    'InfyNova review', 'NovaOS review', 'AI smartphone review', 'phone review 2024',
    'best smartphone review', 'honest phone review', 'unbiased phone review',
    
    // Viral Keywords
    'phone game win money', 'smartphone giveaway', 'phone contest', 'win free phone',
    'phone challenge', 'viral phone', 'trending smartphone',
    
    // Social Keywords
    'InfyNova Instagram', 'InfyNova Twitter', 'InfyNova YouTube',
    'smartphone social media', 'phone influencer', 'tech influencer India'
  ],
  authors: [{ name: 'InfYNova Team', url: 'https://infynova.in/about' }],
  creator: 'InfYNova',
  publisher: 'InfYNova',
  metadataBase: new URL('https://infynova.in'),
  alternates: {
    canonical: 'https://infynova.in',
  },
  verification: {
    google: 'your-google-verification-code-here', // Add when you get it from Google Search Console
    other: {
      'msvalidate.01': '0AE63B129CBCB6A872E72B4A8F1E9596',
    },
  },
  openGraph: {
    title: 'InfYNova - India\'s First AI-Powered Smartphone',
    description: 'Revolutionary AI smartphone with NovaOS. Pre-order now from ₹29,999. Made in India.',
    url: 'https://infynova.in',
    siteName: 'InfYNova',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InfYNova AI Smartphone - Made in India',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InfYNova - India\'s First AI-Powered Smartphone',
    description: 'Revolutionary AI smartphone with NovaOS. Pre-order now from ₹29,999.',
    images: ['/og-image.jpg'],
    creator: '@infynova_tech',
    site: '@infynova_tech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00d4ff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Analytics />
        <SEOSchema />
        <link rel="canonical" href="https://infynova.in" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}