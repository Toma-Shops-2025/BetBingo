import React, { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';
import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen';
import Navigation from './Navigation';
import WalletModal from './WalletModal';
import ProfileScreen from './ProfileScreen';
import LeaderboardScreen from './LeaderboardScreen';
import SettingsScreen from './SettingsScreen';
import TournamentScreen from './TournamentScreen';
import AchievementsScreen from './AchievementsScreen';
import FriendsScreen from './FriendsScreen';
import ThemeToggle from './ThemeToggle';

const AppLayout: React.FC = () => {
  const { gameState } = useGame();
  const { user } = useAuth();
  const [activeScreen, setActiveScreen] = useState<'home' | 'profile' | 'leaderboard' | 'settings' | 'tournaments' | 'achievements' | 'friends'>('home');

  const handleStartGame = (isPractice: boolean) => {
    // This will be handled by the GameContext
  };

  const renderScreen = () => {
    if (gameState.gameStatus === 'playing' || gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') {
      return <GameScreen />;
    }
    
    switch (activeScreen) {
      case 'profile':
        return <ProfileScreen />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'tournaments':
        return <TournamentScreen />;
      case 'achievements':
        return <AchievementsScreen />;
      case 'friends':
        return <FriendsScreen />;
      default:
        return <HomeScreen onStartGame={handleStartGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <ThemeToggle />
      {renderScreen()}
      <Navigation activeScreen={activeScreen} onScreenChange={setActiveScreen} />
      <WalletModal />
    </div>
  );
};

export default AppLayout;
