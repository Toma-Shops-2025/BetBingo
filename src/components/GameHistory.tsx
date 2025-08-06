import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Clock, DollarSign, User } from 'lucide-react';

interface GameHistoryItem {
  id: string;
  opponent: string;
  result: 'win' | 'loss';
  betAmount: number;
  currency: string;
  date: string;
  duration: string;
}

interface GameHistoryProps {
  history: GameHistoryItem[];
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
  if (history.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-6 text-center">
          <Trophy className="w-12 h-12 mx-auto text-purple-300 mb-4" />
          <h3 className="text-white font-semibold mb-2">No Games Yet</h3>
          <p className="text-purple-200 text-sm">
            Start your first game to see your history here!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Recent Games
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {history.map((game) => (
          <div
            key={game.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              game.result === 'win' 
                ? 'bg-green-500/20 border border-green-500/30' 
                : 'bg-red-500/20 border border-red-500/30'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                game.result === 'win' ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {game.result === 'win' ? (
                  <Trophy className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <p className="text-white font-semibold">vs {game.opponent}</p>
                <p className="text-sm text-purple-200">{game.date}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge 
                variant="secondary" 
                className={
                  game.result === 'win' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }
              >
                {game.result === 'win' ? '+' : '-'}
                {game.betAmount} {game.currency}
              </Badge>
              <p className="text-xs text-purple-200 mt-1">{game.duration}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default GameHistory; 