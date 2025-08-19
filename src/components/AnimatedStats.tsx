import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatItem {
  value: string | number;
  label: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
}

interface AnimatedStatsProps {
  stats: StatItem[];
  delay?: number;
}

const AnimatedStats: React.FC<AnimatedStatsProps> = ({ stats, delay = 0 }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: delay + index * 0.1,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          className="relative group"
        >
          {/* Glowing background */}
          <div className={`absolute inset-0 ${stat.gradient} rounded-lg blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
          
          {/* Main stat container */}
          <div className={`relative bg-gradient-to-br ${stat.gradient} backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-xl overflow-hidden`}>
            {/* Floating sparkles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.4, 0.8, 0.4],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10 text-center">
              <motion.div
                className="flex justify-center mb-2"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`p-2 bg-white/20 rounded-full backdrop-blur-sm`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </motion.div>
              
              <motion.div
                className="text-white font-bold text-lg mb-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  delay: delay + index * 0.1 + 0.3,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {stat.value}
              </motion.div>
              
              <motion.div
                className="text-white/80 text-xs font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + index * 0.1 + 0.4 }}
              >
                {stat.label}
              </motion.div>
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedStats; 