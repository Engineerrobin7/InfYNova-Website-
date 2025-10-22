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

export default function Home() {
  useEffect(() => {
    // Initialize GSAP animations and scroll triggers
    const initAnimations = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)
      
      // Smooth scroll reveal animations
      gsap.utils.toArray('.reveal').forEach((element: any) => {
        gsap.fromTo(element, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })
    }
    
    initAnimations()
  }, [])

  return (
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
  )
}