import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, Match, BingoCard, Player } from '@/types';
import { generateBingoCard, checkWin } from '@/utils/bingoUtils';

interface GameContextType {
  gameState: GameState;
  gameStats: {
    totalGames: number;
    wins: number;
    losses: number;
    totalEarnings: number;
    bestStreak: number;
    currentStreak: number;
  };
  startMatch: (betAmount: number, currency: string) => void;
  markNumber: (number: number) => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const initialState: GameState = {
  currentMatch: null,
  playerCard: null,
  opponentCard: null,
  gameStatus: 'idle'
};

const initialStats = {
  totalGames: 0,
  wins: 0,
  losses: 0,
  totalEarnings: 0,
  bestStreak: 0,
  currentStreak: 0
};

type GameAction = 
  | { type: 'START_MATCH'; payload: { match: Match; playerCard: BingoCard; opponentCard: BingoCard } }
  | { type: 'MARK_NUMBER'; payload: number }
  | { type: 'GAME_WON' }
  | { type: 'GAME_LOST' }
  | { type: 'RESET_GAME' };

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_MATCH':
      return {
        ...state,
        currentMatch: action.payload.match,
        playerCard: action.payload.playerCard,
        opponentCard: action.payload.opponentCard,
        gameStatus: 'playing'
      };
    case 'MARK_NUMBER':
      if (!state.playerCard) return state;
      
      const newCard = { ...state.playerCard };
      let marked = false;
      
      for (let col = 0; col < 5; col++) {
        for (let row = 0; row < 5; row++) {
          if (newCard.numbers[col][row] === action.payload) {
            newCard.marked[col][row] = true;
            marked = true;
          }
        }
      }
      
      if (marked && checkWin(newCard.marked)) {
        return { ...state, playerCard: newCard, gameStatus: 'won' };
      }
      
      return { ...state, playerCard: newCard };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const [gameStats, setGameStats] = useState(initialStats);

  const startMatch = (betAmount: number, currency: string) => {
    const playerCard = generateBingoCard();
    const opponentCard = generateBingoCard();
    
    const mockMatch: Match = {
      id: Math.random().toString(36).substr(2, 9),
      player1: { id: '1', name: 'You', balance: 1000, cryptoBalance: { ETH: 0.5, USDC: 100 } },
      player2: { id: '2', name: 'Opponent', balance: 1000, cryptoBalance: { ETH: 0.3, USDC: 80 } },
      betAmount,
      currency: currency as any,
      status: 'active',
      calledNumbers: [],
      createdAt: new Date()
    };

    dispatch({ 
      type: 'START_MATCH', 
      payload: { match: mockMatch, playerCard, opponentCard } 
    });
  };

  const markNumber = (number: number) => {
    dispatch({ type: 'MARK_NUMBER', payload: number });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <GameContext.Provider value={{ gameState, gameStats, startMatch, markNumber, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};