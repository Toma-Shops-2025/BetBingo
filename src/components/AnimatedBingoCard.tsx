import React, { useState, useEffect } from 'react';
import { BingoCard as BingoCardType } from '@/types';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedBingoCardProps {
  card: BingoCardType;
  onNumberClick?: (number: number) => void;
  disabled?: boolean;
  title?: string;
  isWinning?: boolean;
}

const AnimatedBingoCard: React.FC<AnimatedBingoCardProps> = ({ 
  card, 
  onNumberClick, 
  disabled = false,
  title = "BINGO",
  isWinning = false
}) => {
  const [markedNumbers, setMarkedNumbers] = useState<Set<number>>(new Set());

  useEffect(() => {
    const marked = new Set<number>();
    for (let col = 0; col < 5; col++) {
      for (let row = 0; row < 5; row++) {
        if (card.marked[col][row] && card.numbers[col][row]) {
          marked.add(card.numbers[col][row]!);
        }
      }
    }
    setMarkedNumbers(marked);
  }, [card]);

  const handleCellClick = (colIndex: number, rowIndex: number) => {
    if (disabled) return;
    const number = card.numbers[colIndex][rowIndex];
    if (number && onNumberClick) {
      onNumberClick(number);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const winningVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-4 max-w-sm mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={isWinning ? "animate" : undefined}
    >
      <div className="text-center mb-4">
        <motion.h3 
          className="text-2xl font-bold text-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h3>
        <div className="flex justify-center space-x-2 text-sm font-semibold text-gray-600 mt-2">
          {['B', 'I', 'N', 'G', 'O'].map((letter, index) => (
            <motion.div
              key={letter}
              className="w-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-5 gap-1"
        variants={containerVariants}
      >
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
                  "w-12 h-12 rounded-md font-bold text-sm transition-all",
                  "border-2 border-gray-300",
                  isFreeSpace ? "bg-yellow-400 text-yellow-800" : 
                  isMarked ? "bg-green-500 text-white border-green-600" :
                  "bg-gray-50 text-gray-800 hover:bg-gray-100",
                  !disabled && !isFreeSpace && "hover:scale-105 cursor-pointer"
                )}
                variants={cellVariants}
                whileHover={!disabled && !isFreeSpace ? "hover" : undefined}
                whileTap={!disabled && !isFreeSpace ? "tap" : undefined}
                initial="hidden"
                animate="visible"
                transition={{ delay: (rowIndex * 5 + colIndex) * 0.05 }}
              >
                <AnimatePresence>
                  {isMarked && (
                    <motion.div
                      className="absolute inset-0 bg-green-500 rounded-md"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
                <span className="relative z-10">
                  {isFreeSpace ? "★" : number}
                </span>
              </motion.button>
            );
          })
        ).flat()}
      </motion.div>

      {/* Winning Animation */}
      {isWinning && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={winningVariants}
            animate="animate"
          >
            <div className="text-4xl">🎉</div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedBingoCard; 