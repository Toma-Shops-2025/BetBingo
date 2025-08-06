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
  updateBalance: (amount: number) => Promise<void>;
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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

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
        balance: 0.00,
        bonus: 5.00, // Welcome bonus
        totalEarnings: 0.00,
        gamesPlayed: 0,
        gamesWon: 0,
        level: 1,
        experience: 0,
        createdAt: new Date().toISOString(),
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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, username: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updateBalance = async (amount: number) => {
    if (!user) return;

    try {
      const newBalance = user.balance + amount;
      const newTotalEarnings = amount > 0 ? user.totalEarnings + amount : user.totalEarnings;

      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          balance: newBalance,
          totalEarnings: newTotalEarnings,
          gamesPlayed: user.gamesPlayed + 1,
          gamesWon: amount > 0 ? user.gamesWon + 1 : user.gamesWon,
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating balance:', error);
      } else {
        setUser(data);
      }
    } catch (error) {
      console.error('Error in updateBalance:', error);
    }
  };

  const claimBonus = async () => {
    if (!user || user.bonus <= 0) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          balance: user.balance + user.bonus,
          bonus: 0,
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error claiming bonus:', error);
      } else {
        setUser(data);
      }
    } catch (error) {
      console.error('Error in claimBonus:', error);
    }
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateBalance,
    claimBonus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};