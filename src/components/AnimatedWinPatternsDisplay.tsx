import React from 'react';
import { motion } from 'framer-motion';

interface WinPattern {
  name: string;
  icon: string;
  color: string;
  gradient: string;
}

const AnimatedWinPatternsDisplay: React.FC = () => {
  const winPatterns: WinPattern[] = [
    { 
      name: 'Horizontal', 
      icon: '━', 
      color: 'text-cyan-300',
      gradient: 'from-purple-600/30 via-blue-500/40 to-cyan-500/30'
    },
    { 
      name: 'Vertical', 
      icon: '┃', 
      color: 'text-blue-300',
      gradient: 'from-blue-600/30 via-purple-500/40 to-blue-500/30'
    },
    { 
      name: 'Diagonal', 
      icon: '╱', 
      color: 'text-purple-300',
      gradient: 'from-purple-600/40 via-pink-500/30 to-purple-500/40'
    },
    { 
      name: 'Diamond', 
      icon: '◆', 
      color: 'text-pink-300',
      gradient: 'from-pink-600/30 via-purple-500/40 to-blue-500/30'
    },
    { 
      name: 'Four Corners', 
      icon: '□', 
      color: 'text-indigo-300',
      gradient: 'from-indigo-600/30 via-purple-500/40 to-blue-600/30'
    },
    { 
      name: 'X Pattern', 
      icon: '╳', 
      color: 'text-violet-300',
      gradient: 'from-violet-600/30 via-purple-500/40 to-pink-500/30'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-6"
    >
      <motion.div
        className="relative bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-indigo-900/40 backdrop-blur-xl rounded-2xl border border-purple-400/30 p-6 shadow-2xl overflow-hidden"
        style={{
          boxShadow: '0 0 40px rgba(147, 51, 234, 0.3), 0 20px 40px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Enhanced glowing background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
        
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.3, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>

        {/* Header */}
        <motion.div
          className="relative z-10 text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-white font-bold text-xl flex items-center justify-center gap-3">
            <motion.span 
              className="text-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              🏆
            </motion.span>
            Win Patterns
            <motion.span 
              className="text-2xl"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              🏆
            </motion.span>
          </h3>
        </motion.div>

        {/* Patterns Grid */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4">
          {winPatterns.map((pattern, index) => (
            <motion.div
              key={pattern.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              className="relative group"
            >
              <div className={`relative bg-gradient-to-br ${pattern.gradient} backdrop-blur-md rounded-xl border border-purple-400/30 p-4 text-center shadow-lg group-hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                {/* Enhanced hover glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                
                {/* Pattern Icon */}
                <motion.div 
                  className={`relative z-10 text-3xl font-bold ${pattern.color} mb-2`}
                  animate={{
                    scale: [1, 1.1, 1],
                    textShadow: [
                      '0 0 10px rgba(147, 51, 234, 0.5)',
                      '0 0 20px rgba(59, 130, 246, 0.8)',
                      '0 0 10px rgba(147, 51, 234, 0.5)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                >
                  {pattern.icon}
                </motion.div>
                
                {/* Pattern Name */}
                <span className={`relative z-10 text-sm font-medium ${pattern.color}`}>
                  {pattern.name}
                </span>

                {/* Floating sparkles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                      style={{
                        left: `${30 + i * 20}%`,
                        top: `${30 + i * 15}%`,
                      }}
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.5, 1]
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        repeat: Infinity,
                        delay: Math.random() * 2 + index * 0.1
                      }}
                    />
                  ))}
                </div>

                {/* Shimmer effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 rounded-xl"
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 3 + index * 0.2
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pulsing border effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-purple-400/50"
          animate={{
            borderColor: [
              'rgba(147, 51, 234, 0.5)',
              'rgba(59, 130, 246, 0.8)',
              'rgba(147, 51, 234, 0.5)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default AnimatedWinPatternsDisplay; 