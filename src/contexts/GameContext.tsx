import React, { createContext, useContext, useReducer, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

// Types
interface Player {
  id: string;
  username: string;
  avatar?: string;
  level: number;
  experience: number;
  balance: number;
  totalEarnings: number;
  gamesPlayed: number;
  gamesWon: number;
  achievements: string[];
  badges: string[];
}

interface Match {
  id: string;
  players: Player[];
  entryFee: number;
  prizePool: number;
  status: 'waiting' | 'playing' | 'finished';
  winner?: Player;
  duration: number;
  tournamentId?: string;
  createdAt: string;
}

interface GameState {
  currentMatch: Match | null;
  playerCard: number[][] | null;
  opponentCard: number[][] | null;
  gameStatus: 'idle' | 'waiting' | 'playing' | 'won' | 'lost' | 'paused';
  calledNumbers: number[];
  currentNumber: number | null;
  gameTimer: number;
  isPaused: boolean;
}

interface GameStats {
  totalWins: number;
  totalLosses: number;
  totalEarnings: number;
  gamesPlayed: number;
  winRate: number;
  averageEarnings: number;
  bestWin: number;
  currentStreak: number;
}

interface GameContextType {
  gameState: GameState;
  gameStats: GameStats;
  startMatch: (isPractice: boolean, entryFee?: number) => Promise<void>;
  endMatch: (winner: 'player' | 'opponent' | 'timeout') => Promise<void>;
  callNumber: () => void;
  checkWin: (card: number[][], calledNumbers: number[]) => boolean;
  dispatch: React.Dispatch<any>;
  updateGameStats: (stats: Partial<GameStats>) => void;
}

// Initial state
const initialState: GameState = {
  currentMatch: null,
  playerCard: null,
  opponentCard: null,
  gameStatus: 'idle',
  calledNumbers: [],
  currentNumber: null,
  gameTimer: 0,
  isPaused: false,
};

const initialStats: GameStats = {
  totalWins: 0,
  totalLosses: 0,
  totalEarnings: 0,
  gamesPlayed: 0,
  winRate: 0,
  averageEarnings: 0,
  bestWin: 0,
  currentStreak: 0,
};

// Game reducer
const gameReducer = (state: GameState, action: any): GameState => {
  switch (action.type) {
    case 'START_MATCH':
      return {
        ...state,
        currentMatch: action.payload.match,
        playerCard: action.payload.playerCard,
        opponentCard: action.payload.opponentCard,
        gameStatus: 'playing',
        calledNumbers: [],
        currentNumber: null,
        gameTimer: 0,
        isPaused: false,
      };
    case 'END_MATCH':
      return {
        ...state,
        gameStatus: action.payload.winner === 'player' ? 'won' : 'lost',
      };
    case 'CALL_NUMBER':
      return {
        ...state,
        calledNumbers: [...state.calledNumbers, action.payload.number],
        currentNumber: action.payload.number,
      };
    case 'RESET_GAME':
      return {
        ...initialState,
      };
    case 'TOGGLE_PAUSE':
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    case 'RETURN_TO_HOME':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

// Create context
const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// Provider component
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const [gameStats, setGameStats] = useState<GameStats>(initialStats);
  const { user, updateBalance } = useAuth();

  // Generate bingo card
  const generateBingoCard = (): number[][] => {
    const card: number[][] = [];
    const usedNumbers = new Set<number>();

    for (let row = 0; row < 5; row++) {
      const cardRow: number[] = [];
      for (let col = 0; col < 5; col++) {
        let number: number;
        do {
          number = Math.floor(Math.random() * 75) + 1;
        } while (usedNumbers.has(number));
        usedNumbers.add(number);
        cardRow.push(number);
      }
      card.push(cardRow);
    }
    return card;
  };

  // Check for win
  const checkWin = (card: number[][], calledNumbers: number[]): boolean => {
    // Check rows
    for (let row = 0; row < 5; row++) {
      if (card[row].every(num => calledNumbers.includes(num))) {
        return true;
      }
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
      if (card.every(row => calledNumbers.includes(row[col]))) {
        return true;
      }
    }

    // Check diagonals
    if (card[0][0] && card[1][1] && card[2][2] && card[3][3] && card[4][4] &&
        calledNumbers.includes(card[0][0]) && calledNumbers.includes(card[1][1]) &&
        calledNumbers.includes(card[2][2]) && calledNumbers.includes(card[3][3]) &&
        calledNumbers.includes(card[4][4])) {
      return true;
    }

    if (card[0][4] && card[1][3] && card[2][2] && card[3][1] && card[4][0] &&
        calledNumbers.includes(card[0][4]) && calledNumbers.includes(card[1][3]) &&
        calledNumbers.includes(card[2][2]) && calledNumbers.includes(card[3][1]) &&
        calledNumbers.includes(card[4][0])) {
      return true;
    }

    return false;
  };

  // Start match
  const startMatch = async (isPractice: boolean, entryFee: number = 0.50) => {
    if (!user) return;

    // For cash games, check if user has enough balance
    if (!isPractice && user.balance < entryFee) {
      alert('Insufficient balance. Please add funds to your wallet.');
      return;
    }

    // Deduct entry fee for cash games
    if (!isPractice) {
      await updateBalance(-entryFee);
    }

    const playerCard = generateBingoCard();
    const opponentCard = generateBingoCard();

    const mockPlayer1: Player = {
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      level: user.level,
      experience: user.experience,
      balance: user.balance,
      totalEarnings: user.totalEarnings,
      gamesPlayed: user.gamesPlayed,
      gamesWon: user.gamesWon,
      achievements: [],
      badges: [],
    };

    const mockPlayer2: Player = {
      id: 'ai-opponent',
      username: 'AI Player',
      avatar: undefined,
      level: Math.floor(Math.random() * 10) + 1,
      experience: Math.floor(Math.random() * 1000),
      balance: 0,
      totalEarnings: 0,
      gamesPlayed: Math.floor(Math.random() * 100),
      gamesWon: Math.floor(Math.random() * 50),
      achievements: [],
      badges: [],
    };

    const match: Match = {
      id: `match-${Date.now()}`,
      players: [mockPlayer1, mockPlayer2],
      entryFee: isPractice ? 0 : entryFee,
      prizePool: isPractice ? 0 : entryFee * 4, // 4 players, winner takes all
      status: 'playing',
      duration: 300, // 5 minutes
      createdAt: new Date().toISOString(),
    };

    dispatch({
      type: 'START_MATCH',
      payload: {
        match,
        playerCard,
        opponentCard,
      },
    });

    // Start calling numbers
    startNumberCalling();
  };

  // End match
  const endMatch = async (winner: 'player' | 'opponent' | 'timeout') => {
    if (!gameState.currentMatch) return;

    const isPlayerWin = winner === 'player';
    const prizeAmount = isPlayerWin ? gameState.currentMatch.prizePool : 0;

    // Update balance if player won
    if (isPlayerWin && prizeAmount > 0) {
      await updateBalance(prizeAmount);
    }

    // Update game stats
    const newStats = { ...gameStats };
    newStats.gamesPlayed += 1;
    
    if (isPlayerWin) {
      newStats.totalWins += 1;
      newStats.currentStreak += 1;
      newStats.totalEarnings += prizeAmount;
      if (prizeAmount > newStats.bestWin) {
        newStats.bestWin = prizeAmount;
      }
    } else {
      newStats.totalLosses += 1;
      newStats.currentStreak = 0;
    }

    newStats.winRate = (newStats.totalWins / newStats.gamesPlayed) * 100;
    newStats.averageEarnings = newStats.totalEarnings / newStats.gamesPlayed;

    setGameStats(newStats);

    dispatch({
      type: 'END_MATCH',
      payload: { winner },
    });
  };

  // Start calling numbers
  const startNumberCalling = () => {
    const interval = setInterval(() => {
      if (gameState.gameStatus !== 'playing' || gameState.isPaused) {
        clearInterval(interval);
        return;
      }

      const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1)
        .filter(num => !gameState.calledNumbers.includes(num));

      if (availableNumbers.length === 0) {
        clearInterval(interval);
        return;
      }

      const randomNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
      
      dispatch({
        type: 'CALL_NUMBER',
        payload: { number: randomNumber },
      });

      // Check for win
      if (gameState.playerCard && checkWin(gameState.playerCard, [...gameState.calledNumbers, randomNumber])) {
        clearInterval(interval);
        endMatch('player');
      } else if (gameState.opponentCard && checkWin(gameState.opponentCard, [...gameState.calledNumbers, randomNumber])) {
        clearInterval(interval);
        endMatch('opponent');
      }
    }, 3000); // Call number every 3 seconds
  };

  // Call number manually (for testing)
  const callNumber = () => {
    const availableNumbers = Array.from({ length: 75 }, (_, i) => i + 1)
      .filter(num => !gameState.calledNumbers.includes(num));

    if (availableNumbers.length === 0) return;

    const randomNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
    
    dispatch({
      type: 'CALL_NUMBER',
      payload: { number: randomNumber },
    });
  };

  // Update game stats
  const updateGameStats = (stats: Partial<GameStats>) => {
    setGameStats(prev => ({ ...prev, ...stats }));
  };

  const value = {
    gameState,
    gameStats,
    startMatch,
    endMatch,
    callNumber,
    checkWin,
    dispatch,
    updateGameStats,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};