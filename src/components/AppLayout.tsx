import React, { useState } from 'react';
import { GameProvider } from '@/contexts/GameContext';
import HomeScreen from './HomeScreen';
import GameScreen from './GameScreen';
import LeaderboardScreen from './LeaderboardScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import TournamentScreen from './TournamentScreen';
import AchievementsScreen from './AchievementsScreen';
import FriendsScreen from './FriendsScreen';
import Navigation from './Navigation';
import WalletModal from './WalletModal';
import ThemeToggle from './ThemeToggle';
import { useGame } from '@/contexts/GameContext';

const AppContent: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState('home');
  const [walletOpen, setWalletOpen] = useState(false);
  const { gameState } = useGame();

  const handleStartGame = () => {
    setActiveScreen('game');
  };

  const renderScreen = () => {
    if (gameState.gameStatus === 'playing' || gameState.gameStatus === 'won') {
      return <GameScreen />;
    }

    switch (activeScreen) {
      case 'home':
        return <HomeScreen onStartGame={handleStartGame} />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'profile':
        return <ProfileScreen />;
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
    <div className="min-h-screen bg-gray-100">
      <ThemeToggle />
      {renderScreen()}
      <Navigation 
        activeScreen={activeScreen}
        onScreenChange={setActiveScreen}
        onWalletOpen={() => setWalletOpen(true)}
      />
      <WalletModal 
        isOpen={walletOpen}
        onClose={() => setWalletOpen(false)}
      />
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default AppLayout;
