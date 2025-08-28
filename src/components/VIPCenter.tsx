import React, { useState } from 'react';
import { Crown, Shield, BarChart3, Gift, Star, Lock, Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface VIPCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

interface VIPLevel {
  level: number;
  name: string;
  requiredPoints: number;
  currentPoints: number;
  benefits: string[];
  isUnlocked: boolean;
  isCurrent: boolean;
}

const VIPCenter: React.FC<VIPCenterProps> = ({ isOpen, onClose }) => {
  const [selectedLevel, setSelectedLevel] = useState<VIPLevel | null>(null);

  const vipLevels: VIPLevel[] = [
    {
      level: 0,
      name: "Bronze",
      requiredPoints: 0,
      currentPoints: 0,
      benefits: ["Basic game access", "Standard rewards", "Community chat"],
      isUnlocked: true,
      isCurrent: true
    },
    {
      level: 1,
      name: "Silver",
      requiredPoints: 200,
      currentPoints: 0,
      benefits: ["5% bonus on wins", "Exclusive tournaments", "Priority support", "Custom avatars"],
      isUnlocked: false,
      isCurrent: false
    },
    {
      level: 2,
      name: "Gold",
      requiredPoints: 500,
      currentPoints: 0,
      benefits: ["10% bonus on wins", "VIP tournaments", "Exclusive power-ups", "Daily bonus", "Profile customization"],
      isUnlocked: false,
      isCurrent: false
    },
    {
      level: 3,
      name: "Platinum",
      requiredPoints: 1000,
      currentPoints: 0,
      benefits: ["15% bonus on wins", "Premium tournaments", "All power-ups", "Weekly bonus", "Exclusive themes", "Priority matchmaking"],
      isUnlocked: false,
      isCurrent: false
    },
    {
      level: 4,
      name: "Diamond",
      requiredPoints: 2000,
      currentPoints: 0,
      benefits: ["20% bonus on wins", "Elite tournaments", "Unlimited power-ups", "Monthly bonus", "VIP events", "Personal manager"],
      isUnlocked: false,
      isCurrent: false
    }
  ];

  const currentVIP = vipLevels.find(level => level.isCurrent) || vipLevels[0];
  const nextVIP = vipLevels.find(level => !level.isUnlocked) || vipLevels[1];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <Card className="glass-card border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
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
                <Crown className="w-8 h-8 text-yellow-400 mr-3" />
                <span className="text-white text-2xl font-bold">VIP Center</span>
              </div>
              <p className="text-gray-300 text-sm">Unlock exclusive benefits and rewards</p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Current VIP Status */}
            <Card className="glass-card border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-lg flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Current VIP Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <Crown className="w-8 h-8 text-yellow-800" />
                    </div>
                    <div>
                      <h3 className="text-white text-xl font-bold">{currentVIP.name} VIP</h3>
                      <p className="text-gray-300 text-sm">Level {currentVIP.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold text-2xl">{currentVIP.currentPoints}</div>
                    <div className="text-gray-400 text-sm">Current Points</div>
                  </div>
                </div>

                {/* Progress to Next Level */}
                {nextVIP && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Progress to {nextVIP.name} VIP</span>
                      <span className="text-yellow-400">{currentVIP.currentPoints} / {nextVIP.requiredPoints}</span>
                    </div>
                    <Progress 
                      value={(currentVIP.currentPoints / nextVIP.requiredPoints) * 100} 
                      className="h-3 bg-gray-700"
                    />
                    <div className="text-center text-gray-400 text-sm">
                      {nextVIP.requiredPoints - currentVIP.currentPoints} points needed
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* VIP Levels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vipLevels.map((level) => (
                <Card 
                  key={level.level}
                  className={`glass-card cursor-pointer transition-all duration-300 ${
                    level.isCurrent 
                      ? 'border-yellow-500/50 bg-gradient-to-r from-yellow-500/10 to-orange-500/10' 
                      : level.isUnlocked 
                      ? 'border-green-500/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10'
                      : 'border-gray-500/30 bg-gradient-to-r from-gray-500/10 to-slate-500/10'
                  }`}
                  onClick={() => setSelectedLevel(level)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className={`text-lg ${
                        level.isCurrent ? 'text-yellow-400' : level.isUnlocked ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {level.name} VIP
                      </CardTitle>
                      {level.isCurrent && (
                        <Badge className="bg-yellow-500 text-yellow-900">Current</Badge>
                      )}
                      {level.isUnlocked && !level.isCurrent && (
                        <Badge className="bg-green-500 text-green-900">Unlocked</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-3">
                      <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                        level.isCurrent 
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                          : level.isUnlocked 
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                          : 'bg-gradient-to-br from-gray-400 to-slate-500'
                      }`}>
                        <Crown className={`w-8 h-8 ${
                          level.isCurrent ? 'text-yellow-800' : level.isUnlocked ? 'text-green-800' : 'text-gray-800'
                        }`} />
                      </div>
                    </div>
                    <div className="text-center mb-3">
                      <div className="text-white font-bold text-lg">{level.requiredPoints}</div>
                      <div className="text-gray-400 text-sm">Points Required</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* VIP Benefits */}
            {selectedLevel && (
              <Card className="glass-card border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-blue-400 text-lg flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    {selectedLevel.name} VIP Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedLevel.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-white text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  {!selectedLevel.isUnlocked && (
                    <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <Lock className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold">How to Unlock</span>
                      </div>
                      <p className="text-yellow-300 text-sm">
                        Play games and earn points to unlock {selectedLevel.name} VIP status. 
                        You need {selectedLevel.requiredPoints - (vipLevels.find(l => l.isCurrent)?.currentPoints || 0)} more points.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* VIP Privileges */}
            <Card className="glass-card border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 text-lg flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Your Privileges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-500/10 rounded-lg">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-1">Withdraw Rebate</h4>
                    <p className="text-gray-300 text-sm">Get cashback on withdrawals</p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-500/10 rounded-lg">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Crown className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-1">Crown Extra</h4>
                    <p className="text-gray-300 text-sm">Bonus rewards for VIP members</p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-500/10 rounded-lg">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Gift className="w-6 h-6 text-green-400" />
                    </div>
                    <h4 className="text-white font-semibold mb-1">Exclusive Offers</h4>
                    <p className="text-gray-300 text-sm">Special deals and promotions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                onClick={onClose}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg"
              >
                Continue Playing
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-green-500/30 text-green-400 hover:bg-green-500/20"
              >
                <Gift className="w-4 h-4 mr-2" />
                Claim VIP Bonus
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VIPCenter; 