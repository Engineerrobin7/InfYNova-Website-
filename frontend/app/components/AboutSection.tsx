'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronLeft, ChevronRight, Calendar, Users, Award, Rocket } from 'lucide-react'

const milestones = [
  {
    year: '2023',
    title: 'Foundation',
    description: 'InfYNova founded by Robin Singh with a vision to revolutionize Indian smartphone technology.',
    icon: Rocket,
    color: 'from-nova-blue to-cyan-400'
  },
  {
    year: '2023',
    title: 'Team Building',
    description: 'Assembled a world-class team of AI engineers, designers, and product specialists.',
    icon: Users,
    color: 'from-nova-purple to-pink-500'
  },
  {
    year: '2024',
    title: 'NovaOS Development',
    description: 'Breakthrough in AI-powered mobile operating system with adaptive learning capabilities.',
    icon: Award,
    color: 'from-green-400 to-emerald-500'
  },
  {
    year: '2024',
    title: 'Prototype Launch',
    description: 'First working prototype showcases revolutionary AI integration and user experience.',
    icon: Calendar,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    year: '2025',
    title: 'Market Entry',
    description: 'Preparing for commercial launch with pre-orders and strategic partnerships.',
    icon: Rocket,
    color: 'from-nova-blue to-nova-purple'
  }
]

const TimelineCard = ({ milestone, index, isActive }: { 
  milestone: typeof milestones[0], 
  index: number, 
  isActive: boolean 
}) => {
  const Icon = milestone.icon

  return (
    <motion.div
      className={`flex-shrink-0 w-80 p-6 rounded-2xl transition-all duration-500 ${
        isActive ? 'glass border-nova-blue/50 scale-105' : 'bg-white/5 border-white/10'
      } border`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex items-center mb-4">
        <motion.div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${milestone.color} p-3 mr-4`}
          animate={{ rotate: isActive ? 360 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <Icon className="w-full h-full text-white" />
        </motion.div>
        <div>
          <div className="text-2xl font-bold text-nova-blue">{milestone.year}</div>
          <div className="text-lg font-semibold text-white">{milestone.title}</div>
        </div>
      </div>
      
      <p className="text-nova-silver leading-relaxed">{milestone.description}</p>
      
      {isActive && (
        <motion.div
          className="mt-4 h-1 bg-gradient-to-r from-nova-blue to-nova-purple rounded-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      )}
    </motion.div>
  )
}

const AboutSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })
  const timelineRef = useRef<HTMLDivElement>(null)

  const scrollTimeline = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else if (direction === 'right' && currentIndex < milestones.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  return (
    <section className="relative py-20 lg:py-32 bg-nova-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-nova-blue to-nova-purple bg-clip-text text-transparent">
            Our Journey,{' '}
            <span className="block">Our Mission</span>
          </h2>
          <p className="text-xl text-nova-silver max-w-3xl mx-auto">
            Founded by Robin Singh, InfYNova is India's next-gen AI smartphone startup. 
            Combining innovation, sustainability, and user-centric design, we make devices that inspire and empower.
          </p>
        </motion.div>

        {/* Founder section */}
        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative">
            <motion.div
              className="w-64 h-64 mx-auto lg:mx-0 rounded-2xl bg-gradient-to-br from-nova-blue to-nova-purple p-1"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-full rounded-2xl bg-nova-black flex items-center justify-center">
                <div className="text-6xl font-bold text-nova-blue">RS</div>
              </div>
            </motion.div>
            
            {/* Floating elements around founder */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-nova-purple rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-6 h-6 bg-nova-blue rounded-full"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">Robin Singh</h3>
            <p className="text-lg text-nova-silver leading-relaxed">
              Visionary entrepreneur and tech innovator with over a decade of experience in AI and mobile technology. 
              Robin's passion for creating human-centric technology drives InfYNova's mission to revolutionize 
              India's smartphone landscape.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-nova-blue">10+</div>
                <div className="text-sm text-nova-silver">Years Experience</div>
              </div>
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-nova-purple">5+</div>
                <div className="text-sm text-nova-silver">Patents Filed</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline section */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Our Milestones</h3>
            <p className="text-nova-silver">The journey from vision to reality</p>
          </div>

          {/* Timeline navigation */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <motion.button
              className="p-3 rounded-full glass hover:bg-nova-blue/20 transition-colors disabled:opacity-50"
              onClick={() => scrollTimeline('left')}
              disabled={currentIndex === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6 text-nova-blue" />
            </motion.button>

            <div className="flex space-x-2">
              {milestones.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-nova-blue' : 'bg-white/30'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              className="p-3 rounded-full glass hover:bg-nova-blue/20 transition-colors disabled:opacity-50"
              onClick={() => scrollTimeline('right')}
              disabled={currentIndex === milestones.length - 1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6 text-nova-blue" />
            </motion.button>
          </div>

          {/* Timeline cards */}
          <div className="timeline-container overflow-hidden">
            <motion.div
              ref={timelineRef}
              className="flex space-x-6 pb-4"
              animate={{ x: -currentIndex * 320 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {milestones.map((milestone, index) => (
                <TimelineCard
                  key={index}
                  milestone={milestone}
                  index={index}
                  isActive={index === currentIndex}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection