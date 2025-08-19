import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Award, Settings, Trophy, Star, Users } from 'lucide-react';

interface NavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
}

const AnimatedNavigation: React.FC<NavigationProps> = ({ activeScreen, onScreenChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
    { id: 'leaderboard', label: 'Leaderboard', icon: Award },
    { id: 'achievements', label: 'Achievements', icon: Star },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t border-white/20 z-50"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <div className="flex justify-around items-center p-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onScreenChange(item.id)}
              className={`relative flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'text-purple-400'
                  : 'text-white/70 hover:text-white'
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
                scale: 1.1,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glowing background for active item */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"
                  layoutId="activeTab"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Icon with floating effect */}
              <motion.div
                className="relative z-10"
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
                <Icon className="w-5 h-5 mb-1" />
              </motion.div>

              {/* Label */}
              <span className="text-xs font-medium relative z-10">{item.label}</span>

              {/* Floating sparkles for active item */}
              {isActive && (
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-400 rounded-full"
                      style={{
                        left: `${30 + i * 20}%`,
                        top: `${20 + i * 15}%`,
                      }}
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-2000"></div>
    </motion.nav>
  );
};

export default AnimatedNavigation; 