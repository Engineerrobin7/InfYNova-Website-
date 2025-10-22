'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Brain, 
  Zap, 
  Palette, 
  Leaf, 
  Network,
  Smartphone,
  Cpu,
  Eye
} from 'lucide-react'

const features = [
  {
    id: 'novaos',
    title: 'NovaOS AI',
    description: 'Smart, adaptive OS that learns your behavior and anticipates your needs.',
    icon: Brain,
    color: 'from-nova-blue to-cyan-400',
    preview: 'AI learns your patterns and optimizes performance automatically.',
    stats: '40% faster response time'
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Lightning-fast processing with AI-optimized battery efficiency.',
    icon: Zap,
    color: 'from-yellow-400 to-orange-500',
    preview: 'Neural processing unit delivers unprecedented speed.',
    stats: '2x faster than competitors'
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Futuristic, ergonomic design with premium materials and subtle motion.',
    icon: Palette,
    color: 'from-nova-purple to-pink-500',
    preview: 'Aerospace-grade materials meet elegant aesthetics.',
    stats: '99% user satisfaction'
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    description: 'Eco-conscious materials and energy-saving technology for a greener future.',
    icon: Leaf,
    color: 'from-green-400 to-emerald-500',
    preview: 'Carbon-neutral manufacturing and recyclable components.',
    stats: '80% recycled materials'
  },
  {
    id: 'integration',
    title: 'Smart Integration',
    description: 'Seamlessly connects with apps, IoT devices, and AI services.',
    icon: Network,
    color: 'from-nova-blue to-nova-purple',
    preview: 'Universal compatibility with smart home ecosystems.',
    stats: '500+ compatible devices'
  }
]

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      className="feature-card relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="glass rounded-2xl p-6 h-full relative overflow-hidden">
        {/* Background gradient on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
        />

        {/* Icon */}
        <motion.div
          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-4 mb-4 relative`}
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-full h-full text-white" />
          
          {/* Glow effect */}
          <motion.div
            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} blur-lg opacity-0 group-hover:opacity-50`}
            animate={{ opacity: isHovered ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
        <p className="text-nova-silver mb-4 leading-relaxed">{feature.description}</p>

        {/* Preview content - appears on hover */}
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-4 border-t border-white/10">
            <p className="text-sm text-nova-blue mb-2">{feature.preview}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-nova-silver">Performance</span>
              <span className="text-sm font-semibold text-nova-glow">{feature.stats}</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-white/10 rounded-full h-1 mt-2">
              <motion.div
                className={`h-1 rounded-full bg-gradient-to-r ${feature.color}`}
                initial={{ width: 0 }}
                animate={{ width: isHovered ? '85%' : 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-4 right-4 w-2 h-2 bg-nova-glow rounded-full opacity-0 group-hover:opacity-100"
          animate={{ 
            scale: isHovered ? [1, 1.5, 1] : 1,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ 
            scale: { duration: 1, repeat: Infinity },
            opacity: { duration: 0.3 }
          }}
        />
      </div>
    </motion.div>
  )
}

const FeaturesSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  return (
    <section id="features" className="relative py-20 lg:py-32 bg-nova-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-nova-blue to-nova-purple bg-clip-text text-transparent">
            Innovation at Every{' '}
            <span className="block">Touchpoint</span>
          </h2>
          <p className="text-xl text-nova-silver max-w-3xl mx-auto">
            Experience the future of mobile technology with features designed to enhance every aspect of your digital life.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="feature-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="btn-ripple px-8 py-4 bg-gradient-to-r from-nova-blue to-nova-purple rounded-full text-white font-semibold text-lg neon-glow hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesSection