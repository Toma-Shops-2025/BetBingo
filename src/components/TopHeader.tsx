import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, User, Bell, Settings, Menu, DollarSign, Gift, X, Shield, FileText, HelpCircle, Phone, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import PWAInstallButton from './PWAInstallButton';

interface TopHeaderProps {
  user: any;
  onCashierClick: () => void;
  onProfileClick: () => void;
  onScreenChange: (screen: string) => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ user, onCashierClick, onProfileClick, onScreenChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'contact', label: 'Contact Us', icon: Phone },
    { id: 'responsible', label: 'Responsible Gaming', icon: Heart },
  ];

  const handleMenuItemClick = (itemId: string) => {
    setIsMenuOpen(false);
    if (itemId === 'settings') {
      onScreenChange('settings');
    } else {
      onScreenChange(itemId);
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-800/95 via-blue-800/95 to-purple-800/95 backdrop-blur-xl border-b border-purple-400/30 p-4 sticky top-0 z-40"
      >
        <div className="flex items-center justify-between">
          {/* Logo & Menu */}
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={() => setIsMenuOpen(true)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-purple-600/30 text-white hover:bg-purple-600/50 transition-all"
            >
              <Menu className="w-5 h-5" />
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                BET BINGO CASH
              </h1>
            </motion.div>
          </div>

          {/* Balance & Controls */}
          <div className="flex items-center space-x-3">
            {/* Balance Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 border border-green-400/30 rounded-lg px-3 py-2 backdrop-blur-md"
            >
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="text-green-300 font-bold">${user.balance.toFixed(2)}</span>
                {user.bonus > 0 && (
                  <div className="flex items-center space-x-1 bg-orange-500/20 rounded px-2 py-1">
                    <Gift className="w-3 h-3 text-orange-400" />
                    <span className="text-orange-300 text-xs font-bold">${user.bonus.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Deposit Button */}
            <motion.button
              onClick={onCashierClick}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-4 py-2 rounded-lg shadow-lg transition-all"
            >
              <div className="flex items-center space-x-2">
                <Wallet className="w-4 h-4" />
                <span>DEPOSIT</span>
              </div>
            </motion.button>

            {/* PWA Install Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 }}
            >
              <PWAInstallButton />
            </motion.div>

            {/* Notifications */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-lg bg-purple-600/30 text-white hover:bg-purple-600/50 transition-all"
            >
              <Bell className="w-5 h-5" />
              {/* Notification badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"
              />
            </motion.button>

            {/* Profile */}
            <motion.button
              onClick={onProfileClick}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-400/30 rounded-lg p-2 backdrop-blur-md hover:from-blue-600/40 hover:to-purple-600/40 transition-all"
            >
              <div className="flex items-center space-x-2">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full border border-white/30"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="text-left hidden sm:block">
                  <p className="text-white text-sm font-semibold">{user.username}</p>
                  <p className="text-purple-300 text-xs">Level {user.level}</p>
                </div>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-3 flex items-center justify-center space-x-6 text-sm"
        >
          <div className="text-purple-300">
            <span className="text-white font-semibold">2,847</span> online players
          </div>
          <div className="text-purple-300">
            <span className="text-white font-semibold">$127,532</span> won today
          </div>
          <div className="text-purple-300">
            <span className="text-white font-semibold">94.2%</span> win rate
          </div>
        </motion.div>
      </motion.header>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-purple-900/95 via-blue-900/95 to-purple-900/95 backdrop-blur-xl border-r border-purple-400/30 z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-purple-400/30">
                <h2 className="text-2xl font-black bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  BET BINGO CASH
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg bg-purple-600/30 text-white hover:bg-purple-600/50 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="p-4 space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleMenuItemClick(item.id)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg bg-purple-800/30 hover:bg-purple-700/40 text-white transition-all border border-purple-600/30"
                    >
                      <Icon className="w-5 h-5 text-purple-300" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-purple-800/30 border border-purple-600/30 rounded-lg p-4 text-center">
                  <p className="text-purple-300 text-sm mb-2">Need help?</p>
                  <div className="space-y-2">
                    <div className="text-white font-bold text-lg">1-800-GAMBLER</div>
                    <div className="text-purple-300 text-xs">
                      Play responsibly. 18+ only.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopHeader; 