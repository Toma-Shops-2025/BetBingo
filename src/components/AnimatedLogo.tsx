import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Star, Crown } from 'lucide-react';

const AnimatedLogo: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
      
      {/* Main logo container */}
      <motion.div
        className="relative flex items-center gap-3 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 rounded-full px-6 py-3 border border-purple-400/30 shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Left sparkle */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
        </motion.div>

        {/* Main text */}
        <motion.h1 
          className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 bg-clip-text text-transparent"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          BingoBlitz
        </motion.h1>

        {/* Right sparkle */}
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          <Sparkles className="w-8 h-8 text-yellow-400 drop-shadow-lg" />
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute -top-2 -left-2"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Star className="w-4 h-4 text-pink-400" />
        </motion.div>

        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ 
            y: [0, -8, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Zap className="w-4 h-4 text-blue-400" />
        </motion.div>

        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Crown className="w-4 h-4 text-yellow-400" />
        </motion.div>
      </motion.div>

      {/* Tagline */}
      <motion.p 
        className="text-center text-purple-200 text-lg mt-4 font-medium"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        ⚡ Where speed meets strategy!
      </motion.p>

      {/* Additional floating sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 2) * 80}%`
          }}
          animate={{ 
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-3 h-3 text-yellow-300" />
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedLogo; 