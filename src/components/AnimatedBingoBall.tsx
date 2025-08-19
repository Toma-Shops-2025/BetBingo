import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBingoBallProps {
  letter: string;
  number: number;
  isCalled?: boolean;
  onClick?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const AnimatedBingoBall: React.FC<AnimatedBingoBallProps> = ({ 
  letter, 
  number, 
  isCalled = false,
  onClick,
  size = 'medium'
}) => {
  const sizeClasses = {
    small: 'w-10 h-10 text-xs',
    medium: 'w-14 h-14 text-sm',
    large: 'w-20 h-20 text-lg'
  };

  const getLetterStyle = (letter: string) => {
    switch (letter) {
      case 'B': 
        return {
          gradient: 'from-red-500 via-red-400 to-red-600',
          shadowColor: 'rgba(239, 68, 68, 0.5)',
          glowColor: '#ef4444'
        };
      case 'I': 
        return {
          gradient: 'from-orange-500 via-orange-400 to-yellow-500',
          shadowColor: 'rgba(249, 115, 22, 0.5)',
          glowColor: '#f97316'
        };
      case 'N': 
        return {
          gradient: 'from-green-500 via-green-400 to-emerald-500',
          shadowColor: 'rgba(34, 197, 94, 0.5)',
          glowColor: '#22c55e'
        };
      case 'G': 
        return {
          gradient: 'from-blue-500 via-blue-400 to-cyan-500',
          shadowColor: 'rgba(59, 130, 246, 0.5)',
          glowColor: '#3b82f6'
        };
      case 'O': 
        return {
          gradient: 'from-purple-500 via-purple-400 to-pink-500',
          shadowColor: 'rgba(168, 85, 247, 0.5)',
          glowColor: '#a855f7'
        };
      default: 
        return {
          gradient: 'from-gray-500 to-gray-600',
          shadowColor: 'rgba(107, 114, 128, 0.5)',
          glowColor: '#6b7280'
        };
    }
  };

  const letterStyle = getLetterStyle(letter);

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} cursor-pointer`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.15,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, rotate: -360, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        type: "spring", 
        stiffness: 200,
        delay: Math.random() * 0.2
      }}
    >
      {/* Outer glow ring */}
      <motion.div 
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle, ${letterStyle.shadowColor} 0%, transparent 70%)`,
          filter: 'blur(8px)',
        }}
        animate={isCalled ? {
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3]
        } : {}}
        transition={{
          duration: 2,
          repeat: isCalled ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
      
      {/* Main ball */}
      <motion.div
        className={`called-number relative w-full h-full rounded-full bg-gradient-to-br ${letterStyle.gradient} border-3 border-white/40 shadow-2xl flex flex-col items-center justify-center text-white font-black overflow-hidden`}
        style={{
          boxShadow: `0 0 20px ${letterStyle.shadowColor}, 0 8px 16px rgba(0, 0, 0, 0.3)`
        }}
        animate={isCalled ? {
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
          boxShadow: [
            `0 0 20px ${letterStyle.shadowColor}`,
            `0 0 40px ${letterStyle.glowColor}, 0 0 60px ${letterStyle.shadowColor}`,
            `0 0 20px ${letterStyle.shadowColor}`
          ]
        } : {}}
        transition={{
          duration: 3,
          repeat: isCalled ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        {/* Inner highlight */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-t from-transparent via-white/20 to-white/40" />
        
        {/* Letter */}
        <motion.div
          className="relative z-10 text-white font-black text-shadow-lg"
          style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}
          animate={isCalled ? {
            scale: [1, 1.3, 1],
            textShadow: [
              '0 2px 4px rgba(0, 0, 0, 0.5)',
              `0 0 10px ${letterStyle.glowColor}`,
              '0 2px 4px rgba(0, 0, 0, 0.5)'
            ]
          } : {}}
          transition={{
            duration: 1.5,
            repeat: isCalled ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          {letter}
        </motion.div>
        
        {/* Number */}
        <motion.div
          className="relative z-10 text-white font-black text-shadow-lg -mt-0.5"
          style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}
          animate={isCalled ? {
            scale: [1, 1.2, 1],
            textShadow: [
              '0 2px 4px rgba(0, 0, 0, 0.5)',
              `0 0 10px ${letterStyle.glowColor}`,
              '0 2px 4px rgba(0, 0, 0, 0.5)'
            ]
          } : {}}
          transition={{
            duration: 1.5,
            repeat: isCalled ? Infinity : 0,
            ease: "easeInOut",
            delay: 0.3
          }}
        >
          {number}
        </motion.div>

        {/* Called indicator with enhanced effects */}
        {isCalled && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full border-2 border-white shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
                boxShadow: [
                  '0 0 5px rgba(255, 235, 59, 0.5)',
                  '0 0 15px rgba(255, 235, 59, 0.8)',
                  '0 0 5px rgba(255, 235, 59, 0.5)'
                ]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.span
              className="absolute inset-0 flex items-center justify-center text-yellow-900 font-bold text-xs"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ✓
            </motion.span>
          </motion.div>
        )}
      </motion.div>

      {/* Enhanced floating sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              background: `radial-gradient(circle, ${letterStyle.glowColor} 0%, transparent 70%)`,
              left: `${10 + i * 20}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Enhanced shimmer effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 rounded-full"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 3
        }}
      />
    </motion.div>
  );
};

export default AnimatedBingoBall; 