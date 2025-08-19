import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import AuthModal from './AuthModal';
import AnimatedBackground from './AnimatedBackground';
import AnimatedLogo from './AnimatedLogo';
import AnimatedLoadingScreen from './AnimatedLoadingScreen';
import AnimatedNavigation from './AnimatedNavigation';
import AnimatedThemeToggle from './AnimatedThemeToggle';

const AppLayout: React.FC = () => {
  const { gameState } = useGame();
  const { user, loading } = useAuth();
  const [activeScreen, setActiveScreen] = useState<'home' | 'profile' | 'leaderboard' | 'settings' | 'tournaments' | 'achievements' | 'friends'>('home');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleStartGame = (isPractice: boolean) => {
    // This will be handled by the GameContext
  };

  // Show loading screen while checking authentication
  if (loading) {
    return <AnimatedLoadingScreen />;
  }

  // Show authentication modal if user is not signed in
  if (!user) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
        <AnimatedBackground />
        <div className="relative z-10 text-center max-w-md">
          <AnimatedLogo />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="space-y-6 mt-8"
          >
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
            >
              Sign In / Sign Up
            </button>
            <p className="text-purple-300 text-sm">
              Join thousands of players competing in fast-paced bingo battles!
            </p>
          </motion.div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

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
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <AnimatedThemeToggle />
        {renderScreen()}
        <AnimatedNavigation 
          activeScreen={activeScreen} 
          onScreenChange={(screen: string) => {
            if (['home', 'profile', 'leaderboard', 'settings', 'tournaments', 'achievements', 'friends'].includes(screen)) {
              setActiveScreen(screen as typeof activeScreen);
            }
          }} 
        />
        <WalletModal />
      </div>
    </div>
  );
};

export default AppLayout;
