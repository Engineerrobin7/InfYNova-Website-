import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'InfYNova - Building India\'s Next AI Smartphone',
  description: 'Redefining technology, one smart move at a time. InfYNova creates AI-powered smartphones that feel alive, intuitive, and human-centric.',
  keywords: 'AI smartphone, India, technology, innovation, NovaOS, Robin Singh, InfYNova',
  authors: [{ name: 'InfYNova Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#00d4ff',
  openGraph: {
    title: 'InfYNova - Building India\'s Next AI Smartphone',
    description: 'Redefining technology, one smart move at a time.',
    url: 'https://infynova.com',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}