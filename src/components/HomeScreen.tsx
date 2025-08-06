import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, DollarSign, Gift, Zap, Star, Users, Target } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';

interface HomeScreenProps {
  onStartGame: (isPractice: boolean) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame }) => {
  const { user } = useAuth();
  const { gameStats } = useGame();

  const handleStartMatch = (isPractice: boolean) => {
    onStartGame(isPractice);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      {/* Header with Logo and Balance */}
      <div className="text-center mb-6">
        <img
          src="/logo.png"
          alt="BetBingo Logo"
          className="h-16 mx-auto mb-4"
          style={{ maxWidth: '200px', height: 'auto' }}
        />
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="bg-yellow-500/20 backdrop-blur-md rounded-lg p-3 border border-yellow-400/30">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-lg">
                ${user?.balance || 0.00}
              </span>
            </div>
            <p className="text-yellow-300 text-xs">Available Balance</p>
          </div>
          <div className="bg-green-500/20 backdrop-blur-md rounded-lg p-3 border border-green-400/30">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold text-lg">
                ${user?.bonus || 5.00}
              </span>
            </div>
            <p className="text-green-300 text-xs">Welcome Bonus</p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-white text-xl">
            🎯 Win Real Cash Playing Bingo!
          </CardTitle>
          <p className="text-purple-200 text-sm">
            Play skill-based bingo rounds and earn real money rewards
          </p>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center border border-white/20">
          <div className="text-white font-bold text-lg">{gameStats.totalWins}</div>
          <div className="text-purple-200 text-xs">Wins</div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center border border-white/20">
          <div className="text-white font-bold text-lg">${gameStats.totalEarnings?.toFixed(2) || '0.00'}</div>
          <div className="text-purple-200 text-xs">Earned</div>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 text-center border border-white/20">
          <div className="text-white font-bold text-lg">{gameStats.gamesPlayed}</div>
          <div className="text-purple-200 text-xs">Games</div>
        </div>
      </div>

      {/* Game Modes */}
      <div className="space-y-4 mb-6">
        {/* Cash Game Mode */}
        <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md border-green-400/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                Cash Bingo
              </div>
              <Badge variant="secondary" className="bg-green-500 text-white">
                $0.50 Entry
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-200 text-sm mb-4">
              Play against AI opponents and win real cash prizes. Fast-paced, skill-based bingo rounds.
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="text-green-300 text-sm">
                <div>🏆 Prize Pool: $2.00</div>
                <div>⏱️ Duration: 3-5 min</div>
              </div>
              <div className="text-right">
                <div className="text-green-300 text-sm">Players Online</div>
                <div className="text-green-400 font-bold">1,247</div>
              </div>
            </div>
            <Button
              onClick={() => handleStartMatch(false)}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3"
            >
              Play for Cash
            </Button>
          </CardContent>
        </Card>

        {/* Practice Mode */}
        <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border-blue-400/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Practice Mode
              </div>
              <Badge variant="secondary" className="bg-blue-500 text-white">
                FREE
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-200 text-sm mb-4">
              Hone your skills against AI without risking real money. Perfect for beginners!
            </p>
            <Button
              onClick={() => handleStartMatch(true)}
              variant="outline"
              className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-bold py-3"
            >
              Start Practice
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Features Highlight */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
        <CardHeader>
          <CardTitle className="text-white text-center">🎁 Why Players Love BetBingo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-green-400" />
              <span className="text-purple-200 text-sm">Win real cash prizes with no hidden fees</span>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-purple-200 text-sm">Fast-paced, skill-based bingo rounds</span>
            </div>
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-pink-400" />
              <span className="text-purple-200 text-sm">Instant withdrawals via PayPal</span>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-purple-200 text-sm">Play against smart AI opponents</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Winners */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-center">🏆 Recent Winners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-white/5 rounded p-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                <span className="text-purple-200 text-sm">Sarah M.</span>
              </div>
              <span className="text-green-400 font-bold">$15.50</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 rounded p-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                <span className="text-purple-200 text-sm">Mike R.</span>
              </div>
              <span className="text-green-400 font-bold">$12.75</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 rounded p-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                <span className="text-purple-200 text-sm">Lisa K.</span>
              </div>
              <span className="text-green-400 font-bold">$8.25</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeScreen;