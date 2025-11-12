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
    'AI smartphone India',
    'InfYNova',
    'NovaOS',
    'AI phone',
    'best smartphone under 50000',
    'made in India phone',
    'AI camera phone',
    'Indian smartphone',
    'tech startup India',
    'Robin Singh InfYNova',
    'smartphone launch 2024',
    'AI operating system',
    'smart battery phone',
    'pre-order smartphone'
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