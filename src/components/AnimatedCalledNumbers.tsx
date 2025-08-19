import React from 'react';
import { motion } from 'framer-motion';
import AnimatedBingoBall from './AnimatedBingoBall';

interface CalledNumber {
  letter: string;
  number: number;
  timestamp: number;
}

interface AnimatedCalledNumbersProps {
  calledNumbers: CalledNumber[];
  maxDisplay?: number;
}

const AnimatedCalledNumbers: React.FC<AnimatedCalledNumbersProps> = ({ 
  calledNumbers, 
  maxDisplay = 10 
}) => {
  const recentNumbers = calledNumbers.slice(-maxDisplay);

  return (
    <motion.div
      className="relative bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-purple-400/30 shadow-2xl p-6 mb-6 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        boxShadow: '0 0 40px rgba(168, 85, 247, 0.3), 0 20px 40px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Enhanced glowing background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
      
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
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
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
        <motion.h3 
          className="text-white font-bold text-xl flex items-center justify-center gap-3"
          style={{ textShadow: '0 0 10px rgba(168, 85, 247, 0.5)' }}
          animate={{
            textShadow: [
              '0 0 10px rgba(168, 85, 247, 0.5)',
              '0 0 20px rgba(168, 85, 247, 0.8)',
              '0 0 10px rgba(168, 85, 247, 0.5)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span 
            className="text-3xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎯
          </motion.span>
          Called Numbers
          <motion.span 
            className="text-3xl"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            🎯
          </motion.span>
        </motion.h3>
        
        {/* Ball count indicator */}
        {recentNumbers.length > 0 && (
          <motion.div 
            className="mt-2 inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
            whileHover={{ scale: 1.05 }}
          >
            {recentNumbers.length} Ball{recentNumbers.length !== 1 ? 's' : ''} Called
          </motion.div>
        )}
      </motion.div>

      {/* Numbers grid */}
      <div className="relative z-10">
        {recentNumbers.length === 0 ? (
          <motion.div
            className="text-center text-white/80 py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="text-6xl mb-4"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🎲
            </motion.div>
            <p className="text-xl font-semibold mb-2">No numbers called yet</p>
            <p className="text-purple-300">Get ready for the first number!</p>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-5 gap-3 justify-items-center"
            layout
          >
            {recentNumbers.map((calledNumber, index) => (
              <motion.div
                key={`${calledNumber.letter}-${calledNumber.number}-${calledNumber.timestamp}`}
                initial={{ opacity: 0, scale: 0, rotate: -360 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3 + index * 0.1,
                  type: "spring",
                  stiffness: 150
                }}
                whileHover={{ 
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.3 }
                }}
                layout
              >
                <AnimatedBingoBall
                  letter={calledNumber.letter}
                  number={calledNumber.number}
                  isCalled={true}
                  size="medium"
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Enhanced floating sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${15 + i * 7}%`,
              top: `${20 + i * 6}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 2, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Enhanced shimmer effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 rounded-2xl"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 5
        }}
      />
      
      {/* Pulsing border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-purple-400/50"
        animate={{
          borderColor: [
            'rgba(168, 85, 247, 0.5)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(168, 85, 247, 0.5)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default AnimatedCalledNumbers; 