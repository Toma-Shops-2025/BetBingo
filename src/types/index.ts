export interface BingoCard {
  id: string;
  numbers: (number | null)[][];
  marked: boolean[][];
}

export interface Player {
  id: string;
  name: string;
  avatar?: string;
  balance: number;
  cryptoBalance: { [key: string]: number };
  level: number;
  experience: number;
  achievements: Achievement[];
  badges: Badge[];
  friends: string[];
  isOnline: boolean;
  lastSeen: Date;
  totalGames: number;
  totalWins: number;
  totalEarnings: number;
  bestStreak: number;
  currentStreak: number;
}

export interface Match {
  id: string;
  player1: Player;
  player2: Player;
  betAmount: number;
  currency: 'USD' | 'ETH' | 'USDC';
  status: 'waiting' | 'active' | 'completed';
  winner?: string;
  currentNumber?: number;
  calledNumbers: number[];
  createdAt: Date;
  duration?: number;
  tournamentId?: string;
  isRanked: boolean;
  eloChange?: number;
}

export interface GameState {
  currentMatch: Match | null;
  playerCard: BingoCard | null;
  opponentCard: BingoCard | null;
  gameStatus: 'idle' | 'searching' | 'playing' | 'won' | 'lost';
  calledNumbers: number[];
  currentNumber: number | null;
  gameTimer: number;
  isPaused: boolean;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  entryFee: number;
  currency: 'USD' | 'ETH' | 'USDC';
  prizePool: number;
  maxPlayers: number;
  currentPlayers: number;
  status: 'upcoming' | 'active' | 'completed';
  rounds: TournamentRound[];
  leaderboard: TournamentPlayer[];
}

export interface TournamentRound {
  id: string;
  roundNumber: number;
  matches: Match[];
  startTime: Date;
  endTime?: Date;
}

export interface TournamentPlayer {
  playerId: string;
  playerName: string;
  score: number;
  wins: number;
  losses: number;
  rank: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  reward: {
    type: 'experience' | 'currency' | 'badge';
    amount: number;
    currency?: string;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'system' | 'emote';
}

export interface GameSettings {
  soundEnabled: boolean;
  notifications: boolean;
  autoMark: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  privacyMode: boolean;
  chatEnabled: boolean;
  animationsEnabled: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  playerName: string;
  avatar?: string;
  score: number;
  wins: number;
  earnings: number;
  level: number;
  isOnline: boolean;
}

export interface Notification {
  id: string;
  type: 'match' | 'tournament' | 'achievement' | 'friend' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export type Currency = 'USD' | 'ETH' | 'USDC';
export type GameMode = 'free' | 'paid' | 'tournament' | 'ranked';
export type Difficulty = 'easy' | 'medium' | 'hard';