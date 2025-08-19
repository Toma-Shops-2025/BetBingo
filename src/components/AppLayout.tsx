import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';
import { useAuth } from '@/contexts/AuthContext';

// Screens
import LobbyScreen from './LobbyScreen';
import GameScreen from './GameScreen';
import CashierScreen from './CashierScreen';
import ProfileScreen from './ProfileScreen';
import LeaderboardScreen from './LeaderboardScreen';
import SettingsScreen from './SettingsScreen';
import AuthModal from './AuthModal';
import AnimatedBackground from './AnimatedBackground';
import GamblingNavigation from './GamblingNavigation';
import TopHeader from './TopHeader';
import AnimatedLoadingScreen from './AnimatedLoadingScreen';
import PWAInstallPrompt from './PWAInstallPrompt';

type ScreenType = 'lobby' | 'game' | 'cashier' | 'profile' | 'leaderboard' | 'settings';

const AppLayout: React.FC = () => {
  const { gameState, dispatch } = useGame();
  const { user, loading } = useAuth();
  const [activeScreen, setActiveScreen] = useState<ScreenType>('lobby');
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Auto-switch to game screen when game starts
  useEffect(() => {
    if (gameState.gameStatus === 'playing' || gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') {
      setActiveScreen('game');
    }
  }, [gameState.gameStatus]);

  // Show loading screen while checking authentication
  if (loading) {
    return <AnimatedLoadingScreen />;
  }

  // Show authentication modal if user is not signed in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <AnimatedBackground />
        <div className="relative z-10 text-center max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-purple-800/40 via-blue-800/40 to-purple-800/40 backdrop-blur-xl rounded-3xl border border-purple-400/30 p-8 shadow-2xl"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                BINGO BLAST
              </h1>
              <p className="text-purple-200 text-lg">Real Money • Real Wins</p>
            </motion.div>

            {/* Welcome message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-white text-xl font-bold mb-4">Join the Action!</h2>
              <p className="text-purple-300 text-sm leading-relaxed">
                Play with real money, win real cash! Join thousands of players in fast-paced bingo games.
              </p>
            </motion.div>

            {/* Auth buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
              >
                Play Now - Sign Up Free
              </button>
              
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Already Have Account? Sign In
              </button>
              
              <div className="flex items-center justify-center space-x-4 text-purple-300 text-sm mt-6">
                <span>💰 $10 Free Bonus</span>
                <span>🎯 No Deposit Required</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    );
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'game':
        return <GameScreen onExitGame={() => setActiveScreen('lobby')} />;
      case 'cashier':
        return <CashierScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <LobbyScreen onJoinGame={() => setActiveScreen('game')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Header */}
        <TopHeader 
          user={user} 
          onCashierClick={() => setActiveScreen('cashier')}
          onProfileClick={() => setActiveScreen('profile')}
        />
        
        {/* Main Content */}
        <div className="flex-1 pb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Bottom Navigation */}
        <GamblingNavigation 
          activeScreen={activeScreen} 
          onScreenChange={(screen: ScreenType) => setActiveScreen(screen)} 
        />
        
        {/* PWA Install Prompt */}
        <PWAInstallPrompt />
      </div>
    </div>
  );
};

export default AppLayout;
