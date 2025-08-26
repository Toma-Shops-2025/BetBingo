import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Star, Users, Target, Clock, Sparkles, Crown, Gift, TrendingUp, Award, Heart, DollarSign } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedLogo from './AnimatedLogo';
import AnimatedGameCard from './AnimatedGameCard';
import AnimatedStats from './AnimatedStats';
import AnimatedBackground from './AnimatedBackground';
import AnimatedMoneyDisplay from './AnimatedMoneyDisplay';
import AnimatedLeaderboard from './AnimatedLeaderboard';
import AnimatedCashOutModal from './AnimatedCashOutModal';
import { Button } from './ui/button';

interface HomeScreenProps {
  onStartGame: (isPractice: boolean) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame }) => {
  const { user } = useAuth();
  const { gameStats } = useGame();
  const [showCashOutModal, setShowCashOutModal] = useState(false);

  const handleStartMatch = (isPractice: boolean) => {
    console.log('Starting match:', { isPractice, userBalance: user?.balance });
    onStartGame(isPractice);
  };

  const testGameStart = () => {
    console.log('Testing game start...');
    console.log('User:', user);
    console.log('User balance:', user?.balance);
    console.log('Game stats:', gameStats);
  };

  const stats = [
    {
      value: gameStats.totalWins,
      label: 'Wins',
      icon: Trophy,
      color: 'text-yellow-400',
      gradient: 'from-yellow-500/20 to-orange-500/20'
    },
    {
      value: gameStats.currentStreak || 0,
      label: 'Streak',
      icon: TrendingUp,
      color: 'text-green-400',
      gradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      value: gameStats.gamesPlayed,
      label: 'Games',
      icon: Award,
      color: 'text-blue-400',
      gradient: 'from-blue-500/20 to-cyan-500/20'
    }
  ];

  const gameModes = [
    {
      title: 'Quick Play',
      description: 'Fast-paced 30-second rounds with power-ups and multiple win patterns. Perfect for quick gaming sessions!',
      icon: Zap,
      badgeText: '30s Rounds',
      badgeColor: 'bg-blue-500',
      gradientFrom: 'from-blue-500/20',
      gradientTo: 'to-cyan-500/20',
      features: [
        { icon: Users, text: '1-8 Players' },
        { icon: Clock, text: '30s Rounds' },
        { icon: Sparkles, text: 'Power-ups' }
      ],
      buttonText: 'Start Quick Play',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => handleStartMatch(false)
    },
    {
      title: 'Tournament Mode',
      description: 'Compete in tournaments with friends and global players. Win prizes and climb the leaderboards!',
      icon: Crown,
      badgeText: 'Live Now',
      badgeColor: 'bg-purple-500',
      gradientFrom: 'from-purple-500/20',
      gradientTo: 'to-pink-500/20',
      features: [
        { icon: Users, text: '16 Players' },
        { icon: Trophy, text: '$50 Prize Pool' },
        { icon: Clock, text: '2h Left' }
      ],
      buttonText: 'Join Tournament',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      onClick: () => handleStartMatch(false)
    },
    {
      title: 'Practice Mode',
      description: 'Practice against AI opponents. Learn strategies, test power-ups, and improve your skills!',
      icon: Target,
      badgeText: 'Free',
      badgeColor: 'bg-green-500',
      gradientFrom: 'from-green-500/20',
      gradientTo: 'to-emerald-500/20',
      features: [
        { icon: Users, text: 'vs AI' },
        { icon: Clock, text: '30s Rounds' },
        { icon: Sparkles, text: 'All Power-ups' }
      ],
      buttonText: 'Start Practice',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      onClick: () => handleStartMatch(true)
    }
  ];

  const leaderboardPlayers = [
    { id: '1', name: 'Angela', score: 1608, prize: 998, position: 1 },
    { id: '2', name: 'Brown', score: 1020, prize: 688, position: 2 },
    { id: '3', name: 'Joanne', score: 620, prize: 369, position: 3 },
    { id: '4', name: 'Mike', score: 450, prize: 250, position: 4 },
    { id: '5', name: 'Sarah', score: 320, prize: 180, position: 5 }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10 p-4">
        {/* Header with Animated Logo */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedLogo />
        </motion.div>

        {/* Money Display */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AnimatedMoneyDisplay 
            amount={user?.balance || 0} 
            title="Your Balance"
            size="large"
          />
        </motion.div>

        {/* User Stats */}
        <motion.div 
          className="flex justify-center items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-lg p-3 border border-yellow-400/30 shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-lg">
                {user?.level || 1}
              </span>
            </div>
            <p className="text-yellow-300 text-xs">Level</p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-lg p-3 border border-green-400/30 shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold text-lg">
                {user?.powerUps || 3}
              </span>
            </div>
            <p className="text-green-300 text-xs">Power-ups</p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-lg p-3 border border-blue-400/30 shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-bold text-lg">
                {user?.achievements || 0}
              </span>
            </div>
            <p className="text-blue-300 text-xs">Achievements</p>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <AnimatedStats stats={stats} delay={0.6} />
        </motion.div>

        {/* Game Modes */}
        <motion.div 
          className="space-y-4 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {gameModes.map((mode, index) => (
            <AnimatedGameCard
              key={index}
              {...mode}
              delay={0.7 + index * 0.1}
            />
          ))}
        </motion.div>

        {/* Test Buttons */}
        <motion.div 
          className="text-center mb-8 space-y-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={testGameStart}
              variant="outline"
              className="text-purple-300 border-purple-400/30 hover:bg-purple-600/30"
            >
              🧪 Test Game System
            </Button>
            <Button
              onClick={() => window.open('/deposit', '_blank')}
              variant="outline"
              className="text-green-300 border-green-400/30 hover:bg-green-600/30"
            >
              💰 Test Deposit
            </Button>
          </div>
          <p className="text-xs text-purple-400/60">Use these buttons to test the game system</p>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-8"
        >
          <AnimatedLeaderboard players={leaderboardPlayers} title="Top Players" />
        </motion.div>

        {/* Daily Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-md rounded-xl border border-orange-400/30 shadow-2xl overflow-hidden">
            {/* Floating hearts */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-orange-400/30"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: `${20 + i * 15}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                >
                  <Heart className="w-4 h-4" />
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Gift className="w-6 h-6 text-orange-400" />
                  <h3 className="text-white text-xl font-bold">Daily Challenges</h3>
                </div>
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  3/5 Complete
                </div>
              </div>
              
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center justify-between text-orange-200 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <span>✅ Win 3 games in a row</span>
                  <span className="text-orange-400 font-semibold">+50 XP</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-between text-orange-200 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <span>✅ Use 5 power-ups</span>
                  <span className="text-orange-400 font-semibold">+30 XP</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-between text-orange-200 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <span>✅ Complete a diamond pattern</span>
                  <span className="text-orange-400 font-semibold">+40 XP</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-between text-gray-400 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  <span>⏳ Win 10 games today</span>
                  <span className="text-gray-500">+100 XP</span>
                </motion.div>
                <motion.div 
                  className="flex items-center justify-between text-gray-400 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <span>⏳ Reach level 5</span>
                  <span className="text-gray-500">+200 XP</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cash Out Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-8"
        >
          <Button
            onClick={() => setShowCashOutModal(true)}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-bold py-4 shadow-lg hover:shadow-yellow-400/25 text-lg"
          >
            <DollarSign className="w-5 h-5 mr-2" />
            CASH OUT MONEY
          </Button>
        </motion.div>
      </div>

      {/* Cash Out Modal */}
      <AnimatedCashOutModal
        isOpen={showCashOutModal}
        onClose={() => setShowCashOutModal(false)}
        amount={user?.balance || 0}
      />
    </div>
  );
};

export default HomeScreen;