import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { 
  Crown, 
  Star, 
  Gift, 
  Trophy, 
  Lock, 
  Timer, 
  DollarSign, 
  Gem, 
  Play, 
  Plus,
  Wallet,
  BarChart3,
  Award,
  Zap,
  Target,
  Users,
  Calendar,
  Bell
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const HomeScreen: React.FC = () => {
  const { user, isDemoMode } = useAuth();
  const { startMatch } = useGame();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGameStart = async (entryFee: number, isPractice: boolean = false) => {
    try {
      await startMatch(isPractice, entryFee);
    } catch (error) {
      console.error('Failed to start game:', error);
    }
  };

  const gameModes = [
    {
      id: 'penny',
      name: 'Penny Bingo',
      prize: '$0.50',
      players: '3-8',
      entryFee: 0.50,
      background: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      icon: '🎯',
      timesToday: 5
    },
    {
      id: 'dollar',
      name: 'Dollar Bingo',
      prize: '$2.00',
      players: '5-12',
      entryFee: 1.00,
      background: 'bg-gradient-to-br from-green-400 to-emerald-500',
      icon: '💎',
      timesToday: 3
    },
    {
      id: 'tournament',
      name: 'Tournament',
      prize: '$13.50',
      players: '15+',
      entryFee: 4.00,
      background: 'bg-gradient-to-br from-purple-400 to-pink-500',
      icon: '🏆',
      timesToday: 1
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Status Bar */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left - Logo & VIP */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                B
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-2.5 h-2.5 text-yellow-800" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">VIP 0</span>
              </div>
              <Progress value={0} className="w-20 h-1.5 bg-gray-700" />
              <span className="text-xs text-gray-400">0/200</span>
            </div>
          </div>

          {/* Center - Currency */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-blue-500/20 px-3 py-1.5 rounded-lg">
              <Gem className="w-4 h-4 text-blue-400" />
              <span className="text-white font-medium">{user?.balance || 160}</span>
              <Plus className="w-4 h-4 text-blue-400 cursor-pointer hover:text-blue-300" />
            </div>
            <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1.5 rounded-lg">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-white font-medium">${(user?.balance || 0) / 100}</span>
              <Plus className="w-4 h-4 text-green-400 cursor-pointer hover:text-green-300" />
            </div>
          </div>

          {/* Right - Withdraw */}
          <Button 
            variant="outline" 
            className="bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Withdraw
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* VIP & Features Row */}
        <div className="grid grid-cols-3 gap-4">
          {/* Rank System */}
          <Card className="glass-card border-yellow-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-yellow-400 text-sm flex items-center justify-center">
                <Trophy className="w-4 h-4 mr-1" />
                RANK
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-end justify-center space-x-1">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center text-yellow-900 font-bold text-sm">
                    2
                  </div>
                  <div className="w-6 h-6 bg-gray-400 rounded-lg flex items-center justify-center text-gray-700 font-bold text-xs mt-1">
                    1
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 bg-gray-400 rounded-lg flex items-center justify-center text-gray-700 font-bold text-xs">
                    2
                  </div>
                  <div className="w-4 h-4 bg-gray-400 rounded-lg flex items-center justify-center text-gray-700 font-bold text-xs mt-1">
                    3
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Unlock Feature */}
          <Card className="glass-card border-red-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-red-400 text-sm flex items-center justify-center">
                <Lock className="w-4 h-4 mr-1" />
                Unlock at 2 Cash Game
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-red-400" />
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-gray-400">0/2</span>
              </div>
            </CardContent>
          </Card>

          {/* Newbie Gift */}
          <Card className="glass-card border-purple-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-purple-400 text-sm flex items-center justify-center">
                <Gift className="w-4 h-4 mr-1" />
                Newbie Orgy
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Gift className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="text-center mt-2">
                <div className="flex items-center justify-center space-x-1">
                  <Timer className="w-3 h-3 text-purple-400" />
                  <span className="text-xs text-purple-400">04:57:09</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Newcomer Section */}
        <Card className="glass-card border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 text-lg flex items-center">
              <Star className="w-5 h-5 mr-2" />
              NEWCOMER
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between bg-purple-500/20 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white text-sm">Progress</span>
                </div>
                <span className="text-yellow-400 font-medium">0/100</span>
              </div>
              <div className="flex items-center justify-between bg-purple-500/20 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-purple-400" />
                  <span className="text-white text-sm">Notifications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-purple-400 font-medium">20</span>
                  <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1">
                    Go
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Modes */}
        <div className="space-y-4">
          <h2 className="text-white text-xl font-bold text-center">Choose Your Game</h2>
          
          {gameModes.map((game) => (
            <Card key={game.id} className="glass-card card-hover border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  {/* Left - Prize Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{game.icon}</span>
                      <div>
                        <h3 className="text-white font-semibold">{game.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-yellow-400 font-bold">{game.prize}</span>
                          <div className="flex items-center space-x-1">
                            <Crown className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 text-sm">
                              {parseFloat(game.prize.replace('$', '')) * 100}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>Players: {game.players}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Times today: {game.timesToday}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right - Entry & Play */}
                  <div className="flex flex-col items-end space-y-3">
                    <div className="text-right">
                      <div className="text-gray-400 text-sm">Entry</div>
                      <div className="text-white font-bold text-lg">
                        ${game.entryFee.toFixed(2)}
                      </div>
                    </div>
                    <Button 
                      onClick={() => handleGameStart(game.entryFee, false)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold btn-animate"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Practice Mode */}
        <Card className="glass-card border-blue-500/30">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-blue-400 mr-3" />
              <h3 className="text-white text-xl font-bold">Practice Mode</h3>
            </div>
            <p className="text-gray-400 mb-4">Perfect your skills without spending money</p>
            <Button 
              onClick={() => handleGameStart(0, true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold btn-animate"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Practice Game
            </Button>
          </CardContent>
        </Card>

        {/* Demo Mode Banner */}
        {isDemoMode && (
          <Card className="glass-card border-yellow-500/30 bg-yellow-500/10">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Demo Mode Active</span>
              </div>
              <p className="text-yellow-300 text-sm">
                You're playing in demo mode. Real money features are simulated.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;