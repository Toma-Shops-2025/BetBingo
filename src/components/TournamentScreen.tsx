import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Users, Clock, DollarSign, Star, Award, Calendar } from 'lucide-react';
import { Tournament, TournamentPlayer } from '@/types';

const TournamentScreen: React.FC = () => {
  const [activeTournaments, setActiveTournaments] = useState<Tournament[]>([
    {
      id: '1',
      name: 'Weekly Championship',
      description: 'Compete for the weekly crown and massive prize pool!',
      startDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      entryFee: 50,
      currency: 'USD',
      prizePool: 5000,
      maxPlayers: 64,
      currentPlayers: 32,
      status: 'upcoming',
      rounds: [],
      leaderboard: []
    },
    {
      id: '2',
      name: 'Crypto Kings',
      description: 'ETH tournament for crypto enthusiasts',
      startDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      entryFee: 0.1,
      currency: 'ETH',
      prizePool: 2.5,
      maxPlayers: 32,
      currentPlayers: 28,
      status: 'active',
      rounds: [],
      leaderboard: [
        { playerId: '1', playerName: 'CryptoKing', score: 1250, wins: 8, losses: 2, rank: 1 },
        { playerId: '2', playerName: 'BingoMaster', score: 1180, wins: 7, losses: 3, rank: 2 },
        { playerId: '3', playerName: 'LuckyPlayer', score: 1120, wins: 6, losses: 4, rank: 3 }
      ]
    }
  ]);

  const [userTournaments, setUserTournaments] = useState<Tournament[]>([]);

  const formatTimeRemaining = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Starting soon';
  };

  const getTournamentStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Tournaments</h1>
          <p className="text-purple-200">Compete for glory and massive prizes</p>
        </div>

        {/* Featured Tournament */}
        {activeTournaments.length > 0 && (
          <Card className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-md border-yellow-400/30 mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                  Featured Tournament
                </CardTitle>
                <Badge className="bg-yellow-400 text-yellow-800">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {activeTournaments[0].name}
                  </h3>
                  <p className="text-purple-200 mb-4">
                    {activeTournaments[0].description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span>Prize Pool:</span>
                      <span className="font-bold text-yellow-400">
                        {activeTournaments[0].currency === 'USD' ? '$' : ''}
                        {activeTournaments[0].prizePool.toLocaleString()}
                        {activeTournaments[0].currency !== 'USD' ? ` ${activeTournaments[0].currency}` : ''}
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Entry Fee:</span>
                      <span className="font-bold">
                        {activeTournaments[0].currency === 'USD' ? '$' : ''}
                        {activeTournaments[0].entryFee}
                        {activeTournaments[0].currency !== 'USD' ? ` ${activeTournaments[0].currency}` : ''}
                      </span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Players:</span>
                      <span className="font-bold">
                        {activeTournaments[0].currentPlayers}/{activeTournaments[0].maxPlayers}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-white mb-2">
                      <span>Registration Progress</span>
                      <span>{Math.round((activeTournaments[0].currentPlayers / activeTournaments[0].maxPlayers) * 100)}%</span>
                    </div>
                    <Progress value={(activeTournaments[0].currentPlayers / activeTournaments[0].maxPlayers) * 100} className="h-2" />
                  </div>
                  <div className="text-center">
                    <p className="text-purple-200 mb-2">Tournament starts in</p>
                    <p className="text-2xl font-bold text-white">
                      {formatTimeRemaining(activeTournaments[0].startDate)}
                    </p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                    <Trophy className="w-4 h-4 mr-2" />
                    Join Tournament
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Tournaments */}
        <div className="grid md:grid-cols-2 gap-6">
          {activeTournaments.map((tournament) => (
            <Card key={tournament.id} className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{tournament.name}</CardTitle>
                  <Badge className={getTournamentStatusColor(tournament.status)}>
                    {(tournament.status || '').charAt(0).toUpperCase() + (tournament.status || '').slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-purple-200 text-sm">{tournament.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <DollarSign className="w-5 h-5 mx-auto text-green-400 mb-1" />
                    <p className="text-white font-bold">
                      {tournament.currency === 'USD' ? '$' : ''}
                      {tournament.prizePool.toLocaleString()}
                      {tournament.currency !== 'USD' ? ` ${tournament.currency}` : ''}
                    </p>
                    <p className="text-xs text-purple-200">Prize Pool</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-5 h-5 mx-auto text-blue-400 mb-1" />
                    <p className="text-white font-bold">
                      {tournament.currentPlayers}/{tournament.maxPlayers}
                    </p>
                    <p className="text-xs text-purple-200">Players</p>
                  </div>
                </div>

                <div className="flex justify-between text-white text-sm">
                  <span>Entry Fee:</span>
                  <span className="font-bold">
                    {tournament.currency === 'USD' ? '$' : ''}
                    {tournament.entryFee}
                    {tournament.currency !== 'USD' ? ` ${tournament.currency}` : ''}
                  </span>
                </div>

                <div className="flex justify-between text-white text-sm">
                  <span>Starts:</span>
                  <span>{formatTimeRemaining(tournament.startDate)}</span>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full border-white/30 text-white hover:bg-white/10"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tournament Leaderboard */}
        {activeTournaments.find(t => t.status === 'active') && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20 mt-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Current Tournament Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activeTournaments.find(t => t.status === 'active')?.leaderboard.map((player, index) => (
                  <div key={player.playerId} className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center text-white font-bold">
                        {player.rank}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{player.playerName}</p>
                        <p className="text-sm text-purple-200">{player.wins}W - {player.losses}L</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{player.score} pts</p>
                      <p className="text-sm text-purple-200">Rank #{player.rank}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TournamentScreen; 