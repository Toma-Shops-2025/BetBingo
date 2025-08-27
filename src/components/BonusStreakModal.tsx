import React, { useState, useEffect } from 'react';
import { X, Calendar, Gift, Star, DollarSign, Gem } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface BonusStreakModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DayReward {
  day: number;
  type: 'diamonds' | 'cash';
  amount: number;
  isClaimed: boolean;
  isAvailable: boolean;
}

const BonusStreakModal: React.FC<BonusStreakModalProps> = ({ isOpen, onClose }) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [rewards, setRewards] = useState<DayReward[]>([
    { day: 1, type: 'diamonds', amount: 50, isClaimed: false, isAvailable: true },
    { day: 2, type: 'diamonds', amount: 70, isClaimed: false, isAvailable: false },
    { day: 3, type: 'cash', amount: 0.30, isClaimed: false, isAvailable: false },
    { day: 4, type: 'diamonds', amount: 90, isClaimed: false, isAvailable: false },
    { day: 5, type: 'diamonds', amount: 100, isClaimed: false, isAvailable: false },
    { day: 6, type: 'diamonds', amount: 120, isClaimed: false, isAvailable: false },
    { day: 7, type: 'mixed', amount: 0.30, isClaimed: false, isAvailable: false }
  ]);

  const claimReward = (day: number) => {
    setRewards(prev => prev.map(reward => 
      reward.day === day 
        ? { ...reward, isClaimed: true }
        : reward
    ));
    
    // Make next day available
    if (day < 7) {
      setRewards(prev => prev.map(reward => 
        reward.day === day + 1 
          ? { ...reward, isAvailable: true }
          : reward
      ));
    }
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'diamonds':
        return <Gem className="w-6 h-6 text-blue-400" />;
      case 'cash':
        return <DollarSign className="w-6 h-6 text-green-400" />;
      case 'mixed':
        return <Gift className="w-6 h-6 text-pink-400" />;
      default:
        return <Star className="w-6 h-6 text-yellow-400" />;
    }
  };

  const getRewardText = (reward: DayReward) => {
    if (reward.type === 'mixed') {
      return `$${reward.amount} + 180`;
    }
    if (reward.type === 'cash') {
      return `$${reward.amount}`;
    }
    return reward.amount.toString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4">
        {/* Main Modal */}
        <Card className="glass-card border-red-500/30 bg-gradient-to-br from-red-500/10 to-pink-500/10">
          <CardHeader className="relative pb-4">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute top-2 right-2 text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 text-blue-400 mr-2" />
                <span className="text-white text-lg font-bold">7-Day Bonus Streak</span>
              </div>
              <div className="flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="text-yellow-400 text-sm">Complete your streak for amazing rewards!</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Rewards Grid */}
            <div className="grid grid-cols-3 gap-3">
              {/* Days 1-3 */}
              {rewards.slice(0, 3).map((reward) => (
                <div
                  key={reward.day}
                  className={`relative p-3 rounded-lg text-center transition-all duration-300 ${
                    reward.isClaimed
                      ? 'bg-green-500/20 border-2 border-green-500/50'
                      : reward.isAvailable
                      ? 'bg-blue-500/20 border-2 border-blue-500/50 cursor-pointer hover:bg-blue-500/30'
                      : 'bg-gray-500/20 border-2 border-gray-500/50'
                  }`}
                  onClick={() => reward.isAvailable && !reward.isClaimed && claimReward(reward.day)}
                >
                  <div className="text-white font-bold text-sm mb-1">Day {reward.day}</div>
                  <div className="flex justify-center mb-2">
                    {getRewardIcon(reward.type)}
                  </div>
                  <div className="text-white font-semibold text-lg">
                    {getRewardText(reward)}
                  </div>
                  {reward.isClaimed && (
                    <div className="absolute -top-1 -right-1">
                      <Badge className="bg-green-500 text-white text-xs">✓</Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Days 4-6 */}
            <div className="grid grid-cols-3 gap-3">
              {rewards.slice(3, 6).map((reward) => (
                <div
                  key={reward.day}
                  className={`relative p-3 rounded-lg text-center transition-all duration-300 ${
                    reward.isClaimed
                      ? 'bg-green-500/20 border-2 border-green-500/50'
                      : reward.isAvailable
                      ? 'bg-blue-500/20 border-2 border-blue-500/50 cursor-pointer hover:bg-blue-500/30'
                      : 'bg-gray-500/20 border-2 border-gray-500/50'
                  }`}
                  onClick={() => reward.isAvailable && !reward.isClaimed && claimReward(reward.day)}
                >
                  <div className="text-white font-bold text-sm mb-1">Day {reward.day}</div>
                  <div className="flex justify-center mb-2">
                    {getRewardIcon(reward.type)}
                  </div>
                  <div className="text-white font-semibold text-lg">
                    {getRewardText(reward)}
                  </div>
                  {reward.isClaimed && (
                    <div className="absolute -top-1 -right-1">
                      <Badge className="bg-green-500 text-white text-xs">✓</Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Day 7 - Special */}
            <div className="flex justify-center">
              <div
                className={`relative p-4 rounded-lg text-center transition-all duration-300 w-32 ${
                  rewards[6].isClaimed
                    ? 'bg-green-500/20 border-2 border-green-500/50'
                    : rewards[6].isAvailable
                    ? 'bg-pink-500/20 border-2 border-pink-500/50 cursor-pointer hover:bg-pink-500/30'
                    : 'bg-gray-500/20 border-2 border-gray-500/50'
                }`}
                onClick={() => rewards[6].isAvailable && !rewards[6].isClaimed && claimReward(7)}
              >
                <div className="text-white font-bold text-sm mb-1">Day 7</div>
                <div className="flex justify-center mb-2">
                  <Gift className="w-8 h-8 text-pink-400" />
                </div>
                <div className="text-white font-semibold text-lg">
                  $0.30 + 180
                </div>
                <div className="text-pink-300 text-xs">MEGA REWARD!</div>
                {rewards[6].isClaimed && (
                  <div className="absolute -top-1 -right-1">
                    <Badge className="bg-green-500 text-white text-xs">✓</Badge>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Info */}
            <div className="text-center pt-4 border-t border-white/20">
              <div className="text-white text-sm mb-2">
                Current Streak: <span className="text-yellow-400 font-bold">{currentDay}</span> days
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentDay / 7) * 100}%` }}
                ></div>
              </div>
              <div className="text-gray-400 text-xs mt-1">
                {7 - currentDay} days remaining for complete streak
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg"
            >
              Continue Playing
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BonusStreakModal; 