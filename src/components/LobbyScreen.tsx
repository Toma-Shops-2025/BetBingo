import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, DollarSign, Trophy, Star, Zap, Crown, Flame, Shield, Gift } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';

interface LobbyScreenProps {
  onJoinGame: () => void;
}

const LobbyScreen: React.FC<LobbyScreenProps> = ({ onJoinGame }) => {
  const { startMatch } = useGame();
  const { user } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const gameRooms = [
    {
      id: 'penny-bingo',
      name: 'Penny Bingo',
      description: 'Low stakes, high fun!',
      entryFee: 0.25,
      jackpot: 125.50,
      players: 45,
      maxPlayers: 75,
      timeToNext: '2:15',
      difficulty: 'Easy',
      color: 'from-green-500 to-emerald-600',
      icon: DollarSign,
      popular: false,
      type: 'Regular'
    },
    {
      id: 'quick-cash',
      name: 'Quick Cash',
      description: 'Fast games, instant wins!',
      entryFee: 1.00,
      jackpot: 425.75,
      players: 62,
      maxPlayers: 80,
      timeToNext: '0:45',
      difficulty: 'Medium',
      color: 'from-blue-500 to-cyan-600',
      icon: Zap,
      popular: true,
      type: 'Speed'
    },
    {
      id: 'high-roller',
      name: 'High Roller',
      description: 'Big bets, bigger wins!',
      entryFee: 5.00,
      jackpot: 2150.25,
      players: 28,
      maxPlayers: 50,
      timeToNext: '4:32',
      difficulty: 'Hard',
      color: 'from-purple-500 to-pink-600',
      icon: Crown,
      popular: false,
      type: 'Premium'
    },
    {
      id: 'tournament',
      name: 'Championship',
      description: 'Winner takes all tournament!',
      entryFee: 10.00,
      jackpot: 5000.00,
      players: 89,
      maxPlayers: 100,
      timeToNext: '12:45',
      difficulty: 'Expert',
      color: 'from-yellow-500 to-orange-600',
      icon: Trophy,
      popular: true,
      type: 'Tournament'
    },
    {
      id: 'lucky-sevens',
      name: 'Lucky Sevens',
      description: 'Special pattern game!',
      entryFee: 2.50,
      jackpot: 777.77,
      players: 38,
      maxPlayers: 70,
      timeToNext: '6:12',
      difficulty: 'Medium',
      color: 'from-red-500 to-rose-600',
      icon: Star,
      popular: false,
      type: 'Special'
    },
    {
      id: 'mega-jackpot',
      name: 'Mega Jackpot',
      description: 'Progressive jackpot grows!',
      entryFee: 3.00,
      jackpot: 12450.80,
      players: 156,
      maxPlayers: 200,
      timeToNext: '1:23',
      difficulty: 'Hard',
      color: 'from-orange-500 to-red-600',
      icon: Flame,
      popular: true,
      type: 'Jackpot'
    }
  ];

  const handleJoinRoom = async (room: any) => {
    if (user.balance < room.entryFee) {
      alert(`Insufficient balance! You need $${room.entryFee.toFixed(2)} to join this room.`);
      return;
    }

    setSelectedRoom(room.id);
    await startMatch(false, room.entryFee);
    onJoinGame();
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
          GAME LOBBY
        </h1>
        <p className="text-purple-300 text-lg">Choose your room and start winning!</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-3 gap-4 mb-6"
      >
        <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-xl p-4 text-center backdrop-blur-md">
          <div className="text-green-400 text-2xl font-black">${user.totalEarnings.toFixed(0)}</div>
          <p className="text-green-300 text-sm">Total Won</p>
        </div>
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-xl p-4 text-center backdrop-blur-md">
          <div className="text-blue-400 text-2xl font-black">{user.gamesWon}</div>
          <p className="text-blue-300 text-sm">Games Won</p>
        </div>
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-xl p-4 text-center backdrop-blur-md">
          <div className="text-purple-400 text-2xl font-black">{user.level}</div>
          <p className="text-purple-300 text-sm">Level</p>
        </div>
      </motion.div>

      {/* Featured Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-yellow-600/30 via-orange-600/30 to-red-600/30 border-2 border-yellow-400/40 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-yellow-300 text-xl font-black">🎯 SPECIAL EVENT</h3>
              <p className="text-white text-lg">Double Jackpot Weekend!</p>
              <p className="text-yellow-200 text-sm">All jackpots are doubled this weekend</p>
            </div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              💰
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 blur-xl"></div>
      </motion.div>

      {/* Game Rooms */}
      <div className="space-y-4">
        <h2 className="text-white text-xl font-bold mb-4">Available Rooms</h2>
        
        {gameRooms.map((room, index) => {
          const Icon = room.icon;
          const isSelected = selectedRoom === room.id;
          
          return (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative bg-gradient-to-r ${room.color}/20 border-2 ${room.color.replace('from-', 'border-').replace(' to-.*', '')}/40 rounded-2xl p-4 backdrop-blur-md cursor-pointer transition-all duration-300 ${
                isSelected ? 'ring-2 ring-white' : ''
              }`}
              onClick={() => handleJoinRoom(room)}
            >
              {/* Popular badge */}
              {room.popular && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                >
                  🔥 HOT
                </motion.div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 bg-gradient-to-r ${room.color} rounded-xl shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-white text-lg font-bold">{room.name}</h3>
                    <p className="text-purple-300 text-sm">{room.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs">
                      <span className="text-green-400">
                        <Users className="w-3 h-3 inline mr-1" />
                        {room.players}/{room.maxPlayers}
                      </span>
                      <span className="text-blue-400">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {room.timeToNext}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        room.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                        room.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        room.difficulty === 'Hard' ? 'bg-orange-500/20 text-orange-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {room.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-yellow-400 text-xl font-black">
                    ${room.jackpot.toLocaleString()}
                  </div>
                  <p className="text-yellow-300 text-xs">Jackpot</p>
                  
                  <div className="text-white text-lg font-bold mt-2">
                    ${room.entryFee.toFixed(2)}
                  </div>
                  <p className="text-purple-300 text-xs">Entry Fee</p>
                </div>
              </div>

              {/* Progress bar for room capacity */}
              <div className="mt-4">
                <div className="bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(room.players / room.maxPlayers) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    className={`h-full bg-gradient-to-r ${room.color} rounded-full`}
                  />
                </div>
                <div className="flex justify-between text-xs text-purple-300 mt-1">
                  <span>{room.players} players</span>
                  <span>{room.maxPlayers - room.players} spots left</span>
                </div>
              </div>

              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${room.color} rounded-2xl blur-xl opacity-20 -z-10`}></div>
            </motion.div>
          );
        })}
      </div>

      {/* Practice Mode */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-gray-600/20 to-gray-700/20 border border-gray-400/30 rounded-2xl p-4 backdrop-blur-md"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-lg font-bold">Practice Mode</h3>
              <p className="text-gray-300 text-sm">Play for free to learn the game</p>
            </div>
          </div>
          <button
            onClick={() => {
              startMatch(true);
              onJoinGame();
            }}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold px-6 py-2 rounded-xl transition-all"
          >
            Play Free
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LobbyScreen; 