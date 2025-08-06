import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Trophy, Coins, Users } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Trophy, text: 'Loading game assets...', duration: 1000 },
    { icon: Users, text: 'Connecting to servers...', duration: 800 },
    { icon: Coins, text: 'Initializing wallet...', duration: 600 },
    { icon: Trophy, text: 'Ready to play!', duration: 400 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(stepInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8"
        >
          <div className="text-6xl font-bold text-white mb-2">🎯</div>
          <h1 className="text-4xl font-bold text-white mb-2">BetBingo</h1>
          <p className="text-purple-200">1-on-1 Bingo. Real Bets. Real Wins.</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto mb-8">
          <div className="bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-white mt-2">{Math.round(progress)}%</p>
        </div>

        {/* Loading Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isActive || isCompleted ? 1 : 0.3,
                  x: 0
                }}
                transition={{ duration: 0.3 }}
                className={`flex items-center justify-center space-x-3 ${
                  isActive ? 'text-white' : 'text-purple-200'
                }`}
              >
                <div className={`p-2 rounded-full ${
                  isCompleted ? 'bg-green-500' : 
                  isActive ? 'bg-white/20' : 'bg-white/10'
                }`}>
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      ✓
                    </motion.div>
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span className="font-medium">{step.text}</span>
                {isActive && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-4 h-4" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Loading Animation */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="mt-8"
        >
          <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
            <Trophy className="w-8 h-8 text-white" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen; 