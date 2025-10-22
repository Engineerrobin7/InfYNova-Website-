'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Code, 
  Palette, 
  Megaphone, 
  Users, 
  MapPin, 
  Clock,
  ArrowRight,
  Filter
} from 'lucide-react'

const jobCategories = ['All', 'Tech', 'Design', 'Marketing', 'Operations']

const jobs = [
  {
    id: 1,
    title: 'Senior AI Engineer',
    category: 'Tech',
    location: 'Bangalore, India',
    type: 'Full-time',
    description: 'Lead the development of NovaOS AI features and machine learning algorithms.',
    requirements: ['5+ years ML/AI experience', 'Python, TensorFlow', 'Mobile AI optimization'],
    icon: Code,
    color: 'from-nova-blue to-cyan-400'
  },
  {
    id: 2,
    title: 'UX/UI Designer',
    category: 'Design',
    location: 'Mumbai, India',
    type: 'Full-time',
    description: 'Design intuitive and beautiful user experiences for our AI-powered smartphone interface.',
    requirements: ['3+ years UX/UI design', 'Figma, Sketch proficiency', 'Mobile design expertise'],
    icon: Palette,
    color: 'from-nova-purple to-pink-500'
  },
  {
    id: 3,
    title: 'Product Marketing Manager',
    category: 'Marketing',
    location: 'Delhi, India',
    type: 'Full-time',
    description: 'Drive go-to-market strategy and brand positioning for InfYNova products.',
    requirements: ['4+ years product marketing', 'Tech industry experience', 'Brand strategy skills'],
    icon: Megaphone,
    color: 'from-green-400 to-emerald-500'
  },
  {
    id: 4,
    title: 'Mobile App Developer',
    category: 'Tech',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description: 'Build and optimize mobile applications that integrate seamlessly with NovaOS.',
    requirements: ['React Native/Flutter', '3+ years mobile dev', 'API integration experience'],
    icon: Code,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 5,
    title: 'Operations Specialist',
    category: 'Operations',
    location: 'Chennai, India',
    type: 'Full-time',
    description: 'Streamline operations and ensure efficient product development and delivery processes.',
    requirements: ['Operations management', 'Process optimization', 'Cross-functional collaboration'],
    icon: Users,
    color: 'from-nova-blue to-nova-purple'
  },
  {
    id: 6,
    title: 'Brand Designer',
    category: 'Design',
    location: 'Pune, India',
    type: 'Contract',
    description: 'Create compelling visual identity and brand assets for InfYNova\'s marketing campaigns.',
    requirements: ['Brand design portfolio', 'Adobe Creative Suite', 'Tech brand experience'],
    icon: Palette,
    color: 'from-purple-500 to-indigo-500'
  }
]

const JobCard = ({ job, index }: { job: typeof jobs[0], index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const Icon = job.icon

  return (
    <motion.div
      className="feature-card glass rounded-2xl p-6 cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <motion.div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${job.color} p-3`}
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <Icon className="w-full h-full text-white" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-nova-blue transition-colors">
              {job.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-nova-silver">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {job.location}
              </span>
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {job.type}
              </span>
            </div>
          </div>
        </div>
        
        <motion.div
          className="text-nova-blue"
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </div>

      <p className="text-nova-silver mb-4 leading-relaxed">{job.description}</p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 pt-4 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-nova-blue mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="text-sm text-nova-silver flex items-center">
                      <div className="w-1 h-1 bg-nova-blue rounded-full mr-2" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              
              <motion.button
                className="w-full btn-ripple px-4 py-3 bg-gradient-to-r from-nova-blue to-nova-purple rounded-lg text-white font-semibold hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const CareersSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const filteredJobs = selectedCategory === 'All' 
    ? jobs 
    : jobs.filter(job => job.category === selectedCategory)

  return (
    <section className="relative py-20 lg:py-32 bg-nova-black">
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
            Join the{' '}
            <span className="block text-nova-glow">Revolution</span>
          </h2>
          <p className="text-xl text-nova-silver max-w-3xl mx-auto mb-8">
            We're building the future. Explore open roles and contribute to India's next tech revolution.
          </p>

          {/* Category filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {jobCategories.map((category) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-nova-blue to-nova-purple text-white neon-glow'
                    : 'glass text-nova-silver hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4 inline mr-2" />
                {category}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Jobs grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="wait">
            {filteredJobs.map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-nova-silver mb-6">
            Don't see a role that fits? We're always looking for exceptional talent.
          </p>
          <motion.button
            className="btn-ripple px-8 py-4 bg-gradient-to-r from-nova-blue to-nova-purple rounded-full text-white font-semibold text-lg neon-glow hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Us Your Resume
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default CareersSection