import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, DollarSign, Trophy, Star, Zap, Crown, Flame, Shield, Gift, Target, Sparkles } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import PWAInstallButton from './PWAInstallButton';

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
      entryFee: 0.50,
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
    // Check if user has sufficient balance
    if (user.balance < room.entryFee) {
      alert(`Insufficient balance! You need $${room.entryFee.toFixed(2)} to join this room.`);
      return;
    }

    // Show detailed confirmation with balance info
    const currentBalance = user.balance;
    const newBalance = currentBalance - room.entryFee;
    
    const confirmJoin = window.confirm(
      `Join ${room.name}?\n\n` +
      `Entry Fee: $${room.entryFee.toFixed(2)}\n` +
      `Current Balance: $${currentBalance.toFixed(2)}\n` +
      `Balance After: $${newBalance.toFixed(2)}\n` +
      `Jackpot: $${room.jackpot.toLocaleString()}\n` +
      `Difficulty: ${room.difficulty}\n\n` +
      `Are you sure you want to join?`
    );

    if (!confirmJoin) {
      return;
    }

    try {
      setSelectedRoom(room.id);
      
      // Show loading message
      const loadingMsg = `Joining ${room.name}...\nDeducting $${room.entryFee.toFixed(2)} from your balance.`;
      console.log(loadingMsg);
      
      // Start the match (this will deduct the entry fee)
      await startMatch(false, room.entryFee);
      
      // Show success message
      alert(`Successfully joined ${room.name}!\nEntry fee of $${room.entryFee.toFixed(2)} has been deducted.\nGood luck!`);
      
      // Navigate to game
      onJoinGame();
    } catch (error) {
      console.error('Failed to join room:', error);
      alert(`Failed to join ${room.name}: ${error.message || 'Unknown error'}`);
      
      // Reset selection
      setSelectedRoom(null);
    }
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
        <div className="flex items-center justify-center space-x-4 mb-4">
          <h1 className="text-3xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            GAME LOBBY
          </h1>
          <PWAInstallButton />
        </div>
        <p className="text-purple-300 text-lg">Choose your room and start winning!</p>
        
        {/* Current Balance Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 inline-block bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-2 border-green-400/40 rounded-2xl p-4 backdrop-blur-md"
        >
          <div className="flex items-center space-x-3">
            <div className="bg-green-500/30 rounded-xl p-2">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-center">
              <p className="text-green-300 text-sm font-semibold">Current Balance</p>
              <p className="text-green-400 text-2xl font-black">${user.balance.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>
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

              {/* Join Game Button */}
              <div className="mt-4">
                <button
                  onClick={() => handleJoinRoom(room)}
                  className={`w-full bg-gradient-to-r ${room.color} hover:brightness-110 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg`}
                >
                  🎮 JOIN GAME
                </button>
                
                {/* Entry Fee Warning */}
                <div className="mt-2 text-center">
                  <p className="text-xs text-yellow-300 font-semibold">
                    ⚠️ Entry fee of ${room.entryFee.toFixed(2)} will be deducted from your balance
                  </p>
                </div>
              </div>

              {/* Glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${room.color} rounded-2xl blur-xl opacity-20 -z-10`}></div>
            </motion.div>
          );
        })}
      </div>

      {/* Practice Mode - Prominent Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-2 border-green-400/40 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-white text-2xl font-black">🎯 PRACTICE MODE</h3>
                <p className="text-green-200 text-lg">Learn the game for FREE!</p>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className="text-green-300">
                    <Users className="w-4 h-4 inline mr-1" />
                    vs AI Opponent
                  </span>
                  <span className="text-green-300">
                    <Clock className="w-4 h-4 inline mr-1" />
                    30s Rounds
                  </span>
                  <span className="text-green-300">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    All Power-ups
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-green-300 text-3xl font-black">FREE</div>
              <p className="text-green-200 text-sm">No Entry Fee</p>
              <div className="text-green-300 text-lg font-bold mt-2">$0.00</div>
              <p className="text-green-200 text-xs">Prize Pool</p>
            </div>
          </div>
          
          <button
            onClick={async () => {
              try {
                await startMatch(true, 0);
                onJoinGame();
              } catch (error) {
                console.error('Failed to start practice mode:', error);
                alert('Failed to start practice mode. Please try again.');
              }
            }}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🚀 START PRACTICE GAME
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LobbyScreen; 