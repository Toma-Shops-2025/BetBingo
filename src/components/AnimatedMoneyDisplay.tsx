import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Gift, Coins } from 'lucide-react';

interface AnimatedMoneyDisplayProps {
  amount: number;
  title?: string;
  showFloatingBills?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const AnimatedMoneyDisplay: React.FC<AnimatedMoneyDisplayProps> = ({ 
  amount, 
  title = "Balance",
  showFloatingBills = true,
  size = 'medium'
}) => {
  const formatAmount = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  const sizeClasses = {
    small: 'text-2xl',
    medium: 'text-4xl',
    large: 'text-6xl'
  };

  return (
    <motion.div 
      className="coin-display relative bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-yellow-600/20 backdrop-blur-xl rounded-2xl border-2 border-yellow-400/40 shadow-2xl overflow-hidden p-6"
      initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
      whileHover={{ 
        scale: 1.03,
        rotateY: [0, 5, -5, 0],
        transition: { duration: 0.3 }
      }}
      style={{
        boxShadow: '0 0 40px rgba(251, 191, 36, 0.4), 0 20px 40px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Enhanced glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 via-orange-400/30 to-yellow-500/30 rounded-2xl blur-xl"></div>
      
      {/* Pulsing outer glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Floating coins instead of bills */}
      {showFloatingBills && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-400"
              style={{
                left: `${10 + i * 9}%`,
                top: `${20 + i * 7}%`,
                fontSize: `${Math.random() * 16 + 12}px`
              }}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 360],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            >
              🪙
            </motion.div>
          ))}
        </div>
      )}

      {/* Enhanced coin stacks illustration */}
      <div className="absolute bottom-3 right-3 opacity-30">
        <div className="flex flex-col gap-1">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="w-14 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-yellow-500 shadow-lg"
              style={{ transform: `translateX(${i * 3}px) translateY(${i * -2}px)` }}
              animate={{
                y: [0, -3, 0],
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 4px 8px rgba(251, 191, 36, 0.3)',
                  '0 6px 12px rgba(251, 191, 36, 0.5)',
                  '0 4px 8px rgba(251, 191, 36, 0.3)'
                ]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center">
        <motion.div 
          className="text-yellow-200 text-sm mb-3 font-bold flex items-center justify-center gap-2"
          style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Coins className="w-5 h-5 text-yellow-400" />
          </motion.div>
          {title}
        </motion.div>
        
        <motion.div
          className={`font-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent ${sizeClasses[size]} mb-3`}
          style={{ 
            textShadow: '0 0 20px rgba(251, 191, 36, 0.6)',
            filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.4))'
          }}
          initial={{ scale: 0, rotate: -360 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1, 
            type: "spring", 
            stiffness: 150,
            delay: 0.3
          }}
          whileHover={{ 
            scale: 1.1,
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.3 }
          }}
        >
          {formatAmount(amount)}
        </motion.div>

        {/* Enhanced sparkle effects with coins */}
        <div className="flex justify-center gap-3">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="relative"
              animate={{ 
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="w-4 h-4 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full border border-yellow-500"
                animate={{
                  boxShadow: [
                    '0 0 5px rgba(251, 191, 36, 0.5)',
                    '0 0 15px rgba(251, 191, 36, 0.8)',
                    '0 0 5px rgba(251, 191, 36, 0.5)'
                  ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-yellow-900 font-bold text-xs">
                $
              </span>
            </motion.div>
          ))}
        </div>

        {/* Value indicator */}
        <motion.div
          className="mt-3 text-yellow-300 text-xs font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          💰 Keep playing to earn more! 💰
        </motion.div>
      </div>

      {/* Enhanced shimmer effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 rounded-2xl"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: Math.random() * 3
        }}
      />

      {/* Pulsing border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2"
        animate={{
          borderColor: [
            'rgba(251, 191, 36, 0.4)',
            'rgba(249, 115, 22, 0.7)',
            'rgba(251, 191, 36, 0.4)'
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

export default AnimatedMoneyDisplay; 