import { BingoCard } from '@/types';

export const generateBingoCard = (): BingoCard => {
  const card: (number | null)[][] = [];
  const ranges = [
    [1, 15],   // B
    [16, 30],  // I
    [31, 45],  // N
    [46, 60],  // G
    [61, 75]   // O
  ];

  for (let col = 0; col < 5; col++) {
    const column: (number | null)[] = [];
    const [min, max] = ranges[col];
    const usedNumbers = new Set<number>();
    
    for (let row = 0; row < 5; row++) {
      if (col === 2 && row === 2) {
        column.push(null); // Free space
      } else {
        let num;
        do {
          num = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (usedNumbers.has(num));
        usedNumbers.add(num);
        column.push(num);
      }
    }
    card.push(column);
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    numbers: card,
    marked: Array(5).fill(null).map(() => Array(5).fill(false))
  };
};

export const checkWin = (marked: boolean[][]): boolean => {
  // Check rows
  for (let row = 0; row < 5; row++) {
    if (marked.every((col, colIndex) => col[row] || (colIndex === 2 && row === 2))) {
      return true;
    }
  }

  // Check columns
  for (let col = 0; col < 5; col++) {
    if (marked[col].every((cell, rowIndex) => cell || (col === 2 && rowIndex === 2))) {
      return true;
    }
  }

  // Check diagonals
  if (marked.every((col, index) => col[index] || (index === 2))) return true;
  if (marked.every((col, index) => col[4 - index] || (index === 2))) return true;

  return false;
};

// Add function to get called numbers for display
export const getCalledNumbers = (): number[] => {
  return Array.from({ length: 75 }, (_, i) => i + 1);
};

// Add function to check if a number is called
export const isNumberCalled = (number: number, calledNumbers: number[]): boolean => {
  return calledNumbers.includes(number);
};