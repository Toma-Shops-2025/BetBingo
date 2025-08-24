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
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import TermsOfServiceScreen from './TermsOfServiceScreen';
import ResponsibleGamingScreen from './ResponsibleGamingScreen';
import ContactScreen from './ContactScreen';
import FAQScreen from './FAQScreen';
import MessagesScreen from './MessagesScreen';
import AuthModal from './AuthModal';
import { PitchBlackBackground } from './ModernBackgrounds';
import GamblingNavigation from './GamblingNavigation';
import TopHeader from './TopHeader';
import AnimatedLoadingScreen from './AnimatedLoadingScreen';
import PWAInstallPrompt from './PWAInstallPrompt';

type ScreenType = 'lobby' | 'game' | 'cashier' | 'profile' | 'leaderboard' | 'settings' | 'privacy' | 'terms' | 'faq' | 'contact' | 'responsible' | 'messages';

const AppLayout: React.FC = () => {
  const { gameState } = useGame();
  const { user, signIn, signUp, signOut } = useAuth();
  const [activeScreen, setActiveScreen] = useState<ScreenType>('lobby');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleRegister = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  if (isLoading) {
    return <AnimatedLoadingScreen />;
  }

  if (!user) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <PitchBlackBackground />
        
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="flex items-center gap-8 max-w-6xl w-full">
            {/* Left side - Login content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-purple-800/40 via-blue-800/40 to-purple-800/40 backdrop-blur-xl rounded-3xl border border-purple-400/30 p-8 shadow-2xl flex-1 max-w-md"
            >
              {/* Login content stays the same */}
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                BET<br/>BINGO<br/>CASH
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

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                LOGIN
              </button>
              <button
                onClick={handleRegister}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                SIGN UP
              </button>
            </motion.div>

            {/* Legal notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center"
            >
              <p className="text-purple-400 text-xs">
                18+ only. Play responsibly. Call 1-800-GAMBLER for help.
              </p>
            </motion.div>
            </motion.div>

            {/* Right side - Logo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:flex flex-1 justify-center items-center"
            >
              <div className="relative">
                <motion.img
                  src="/logo.png"
                  alt="BetBingo Logo"
                  className="w-80 h-80 object-contain drop-shadow-2xl"
                  initial={{ scale: 0.8, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold px-4 py-2 rounded-full text-sm shadow-lg">
                    Win Real Cash!
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </div>
    );
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'lobby':
        return <LobbyScreen onJoinGame={() => setActiveScreen('game')} />;
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
      case 'privacy':
        return <PrivacyPolicyScreen onBack={() => setActiveScreen('lobby')} />;
      case 'terms':
        return <TermsOfServiceScreen onBack={() => setActiveScreen('lobby')} />;
      case 'responsible':
        return <ResponsibleGamingScreen onBack={() => setActiveScreen('lobby')} />;
      case 'contact':
        return <ContactScreen onBack={() => setActiveScreen('lobby')} />;
      case 'faq':
        return <FAQScreen onBack={() => setActiveScreen('lobby')} />;
      case 'messages':
        return <MessagesScreen onBack={() => setActiveScreen('lobby')} />;
      default:
        return <LobbyScreen onJoinGame={() => setActiveScreen('game')} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <PitchBlackBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <TopHeader 
          user={user}
          onCashierClick={() => setActiveScreen('cashier')}
          onProfileClick={() => setActiveScreen('profile')}
          onScreenChange={(screen) => setActiveScreen(screen as ScreenType)}
        />
        
        <main className="flex-1 overflow-y-auto">
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
        </main>

        <GamblingNavigation 
          activeScreen={activeScreen as 'lobby' | 'game' | 'cashier' | 'profile' | 'leaderboard' | 'settings'}
          onScreenChange={(screen) => setActiveScreen(screen as ScreenType)}
        />

        {/* Legal Compliance Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-700/50 p-3 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-2 text-xs text-gray-400">
            <span>© 2025 Bet Bingo Cash</span>
            <span>•</span>
            <button 
              onClick={() => setActiveScreen('privacy')}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveScreen('terms')}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveScreen('responsible')}
              className="text-red-400 hover:text-red-300 underline font-semibold"
            >
              Responsible Gaming
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveScreen('contact')}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Contact Us
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveScreen('faq')}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              FAQ
            </button>
            <span>•</span>
            <button 
              onClick={() => setActiveScreen('messages')}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Messages
            </button>
            <span>•</span>
            <a 
              href="tel:18004264653" 
              className="text-red-400 hover:text-red-300 font-bold"
            >
              1-800-GAMBLER
            </a>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            18+ only. Play responsibly. Licensed gaming operator.
          </div>
        </motion.footer>
      </div>

      <PWAInstallPrompt />
    </div>
  );
};

export default AppLayout;
