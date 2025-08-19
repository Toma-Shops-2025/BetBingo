import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Target, TrendingUp, Sparkles, Star, Zap } from 'lucide-react';

interface PowerUp {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

interface PowerUpsBarProps {
  powerUps: Record<string, number>;
  onUsePowerUp: (powerUpType: string) => void;
}

const PowerUpsBar: React.FC<PowerUpsBarProps> = ({ powerUps, onUsePowerUp }) => {
  const powerUpTypes: PowerUp[] = [
    {
      id: 'timeFreeze',
      name: 'Freeze',
      icon: Clock,
      color: 'border-blue-400 text-blue-400',
      description: 'Pause timer for 5 seconds'
    },
    {
      id: 'autoMark',
      name: 'Auto',
      icon: Target,
      color: 'border-green-400 text-green-400',
      description: 'Auto-mark called numbers'
    },
    {
      id: 'doublePoints',
      name: 'Double',
      icon: TrendingUp,
      color: 'border-purple-400 text-purple-400',
      description: 'Double points for next win'
    },
    {
      id: 'luckyNumber',
      name: 'Lucky',
      icon: Sparkles,
      color: 'border-red-400 text-red-400',
      description: 'Next number is on your card'
    },
    {
      id: 'shield',
      name: 'Shield',
      icon: Star,
      color: 'border-yellow-400 text-yellow-400',
      description: 'Protect against one missed number'
    },
    {
      id: 'bomb',
      name: 'Bomb',
      icon: Zap,
      color: 'border-pink-400 text-pink-400',
      description: 'Clear a random number'
    }
  ];

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">⚡ Power-ups</span>
        <span className="text-purple-200 text-sm">Use strategically!</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {powerUpTypes.map((powerUp) => {
          const Icon = powerUp.icon;
          const count = powerUps[powerUp.id] || 0;
          const isAvailable = count > 0;
          
          return (
            <Button
              key={powerUp.id}
              variant="outline"
              size="sm"
              className={`flex items-center gap-2 ${
                isAvailable 
                  ? powerUp.color 
                  : 'border-gray-600 text-gray-600'
              }`}
              onClick={() => onUsePowerUp(powerUp.id)}
              disabled={!isAvailable}
              title={powerUp.description}
            >
              <Icon className="w-4 h-4" />
              <span className="text-xs">{powerUp.name} ({count})</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default PowerUpsBar; 