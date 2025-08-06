import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Trophy, Wallet, Settings, User, LogIn, LogOut, Award, Star, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

interface NavigationProps {
  activeScreen: string;
  onScreenChange: (screen: string) => void;
  onWalletOpen: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  activeScreen, 
  onScreenChange, 
  onWalletOpen 
}) => {
  const { user, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'tournaments', icon: Trophy, label: 'Tournaments' },
    { id: 'leaderboard', icon: Award, label: 'Leaderboard' },
    { id: 'achievements', icon: Star, label: 'Achievements' },
    { id: 'friends', icon: Users, label: 'Friends' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {navItems.map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant={activeScreen === id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onScreenChange(id)}
              className="flex flex-col items-center space-y-1 h-auto py-2"
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{label}</span>
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={onWalletOpen}
            className="flex flex-col items-center space-y-1 h-auto py-2 border-green-500 text-green-600"
          >
            <Wallet className="w-5 h-5" />
            <span className="text-xs">Wallet</span>
          </Button>

          <Button
            variant={user ? "destructive" : "default"}
            size="sm"
            onClick={handleAuthAction}
            className="flex flex-col items-center space-y-1 h-auto py-2"
          >
            {user ? <LogOut className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            <span className="text-xs">{user ? 'Sign Out' : 'Sign In'}</span>
          </Button>
        </div>
      </div>
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  );
};

export default Navigation;