import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, DollarSign, MessageCircle, Users, Target, Zap } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import BingoCard from './BingoCard';
import ChatSystem from './ChatSystem';
import Confetti from './Confetti';

const GameScreen: React.FC = () => {
  const { gameState, dispatch, currentMatch, playerCard, opponentCard } = useGame();
  const { user } = useAuth();
  const [chatOpen, setChatOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  const { calledNumbers, currentNumber, gameStatus, gameTimer, isPaused } = gameState;

  useEffect(() => {
    if (gameStatus === 'playing' && !isPaused) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Time's up - determine winner
            dispatch({ type: 'END_GAME', payload: { winner: 'timeout' } });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStatus, isPaused, dispatch]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPrizePool = () => {
    return currentMatch?.entryFee ? currentMatch.entryFee * 4 : 2.00; // 4 players, $0.50 each
  };

  if (!currentMatch || !playerCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Game Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 backdrop-blur-md rounded-lg p-2 border border-yellow-400/30">
              <DollarSign className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-white font-bold">Prize Pool</div>
              <div className="text-yellow-400 text-lg font-bold">${getPrizePool().toFixed(2)}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-red-500/20 backdrop-blur-md rounded-lg p-2 border border-red-400/30">
              <Clock className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-white font-bold">Time Left</div>
              <div className="text-red-400 text-lg font-bold">{formatTime(timeLeft)}</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-white text-sm mb-2">
            <span>Game Progress</span>
            <span>{calledNumbers.length}/75 Numbers Called</span>
          </div>
          <Progress 
            value={(calledNumbers.length / 75) * 100} 
            className="h-3 bg-white/20"
          />
        </div>
      </div>

      {/* Current Number Display */}
      {currentNumber && (
        <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border-green-400/30 mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-sm">Current Number</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-green-500 text-white text-4xl font-bold rounded-full w-20 h-20 flex items-center justify-center mx-auto">
              {currentNumber}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Game Status */}
      {gameStatus === 'won' && (
        <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-md border-yellow-400/30 mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              🎉 Congratulations! You Won!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-yellow-400 text-2xl font-bold mb-2">
              +${getPrizePool().toFixed(2)}
            </div>
            <p className="text-yellow-200 text-sm mb-4">
              Your winnings have been added to your balance!
            </p>
            <div className="flex gap-2 justify-center">
              <Button 
                onClick={() => dispatch({ type: 'RESET_GAME' })}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Play Again
              </Button>
              <Button 
                onClick={() => dispatch({ type: 'RETURN_TO_HOME' })}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {gameStatus === 'lost' && (
        <Card className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-md border-red-400/30 mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-white text-xl">😔 Game Over</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-red-200 text-sm mb-4">
              Better luck next time! Keep practicing to improve your skills.
            </p>
            <div className="flex gap-2 justify-center">
              <Button 
                onClick={() => dispatch({ type: 'RESET_GAME' })}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Try Again
              </Button>
              <Button 
                onClick={() => dispatch({ type: 'RETURN_TO_HOME' })}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bingo Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Player Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Your Card
              </div>
              <Badge variant="secondary" className="bg-blue-500 text-white">
                ${user?.username || 'Player'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BingoCard 
              numbers={playerCard} 
              calledNumbers={calledNumbers}
              isPlayer={true}
            />
          </CardContent>
        </Card>

        {/* Opponent Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-red-400" />
                AI Opponent
              </div>
              <Badge variant="secondary" className="bg-red-500 text-white">
                AI Player
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BingoCard 
              numbers={opponentCard} 
              calledNumbers={calledNumbers}
              isPlayer={false}
            />
          </CardContent>
        </Card>
      </div>

      {/* Called Numbers Display */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
        <CardHeader>
          <CardTitle className="text-white text-center">Called Numbers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-1 max-h-32 overflow-y-auto">
            {Array.from({ length: 75 }, (_, i) => i + 1).map(number => (
              <div 
                key={number} 
                className={`w-8 h-8 rounded text-xs flex items-center justify-center font-bold ${
                  calledNumbers.includes(number) 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-300/20 text-gray-400'
                }`}
              >
                {number}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Game Controls */}
      {gameStatus === 'playing' && (
        <div className="flex gap-3 justify-center mb-6">
          <Button
            onClick={() => dispatch({ type: 'TOGGLE_PAUSE' })}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button
            onClick={() => dispatch({ type: 'END_GAME', payload: { winner: 'forfeit' } })}
            variant="outline"
            className="border-red-400/30 text-red-400 hover:bg-red-400/10"
          >
            Forfeit
          </Button>
        </div>
      )}

      {/* Chat Button */}
      <div className="fixed bottom-20 left-4 z-40">
        <Button 
          onClick={() => setChatOpen(!chatOpen)} 
          className="bg-purple-500 hover:bg-purple-600 rounded-full w-12 h-12 p-0"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      </div>

      {/* Chat System */}
      <ChatSystem 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
        matchId={currentMatch.id} 
      />

      {/* Confetti for Win */}
      {gameStatus === 'won' && (
        <Confetti isActive={true} onComplete={() => setShowConfetti(false)} />
      )}
    </div>
  );
};

export default GameScreen;