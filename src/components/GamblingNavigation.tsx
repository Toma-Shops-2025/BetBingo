import React from 'react';
import { motion } from 'framer-motion';
import { Home, CreditCard, User, Trophy, Settings, Play } from 'lucide-react';

type ScreenType = 'lobby' | 'game' | 'cashier' | 'profile' | 'leaderboard' | 'settings';

interface GamblingNavigationProps {
  activeScreen: ScreenType;
  onScreenChange: (screen: ScreenType) => void;
}

const GamblingNavigation: React.FC<GamblingNavigationProps> = ({ activeScreen, onScreenChange }) => {
  const navItems: Array<{id: ScreenType, label: string, icon: any, gradient: string}> = [
    { 
      id: 'lobby', 
      label: 'Lobby', 
      icon: Home,
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'game', 
      label: 'Play', 
      icon: Play,
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'cashier', 
      label: 'Cashier', 
      icon: CreditCard,
      gradient: 'from-yellow-500 to-orange-500'
    },
    { 
      id: 'leaderboard', 
      label: 'Leaderboard', 
      icon: Trophy,
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User,
      gradient: 'from-indigo-500 to-purple-500'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings,
      gradient: 'from-gray-500 to-gray-600'
    }
  ];

  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-900/80 via-blue-900/80 to-purple-900/80 backdrop-blur-xl border-t border-purple-400/30 z-50 shadow-2xl"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 blur-xl"></div>
      
      <div className="relative z-10 flex justify-around items-center px-2 py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 min-w-[60px] ${
                isActive ? 'text-white' : 'text-white/60 hover:text-white/80'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-80`}
                  layoutId="activeNavTab"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Glow effect for active item */}
              {isActive && (
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl blur-lg opacity-40`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.4, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Icon with enhanced animations */}
              <motion.div
                className="relative z-10 mb-1"
                animate={isActive ? {
                  y: [0, -2, 0],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'drop-shadow-lg' : ''}`} />
              </motion.div>

              {/* Label */}
              <span className={`text-xs font-bold relative z-10 ${isActive ? 'drop-shadow-sm' : ''}`}>
                {item.label}
              </span>

              {/* Floating particles for active item */}
              {isActive && (
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${10 + i * 20}%`,
                      }}
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Special indicator for Play button */}
              {item.id === 'game' && !isActive && (
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      />
    </motion.nav>
  );
};

export default GamblingNavigation; 