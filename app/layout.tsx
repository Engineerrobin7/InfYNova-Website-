import type { Metadata } from 'next'
import Analytics from './components/Analytics'
import { ThemeProvider } from './components/theme-provider'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'InfYNova - Building India\'s Next AI Smartphone',
  description: 'Redefining technology, one smart move at a time. InfYNova creates AI-powered smartphones that feel alive, intuitive, and human-centric.',
  keywords: 'AI smartphone, India, technology, innovation, NovaOS, Robin Singh, InfYNova',
  authors: [{ name: 'InfYNova Team' }],
  metadataBase: new URL('https://infynova.in'),
  verification: {
    google: 'your-google-verification-code-here', // Add when you get it from Google Search Console
    other: {
      'msvalidate.01': '0AE63B129CBCB6A872E72B4A8F1E9596',
    },
  },
  openGraph: {
    title: 'InfYNova - Building India\'s Next AI Smartphone',
    description: 'Redefining technology, one smart move at a time.',
    url: 'https://infynova.in',
    siteName: 'InfYNova',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'InfYNova AI Smartphone',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InfYNova - Building India\'s Next AI Smartphone',
    description: 'Redefining technology, one smart move at a time.',
    images: ['/og-image.jpg'],
  },
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