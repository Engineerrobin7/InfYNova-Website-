'use client'

import { useEffect } from 'react'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import VisionSection from './components/VisionSection'
import AboutSection from './components/AboutSection'
import CareersSection from './components/CareersSection'
import CommunitySection from './components/CommunitySection'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import ErrorBoundary from './components/ErrorBoundary'
import { initScrollTracking, initTimeTracking } from './utils/analytics'

export default function Home() {
  useEffect(() => {
    // Initialize scroll reveal animations with Intersection Observer
    const initAnimations = () => {
      const revealElements = document.querySelectorAll('.reveal')

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      })

      revealElements.forEach((element) => {
        observer.observe(element)
      })

      return () => {
        revealElements.forEach((element) => {
          observer.unobserve(element)
        })
      }
    }

    const cleanup = initAnimations()
    
    // Initialize analytics tracking
    const cleanupScroll = initScrollTracking()
    const cleanupTime = initTimeTracking()
    
    return () => {
      cleanup?.()
      cleanupScroll?.()
      cleanupTime?.()
    }
  }, [])

  return (
    <ErrorBoundary>
      <main className="relative min-h-screen bg-nova-black overflow-x-hidden">
        <ParticleBackground />
        <HeroSection />
        <FeaturesSection />
        <VisionSection />
        <AboutSection />
        <CareersSection />
        <CommunitySection />
        <Footer />
      </main>
    </ErrorBoundary>
  )
}