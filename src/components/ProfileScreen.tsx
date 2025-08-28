import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Star, 
  Trophy, 
  DollarSign, 
  Calendar, 
  Crown, 
  Target, 
  Edit3,
  Camera,
  Award,
  Zap,
  Shield,
  Settings,
  X,
  BarChart3
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileScreenProps {
  onScreenChange?: (screen: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ onScreenChange }) => {
  const { user, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(user?.username || '');
  const [profileImage, setProfileImage] = useState<string | null>(user?.avatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAccountSettings = () => {
    if (onScreenChange) {
      onScreenChange('settings');
    } else {
      // Fallback: try to navigate using the bottom navigation
      console.log('Account Settings clicked - navigating to settings');
      // This will work with the bottom navigation system
      const event = new CustomEvent('navigateToScreen', { detail: 'settings' });
      window.dispatchEvent(event);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPEG, PNG, GIF, etc.)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    // Create a preview URL for the image
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfileImage(result);
      setIsUploading(false);
      
      // Update user profile with new image
      if (updateUser) {
        updateUser({ avatar: result });
      }
    };
    reader.readAsDataURL(file);
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    if (updateUser) {
      updateUser({ avatar: null });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const stats = [
    { 
      label: 'Total Winnings', 
      value: `$${user?.totalEarnings.toFixed(2)}`, 
      icon: DollarSign, 
      color: 'from-green-500 to-emerald-600',
      change: '+12.5%'
    },
    { 
      label: 'Games Played', 
      value: user?.gamesPlayed.toString(), 
      icon: Target, 
      color: 'from-blue-500 to-cyan-600',
      change: '+8 today'
    },
    { 
      label: 'Win Rate', 
      value: `${((user?.gamesWon || 0) / Math.max(user?.gamesPlayed || 1, 1) * 100).toFixed(1)}%`, 
      icon: Trophy, 
      color: 'from-yellow-500 to-orange-600',
      change: '+2.3%'
    },
    { 
      label: 'Current Level', 
      value: user?.level.toString(), 
      icon: Star, 
      color: 'from-purple-500 to-pink-600',
      change: 'VIP Gold'
    }
  ];

  const achievements = [
    { 
      name: 'First Win', 
      description: 'Win your first bingo game', 
      completed: (user?.gamesWon || 0) > 0,
      icon: Trophy,
      reward: '$5 Bonus'
    },
    { 
      name: 'High Roller', 
      description: 'Play 10 games with $5+ entry fee', 
      completed: false,
      icon: Crown,
      reward: '$25 Bonus'
    },
    { 
      name: 'Lucky Streak', 
      description: 'Win 3 games in a row', 
      completed: false,
      icon: Zap,
      reward: '$10 Bonus'
    },
    { 
      name: 'VIP Member', 
      description: 'Reach level 10', 
      completed: (user?.level || 0) >= 10,
      icon: Shield,
      reward: 'VIP Status'
    }
  ];

  const vipPerks = [
    { name: 'Higher Daily Bonuses', active: true },
    { name: 'Exclusive VIP Rooms', active: user?.level >= 5 },
    { name: 'Personal Account Manager', active: user?.level >= 10 },
    { name: 'Faster Withdrawals', active: user?.level >= 5 },
    { name: 'Birthday Bonus', active: true },
    { name: 'Special Tournaments', active: user?.level >= 3 }
  ];

  const saveProfile = () => {
    if (username.trim() && username !== user?.username) {
      updateUser({ username: username.trim() });
    }
    setEditMode(false);
  };

  const getVipLevel = () => {
    const level = user?.level || 0;
    if (level >= 20) return { name: 'Diamond', color: 'from-cyan-400 to-blue-500' };
    if (level >= 15) return { name: 'Platinum', color: 'from-gray-300 to-gray-400' };
    if (level >= 10) return { name: 'Gold', color: 'from-yellow-400 to-orange-500' };
    if (level >= 5) return { name: 'Silver', color: 'from-gray-400 to-gray-500' };
    return { name: 'Bronze', color: 'from-orange-600 to-red-600' };
  };

  const vipLevel = getVipLevel();

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          MY PROFILE
        </h1>
        <p className="text-purple-300 text-lg">Your gambling journey & achievements</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-purple-800/40 via-blue-800/40 to-purple-800/40 backdrop-blur-xl border border-purple-400/30 rounded-3xl p-6 shadow-2xl"
      >
        <div className="flex items-center space-x-6">
          {/* Avatar */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-2xl overflow-hidden"
            >
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
              
              {/* Uploading indicator */}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                </div>
              )}
            </motion.div>
            
            {/* Camera button for upload */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={triggerFileInput}
              className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-2 shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all"
              title="Change profile picture"
            >
              <Camera className="w-4 h-4 text-white" />
            </motion.button>
            
            {/* Remove photo button (only show if there's an image) */}
            {profileImage && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={removeProfileImage}
                className="absolute -bottom-2 -left-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full p-2 shadow-lg hover:from-red-600 hover:to-red-700 transition-all"
                title="Remove profile picture"
              >
                <X className="w-4 h-4 text-white" />
              </motion.button>
            )}
            
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              {editMode ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-purple-900/50 border border-purple-400/30 rounded-lg px-3 py-1 text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <button
                    onClick={saveProfile}
                    className="bg-green-500/20 border border-green-400/30 rounded-lg p-1 text-green-400 hover:bg-green-500/30"
                  >
                    <User className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-white text-2xl font-black">{user?.username}</h2>
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            
            {/* VIP Status */}
            <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${vipLevel.color} rounded-full px-4 py-2 mb-3`}>
              <Crown className="w-4 h-4 text-white" />
              <span className="text-white font-bold text-sm">VIP {vipLevel.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-purple-300">Member Since</p>
                <p className="text-white font-semibold">{new Date(user?.createdAt || '').toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-purple-300">Current Balance</p>
                <p className="text-green-400 font-bold text-lg">${user?.balance.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Upload Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-xl"
        >
          <div className="flex items-center space-x-3">
            <Camera className="w-5 h-5 text-blue-400" />
            <div>
              <h4 className="text-blue-300 font-semibold text-sm">Profile Photo</h4>
              <p className="text-blue-200 text-xs">
                Click the camera icon to upload a photo • Max size: 5MB • Supports: JPEG, PNG, GIF
              </p>
            </div>
          </div>
        </motion.div>

        {/* Experience Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-purple-300 text-sm">Level {user?.level} Progress</span>
            <span className="text-purple-300 text-sm">{user?.experience || 0}/1000 XP</span>
          </div>
          <div className="bg-purple-900/30 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((user?.experience || 0) % 1000) / 10}%` }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`bg-gradient-to-r ${stat.color}/20 border border-${stat.color.split('-')[1]}-400/30 rounded-2xl p-4 backdrop-blur-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-green-400 text-xs font-bold">{stat.change}</span>
              </div>
              <div className={`text-${stat.color.split('-')[1]}-300 text-2xl font-black mb-1`}>
                {stat.value}
              </div>
              <p className={`text-${stat.color.split('-')[1]}-400 text-sm`}>{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-white text-xl font-bold">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`bg-gradient-to-r ${
                  achievement.completed
                    ? 'from-green-600/30 to-emerald-600/30 border-green-400/40'
                    : 'from-gray-600/20 to-gray-700/20 border-gray-400/20'
                } border-2 rounded-2xl p-4 backdrop-blur-md`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    achievement.completed
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                      : 'bg-gray-600/30'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      achievement.completed ? 'text-white' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-bold ${
                      achievement.completed ? 'text-green-300' : 'text-gray-300'
                    }`}>
                      {achievement.name}
                    </h4>
                    <p className={`text-sm ${
                      achievement.completed ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                    <div className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-bold ${
                      achievement.completed
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {achievement.reward}
                    </div>
                  </div>

                  {achievement.completed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-green-400"
                    >
                      ✓
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* VIP Perks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border-2 border-yellow-400/40 rounded-2xl p-6 backdrop-blur-md"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl p-3">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-yellow-300 font-bold text-lg">VIP {vipLevel.name} Perks</h3>
            <p className="text-yellow-400 text-sm">Exclusive benefits for our valued players</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {vipPerks.map((perk, index) => (
            <motion.div
              key={perk.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                perk.active
                  ? 'bg-green-500/20 border border-green-400/30'
                  : 'bg-gray-600/20 border border-gray-400/20'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${
                perk.active ? 'bg-green-400' : 'bg-gray-400'
              }`} />
              <span className={`text-sm font-medium ${
                perk.active ? 'text-green-300' : 'text-gray-400'
              }`}>
                {perk.name}
              </span>
              {perk.active && (
                <Award className="w-4 h-4 text-green-400" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Account Settings Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85 }}
        className="text-center mb-4"
      >
        <h4 className="text-purple-300 font-semibold text-sm mb-2">Account Management</h4>
        <p className="text-purple-200 text-xs">Customize your account preferences and security settings</p>
      </motion.div>

      {/* Account Settings Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        onClick={handleAccountSettings}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
      >
        <Settings className="w-5 h-5" />
        <span>Account Settings</span>
      </motion.button>
    </div>
  );
};

export default ProfileScreen;