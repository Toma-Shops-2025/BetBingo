import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { 
  Pause, 
  Play, 
  RotateCcw, 
  Settings, 
  Zap, 
  Crown, 
  Star, 
  Target,
  Timer,
  Trophy,
  Users,
  Award,
  Sparkles,
  Power,
  Clock,
  MagicWand,
  TrendingUp,
  Gem
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const GameScreen: React.FC = () => {
  const { 
    gameState, 
    startMatch, 
    endMatch, 
    callNumber, 
    pauseGame, 
    resumeGame, 
    resetGame 
  } = useGame();
  
  const [selectedTab, setSelectedTab] = useState<'bingo' | 'powerups' | 'tips'>('bingo');
  const [showPowerUpInfo, setShowPowerUpInfo] = useState(false);
  const [showTips, setShowTips] = useState(false);

  const powerUps = [
    {
      id: 'magic-ball',
      name: 'Magic Ball',
      description: 'Choose a ball which you can daub absolutely',
      icon: MagicWand,
      color: 'teal',
      cost: 100,
      available: 2
    },
    {
      id: 'magic-dauber',
      name: 'Magic Dauber',
      description: 'Daub any square in any card',
      icon: Target,
      color: 'purple',
      cost: 150,
      available: 1
    },
    {
      id: 'triple-time',
      name: 'Triple Time',
      description: 'Score earned from daubing will be tripled in a period of time',
      icon: Zap,
      color: 'orange',
      cost: 200,
      available: 1
    },
    {
      id: 'extra-time',
      name: 'Extra Time',
      description: 'Get extra time bonus',
      icon: Clock,
      color: 'blue',
      cost: 120,
      available: 3
    }
  ];

  const tips = [
    {
      title: 'Scoring',
      content: [
        'Daub score: 0~200',
        'Bingo score: 0~5000',
        'Penalty: -100~-200'
      ],
      tip: 'Reach bingo as earlier as you can to get more points!'
    },
    {
      title: 'Asynchronous Games',
      content: [
        'This is an asynchronous game',
        'Players may start at different times',
        'Higher score wins when both finish',
        'Time limit: 10 minutes'
      ]
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePowerUpUse = (powerUpId: string) => {
    console.log(`Using power-up: ${powerUpId}`);
    // Power-up logic would go here
  };

  if (!gameState.currentMatch) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="glass-card border-blue-500/30">
          <CardContent className="p-8 text-center">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-white text-2xl font-bold mb-4">No Active Game</h2>
            <p className="text-gray-300 mb-6">Start a new game from the home screen</p>
            <Button 
              onClick={() => startMatch(true, 0)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-lg"
            >
              Start Practice Game
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Top Game Bar */}
      <div className="sticky top-0 z-40 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left - Timer */}
          <div className="flex items-center space-x-3">
            <div className="w-16 h-8 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
              <Timer className="w-4 h-4 text-blue-400 mr-1" />
              <span className="text-white font-mono text-sm">
                {formatTime(gameState.timeRemaining || 60)}
              </span>
            </div>
          </div>

          {/* Center - Score */}
          <div className="flex items-center space-x-3">
            <div className="text-center">
              <div className="text-yellow-400 font-bold text-2xl">
                {gameState.score || 0}
              </div>
              <div className="text-gray-400 text-xs">Score</div>
            </div>
            {gameState.bonusScore > 0 && (
              <div className="text-center">
                <div className="text-green-400 font-bold text-lg">
                  +{gameState.bonusScore}
                </div>
                <div className="text-gray-400 text-xs">Bonus</div>
              </div>
            )}
          </div>

          {/* Right - Controls */}
          <div className="flex items-center space-x-2">
            {gameState.isPaused ? (
              <Button
                onClick={resumeGame}
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Play className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={pauseGame}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Pause className="w-4 h-4" />
              </Button>
            )}
            <Button
              onClick={resetGame}
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 py-3">
        <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
          {[
            { id: 'bingo', label: 'Bingo', icon: Target },
            { id: 'powerups', label: 'Power-ups', icon: Zap },
            { id: 'tips', label: 'Tips', icon: Award }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-all duration-200 ${
                selectedTab === tab.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 pb-6 space-y-6">
        {/* Called Numbers */}
        <Card className="glass-card border-yellow-500/30">
          <CardHeader>
            <CardTitle className="text-yellow-400 text-lg flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Called Numbers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {gameState.calledNumbers.map((number, index) => {
                const letter = number <= 15 ? 'B' : number <= 30 ? 'I' : number <= 45 ? 'N' : number <= 60 ? 'G' : 'O';
                const colors = {
                  'B': 'bg-red-500',
                  'I': 'bg-yellow-500',
                  'N': 'bg-green-500',
                  'G': 'bg-blue-500',
                  'O': 'bg-purple-500'
                };
                return (
                  <div
                    key={index}
                    className={`relative w-12 h-12 ${colors[letter]} rounded-full flex flex-col items-center justify-center text-white font-bold shadow-lg`}
                  >
                    <div className="text-xs">{letter}</div>
                    <div className="text-sm">{number}</div>
                  </div>
                );
              })}
              {gameState.calledNumbers.length === 0 && (
                <div className="text-gray-400 text-center w-full py-4">
                  No numbers called yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bingo Card */}
        {selectedTab === 'bingo' && (
          <Card className="glass-card border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 text-lg flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Your Bingo Card
              </CardTitle>
            </CardHeader>
            <CardContent>
              {gameState.playerCard ? (
                <div className="space-y-2">
                  {/* BINGO Header */}
                  <div className="grid grid-cols-5 gap-1 mb-2">
                    {['B', 'I', 'N', 'G', 'O'].map((letter, index) => (
                      <div
                        key={letter}
                        className={`h-8 rounded-lg flex items-center justify-center font-bold text-white ${
                          index === 0 ? 'bg-red-500' :
                          index === 1 ? 'bg-yellow-500' :
                          index === 2 ? 'bg-green-500' :
                          index === 3 ? 'bg-blue-500' : 'bg-purple-500'
                        }`}
                      >
                        {letter}
                      </div>
                    ))}
                  </div>
                  
                  {/* Numbers Grid */}
                  <div className="grid grid-cols-5 gap-1">
                    {gameState.playerCard.map((row, rowIndex) =>
                      row.map((number, colIndex) => {
                        const isCalled = gameState.calledNumbers.includes(number);
                        const isFreeSpace = rowIndex === 2 && colIndex === 2;
                        
                        return (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`aspect-square rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-200 ${
                              isFreeSpace
                                ? 'bg-yellow-500 text-yellow-900'
                                : isCalled
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 text-white border border-white/20'
                            }`}
                          >
                            {isFreeSpace ? (
                              <Sparkles className="w-5 h-5" />
                            ) : (
                              number
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No bingo card available</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Power-ups */}
        {selectedTab === 'powerups' && (
          <Card className="glass-card border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 text-lg flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Power-ups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {powerUps.map((powerUp) => (
                  <div
                    key={powerUp.id}
                    className="p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`w-8 h-8 bg-${powerUp.color}-500/20 rounded-full flex items-center justify-center`}>
                        <powerUp.icon className={`w-4 h-4 text-${powerUp.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-sm">{powerUp.name}</h4>
                        <p className="text-gray-400 text-xs">{powerUp.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Gem className="w-3 h-3 text-blue-400" />
                        <span className="text-blue-400 text-xs">{powerUp.cost}</span>
                      </div>
                      <Badge className="bg-green-500 text-white text-xs">
                        {powerUp.available} available
                      </Badge>
                    </div>
                    <Button
                      onClick={() => handlePowerUpUse(powerUp.id)}
                      size="sm"
                      className="w-full mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs"
                    >
                      Use Power-up
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips */}
        {selectedTab === 'tips' && (
          <Card className="glass-card border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 text-lg flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Game Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tips.map((tip, index) => (
                  <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <h4 className="text-white font-semibold mb-2">{tip.title}</h4>
                    <ul className="space-y-1 mb-2">
                      {tip.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-gray-300 text-sm flex items-start space-x-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {tip.tip && (
                      <div className="p-2 bg-yellow-500/20 rounded border border-yellow-500/30">
                        <p className="text-yellow-300 text-sm">{tip.tip}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Game Progress */}
        <Card className="glass-card border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Game Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Numbers Called:</span>
                <span className="text-white font-bold">{gameState.calledNumbers.length}/75</span>
              </div>
              <Progress 
                value={(gameState.calledNumbers.length / 75) * 100} 
                className="h-2 bg-gray-700"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-white font-bold text-lg">{gameState.score || 0}</div>
                  <div className="text-gray-400 text-xs">Current Score</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-white font-bold text-lg">{gameState.bonusScore || 0}</div>
                  <div className="text-gray-400 text-xs">Bonus Score</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Actions */}
        <div className="flex space-x-3">
          <Button
            onClick={() => callNumber()}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg"
          >
            <Star className="w-4 h-4 mr-2" />
            Call Number
          </Button>
          <Button
            onClick={() => endMatch('player')}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Claim Bingo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;