import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Coins, Zap, Trophy, Users } from 'lucide-react';

interface HomeScreenProps {
  onStartGame: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame }) => {
  const { startMatch } = useGame();
  const [betAmount, setBetAmount] = useState<string>('10');
  const [currency, setCurrency] = useState<string>('USD');

  const handleStartMatch = (isFree: boolean = false) => {
    const amount = isFree ? 0 : parseFloat(betAmount) || 10;
    startMatch(amount, isFree ? 'USD' : currency);
    onStartGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">BetBingo</h1>
          <p className="text-purple-200">1-on-1 Bingo. Real Bets. Real Wins.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Wins</p>
              <p className="text-2xl font-bold text-white">12</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Coins className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Balance</p>
              <p className="text-2xl font-bold text-white">$1,250</p>
            </CardContent>
          </Card>
        </div>

        {/* Game Modes */}
        <div className="space-y-4 mb-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Quick Match
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm mb-1 block">Bet Amount</label>
                  <Input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder-white/60"
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="text-white text-sm mb-1 block">Currency</label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                onClick={() => handleStartMatch(false)}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Users className="w-4 h-4 mr-2" />
                Find Opponent
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-blue-400" />
                Practice Mode
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-200 text-sm mb-4">
                Play against AI to practice your skills without betting real money.
              </p>
              <Button 
                onClick={() => handleStartMatch(true)}
                variant="outline"
                className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
              >
                Start Practice Game
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Legal Notice */}
        <div className="text-center text-xs text-purple-200 mt-8">
          <p>18+ only. Gambling may be illegal in your jurisdiction.</p>
          <p className="mt-1">Play responsibly.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;