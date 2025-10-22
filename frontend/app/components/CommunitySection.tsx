'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Brain, 
  Leaf, 
  Users, 
  Smartphone,
  TrendingUp,
  Globe,
  Zap,
  Heart
} from 'lucide-react'

const impactStats = [
  {
    id: 'ai-usage',
    label: 'AI Interactions',
    value: 2847392,
    increment: 1247,
    icon: Brain,
    color: 'from-nova-blue to-cyan-400',
    suffix: ''
  },
  {
    id: 'sustainability',
    label: 'CO₂ Saved',
    value: 15847,
    increment: 23,
    icon: Leaf,
    color: 'from-green-400 to-emerald-500',
    suffix: 'kg'
  },
  {
    id: 'community',
    label: 'Community Members',
    value: 89432,
    increment: 156,
    icon: Users,
    color: 'from-nova-purple to-pink-500',
    suffix: ''
  },
  {
    id: 'devices',
    label: 'Devices Connected',
    value: 12847,
    increment: 47,
    icon: Smartphone,
    color: 'from-yellow-400 to-orange-500',
    suffix: ''
  }
]

const initiatives = [
  {
    title: 'AI for Education',
    description: 'Providing AI-powered learning tools to underserved communities across India.',
    icon: Brain,
    color: 'from-nova-blue to-cyan-400',
    stats: '50,000+ students impacted'
  },
  {
    title: 'Green Technology',
    description: 'Developing sustainable manufacturing processes and eco-friendly materials.',
    icon: Leaf,
    color: 'from-green-400 to-emerald-500',
    stats: '80% recycled materials'
  },
  {
    title: 'Developer Community',
    description: 'Supporting Indian developers with tools, resources, and mentorship programs.',
    icon: Users,
    color: 'from-nova-purple to-pink-500',
    stats: '10,000+ developers'
  },
  {
    title: 'Digital Inclusion',
    description: 'Making advanced technology accessible to rural and remote areas of India.',
    icon: Globe,
    color: 'from-yellow-400 to-orange-500',
    stats: '500+ villages connected'
  }
]

const ImpactMeter = ({ stat }: { stat: typeof impactStats[0] }) => {
  const [currentValue, setCurrentValue] = useState(stat.value - 10000)
  const [ref, inView] = useInView({ threshold: 0.5 })
  const Icon = stat.icon

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCurrentValue(prev => {
          if (prev < stat.value) {
            return Math.min(prev + stat.increment, stat.value)
          }
          return stat.value
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [inView, stat.value, stat.increment])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toLocaleString()
  }

  return (
    <motion.div
      ref={ref}
      className="glass rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} p-4`}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8 }}
      >
        <Icon className="w-full h-full text-white" />
      </motion.div>

      <motion.div
        className="text-3xl font-bold text-white mb-2"
        key={currentValue}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {formatNumber(currentValue)}{stat.suffix}
      </motion.div>

      <div className="text-nova-silver text-sm">{stat.label}</div>

      {/* Progress bar */}
      <div className="w-full bg-white/10 rounded-full h-2 mt-4">
        <motion.div
          className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
          initial={{ width: 0 }}
          animate={{ width: inView ? '100%' : 0 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </div>
    </motion.div>
  )
}

const InitiativeCard = ({ initiative, index }: { initiative: typeof initiatives[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
  const Icon = initiative.icon

  return (
    <motion.div
      className="glass rounded-2xl p-6 group cursor-pointer"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      <div className="flex items-start space-x-4">
        <motion.div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${initiative.color} p-3 flex-shrink-0`}
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-full h-full text-white" />
        </motion.div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-nova-blue transition-colors">
            {initiative.title}
          </h3>
          <p className="text-nova-silver mb-4 leading-relaxed">
            {initiative.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-nova-glow">
              {initiative.stats}
            </span>
            <motion.div
              className="text-nova-blue"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <TrendingUp className="w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <motion.div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${initiative.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        animate={{ opacity: isHovered ? 0.05 : 0 }}
      />
    </motion.div>
  )
}

const CommunitySection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  return (
    <section className="relative py-20 lg:py-32 bg-nova-gradient overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-nova-blue rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 6,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-nova-blue to-nova-purple bg-clip-text text-transparent">
            Innovation That{' '}
            <span className="block text-nova-glow">Matters</span>
          </h2>
          <p className="text-xl text-nova-silver max-w-3xl mx-auto">
            Our commitment to AI innovation, sustainability, and community impact drives everything we do.
          </p>
        </motion.div>

        {/* Impact Meter */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Live Impact Meter</h3>
            <p className="text-nova-silver">Real-time metrics showing our positive impact</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat) => (
              <ImpactMeter key={stat.id} stat={stat} />
            ))}
          </div>
        </motion.div>

        {/* Initiatives */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Our Initiatives</h3>
            <p className="text-nova-silver">Building a better future through technology and community</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <InitiativeCard key={initiative.title} initiative={initiative} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            className="btn-ripple px-8 py-4 bg-gradient-to-r from-nova-blue to-nova-purple rounded-full text-white font-semibold text-lg neon-glow hover:scale-105 transition-all duration-300 mr-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-5 h-5 inline mr-2" />
            Join Our Community
          </motion.button>
          
          <motion.button
            className="btn-ripple px-8 py-4 glass rounded-full text-nova-blue font-semibold text-lg hover:bg-nova-blue/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More About Our Impact
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default CommunitySection