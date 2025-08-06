import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';

const LeaderboardScreen: React.FC = () => {
  const leaderboardData = [
    { rank: 1, name: 'BingoKing', wins: 247, earnings: 15420 },
    { rank: 2, name: 'LuckyPlayer', wins: 198, earnings: 12350 },
    { rank: 3, name: 'NumberMaster', wins: 176, earnings: 9875 },
    { rank: 4, name: 'BingoQueen', wins: 154, earnings: 8234 },
    { rank: 5, name: 'CardShark', wins: 143, earnings: 7456 },
    { rank: 6, name: 'WinnerTakesAll', wins: 132, earnings: 6789 },
    { rank: 7, name: 'BingoChamp', wins: 128, earnings: 6234 },
    { rank: 8, name: 'You', wins: 12, earnings: 1250 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <div className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-sm font-bold">{rank}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
          <p className="text-purple-200">Top BetBingo Champions</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-center">This Week's Top Players</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {leaderboardData.map((player) => (
              <div
                key={player.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  player.name === 'You' 
                    ? 'bg-yellow-400/20 border border-yellow-400/30' 
                    : 'bg-white/10'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {getRankIcon(player.rank)}
                  <div>
                    <p className={`font-semibold ${
                      player.name === 'You' ? 'text-yellow-300' : 'text-white'
                    }`}>
                      {player.name}
                    </p>
                    <p className="text-sm text-purple-200">{player.wins} wins</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="secondary" 
                    className={
                      player.name === 'You' 
                        ? 'bg-yellow-400 text-yellow-800' 
                        : 'bg-green-500 text-white'
                    }
                  >
                    ${player.earnings.toLocaleString()}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Your Rank</p>
              <p className="text-2xl font-bold text-white">#8</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Medal className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Total Wins</p>
              <p className="text-2xl font-bold text-white">12</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Award className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Earnings</p>
              <p className="text-2xl font-bold text-white">$1.2K</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;