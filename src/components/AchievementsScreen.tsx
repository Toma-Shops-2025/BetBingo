import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Zap, Target, Crown, Flame, Coins, Award } from 'lucide-react';
import { Achievement, Badge as BadgeType } from '@/types';

const AchievementsScreen: React.FC = () => {
  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      name: 'First Victory',
      description: 'Win your first game',
      icon: '🏆',
      unlockedAt: new Date(),
      progress: 1,
      maxProgress: 1,
      reward: { type: 'experience', amount: 100 }
    },
    {
      id: '2',
      name: 'Bingo Master',
      description: 'Win 10 games',
      icon: '👑',
      unlockedAt: undefined,
      progress: 7,
      maxProgress: 10,
      reward: { type: 'currency', amount: 500, currency: 'USD' }
    },
    {
      id: '3',
      name: 'Streak Champion',
      description: 'Win 5 games in a row',
      icon: '🔥',
      unlockedAt: undefined,
      progress: 3,
      maxProgress: 5,
      reward: { type: 'badge', amount: 1 }
    },
    {
      id: '4',
      name: 'High Roller',
      description: 'Win a game with $100+ bet',
      icon: '💰',
      unlockedAt: undefined,
      progress: 0,
      maxProgress: 1,
      reward: { type: 'experience', amount: 250 }
    },
    {
      id: '5',
      name: 'Tournament Champion',
      description: 'Win a tournament',
      icon: '🏅',
      unlockedAt: undefined,
      progress: 0,
      maxProgress: 1,
      reward: { type: 'currency', amount: 1000, currency: 'USD' }
    },
    {
      id: '6',
      name: 'Social Butterfly',
      description: 'Add 10 friends',
      icon: '🦋',
      unlockedAt: undefined,
      progress: 2,
      maxProgress: 10,
      reward: { type: 'experience', amount: 150 }
    }
  ]);

  const [badges] = useState<BadgeType[]>([
    {
      id: '1',
      name: 'Rookie Player',
      description: 'Complete your first game',
      icon: '🎯',
      rarity: 'common',
      unlockedAt: new Date()
    },
    {
      id: '2',
      name: 'Bingo Legend',
      description: 'Win 50 games',
      icon: '👑',
      rarity: 'legendary',
      unlockedAt: undefined
    },
    {
      id: '3',
      name: 'Lucky Streak',
      description: 'Win 10 games in a row',
      icon: '🔥',
      rarity: 'epic',
      unlockedAt: undefined
    },
    {
      id: '4',
      name: 'Tournament Master',
      description: 'Win 5 tournaments',
      icon: '🏆',
      rarity: 'legendary',
      unlockedAt: undefined
    }
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Common';
      case 'rare': return 'Rare';
      case 'epic': return 'Epic';
      case 'legendary': return 'Legendary';
      default: return 'Common';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Achievements & Badges</h1>
          <p className="text-purple-200">Track your progress and unlock rewards</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Achievements</p>
              <p className="text-2xl font-bold text-white">
                {achievements.filter(a => a.unlockedAt).length}/{achievements.length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Badges</p>
              <p className="text-2xl font-bold text-white">
                {badges.filter(b => b.unlockedAt).length}/{badges.length}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-white font-semibold">Total XP</p>
              <p className="text-2xl font-bold text-white">1,250</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Trophy className="w-5 h-5 mr-2" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border ${
                    achievement.unlockedAt
                      ? 'bg-green-500/20 border-green-500/30'
                      : 'bg-white/10 border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <h3 className="text-white font-semibold">{achievement.name}</h3>
                        <p className="text-sm text-purple-200">{achievement.description}</p>
                      </div>
                    </div>
                    {achievement.unlockedAt && (
                      <Badge className="bg-green-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Unlocked
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-white text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-white text-sm">
                      <span>Reward:</span>
                      <span className="font-bold text-yellow-400">
                        {achievement.reward.type === 'experience' && `${achievement.reward.amount} XP`}
                        {achievement.reward.type === 'currency' && `${achievement.reward.amount} ${achievement.reward.currency}`}
                        {achievement.reward.type === 'badge' && `${achievement.reward.amount} Badge`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Badges */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border ${
                    badge.unlockedAt
                      ? 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-yellow-400/30'
                      : 'bg-white/10 border-white/20 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{badge.icon}</div>
                      <div>
                        <h3 className="text-white font-semibold">{badge.name}</h3>
                        <p className="text-sm text-purple-200">{badge.description}</p>
                      </div>
                    </div>
                    <Badge className={getRarityColor(badge.rarity)}>
                      {getRarityText(badge.rarity)}
                    </Badge>
                  </div>
                  
                  {badge.unlockedAt && (
                    <div className="text-center">
                      <p className="text-sm text-purple-200">
                        Unlocked on {badge.unlockedAt.toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AchievementsScreen; 