import React, { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import BingoCard from './BingoCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, DollarSign, MessageCircle } from 'lucide-react';
import ChatSystem from './ChatSystem';
import Confetti from './Confetti';

const GameScreen: React.FC = () => {
  const { gameState, markNumber, resetGame } = useGame();
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [calledNumbers, setCalledNumbers] = useState<number[]>([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (gameState.gameStatus === 'playing') {
      const interval = setInterval(() => {
        const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1)
          .filter(n => !calledNumbers.includes(n));
        
        if (availableNumbers.length > 0) {
          const newNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
          setCurrentNumber(newNumber);
          setCalledNumbers(prev => [...prev, newNumber]);
          markNumber(newNumber);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [gameState.gameStatus, calledNumbers, markNumber]);

  if (!gameState.currentMatch || !gameState.playerCard) {
    return <div>No active game</div>;
  }

  const { currentMatch } = gameState;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center text-white">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5" />
              <span className="font-bold">
                {currentMatch.betAmount} {currentMatch.currency}
              </span>
            </div>
            <Badge variant="secondary" className="bg-yellow-400 text-yellow-800">
              {gameState.gameStatus.toUpperCase()}
            </Badge>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Live Match</span>
            </div>
          </div>
        </div>

        {/* Current Number */}
        {currentNumber && (
          <div className="text-center mb-6">
            <div className="bg-white rounded-full w-24 h-24 mx-auto flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-purple-600">{currentNumber}</span>
            </div>
            <p className="text-white text-lg mt-2">Current Number</p>
          </div>
        )}

        {/* Game Status */}
        {gameState.gameStatus === 'won' && (
          <>
            <div className="text-center mb-6">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-2" />
              <h2 className="text-3xl font-bold text-white mb-4">YOU WON! 🎉</h2>
              <p className="text-white text-lg">
                You won {currentMatch.betAmount * 2} {currentMatch.currency}!
              </p>
              <Button onClick={resetGame} className="mt-4">
                Play Again
              </Button>
            </div>
            <Confetti 
              isActive={true} 
              onComplete={() => setShowConfetti(false)}
            />
          </>
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

        {/* Called Numbers Display */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6">
          <h3 className="text-white text-lg font-semibold mb-3 text-center">Called Numbers</h3>
          <div className="grid grid-cols-10 gap-1 max-h-32 overflow-y-auto">
            {Array.from({ length: 75 }, (_, i) => i + 1).map(number => (
              <div
                key={number}
                className={`w-8 h-8 rounded text-xs flex items-center justify-center font-bold ${
                  calledNumbers.includes(number)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {number}
              </div>
            ))}
          </div>
        </div>

        {/* Bingo Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-white text-lg font-semibold mb-2 text-center">Your Card</h3>
            <BingoCard 
              card={gameState.playerCard} 
              onNumberClick={markNumber}
              disabled={gameState.gameStatus !== 'playing'}
            />
          </div>
          
          {gameState.opponentCard && (
            <div>
              <h3 className="text-white text-lg font-semibold mb-2 text-center">Opponent</h3>
              <BingoCard 
                card={gameState.opponentCard} 
                disabled={true}
                title="OPPONENT"
              />
            </div>
          )}
        </div>

        {/* Called Numbers */}
        <div className="mt-6 bg-white/10 backdrop-blur-md rounded-lg p-4">
          <h4 className="text-white font-semibold mb-2">Called Numbers:</h4>
          <div className="flex flex-wrap gap-2">
            {calledNumbers.slice(-10).map(num => (
              <Badge key={num} variant="secondary" className="bg-white/20 text-white">
                {num}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;