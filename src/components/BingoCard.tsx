import React from 'react';
import { BingoCard as BingoCardType } from '@/types';
import { cn } from '@/lib/utils';

interface BingoCardProps {
  card: BingoCardType;
  onNumberClick?: (number: number) => void;
  disabled?: boolean;
  title?: string;
}

const BingoCard: React.FC<BingoCardProps> = ({ 
  card, 
  onNumberClick, 
  disabled = false,
  title = "BINGO"
}) => {
  const handleCellClick = (colIndex: number, rowIndex: number) => {
    if (disabled) return;
    const number = card.numbers[colIndex][rowIndex];
    if (number && onNumberClick) {
      onNumberClick(number);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm mx-auto">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-purple-600">{title}</h3>
        <div className="flex justify-center space-x-2 text-sm font-semibold text-gray-600 mt-2">
          {['B', 'I', 'N', 'G', 'O'].map(letter => (
            <div key={letter} className="w-12 text-center">{letter}</div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: 5 }, (_, rowIndex) => 
          Array.from({ length: 5 }, (_, colIndex) => {
            const number = card.numbers[colIndex][rowIndex];
            const isMarked = card.marked[colIndex][rowIndex];
            const isFreeSpace = colIndex === 2 && rowIndex === 2;
            
            return (
              <button
                key={`${colIndex}-${rowIndex}`}
                onClick={() => handleCellClick(colIndex, rowIndex)}
                disabled={disabled || isFreeSpace}
                className={cn(
                  "w-12 h-12 rounded-md font-bold text-sm transition-all",
                  "border-2 border-gray-300",
                  isFreeSpace ? "bg-yellow-400 text-yellow-800" : 
                  isMarked ? "bg-green-500 text-white border-green-600" :
                  "bg-gray-50 text-gray-800 hover:bg-gray-100",
                  !disabled && !isFreeSpace && "hover:scale-105 cursor-pointer"
                )}
              >
                {isFreeSpace ? "★" : number}
              </button>
            );
          })
        ).flat()}
      </div>
    </div>
  );
};

export default BingoCard;