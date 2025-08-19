import React from 'react';

interface WinPattern {
  name: string;
  icon: string;
  color: string;
}

const WinPatternsDisplay: React.FC = () => {
  const winPatterns: WinPattern[] = [
    { name: 'Horizontal', icon: '━', color: 'text-blue-400' },
    { name: 'Vertical', icon: '┃', color: 'text-green-400' },
    { name: 'Diagonal', icon: '╱', color: 'text-purple-400' },
    { name: 'Diamond', icon: '◆', color: 'text-yellow-400' },
    { name: 'Four Corners', icon: '□', color: 'text-red-400' },
    { name: 'X Pattern', icon: '╳', color: 'text-pink-400' }
  ];

  return (
    <div className="mb-4">
      <div className="text-white font-medium mb-2">🎯 Win Patterns</div>
      <div className="grid grid-cols-3 gap-2">
        {winPatterns.map((pattern, index) => (
          <div 
            key={index} 
            className="bg-white/10 backdrop-blur-md rounded-lg p-2 text-center border border-white/20"
          >
            <div className={`text-lg ${pattern.color}`}>{pattern.icon}</div>
            <div className="text-white text-xs">{pattern.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinPatternsDisplay; 