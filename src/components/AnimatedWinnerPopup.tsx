import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Trophy, Star, Gift, DollarSign, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedWinnerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  winner: {
    name: string;
    score: number;
    prize: number;
    avatar?: string;
  };
  position: 1 | 2 | 3;
}

const AnimatedWinnerPopup: React.FC<AnimatedWinnerPopupProps> = ({ 
  isOpen, 
  onClose, 
  winner, 
  position 
}) => {
  const positionConfig = {
    1: { color: 'from-yellow-400 to-orange-400', badge: '🥇', glow: 'shadow-yellow-400/50' },
    2: { color: 'from-gray-300 to-gray-400', badge: '🥈', glow: 'shadow-gray-400/50' },
    3: { color: 'from-orange-600 to-orange-700', badge: '🥉', glow: 'shadow-orange-600/50' }
  };

  const config = positionConfig[position];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Main popup */}
          <motion.div
            className="relative bg-gradient-to-br from-blue-500/90 via-purple-500/90 to-pink-500/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl max-w-md w-full overflow-hidden"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl blur-xl opacity-50"></div>

            {/* Floating confetti */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'][Math.floor(Math.random() * 5)]
                  }}
                  animate={{
                    y: [0, -100, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>

            {/* Header with crown */}
            <div className="relative z-10 text-center pt-8 pb-4">
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
              >
                <Crown className="w-12 h-12 text-yellow-400 drop-shadow-lg" />
              </motion.div>

              <motion.h2
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                BINGO WINNER!
              </motion.h2>

              <motion.div
                className="text-yellow-300 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Congratulations!
              </motion.div>
            </div>

            {/* Winner info */}
            <div className="relative z-10 bg-white/10 backdrop-blur-sm mx-4 rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${config.color} flex items-center justify-center text-2xl shadow-lg ${config.glow}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    {config.badge}
                  </motion.div>
                  <div>
                    <motion.div
                      className="text-white font-bold text-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {winner.name}
                    </motion.div>
                    <motion.div
                      className="text-yellow-300 text-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      Score: {winner.score}
                    </motion.div>
                  </div>
                </div>

                {/* Prize money */}
                <motion.div
                  className="text-right"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-green-400 font-bold text-2xl">
                    ${winner.prize}
                  </div>
                  <div className="text-green-300 text-sm">Prize</div>
                </motion.div>
              </div>

              {/* Money stacks illustration */}
              <motion.div
                className="flex justify-center gap-2 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-6 bg-green-500 rounded border border-green-600"
                    style={{ transform: `translateX(${i * 2}px)` }}
                    animate={{
                      y: [0, -3, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Action buttons */}
            <div className="relative z-10 p-6 pt-4">
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Button
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-3 shadow-lg hover:shadow-yellow-400/25"
                  onClick={onClose}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Claim Prize
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/30 text-white hover:bg-white/10"
                  onClick={onClose}
                >
                  Continue Playing
                </Button>
              </motion.div>
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-2000"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedWinnerPopup; 