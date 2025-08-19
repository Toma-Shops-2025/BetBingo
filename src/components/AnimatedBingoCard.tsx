import React from 'react';
import { motion } from 'framer-motion';
import { BingoCard as BingoCardType } from '@/types';
import { cn } from '@/lib/utils';

interface AnimatedBingoCardProps {
  card: BingoCardType;
  onNumberClick?: (number: number) => void;
  disabled?: boolean;
  title?: string;
  delay?: number;
}

const AnimatedBingoCard: React.FC<AnimatedBingoCardProps> = ({ 
  card, 
  onNumberClick, 
  disabled = false,
  title = "BINGO",
  delay = 0
}) => {
  const handleCellClick = (colIndex: number, rowIndex: number) => {
    if (disabled) return;
    const number = card.numbers[colIndex][rowIndex];
    if (number && onNumberClick) {
      onNumberClick(number);
    }
  };

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-xl opacity-30"></div>
      
      <div className="relative bg-white rounded-lg shadow-2xl p-4 max-w-sm mx-auto border border-white/20 backdrop-blur-sm">
        {/* Floating sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="text-center mb-4 relative z-10">
          <motion.h3 
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.2 }}
          >
            {title}
          </motion.h3>
          <motion.div 
            className="flex justify-center space-x-2 text-sm font-semibold text-gray-600 mt-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.3 }}
          >
            {['B', 'I', 'N', 'G', 'O'].map((letter, index) => (
              <motion.div 
                key={letter} 
                className="w-12 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.1, color: '#8B5CF6' }}
              >
                {letter}
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <div className="grid grid-cols-5 gap-1 relative z-10">
          {Array.from({ length: 5 }, (_, rowIndex) => 
            Array.from({ length: 5 }, (_, colIndex) => {
              const number = card.numbers[colIndex][rowIndex];
              const isMarked = card.marked[colIndex][rowIndex];
              const isFreeSpace = colIndex === 2 && rowIndex === 2;
              
              return (
                <motion.button
                  key={`${colIndex}-${rowIndex}`}
                  onClick={() => handleCellClick(colIndex, rowIndex)}
                  disabled={disabled || isFreeSpace}
                  className={cn(
                    "w-12 h-12 rounded-md font-bold text-sm transition-all duration-300",
                    "border-2 border-gray-300",
                    isFreeSpace ? "bg-gradient-to-br from-yellow-400 to-orange-400 text-yellow-800 border-yellow-500" : 
                    isMarked ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white border-green-600 shadow-lg" :
                    "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50",
                    !disabled && !isFreeSpace && "hover:scale-105 cursor-pointer hover:shadow-md"
                  )}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: delay + 0.5 + (rowIndex * 5 + colIndex) * 0.02,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={!disabled && !isFreeSpace ? { 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  } : {}}
                  whileTap={!disabled && !isFreeSpace ? { 
                    scale: 0.95 
                  } : {}}
                >
                  {isFreeSpace ? (
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      ⭐
                    </motion.span>
                  ) : (
                    <motion.span
                      animate={isMarked ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {number}
                    </motion.span>
                  )}
                </motion.button>
              );
            })
          ).flat()}
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-1000 rounded-lg"></div>
      </div>
    </motion.div>
  );
};

export default AnimatedBingoCard; 