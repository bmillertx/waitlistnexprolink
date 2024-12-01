import { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import WaitlistModal from '../components/WaitlistModal';
import {
  VideoCameraIcon,
  GlobeAltIcon,
  ClockIcon,
  SparklesIcon,
  UserGroupIcon,
  LightBulbIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Expert Consultations',
    description: 'Connect with consultants for personalized guidance and insights.',
    icon: UserGroupIcon,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Global Reach',
    description: 'Access expertise from anywhere in the world.',
    icon: GlobeAltIcon,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Flexible Scheduling',
    description: 'Book sessions that fit your schedule.',
    icon: ClockIcon,
    gradient: 'from-green-500 to-teal-500',
  },
  {
    name: 'HD Video Quality',
    description: 'Crystal clear video consultations for better engagement.',
    icon: VideoCameraIcon,
    gradient: 'from-orange-500 to-yellow-500',
  },
  {
    name: 'Early Access Benefits',
    description: 'Exclusive perks and reduced rates for early adopters.',
    icon: SparklesIcon,
    gradient: 'from-red-500 to-pink-500',
  },
  {
    name: 'Innovation Focus',
    description: 'Cutting-edge platform built for modern consultation needs.',
    icon: LightBulbIcon,
    gradient: 'from-indigo-500 to-purple-500',
  },
];

const floatingImages = [
  'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=800&auto=format', // Speaker presenting on large stage
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format', // Team collaboration in modern office
  'https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=800&auto=format', // Professional woman with laptop
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Head>
        <title>NexProLink - Join the Future of Professional Consultation</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(66,108,245,0.1),rgba(66,108,245,0)_50%)]" />
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500/20 rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <main className="relative">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center relative z-10"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6 px-4">
                The Future of Professional
                <br className="hidden sm:block" />
                Consultation is Here
              </h1>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-10 px-4">
                Join the waitlist for NexProLink and be among the first to experience
                the next generation of professional consultation platform.
              </p>
              
              {/* Floating Images */}
              <div className="relative h-60 sm:h-80 my-8 sm:my-16">
                {floatingImages.map((img, index) => (
                  <motion.div
                    key={index}
                    className="absolute w-48 sm:w-64 h-32 sm:h-40 rounded-xl overflow-hidden shadow-2xl"
                    style={{
                      left: `${10 + index * 35}%`,
                      top: '50%',
                      zIndex: 3 - index,
                      transform: `translateY(-50%) scale(${index === 0 ? 1 : 0.9 - index * 0.1})`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      rotate: [0, index % 2 === 0 ? 2 : -2, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-60" />
                    <img
                      src={img}
                      alt={[
                        "Speaker presenting on large stage",
                        "Team collaboration in modern office",
                        "Professional woman with laptop"
                      ][index]}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white overflow-hidden shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                <span className="relative z-10">Join Early Access</span>
                <motion.span
                  className="absolute right-4 flex items-center ml-2 text-white"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </motion.span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>

            {/* Features Grid */}
            <div className="mt-20 sm:mt-32 px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setHoveredFeature(index)}
                    onHoverEnd={() => setHoveredFeature(null)}
                    className="relative group"
                  >
                    <motion.div
                      className={`relative rounded-2xl p-4 sm:p-6 bg-gray-800/50 border border-gray-700 backdrop-blur-sm overflow-hidden
                        ${hoveredFeature === index ? 'scale-102 sm:scale-105' : 'scale-100'}`}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2 mb-4`}>
                        <feature.icon className="h-8 w-8 text-white" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                        {feature.name}
                      </h3>
                      <p className="text-gray-400">{feature.description}</p>
                      
                      {/* Animated corner accent */}
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-12 h-12"
                        initial={false}
                        animate={hoveredFeature === index ? { scale: 1 } : { scale: 0 }}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-50 rotate-45 transform origin-bottom-right`} />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-3"
            >
              {[
                { 
                  label: 'Early Bird Offer', 
                  value: '10%',
                  description: 'off platform fees for first 6 months'
                },
                { 
                  label: 'Launch Timeline', 
                  value: 'Q3 2025',
                  description: 'secure your spot early'
                },
                { 
                  label: 'Beta Access', 
                  value: 'Limited',
                  description: 'exclusive spots for early adopters'
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div
                    className="mt-2 text-gray-300 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.2 }}
                  >
                    {stat.label}
                  </motion.div>
                  <motion.div
                    className="mt-1 text-sm text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {stat.description}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {isModalOpen && <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
