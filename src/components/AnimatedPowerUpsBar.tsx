import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, Target, TrendingUp, Sparkles, Star, Zap } from 'lucide-react';

interface PowerUp {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  gradient: string;
  glowColor: string;
}

interface AnimatedPowerUpsBarProps {
  powerUps: Record<string, number>;
  onUsePowerUp: (powerUpType: string) => void;
}

const AnimatedPowerUpsBar: React.FC<AnimatedPowerUpsBarProps> = ({ powerUps, onUsePowerUp }) => {
  const powerUpTypes: PowerUp[] = [
    {
      id: 'timeFreeze',
      name: 'Freeze',
      icon: Clock,
      color: 'text-cyan-300',
      description: 'Pause timer for 5 seconds',
      gradient: 'from-blue-500 via-cyan-400 to-blue-600',
      glowColor: 'rgba(34, 211, 238, 0.6)'
    },
    {
      id: 'autoMark',
      name: 'Auto',
      icon: Target,
      color: 'text-emerald-300',
      description: 'Auto-mark called numbers',
      gradient: 'from-green-500 via-emerald-400 to-green-600',
      glowColor: 'rgba(52, 211, 153, 0.6)'
    },
    {
      id: 'doublePoints',
      name: 'Double',
      icon: TrendingUp,
      color: 'text-purple-300',
      description: 'Double points for next win',
      gradient: 'from-purple-500 via-pink-400 to-purple-600',
      glowColor: 'rgba(168, 85, 247, 0.6)'
    },
    {
      id: 'luckyNumber',
      name: 'Lucky',
      icon: Sparkles,
      color: 'text-red-300',
      description: 'Next number is on your card',
      gradient: 'from-red-500 via-orange-400 to-red-600',
      glowColor: 'rgba(239, 68, 68, 0.6)'
    },
    {
      id: 'shield',
      name: 'Shield',
      icon: Star,
      color: 'text-yellow-300',
      description: 'Protect against one missed number',
      gradient: 'from-yellow-400 via-yellow-300 to-orange-400',
      glowColor: 'rgba(251, 191, 36, 0.6)'
    },
    {
      id: 'bomb',
      name: 'Bomb',
      icon: Zap,
      color: 'text-pink-300',
      description: 'Clear a random number',
      gradient: 'from-pink-500 via-rose-400 to-pink-600',
      glowColor: 'rgba(236, 72, 153, 0.6)'
    }
  ];

  return (
    <motion.div 
      className="mb-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10 rounded-xl blur-xl"></div>
      
      <div className="relative bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-purple-900/20 backdrop-blur-md rounded-xl border border-purple-400/20 p-4">
        <div className="flex justify-between items-center mb-4">
          <motion.span 
            className="text-white font-bold text-xl flex items-center gap-3"
            style={{ textShadow: '0 0 10px rgba(168, 85, 247, 0.5)' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
            Power-ups
          </motion.span>
          <motion.span 
            className="text-purple-200 text-sm font-medium"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Use strategically! ⚡
          </motion.span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {powerUpTypes.map((powerUp, index) => {
            const Icon = powerUp.icon;
            const count = powerUps[powerUp.id] || 0;
            const isAvailable = count > 0;
            
            return (
              <motion.div
                key={powerUp.id}
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.08,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                {/* Enhanced glowing background */}
                {isAvailable && (
                  <motion.div 
                    className="absolute inset-0 rounded-xl blur-lg"
                    style={{ backgroundColor: powerUp.glowColor }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  className={`power-up relative w-full h-20 flex flex-col items-center justify-center gap-1 border-2 rounded-xl shadow-xl transition-all duration-300 overflow-hidden ${
                    isAvailable 
                      ? `border-white/30 bg-gradient-to-br ${powerUp.gradient} text-white font-bold` 
                      : 'border-gray-600/50 bg-gray-800/30 text-gray-500'
                  }`}
                  style={isAvailable ? {
                    boxShadow: `0 0 20px ${powerUp.glowColor}, 0 8px 16px rgba(0, 0, 0, 0.3)`
                  } : {}}
                  onClick={() => onUsePowerUp(powerUp.id)}
                  disabled={!isAvailable}
                  title={powerUp.description}
                >
                  {/* Enhanced floating sparkles for available power-ups */}
                  {isAvailable && (
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 bg-white rounded-full"
                          style={{
                            left: `${10 + i * 15}%`,
                            top: `${10 + i * 15}%`,
                          }}
                          animate={{
                            y: [0, -15, 0],
                            x: [0, Math.random() * 10 - 5, 0],
                            opacity: [0.4, 1, 0.4],
                            scale: [0.5, 1.5, 0.5]
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 3
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Power-up icon with enhanced animation */}
                  <motion.div
                    animate={isAvailable ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: isAvailable ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    <Icon className={`w-6 h-6 ${isAvailable ? powerUp.color : 'text-gray-600'}`} />
                  </motion.div>
                  
                  <span className={`text-xs font-bold ${isAvailable ? powerUp.color : 'text-gray-600'}`}>
                    {powerUp.name}
                  </span>
                  
                  {/* Enhanced count display */}
                  <motion.span 
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isAvailable 
                        ? 'bg-white/20 text-white' 
                        : 'bg-gray-700/50 text-gray-600'
                    }`}
                    animate={isAvailable && count > 0 ? {
                      scale: [1, 1.1, 1],
                      backgroundColor: [
                        'rgba(255, 255, 255, 0.2)',
                        'rgba(255, 255, 255, 0.4)',
                        'rgba(255, 255, 255, 0.2)'
                      ]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: isAvailable ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    {count}
                  </motion.span>

                  {/* Enhanced shimmer effect for available power-ups */}
                  {isAvailable && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 rounded-xl"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 4
                      }}
                    />
                  )}

                  {/* Pulse effect on hover */}
                  {isAvailable && (
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-white/50 opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0, 0.5, 0]
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </Button>
              </motion.div>
            );
          })}
        </div>
        
        {/* Floating background sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
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
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 4
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedPowerUpsBar; 