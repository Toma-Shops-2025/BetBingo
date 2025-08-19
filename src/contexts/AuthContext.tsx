import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  email: string;
  username: string;
  balance: number;
  bonus: number;
  totalEarnings: number;
  gamesPlayed: number;
  gamesWon: number;
  level: number;
  experience: number;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'google' | 'github') => Promise<{ error: any }>;
  updateBalance: (amount: number) => Promise<void>;
  updateUser: (updates: Partial<AuthUser>) => void;
  claimBonus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Demo user for testing without Supabase
const demoUser: AuthUser = {
  id: 'demo-user-123',
  email: 'demo@bingoblitz.com',
  username: 'DemoPlayer',
  balance: 100.00,
  bonus: 25.00,
  totalEarnings: 150.00,
  gamesPlayed: 45,
  gamesWon: 28,
  level: 5,
  experience: 1250,
  avatar: undefined,
  createdAt: new Date().toISOString()
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(true); // Set to true for demo mode

  useEffect(() => {
    if (isDemoMode) {
      // Demo mode - simulate loading and then set demo user
      setTimeout(() => {
        setUser(demoUser);
        setLoading(false);
      }, 1000);
      return;
    }

    // Real Supabase authentication
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isDemoMode]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        // Create default profile if it doesn't exist
        await createDefaultProfile(userId);
      } else {
        setUser(data);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const createDefaultProfile = async (userId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const defaultProfile: Partial<AuthUser> = {
        id: userId,
        email: user.email || '',
        username: user.email?.split('@')[0] || 'Player',
        balance: 0,
        bonus: 5.00,
        totalEarnings: 0,
        gamesPlayed: 0,
        gamesWon: 0,
        level: 1,
        experience: 0,
        createdAt: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('profiles')
        .insert([defaultProfile])
        .select()
        .single();

      if (error) {
        console.error('Error creating profile:', error);
      } else {
        setUser(data);
      }
    } catch (error) {
      console.error('Error in createDefaultProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (isDemoMode) {
      // Demo mode - simulate successful sign in
      setUser(demoUser);
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      if (data.user) {
        await fetchUserProfile(data.user.id);
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    if (isDemoMode) {
      // Demo mode - simulate successful sign up
      const newDemoUser = { ...demoUser, email, username };
      setUser(newDemoUser);
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      if (data.user) {
        await createDefaultProfile(data.user.id);
      }

      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    if (isDemoMode) {
      // Demo mode - simulate sign out
      setUser(null);
      return;
    }

    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const signInWithProvider = async (provider: 'google' | 'github') => {
    if (isDemoMode) {
      // Demo mode - simulate provider sign in
      setUser(demoUser);
      return { error: null };
    }

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });

      return { error };
    } catch (error) {
      return { error };
    }
  };

  const updateBalance = async (amount: number) => {
    if (isDemoMode) {
      // Demo mode - update local state
      setUser(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
      return;
    }

    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ balance: user.balance + amount })
        .eq('id', user.id);

      if (!error) {
        setUser(prev => prev ? { ...prev, balance: prev.balance + amount } : null);
      }
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  };

  const updateUser = (updates: Partial<AuthUser>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const claimBonus = async () => {
    if (isDemoMode) {
      // Demo mode - simulate claiming bonus
      setUser(prev => prev ? { ...prev, balance: prev.balance + prev.bonus, bonus: 0 } : null);
      return;
    }

    if (!user || user.bonus <= 0) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          balance: user.balance + user.bonus,
          bonus: 0 
        })
        .eq('id', user.id);

      if (!error) {
        setUser(prev => prev ? { 
          ...prev, 
          balance: prev.balance + prev.bonus, 
          bonus: 0 
        } : null);
      }
    } catch (error) {
      console.error('Error claiming bonus:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signIn,
        signUp,
        signOut,
        signInWithProvider,
        updateBalance,
        updateUser,
        claimBonus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};