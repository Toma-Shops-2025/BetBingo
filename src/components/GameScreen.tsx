import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Clock, 
  MessageCircle, 
  Users, 
  Crown, 
  DollarSign, 
  Sparkles, 
  X,
  Home,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Target
} from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import { BingoCard as BingoCardType } from '@/types';
import AnimatedBingoCard from './AnimatedBingoCard';
import ChatSystem from './ChatSystem';
import AnimatedConfetti from './AnimatedConfetti';
import AnimatedPowerUpsBar from './AnimatedPowerUpsBar';
import AnimatedWinPatternsDisplay from './AnimatedWinPatternsDisplay';
import AnimatedCurrentNumber from './AnimatedCurrentNumber';
import AnimatedCalledNumbers from './AnimatedCalledNumbers';
import AnimatedMoneyDisplay from './AnimatedMoneyDisplay';
import { motion, AnimatePresence } from 'framer-motion';

interface GameScreenProps {
  onExitGame: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onExitGame }) => {
  const { gameState, dispatch, endMatch } = useGame();
  const { currentMatch, playerCard, opponentCard } = gameState;
  const { user } = useAuth();
  const [chatOpen, setChatOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gamePaused, setGamePaused] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
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
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Mock current game data
  const currentGame = {
    entryFee: currentMatch?.entryFee || 1.00,
    prizePool: 425.75,
    jackpot: 2150.25,
    playersCount: 62,
    maxPlayers: 80,
    roomName: 'Quick Cash',
    gameNumber: '#BG-4721',
    pattern: 'Full House',
    ballsLeft: 75 - calledNumbers.length
  };

  const exitGame = () => {
    if (gameState.gameStatus === 'playing') {
      setShowExitConfirm(true);
    } else {
      onExitGame();
    }
  };

  const confirmExit = () => {
    endMatch('timeout');
    setShowExitConfirm(false);
    onExitGame();
  };

  const usePowerUp = (powerUpType: string) => {
    if (powerUps[powerUpType as keyof typeof powerUps] > 0) {
      setPowerUps(prev => ({
        ...prev,
        [powerUpType]: prev[powerUpType as keyof typeof powerUps] - 1
      }));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate receiving new messages (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add unread messages every 30 seconds (for demo)
      if (Math.random() < 0.3 && !chatOpen) { // 30% chance every 30 seconds
        setUnreadMessages(prev => prev + 1);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [chatOpen]);

  const convertToBingoCard = (cardNumbers: number[][]): BingoCardType => {
    return {
      id: 'player-card',
      numbers: cardNumbers.map(row => 
        row.map(num => num === 0 ? null : num)
      ) as (number | null)[][],
      marked: cardNumbers.map(row => 
        row.map(() => false)
      )
    };
  };

  useEffect(() => {
    if (gameState.gameStatus === 'won') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [gameState.gameStatus]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-purple-600/10 blur-3xl"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Animated particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 p-4 space-y-4">
          {/* Practice Mode Indicator */}
          {gameState.currentMatch && gameState.currentMatch.entryFee === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-2 border-green-400/40 rounded-2xl p-4 backdrop-blur-md text-center"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/30 rounded-lg">
                    <Target className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-green-300 text-xl font-bold">🎯 PRACTICE MODE</h3>
                    <p className="text-green-200 text-sm">No real money at stake - perfect for learning!</p>
                  </div>
                </div>
                
                {/* Start Game Button for Practice Mode */}
                {gameState.gameStatus === 'waiting' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      onClick={() => {
                        dispatch({ type: 'START_GAME' });
                        // Manually start calling numbers if the game isn't starting
                        if (gameState.gameStatus === 'waiting') {
                          const interval = setInterval(() => {
                            if (gameState.gameStatus !== 'playing') {
                              clearInterval(interval);
                              return;
                            }
                            
                            const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1)
                              .filter(num => !gameState.calledNumbers.includes(num));
                            
                            if (availableNumbers.length === 0) {
                              clearInterval(interval);
                              return;
                            }
                            
                            const randomNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
                            
                            dispatch({
                              type: 'CALL_NUMBER',
                              payload: { number: randomNumber },
                            });
                          }, 3000);
                        }
                      }}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Start Practice Game
                    </Button>
                  </motion.div>
                )}
                
                {/* Game Status for Practice Mode */}
                {gameState.gameStatus === 'playing' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/20 border border-green-400/30 rounded-lg px-4 py-2"
                  >
                    <p className="text-green-300 text-sm font-medium">🎮 Game in Progress!</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Top Game Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-900/60 via-blue-900/60 to-purple-900/60 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              {/* Left: Game Info */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={exitGame}
                  className="p-2 bg-red-500/20 border border-red-400/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div>
                  <h2 className="text-white font-black text-lg">{currentGame.roomName}</h2>
                  <p className="text-purple-300 text-sm">{currentGame.gameNumber}</p>
                </div>

                <div className="hidden sm:flex items-center space-x-4 text-sm">
                  <div className="bg-green-500/20 border border-green-400/30 rounded-lg px-3 py-1">
                    <span className="text-green-300 font-bold">${currentGame.prizePool.toFixed(2)}</span>
                    <p className="text-green-400 text-xs">Prize Pool</p>
                  </div>
                  
                  <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg px-3 py-1">
                    <span className="text-yellow-300 font-bold">${currentGame.jackpot.toFixed(2)}</span>
                    <p className="text-yellow-400 text-xs">Jackpot</p>
                  </div>
                </div>
              </div>

              {/* Right: Controls */}
              <div className="flex items-center space-x-3">
                {/* Player Count */}
                <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg px-3 py-1 text-center">
                  <div className="text-blue-300 font-bold">{currentGame.playersCount}/{currentGame.maxPlayers}</div>
                  <p className="text-blue-400 text-xs">Players</p>
                </div>

                {/* Sound Toggle */}
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-2 rounded-lg transition-all ${
                    soundEnabled 
                      ? 'bg-green-500/20 border border-green-400/30 text-green-400' 
                      : 'bg-red-500/20 border border-red-400/30 text-red-400'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>

                {/* Chat Toggle */}
                <button
                  onClick={() => {
                    setChatOpen(!chatOpen);
                    if (!chatOpen && unreadMessages > 0) {
                      setUnreadMessages(0); // Clear unread count when opening chat
                    }
                  }}
                  className="p-2 bg-purple-500/20 border border-purple-400/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-all relative"
                >
                  <MessageCircle className="w-5 h-5" />
                  {/* Show red dot or badge for unread messages */}
                  {unreadMessages > 0 && (
                    unreadMessages === 1 ? (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                    ) : (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                        {unreadMessages > 9 ? '9+' : unreadMessages}
                      </div>
                    )
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Game Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-400/40 rounded-2xl p-4 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500/30 rounded-xl p-3">
                  <Trophy className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-orange-300 font-bold text-lg">Win Pattern: {currentGame.pattern}</h3>
                  <p className="text-orange-400 text-sm">Get a full house to win the round!</p>
                  
                  {/* Game Mode Info */}
                  {gameState.currentMatch && (
                    <div className="mt-2 text-xs">
                      {gameState.currentMatch.entryFee === 0 ? (
                        <span className="text-green-400 font-semibold">🎯 Practice Mode - No Entry Fee</span>
                      ) : (
                        <span className="text-yellow-400 font-semibold">
                          💰 Entry Fee: ${gameState.currentMatch.entryFee.toFixed(2)} | 
                          Prize Pool: ${gameState.currentMatch.prizePool.toFixed(2)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-orange-300 text-2xl font-black">
                  {currentGame.ballsLeft}
                </div>
                <p className="text-orange-400 text-sm">Balls Left</p>
              </div>
            </div>
          </motion.div>

          {/* Current Number Display */}
          <AnimatedCurrentNumber number={currentNumber} />

          {/* Main Game Area */}
          <div className="grid lg:grid-cols-2 gap-4">
            {/* Your Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-2 border-green-400/40 rounded-2xl p-4 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500/30 rounded-xl p-2">
                      <Crown className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-green-300 font-bold text-lg">Your Card</h3>
                      <p className="text-green-400 text-sm">Entry: ${currentGame.entryFee.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-300 text-xl font-black">
                      {user.gamesWon}
                    </div>
                    <p className="text-green-400 text-xs">Wins</p>
                  </div>
                </div>

                {playerCard ? (
                  <AnimatedBingoCard 
                    card={convertToBingoCard(playerCard)} 
                  />
                ) : (
                  <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-8 text-center">
                    <p className="text-green-400">Loading your card...</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Opponent Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-r from-red-600/30 to-pink-600/30 border-2 border-red-400/40 rounded-2xl p-4 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-500/30 rounded-xl p-2">
                      <Users className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-red-300 font-bold text-lg">Top Player</h3>
                      <p className="text-red-400 text-sm">Leading the game</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-300 text-xl font-black">
                      1st
                    </div>
                    <p className="text-red-400 text-xs">Position</p>
                  </div>
                </div>

                {opponentCard ? (
                  <AnimatedBingoCard 
                    card={convertToBingoCard(opponentCard)} 
                  />
                ) : (
                  <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-8 text-center">
                    <p className="text-red-400">Loading opponent card...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Called Numbers */}
          <AnimatedCalledNumbers calledNumbers={calledNumbers} />

          {/* Power-ups */}
          <AnimatedPowerUpsBar 
            powerUps={powerUps}
            onUsePowerUp={usePowerUp}
          />

          {/* Balance Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-2 border-blue-400/40 rounded-2xl p-4 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500/30 rounded-xl p-3">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-blue-300 font-bold text-lg">Your Balance</h3>
                  <p className="text-blue-400 text-sm">Current funds available</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-blue-300 text-2xl font-black">
                  ${user.balance.toFixed(2)}
                </div>
                <p className="text-blue-400 text-sm">Available</p>
                
                {/* Show entry fee if applicable */}
                {gameState.currentMatch && gameState.currentMatch.entryFee > 0 && (
                  <div className="mt-1">
                    <div className="text-red-400 text-lg font-bold">
                      -${gameState.currentMatch.entryFee.toFixed(2)}
                    </div>
                    <p className="text-red-400 text-xs">Entry Fee</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chat System */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-80 h-full bg-purple-900/95 backdrop-blur-xl border-l border-purple-400/30 z-50"
            >
              <ChatSystem isOpen={chatOpen} onClose={() => setChatOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti */}
        {showConfetti && <AnimatedConfetti isActive={showConfetti} />}

        {/* Game Completion Modal */}
        <AnimatePresence>
          {gameState.gameStatus === 'won' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-green-800/90 via-emerald-800/90 to-green-800/90 backdrop-blur-xl border border-green-400/30 rounded-2xl p-8 max-w-md w-full text-center"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-white text-2xl font-bold mb-4">Congratulations!</h3>
                <p className="text-green-200 text-lg mb-6">You won the game!</p>
                
                {gameState.currentMatch && gameState.currentMatch.entryFee === 0 ? (
                  <div className="bg-green-600/30 rounded-xl p-4 mb-6">
                    <p className="text-green-300 font-semibold">🎯 Practice Mode</p>
                    <p className="text-green-200 text-sm">Great job! This was a practice game.</p>
                  </div>
                ) : (
                  <div className="bg-yellow-600/30 rounded-xl p-4 mb-6">
                    <p className="text-yellow-300 font-semibold">💰 Real Money Win!</p>
                    <p className="text-yellow-200 text-sm">
                      Prize: ${gameState.currentMatch?.prizePool.toFixed(2)}
                    </p>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={onExitGame}
                    className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 rounded-xl transition-all"
                  >
                    Back to Lobby
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {gameState.gameStatus === 'lost' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-red-800/90 via-pink-800/90 to-red-800/90 backdrop-blur-xl border border-red-400/30 rounded-2xl p-8 max-w-md w-full text-center"
              >
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-white text-2xl font-bold mb-4">Game Over</h3>
                <p className="text-red-200 text-lg mb-6">Better luck next time!</p>
                
                {gameState.currentMatch && gameState.currentMatch.entryFee === 0 ? (
                  <div className="bg-red-600/30 rounded-xl p-4 mb-6">
                    <p className="text-red-300 font-semibold">🎯 Practice Mode</p>
                    <p className="text-red-200 text-sm">No money lost - keep practicing!</p>
                  </div>
                ) : (
                  <div className="bg-red-600/30 rounded-xl p-4 mb-6">
                    <p className="text-red-300 font-semibold">💰 Entry Fee Lost</p>
                    <p className="text-red-200 text-sm">
                      Entry fee: ${gameState.currentMatch?.entryFee.toFixed(2)}
                    </p>
                  </div>
                )}
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-xl transition-all"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={onExitGame}
                    className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-4 rounded-xl transition-all"
                  >
                    Back to Lobby
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-purple-800/90 via-blue-800/90 to-purple-800/90 backdrop-blur-xl border border-purple-400/30 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="text-center">
                <div className="bg-red-500/20 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <X className="w-8 h-8 text-red-400 mx-auto" />
                </div>
                
                <h3 className="text-white text-xl font-bold mb-2">Exit Game?</h3>
                <p className="text-purple-300 mb-6">
                  You're currently in a live game. Exiting will forfeit your entry fee of ${currentGame.entryFee.toFixed(2)}.
                </p>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowExitConfirm(false)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all"
                  >
                    Stay & Play
                  </button>
                  <button
                    onClick={confirmExit}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all"
                  >
                    Exit Game
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GameScreen;