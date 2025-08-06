export interface BingoCard {
  id: string;
  numbers: (number | null)[][];
  marked: boolean[][];
}

export interface Player {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  experience: number;
  balance: number;
  bonus: number;
  totalEarnings: number;
  gamesPlayed: number;
  gamesWon: number;
  achievements: string[];
  badges: string[];
  createdAt: string;
}

export interface Match {
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

export interface GameState {
  currentMatch: Match | null;
  playerCard: number[][] | null;
  opponentCard: number[][] | null;
  gameStatus: 'idle' | 'waiting' | 'playing' | 'won' | 'lost' | 'paused';
  calledNumbers: number[];
  currentNumber: number | null;
  gameTimer: number;
  isPaused: boolean;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  entryFee: number;
  prizePool: number;
  maxPlayers: number;
  currentPlayers: number;
  status: 'upcoming' | 'active' | 'finished';
  startDate: string;
  endDate: string;
  rounds: TournamentRound[];
}

export interface TournamentRound {
  id: string;
  tournamentId: string;
  roundNumber: number;
  players: TournamentPlayer[];
  winner?: TournamentPlayer;
  status: 'waiting' | 'active' | 'finished';
}

export interface TournamentPlayer {
  playerId: string;
  username: string;
  score: number;
  rank: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  completed: boolean;
  reward: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedAt?: string;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  playerId: string;
  username: string;
  message: string;
  timestamp: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  musicEnabled: boolean;
  notificationsEnabled: boolean;
  autoCallNumbers: boolean;
  theme: 'light' | 'dark' | 'system';
}

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  username: string;
  avatar?: string;
  score: number;
  gamesWon: number;
  totalEarnings: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface GameHistoryItem {
  id: string;
  opponent: string;
  result: 'win' | 'loss';
  betAmount: number;
  currency: string;
  date: string;
  duration: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'win' | 'withdrawal' | 'bonus' | 'entry_fee';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  paypalEmail?: string;
}

export type Currency = 'USD' | 'ETH' | 'USDC';
export type GameMode = 'free' | 'paid' | 'tournament' | 'ranked';
export type Difficulty = 'easy' | 'medium' | 'hard';