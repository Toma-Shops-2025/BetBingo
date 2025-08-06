import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Trophy, TrendingUp, Calendar, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import GameHistory from './GameHistory';

const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();

  const userStats = {
    name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Anonymous User',
    email: user?.email || 'Not logged in',
    joinDate: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Unknown',
    totalGames: 45,
    wins: 12,
    losses: 33,
    winRate: 26.7,
    totalEarnings: 1250,
    bestStreak: 3,
    favoriteMode: 'Quick Match'
  };

  const recentMatches = [
    { id: '1', opponent: 'BingoKing', result: 'loss' as const, betAmount: 50, currency: 'USD', date: '2 hours ago', duration: '5:23' },
    { id: '2', opponent: 'LuckyPlayer', result: 'win' as const, betAmount: 100, currency: 'USD', date: '1 day ago', duration: '3:45' },
    { id: '3', opponent: 'NumberMaster', result: 'loss' as const, betAmount: 25, currency: 'USD', date: '2 days ago', duration: '7:12' },
    { id: '4', opponent: 'BingoQueen', result: 'win' as const, betAmount: 75, currency: 'USD', date: '3 days ago', duration: '4:30' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4 pb-20 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 text-center">
          <User className="w-16 h-16 mx-auto text-white mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Not Signed In</h2>
          <p className="text-purple-200 mb-4">Please sign in to view your profile</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4 pb-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
        </div>

        {/* User Info */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardContent className="p-6 text-center">
            <Avatar className="w-20 h-20 mx-auto mb-4">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-purple-500 text-white text-2xl">
                {userStats.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-white mb-1">{userStats.name}</h2>
            <p className="text-purple-200 mb-2">{userStats.email}</p>
            <Badge variant="secondary" className="bg-yellow-400 text-yellow-800">
              Member since {userStats.joinDate}
            </Badge>
            {user?.email_confirmed_at && (
              <Badge variant="default" className="bg-green-500 text-white ml-2">
                Verified
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* User ID for debugging */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="w-5 h-5 mr-2" />
              Account Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-white">
              <span className="text-purple-200">User ID: </span>
              <span className="font-mono text-xs">{user.id}</span>
            </div>
            <div className="text-white">
              <span className="text-purple-200">Provider: </span>
              <span>{user.app_metadata?.provider || 'email'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Game Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{userStats.totalGames}</p>
                <p className="text-purple-200 text-sm">Total Games</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-400">{userStats.wins}</p>
                <p className="text-purple-200 text-sm">Wins</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-400">{userStats.losses}</p>
                <p className="text-purple-200 text-sm">Losses</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-400">{userStats.winRate}%</p>
                <p className="text-purple-200 text-sm">Win Rate</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-white/20">
              <div className="flex justify-between text-white">
                <span>Total Earnings:</span>
                <span className="font-bold text-green-400">${userStats.totalEarnings}</span>
              </div>
              <div className="flex justify-between text-white mt-2">
                <span>Best Streak:</span>
                <span className="font-bold">{userStats.bestStreak} wins</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Matches */}
        <GameHistory history={recentMatches} />

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </Button>
          <Button 
            variant="outline" 
            className="w-full border-red-400/30 text-red-400 hover:bg-red-400/10"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;