import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Star, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LeaderboardPlayer {
  id: string;
  name: string;
  score: number;
  prize: number;
  avatar?: string;
  position: number;
}

interface AnimatedLeaderboardProps {
  players: LeaderboardPlayer[];
  title?: string;
}

const AnimatedLeaderboard: React.FC<AnimatedLeaderboardProps> = ({ 
  players, 
  title = "Leaderboard" 
}) => {
  const getPositionConfig = (position: number) => {
    switch (position) {
      case 1:
        return {
          color: 'from-yellow-400 to-orange-400',
          bgColor: 'from-yellow-500/20 to-orange-500/20',
          borderColor: 'border-yellow-400/50',
          icon: Crown,
          glow: 'shadow-yellow-400/30'
        };
      case 2:
        return {
          color: 'from-gray-300 to-gray-400',
          bgColor: 'from-gray-500/20 to-gray-600/20',
          borderColor: 'border-gray-400/50',
          icon: Trophy,
          glow: 'shadow-gray-400/30'
        };
      case 3:
        return {
          color: 'from-orange-600 to-orange-700',
          bgColor: 'from-orange-500/20 to-orange-600/20',
          borderColor: 'border-orange-600/50',
          icon: Star,
          glow: 'shadow-orange-600/30'
        };
      default:
        return {
          color: 'from-blue-400 to-purple-400',
          bgColor: 'from-blue-500/20 to-purple-500/20',
          borderColor: 'border-blue-400/50',
          icon: TrendingUp,
          glow: 'shadow-blue-400/30'
        };
    }
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-400" />
          {title}
          <Trophy className="w-6 h-6 text-yellow-400" />
        </h3>
      </motion.div>

      <div className="space-y-3">
        {players.map((player, index) => {
          const config = getPositionConfig(player.position);
          const Icon = config.icon;

          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              {/* Glowing background */}
              <div className={`absolute inset-0 bg-gradient-to-r ${config.bgColor} rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>

              <Card className={`relative bg-gradient-to-r ${config.bgColor} backdrop-blur-md border ${config.borderColor} shadow-xl overflow-hidden`}>
                {/* Floating sparkles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-40"
                      style={{
                        left: `${20 + i * 20}%`,
                        top: `${30 + i * 15}%`,
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

                <CardContent className="p-4 relative z-10">
                  <div className="flex items-center justify-between">
                    {/* Position and avatar */}
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`w-10 h-10 rounded-full bg-gradient-to-r ${config.color} flex items-center justify-center shadow-lg ${config.glow}`}
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>

                      <div>
                        <motion.div
                          className="text-white font-bold text-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          {player.name}
                        </motion.div>
                        <motion.div
                          className="text-white/70 text-sm"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          Score: {player.score.toLocaleString()}
                        </motion.div>
                      </div>
                    </div>

                    {/* Prize money */}
                    <motion.div
                      className="text-right"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-bold text-xl">
                          ${player.prize.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-green-300 text-xs">Prize</div>
                    </motion.div>
                  </div>

                  {/* Money stacks for top 3 */}
                  {player.position <= 3 && (
                    <motion.div
                      className="flex justify-center gap-1 mt-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-6 h-4 bg-green-500 rounded border border-green-600"
                          style={{ transform: `translateX(${i * 1}px)` }}
                          animate={{
                            y: [0, -2, 0],
                            scale: [1, 1.02, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </CardContent>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default AnimatedLeaderboard; 