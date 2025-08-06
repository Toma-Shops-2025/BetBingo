import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, UserPlus, MessageCircle, Gamepad2, Users, UserCheck, UserX } from 'lucide-react';
import { Player } from '@/types';

const FriendsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'friends' | 'requests' | 'suggestions'>('friends');

  const [friends] = useState<Player[]>([
    {
      id: '1',
      name: 'BingoKing',
      avatar: '',
      balance: 2500,
      cryptoBalance: { ETH: 1.2, USDC: 500 },
      level: 15,
      experience: 2500,
      achievements: [],
      badges: [],
      friends: [],
      isOnline: true,
      lastSeen: new Date(),
      totalGames: 150,
      totalWins: 89,
      totalEarnings: 2500,
      bestStreak: 8,
      currentStreak: 3
    },
    {
      id: '2',
      name: 'LuckyPlayer',
      avatar: '',
      balance: 1800,
      cryptoBalance: { ETH: 0.8, USDC: 300 },
      level: 12,
      experience: 1800,
      achievements: [],
      badges: [],
      friends: [],
      isOnline: false,
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
      totalGames: 120,
      totalWins: 67,
      totalEarnings: 1800,
      bestStreak: 5,
      currentStreak: 0
    },
    {
      id: '3',
      name: 'NumberMaster',
      avatar: '',
      balance: 3200,
      cryptoBalance: { ETH: 2.1, USDC: 800 },
      level: 18,
      experience: 3200,
      achievements: [],
      badges: [],
      friends: [],
      isOnline: true,
      lastSeen: new Date(),
      totalGames: 200,
      totalWins: 134,
      totalEarnings: 3200,
      bestStreak: 12,
      currentStreak: 6
    }
  ]);

  const [friendRequests] = useState<Player[]>([
    {
      id: '4',
      name: 'NewPlayer',
      avatar: '',
      balance: 500,
      cryptoBalance: { ETH: 0.1, USDC: 50 },
      level: 3,
      experience: 300,
      achievements: [],
      badges: [],
      friends: [],
      isOnline: true,
      lastSeen: new Date(),
      totalGames: 25,
      totalWins: 12,
      totalEarnings: 500,
      bestStreak: 2,
      currentStreak: 1
    }
  ]);

  const [suggestions] = useState<Player[]>([
    {
      id: '5',
      name: 'BingoQueen',
      avatar: '',
      balance: 1500,
      cryptoBalance: { ETH: 0.5, USDC: 200 },
      level: 10,
      experience: 1500,
      achievements: [],
      badges: [],
      friends: [],
      isOnline: true,
      lastSeen: new Date(),
      totalGames: 80,
      totalWins: 45,
      totalEarnings: 1500,
      bestStreak: 4,
      currentStreak: 2
    }
  ]);

  const handleSendRequest = (playerId: string) => {
    console.log('Sending friend request to:', playerId);
  };

  const handleAcceptRequest = (playerId: string) => {
    console.log('Accepting friend request from:', playerId);
  };

  const handleRejectRequest = (playerId: string) => {
    console.log('Rejecting friend request from:', playerId);
  };

  const handleChallenge = (playerId: string) => {
    console.log('Challenging player:', playerId);
  };

  const handleMessage = (playerId: string) => {
    console.log('Opening chat with:', playerId);
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Friends</h1>
          <p className="text-purple-200">Connect with other players</p>
        </div>

        {/* Search */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search for players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/20 border-white/30 text-white placeholder-white/60"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <Button
            variant={activeTab === 'friends' ? 'default' : 'outline'}
            onClick={() => setActiveTab('friends')}
            className="flex-1"
          >
            <Users className="w-4 h-4 mr-2" />
            Friends ({friends.length})
          </Button>
          <Button
            variant={activeTab === 'requests' ? 'default' : 'outline'}
            onClick={() => setActiveTab('requests')}
            className="flex-1"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Requests ({friendRequests.length})
          </Button>
          <Button
            variant={activeTab === 'suggestions' ? 'default' : 'outline'}
            onClick={() => setActiveTab('suggestions')}
            className="flex-1"
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Suggestions ({suggestions.length})
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'friends' && (
          <div className="space-y-4">
            {friends.map((friend) => (
              <Card key={friend.id} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback className="bg-purple-500 text-white">
                          {friend.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-white font-semibold">{friend.name}</h3>
                          <Badge 
                            variant={friend.isOnline ? 'default' : 'secondary'}
                            className={friend.isOnline ? 'bg-green-500' : 'bg-gray-500'}
                          >
                            {friend.isOnline ? 'Online' : formatLastSeen(friend.lastSeen)}
                          </Badge>
                        </div>
                        <p className="text-purple-200 text-sm">
                          Level {friend.level} • {friend.totalWins} wins • ${friend.totalEarnings}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMessage(friend.id)}
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleChallenge(friend.id)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Gamepad2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="space-y-4">
            {friendRequests.map((request) => (
              <Card key={request.id} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={request.avatar} />
                        <AvatarFallback className="bg-blue-500 text-white">
                          {request.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-white font-semibold">{request.name}</h3>
                        <p className="text-purple-200 text-sm">
                          Level {request.level} • {request.totalWins} wins
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleAcceptRequest(request.id)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <UserCheck className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRejectRequest(request.id)}
                        className="border-red-400 text-red-400 hover:bg-red-400/10"
                      >
                        <UserX className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="space-y-4">
            {suggestions.map((suggestion) => (
              <Card key={suggestion.id} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={suggestion.avatar} />
                        <AvatarFallback className="bg-orange-500 text-white">
                          {suggestion.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-white font-semibold">{suggestion.name}</h3>
                        <p className="text-purple-200 text-sm">
                          Level {suggestion.level} • {suggestion.totalWins} wins • {suggestion.totalGames} games
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleSendRequest(suggestion.id)}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Add Friend
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsScreen; 