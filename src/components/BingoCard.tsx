import React from 'react';
import { motion } from 'framer-motion';
import { BingoCard as BingoCardType } from '@/types';
import { cn } from '@/lib/utils';

interface BingoCardProps {
  card: BingoCardType;
  onNumberClick?: (number: number) => void;
  disabled?: boolean;
  title?: string;
}

const BingoCard: React.FC<BingoCardProps> = ({ 
  card, 
  onNumberClick, 
  disabled = false,
  title = "BINGO"
}) => {
  const handleCellClick = (colIndex: number, rowIndex: number) => {
    if (disabled) return;
    const number = card.numbers[colIndex][rowIndex];
    if (number && onNumberClick) {
      onNumberClick(number);
    }
  };

  const bingoHeaders = [
    { letter: 'B', className: 'bingo-header-b' },
    { letter: 'I', className: 'bingo-header-i' },
    { letter: 'N', className: 'bingo-header-n' },
    { letter: 'G', className: 'bingo-header-g' },
    { letter: 'O', className: 'bingo-header-o' }
  ];

  return (
    <motion.div 
      className="bingo-card rounded-xl p-4 max-w-sm mx-auto relative overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
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

      {/* Card Content */}
      <div className="relative z-10">
        {/* BINGO Header */}
        <div className="flex justify-center mb-4 gap-1">
          {bingoHeaders.map((header, index) => (
            <motion.div
              key={header.letter}
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg",
                header.className
              )}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              {header.letter}
            </motion.div>
          ))}
        </div>
        
        {/* Bingo Grid */}
        <div className="grid grid-cols-5 gap-1">
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
                    "w-12 h-12 rounded-lg font-bold text-sm transition-all relative",
                    "bingo-number",
                    isFreeSpace && "bingo-free-space",
                    isMarked && "marked",
                    !disabled && !isFreeSpace && "hover:scale-110 cursor-pointer"
                  )}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: (rowIndex * 5 + colIndex) * 0.05,
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300
                  }}
                  whileHover={!disabled && !isFreeSpace ? { 
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  } : {}}
                  whileTap={!disabled && !isFreeSpace ? { scale: 0.95 } : {}}
                >
                  {/* Marked overlay with sparkle effect */}
                  {isMarked && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-accent"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Sparkle effects */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white rounded-full"
                          style={{
                            left: `${20 + i * 30}%`,
                            top: `${20 + i * 20}%`,
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                  
                  {/* Number/Star content */}
                  <span className="relative z-10">
                    {isFreeSpace ? (
                      <motion.span
                        className="text-2xl"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        ⭐
                      </motion.span>
                    ) : (
                      number
                    )}
                  </span>
                </motion.button>
              );
            })
          ).flat()}
        </div>

        {/* Win pattern indicator */}
        {card.hasWin && (
          <motion.div
            className="absolute inset-0 rounded-xl border-4 border-win-celebration bg-win-celebration/10 pointer-events-none"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [1.1, 1, 1.1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default BingoCard;