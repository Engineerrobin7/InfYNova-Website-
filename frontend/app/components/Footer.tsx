'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  ArrowRight,
  Smartphone,
  Send
} from 'lucide-react'
import SimplePhone3D from './SimplePhone3D'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [scrollSpeed, setScrollSpeed] = useState(0)
  const footerRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['50px', '-50px'])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const speed = Math.abs(currentScrollY - lastScrollY.current)
      setScrollSpeed(speed)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail('')
      }, 3000)
    }
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
  ]

  return (
    <footer ref={footerRef} className="relative bg-nova-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-nova-midnight via-nova-black to-nova-black" />
        
        {/* Particle system that reacts to scroll speed */}
        {[...Array(30)].map((_, i) => {
          // Use deterministic values based on index to avoid hydration mismatch
          const positions = [
            { left: 5, top: 15 }, { left: 95, top: 85 }, { left: 25, top: 45 }, { left: 75, top: 25 },
            { left: 45, top: 75 }, { left: 15, top: 55 }, { left: 85, top: 35 }, { left: 35, top: 65 },
            { left: 65, top: 5 }, { left: 55, top: 95 }, { left: 10, top: 30 }, { left: 90, top: 70 },
            { left: 30, top: 10 }, { left: 70, top: 90 }, { left: 50, top: 50 }, { left: 20, top: 80 },
            { left: 80, top: 20 }, { left: 40, top: 60 }, { left: 60, top: 40 }, { left: 12, top: 88 },
            { left: 88, top: 12 }, { left: 32, top: 68 }, { left: 68, top: 32 }, { left: 52, top: 72 },
            { left: 72, top: 52 }, { left: 8, top: 48 }, { left: 92, top: 28 }, { left: 28, top: 92 },
            { left: 48, top: 8 }, { left: 78, top: 58 }
          ]
          const durations = [8, 10, 9, 11, 7, 12, 8.5, 9.5, 10.5, 7.5, 11.5, 8.2, 9.8, 10.2, 7.8, 11.2, 8.8, 9.2, 10.8, 7.2, 8.3, 9.7, 10.3, 7.7, 11.3, 8.7, 9.3, 10.7, 7.3, 11.7]
          const delays = [0, 2, 4, 1, 6, 3, 5, 7, 1.5, 3.5, 5.5, 7.5, 0.5, 2.5, 4.5, 6.5, 1.2, 3.2, 5.2, 7.2, 0.8, 2.8, 4.8, 6.8, 1.8, 3.8, 5.8, 7.8, 0.3, 2.3]
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-nova-blue rounded-full"
              style={{
                left: `${positions[i]?.left || 50}%`,
                top: `${positions[i]?.top || 50}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: durations[i] || 8,
                repeat: Infinity,
                delay: delays[i] || 0,
                ease: 'easeInOut',
              }}
            />
          )
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            className="space-y-8"
            style={{ y }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-nova-blue to-nova-purple bg-clip-text text-transparent">
                Connect with the{' '}
                <span className="block text-nova-glow">Future of Tech</span>
              </h2>
              <p className="text-xl text-nova-silver">
                Stay updated with InfYNova — the AI-powered smartphone revolution from India.
              </p>
            </motion.div>

            {/* Newsletter signup */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold text-white">Join the Revolution</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-nova-silver focus:outline-none focus:border-nova-blue focus:bg-white/15 transition-all duration-300"
                    required
                  />
                  <motion.div
                    className="absolute inset-0 rounded-lg border-2 border-nova-blue opacity-0 pointer-events-none"
                    animate={{ opacity: email ? 0.3 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="btn-ripple px-6 py-3 bg-gradient-to-r from-nova-blue to-nova-purple rounded-lg text-white font-semibold neon-glow hover:scale-105 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center"
                    >
                      ✓ Subscribed!
                    </motion.div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </motion.button>
              </form>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-white">Follow Us</h3>
              <div className="flex space-x-6">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className={`p-3 glass rounded-lg text-nova-silver ${social.color} transition-all duration-300 group`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    >
                      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>

            {/* Contact info */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-white">Get in Touch</h3>
              <a 
                href="mailto:infynovaindia@gmail.com"
                className="flex items-center text-nova-silver hover:text-nova-blue transition-colors group"
              >
                <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                infynovaindia@gmail.com
              </a>
            </motion.div>
          </motion.div>

          {/* Right content - 3D Interactive Element */}
          <motion.div
            className="relative h-96 lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="relative w-full h-full">
              <SimplePhone3D />
              
              {/* Glow effect that reacts to scroll */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-nova-blue to-nova-purple opacity-20 blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  animationDuration: `${Math.max(2, 4 - scrollSpeed * 0.05)}s`
                }}
              />

              {/* Floating tech elements */}
              <motion.div
                className="absolute top-10 right-10 glass rounded-lg p-2"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Smartphone className="w-6 h-6 text-nova-blue" />
              </motion.div>

              <motion.div
                className="absolute bottom-20 left-10 glass rounded-lg p-2"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <span className="text-nova-purple font-bold text-sm">AI</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-nova-blue to-nova-purple rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-white font-bold text-sm">I</span>
            </motion.div>
            <span className="text-white font-semibold">InfYNova</span>
          </div>

          <div className="text-nova-silver text-sm">
            © 2024 InfYNova. Building India's Next AI Smartphone.
          </div>

          <motion.button
            className="flex items-center text-nova-silver hover:text-nova-blue transition-colors group"
            whileHover={{ x: 5 }}
          >
            Back to Top
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer