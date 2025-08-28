import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Crown, 
  Star, 
  DollarSign, 
  BarChart3, 
  Zap, 
  Medal,
  Target,
  Calendar,
  Users,
  Award,
  Gift
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const LeaderboardScreen: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly' | 'alltime'>('daily');

  const leaderboardData = {
    daily: [
      { rank: 1, username: 'BingoKing2024', winnings: 2850.75, gamesWon: 15, avatar: null, level: 25, streak: 8 },
      { rank: 2, username: 'LuckyPlayer99', winnings: 2245.50, gamesWon: 12, avatar: null, level: 22, streak: 5 },
      { rank: 3, username: 'NumberMaster', winnings: 1892.25, gamesWon: 11, avatar: null, level: 19, streak: 7 },
      { rank: 4, username: 'BingoQueen', winnings: 1675.80, gamesWon: 9, avatar: null, level: 18, streak: 3 },
      { rank: 5, username: 'GoldenBalls', winnings: 1543.40, gamesWon: 8, avatar: null, level: 20, streak: 4 },
      { rank: 6, username: 'FastCaller', winnings: 1398.90, gamesWon: 7, avatar: null, level: 16, streak: 2 },
      { rank: 7, username: 'WinStreak', winnings: 1267.35, gamesWon: 6, avatar: null, level: 17, streak: 6 },
      { rank: 8, username: user?.username || 'You', winnings: user?.totalEarnings || 125.50, gamesWon: user?.gamesWon || 3, avatar: null, level: user?.level || 5, streak: 2 },
    ],
    weekly: [
      { rank: 1, username: 'WeeklyChamp', winnings: 15250.00, gamesWon: 85, avatar: null, level: 30, streak: 15 },
      { rank: 2, username: 'SuperWinner', winnings: 12890.75, gamesWon: 72, avatar: null, level: 28, streak: 12 },
      { rank: 3, username: 'BingoMaster', winnings: 10567.50, gamesWon: 65, avatar: null, level: 26, streak: 10 },
    ],
    monthly: [
      { rank: 1, username: 'MonthlyKing', winnings: 45780.25, gamesWon: 245, avatar: null, level: 35, streak: 25 },
      { rank: 2, username: 'ChampionPlayer', winnings: 38942.80, gamesWon: 220, avatar: null, level: 33, streak: 20 },
      { rank: 3, username: 'EliteBingo', winnings: 32156.45, gamesWon: 198, avatar: null, level: 31, streak: 18 },
    ],
    alltime: [
      { rank: 1, username: 'LegendaryPlayer', winnings: 125650.75, gamesWon: 1250, avatar: null, level: 50, streak: 45 },
      { rank: 2, username: 'BingoLegend', winnings: 98743.20, gamesWon: 1180, avatar: null, level: 48, streak: 38 },
      { rank: 3, username: 'UltimateWinner', winnings: 87321.95, gamesWon: 1095, avatar: null, level: 46, streak: 32 },
    ]
  };

  const getCurrentRankings = () => leaderboardData[activeTab];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return { icon: Crown, color: 'text-yellow-400', bg: 'from-yellow-500 to-orange-500' };
      case 2:
        return { icon: Medal, color: 'text-gray-300', bg: 'from-gray-400 to-gray-500' };
      case 3:
        return { icon: Award, color: 'text-orange-400', bg: 'from-orange-500 to-red-500' };
      default:
        return { icon: Star, color: 'text-purple-400', bg: 'from-purple-500 to-pink-500' };
    }
  };

  const getVipLevel = (level: number) => {
    if (level >= 40) return { name: 'Diamond', color: 'from-cyan-400 to-blue-500' };
    if (level >= 30) return { name: 'Platinum', color: 'from-gray-300 to-gray-400' };
    if (level >= 20) return { name: 'Gold', color: 'from-yellow-400 to-orange-500' };
    if (level >= 10) return { name: 'Silver', color: 'from-gray-400 to-gray-500' };
    return { name: 'Bronze', color: 'from-orange-600 to-red-600' };
  };

  const tabOptions = [
    { id: 'daily', label: 'Daily', prize: '$5,000' },
    { id: 'weekly', label: 'Weekly', prize: '$25,000' },
    { id: 'monthly', label: 'Monthly', prize: '$100,000' },
    { id: 'alltime', label: 'All Time', prize: 'Hall of Fame' }
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
          LEADERBOARD
        </h1>
        <p className="text-purple-300 text-lg">Compete with the best players worldwide!</p>
      </motion.div>

      {/* Prize Pool Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-green-600/30 via-emerald-600/30 to-green-600/30 border-2 border-green-400/40 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden"
      >
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <h2 className="text-white text-2xl font-black">CURRENT PRIZE POOL</h2>
            <Trophy className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="text-green-300 text-4xl font-black mb-2">
            ${(getCurrentRankings()[0]?.winnings || 0).toLocaleString()}
          </div>
          <p className="text-green-400 text-lg">Top prize for {activeTab} rankings</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-xl"></div>
      </motion.div>

      {/* Time Period Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-purple-900/30 rounded-2xl p-1 backdrop-blur-md"
      >
        <div className="grid grid-cols-4 gap-1">
          {tabOptions.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-3 px-2 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-purple-300 hover:text-white hover:bg-purple-600/20'
              }`}
            >
              <div className="text-center">
                <div>{tab.label}</div>
                <div className="text-xs opacity-80">{tab.prize}</div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        {(getCurrentRankings() || []).slice(0, 3).map((player, index) => {
          const rankInfo = getRankIcon(player.rank);
          const Icon = rankInfo.icon;
          const vipLevel = getVipLevel(player.level);
          const isCurrentUser = player.username === user?.username;

          return (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`relative ${
                player.rank === 1 ? 'order-2 scale-110' : 
                player.rank === 2 ? 'order-1' : 'order-3'
              } ${isCurrentUser ? 'ring-2 ring-purple-400' : ''}`}
            >
              <div className={`bg-gradient-to-br ${rankInfo.bg}/20 border-2 border-${rankInfo.color.split('-')[1]}-400/40 rounded-2xl p-4 backdrop-blur-md text-center`}>
                {/* Rank Badge */}
                <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r ${rankInfo.bg} rounded-full flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Avatar */}
                <div className="mt-6 mb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${vipLevel.color} flex items-center justify-center shadow-lg`}>
                    {player.avatar ? (
                      <img src={player.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <Users className="w-8 h-8 text-white" />
                    )}
                  </div>
                </div>

                {/* Player Info */}
                <h3 className={`font-bold mb-1 ${isCurrentUser ? 'text-purple-300' : 'text-white'}`}>
                  {player.username}
                </h3>
                <div className={`inline-flex items-center space-x-1 bg-gradient-to-r ${vipLevel.color} rounded-full px-2 py-1 mb-3`}>
                  <Crown className="w-3 h-3 text-white" />
                  <span className="text-white text-xs font-bold">{vipLevel.name}</span>
                </div>

                {/* Stats */}
                <div className={`text-${rankInfo.color.split('-')[1]}-300 text-xl font-black mb-1`}>
                  ${player.winnings.toLocaleString()}
                </div>
                <p className={`text-${rankInfo.color.split('-')[1]}-400 text-sm mb-2`}>
                  {player.gamesWon} wins
                </p>

                {/* Streak */}
                <div className="flex items-center justify-center space-x-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-300 text-sm font-bold">{player.streak} streak</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Full Rankings List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        <h3 className="text-white text-xl font-bold">Full Rankings</h3>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            {(getCurrentRankings() || []).slice(3).map((player, index) => {
              const vipLevel = getVipLevel(player.level);
              const isCurrentUser = player.username === user?.username;

              return (
                <motion.div
                  key={`${activeTab}-${player.rank}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className={`bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-400/30 rounded-xl p-4 backdrop-blur-md ${
                    isCurrentUser ? 'ring-2 ring-purple-400 from-purple-800/40 to-blue-800/40' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    {/* Left: Rank & Player Info */}
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className="bg-purple-600/30 rounded-lg w-12 h-12 flex items-center justify-center">
                        <span className="text-purple-300 font-bold text-lg">#{player.rank}</span>
                      </div>

                      {/* Avatar & Info */}
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${vipLevel.color} flex items-center justify-center`}>
                          {player.avatar ? (
                            <img src={player.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <Users className="w-6 h-6 text-white" />
                          )}
                        </div>
                        
                        <div>
                          <h4 className={`font-bold ${isCurrentUser ? 'text-purple-300' : 'text-white'}`}>
                            {player.username}
                            {isCurrentUser && <span className="text-purple-400 ml-2">(You)</span>}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <div className={`inline-flex items-center space-x-1 bg-gradient-to-r ${vipLevel.color} rounded-full px-2 py-0.5`}>
                              <Crown className="w-3 h-3 text-white" />
                              <span className="text-white text-xs font-bold">{vipLevel.name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Zap className="w-3 h-3 text-yellow-400" />
                              <span className="text-yellow-300 text-xs">{player.streak}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Stats */}
                    <div className="text-right">
                      <div className="text-green-300 text-lg font-bold">
                        ${player.winnings.toLocaleString()}
                      </div>
                      <p className="text-purple-300 text-sm">{player.gamesWon} wins</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Your Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-2 border-blue-400/40 rounded-2xl p-6 backdrop-blur-md"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-3">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-blue-300 font-bold text-lg">Your Performance</h3>
            <p className="text-blue-400 text-sm">Track your progress and climb the ranks!</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-blue-300 text-2xl font-black">#8</div>
            <p className="text-blue-400 text-sm">Current Rank</p>
          </div>
          <div className="text-center">
            <div className="text-green-300 text-2xl font-black">${user?.totalEarnings.toFixed(2)}</div>
            <p className="text-green-400 text-sm">Total Winnings</p>
          </div>
          <div className="text-center">
            <div className="text-yellow-300 text-2xl font-black">{user?.gamesWon}</div>
            <p className="text-yellow-400 text-sm">Games Won</p>
          </div>
          <div className="text-center">
            <div className="text-purple-300 text-2xl font-black">2</div>
            <p className="text-purple-400 text-sm">Win Streak</p>
          </div>
        </div>
      </motion.div>

      {/* Climb the Ranks CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-center space-x-2"
      >
        <Trophy className="w-5 h-5" />
        <span>Play Now & Climb the Ranks!</span>
      </motion.button>
    </div>
  );
};

export default LeaderboardScreen;