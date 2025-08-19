import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, MessageCircle, Users, Crown, DollarSign, Sparkles } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedBingoCard from './AnimatedBingoCard';
import ChatSystem from './ChatSystem';
import AnimatedConfetti from './AnimatedConfetti';
import AnimatedPowerUpsBar from './AnimatedPowerUpsBar';
import AnimatedWinPatternsDisplay from './AnimatedWinPatternsDisplay';
import AnimatedCurrentNumber from './AnimatedCurrentNumber';
import AnimatedCalledNumbers from './AnimatedCalledNumbers';
import AnimatedMoneyDisplay from './AnimatedMoneyDisplay';
import { motion } from 'framer-motion';

const GameScreen: React.FC = () => {
  const { gameState, dispatch } = useGame();
  const { currentMatch, playerCard, opponentCard } = gameState;
  const { user } = useAuth();
  const [chatOpen, setChatOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds for BingoBlitz
  const [powerUps, setPowerUps] = useState({
    timeFreeze: 2,
    autoMark: 1,
    doublePoints: 1,
    luckyNumber: 1,
    shield: 1,
    bomb: 1
  });
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [calledNumbers, setCalledNumbers] = useState<Array<{letter: string, number: number, timestamp: number}>>([]);

  const usePowerUp = (powerUpType: string) => {
    if (powerUps[powerUpType as keyof typeof powerUps] > 0) {
      setPowerUps(prev => ({
        ...prev,
        [powerUpType]: prev[powerUpType as keyof typeof powerUps] - 1
      }));
      // Add power-up logic here
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced purple/blue gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
      <div className="fixed inset-0 bg-gradient-to-tr from-pink-900/30 via-purple-800/20 to-blue-800/30" />
      <div className="fixed inset-0 bg-gradient-to-bl from-indigo-900/40 via-purple-900/30 to-pink-900/20" />
      
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4">
        {/* Header with enhanced purple/blue gradients */}
        <motion.div
          className="relative flex justify-between items-center mb-6 bg-gradient-to-r from-purple-800/40 via-blue-800/40 to-purple-800/40 backdrop-blur-xl rounded-2xl border border-purple-400/30 p-4 shadow-2xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            boxShadow: '0 0 40px rgba(147, 51, 234, 0.3), 0 20px 40px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Pulsing border effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl border border-purple-400/50"
            animate={{
              borderColor: [
                'rgba(147, 51, 234, 0.5)',
                'rgba(59, 130, 246, 0.8)',
                'rgba(147, 51, 234, 0.5)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div className="flex items-center gap-4 relative z-10">
            <motion.div
              className="bg-gradient-to-br from-purple-600/30 via-purple-500/40 to-blue-600/30 backdrop-blur-md rounded-xl p-4 border border-purple-400/40 shadow-xl"
              whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-purple-300" />
                <span className="text-white font-bold text-xl">
                  {formatTime(timeLeft)}
                </span>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-blue-600/30 via-cyan-500/40 to-purple-600/30 backdrop-blur-md rounded-xl p-4 border border-blue-400/40 shadow-xl"
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="text-white font-bold text-xl">
                  $50
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex items-center gap-2 relative z-10"
            whileHover={{ scale: 1.05 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChatOpen(!chatOpen)}
              className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-400/30 text-white hover:from-purple-600/40 hover:to-blue-600/40 backdrop-blur-md"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </motion.div>
        </motion.div>

        {/* Power-ups Bar */}
        <AnimatedPowerUpsBar powerUps={powerUps} onUsePowerUp={usePowerUp} />

        {/* Win Patterns Display */}
        <AnimatedWinPatternsDisplay />

        {/* Called Numbers Display */}
        <AnimatedCalledNumbers calledNumbers={calledNumbers} />

        {/* Current Number Display */}
        {currentNumber && (
          <AnimatedCurrentNumber number={currentNumber} />
        )}

        {/* Game Cards with enhanced backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Player Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="relative bg-gradient-to-br from-purple-700/20 via-blue-600/20 to-purple-700/20 backdrop-blur-xl border-2 border-purple-400/30 shadow-2xl overflow-hidden">
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-purple-600/10 rounded-xl blur-xl" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-white text-center text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                  YOUR CARD
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                {playerCard && (
                  <AnimatedBingoCard 
                    card={playerCard}
                    onNumberClick={(number) => {
                      // Add number marking logic
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Opponent Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="relative bg-gradient-to-bl from-blue-700/20 via-purple-600/20 to-blue-700/20 backdrop-blur-xl border-2 border-blue-400/30 shadow-2xl overflow-hidden">
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 bg-gradient-to-bl from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-xl blur-xl" />
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-white text-center text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  OPPONENT CARD
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                {opponentCard && (
                  <AnimatedBingoCard 
                    card={opponentCard}
                    disabled={true}
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced Money Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-6"
        >
          <AnimatedMoneyDisplay amount={user?.balance || 0} title="Current Winnings" />
        </motion.div>

        {/* Game Actions with purple/blue gradients */}
        <motion.div
          className="flex justify-center gap-4 bg-gradient-to-r from-purple-800/30 via-blue-800/30 to-purple-800/30 backdrop-blur-xl rounded-2xl border border-purple-400/20 p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-4 shadow-lg hover:shadow-purple-500/25"
          >
            <DollarSign className="w-5 h-5 mr-2" />
            Cash Out
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20 hover:border-purple-400 px-8 py-4"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Use Power-Up
          </Button>
        </motion.div>
      </div>

      {/* Chat System */}
      <ChatSystem isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Confetti */}
      {showConfetti && <AnimatedConfetti />}
    </div>
  );
};

export default GameScreen;