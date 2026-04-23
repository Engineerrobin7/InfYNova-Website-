import type { Metadata } from 'next'
import Analytics from './components/Analytics'
import { ThemeProvider } from './components/theme-provider'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'
import { SEOSchema } from './components/seo-schema'
import { GoogleTagManager, GoogleTagManagerNoScript } from './components/google-tag-manager'
import { ApolloTracking } from './components/apollo-tracking'
import './globals.css'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ''

export const metadata: Metadata = {
  title: {
    default: 'InfYNova - The AI Phone That Thinks With You | NovaOS',
    template: '%s | InfYNova'
  },
  description: 'InfYNova: The AI phone that learns you, not data farms. Precision-engineered in India. NovaOS OS. 3+ day battery. 108MP camera. Privacy-first. Pre-order now.',
  keywords: [
    // Primary Brand Keywords
    'InfYNova', 'AI phone', 'AI smartphone', 'NovaOS',
    
    // Core Value Props
    'private AI phone', 'privacy focused smartphone', 'AI phone India', 
    'on-device AI', 'neural AI phone', 'intelligent smartphone',
    
    // Made in India Keywords
    'made in India phone', 'Indian smartphone', 'Indian tech startup',
    'Atmanirbhar phone', 'India smartphone brand', 'Indian AI phone',
    
    // Feature Keywords
    '108MP camera', '3 day battery', 'aerospace grade phone', 'precision engineered',
    '5-year updates', 'IP68 rated phone', 'fast charging phone',
    
    // Comparison Keywords
    'iPhone alternative India', 'Samsung alternative', 'OnePlus alternative',
    'Google Pixel alternative', 'best smartphone 2025',
    
    // Long-tail High-Intent
    'best private smartphone', 'phone that learns', 'AI assistant phone',
    'smartphone with privacy', 'encrypted phone', 'secure AI phone',
    
    // Trending
    'AI phone 2025', 'new smartphone India', 'phone launch 2025',
  ],
  authors: [{ name: 'InfYNova Team', url: 'https://infynova.in/about' }],
  creator: 'InfYNova',
  publisher: 'InfYNova',
  metadataBase: new URL('https://infynova.in'),
  alternates: {
    canonical: 'https://infynova.in',
  },
  openGraph: {
    title: 'InfYNova - The AI Phone That Thinks With You',
    description: 'Precision-engineered in India. Neural AI that learns you. NovaOS. 3+ day battery. Privacy-first. Pre-order now.',
    url: 'https://infynova.in',
    siteName: 'InfYNova',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InfYNova - The AI Phone That Thinks With You',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InfYNova - The AI Phone That Thinks With You',
    description: 'Neural AI. Privacy-first. Made in India. Pre-order now.',
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
        <GoogleTagManager gtmId={GTM_ID} />
        <ApolloTracking />
        <link rel="canonical" href="https://infynova.in" />
        <link rel="icon" href="/logo.svg" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <GoogleTagManagerNoScript gtmId={GTM_ID} />
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