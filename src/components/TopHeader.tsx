import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, User, Bell, Settings, Menu, DollarSign, Gift } from 'lucide-react';
import PWAInstallButton from './PWAInstallButton';

interface TopHeaderProps {
  user: any;
  onCashierClick: () => void;
  onProfileClick: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ user, onCashierClick, onProfileClick }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-purple-900/60 via-blue-900/60 to-purple-900/60 backdrop-blur-xl border-b border-purple-400/20 px-4 py-3 shadow-2xl"
    >
      <div className="flex items-center justify-between">
        {/* Logo & Menu */}
        <div className="flex items-center space-x-3">
          <motion.button
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
            <h1 className="text-lg font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent leading-tight">
              BET BINGO CASH
            </h1>
          </motion.div>
        </div>

        {/* Balance & Actions */}
        <div className="flex items-center space-x-3">
          {/* Bonus Balance */}
          {user.bonus > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 rounded-lg px-3 py-1 backdrop-blur-md"
            >
              <div className="flex items-center space-x-1">
                <Gift className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 text-sm font-bold">
                  ${user.bonus.toFixed(2)}
                </span>
              </div>
              <p className="text-orange-400 text-xs">Bonus</p>
            </motion.div>
          )}

          {/* Main Balance */}
          <motion.button
            onClick={onCashierClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-2 border-green-400/40 rounded-xl px-4 py-2 backdrop-blur-md hover:from-green-600/40 hover:to-emerald-600/40 transition-all"
          >
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-green-400" />
              <div className="text-left">
                <div className="text-green-300 text-lg font-black">
                  ${user.balance.toFixed(2)}
                </div>
                <p className="text-green-400 text-xs">Cash Balance</p>
              </div>
            </div>
          </motion.button>

          {/* Deposit Button */}
          <motion.button
            onClick={onCashierClick}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold px-4 py-2 rounded-xl shadow-lg transition-all"
          >
            <div className="flex items-center space-x-1">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">DEPOSIT</span>
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

      {/* Quick Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center space-x-6 mt-3 text-purple-300 text-xs"
      >
        <div className="flex items-center space-x-1">
          <span className="text-green-400">●</span>
          <span>Online: 1,247 players</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-yellow-400">●</span>
          <span>Games Today: {user.gamesPlayed}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-blue-400">●</span>
          <span>Win Rate: {((user.gamesWon / Math.max(user.gamesPlayed, 1)) * 100).toFixed(1)}%</span>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default TopHeader; 