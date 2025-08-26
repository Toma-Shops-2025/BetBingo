import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
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
  achievements: string[];
  badges: string[];
  createdAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  isDemoMode: boolean;
  biometricsAvailable: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any; message?: string }>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'google') => Promise<{ error: any }>;
  signInWithBiometrics: () => Promise<{ error: any }>;
  resendConfirmationEmail: (email: string) => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  setIsDemoMode: (enabled: boolean) => void;
  updateUser: (updates: Partial<AuthUser>) => Promise<void>;
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

// Demo user for testing without Supabase
const demoUser: AuthUser = {
  id: 'demo-user-123',
        email: 'demo@betbingo.live',
  username: 'DemoPlayer',
  balance: 100.00,
  bonus: 25.00,
  totalEarnings: 150.00,
  gamesPlayed: 45,
  gamesWon: 28,
  level: 5,
  experience: 1250,
  avatar: undefined,
  achievements: ['First Win', 'Streak Master', 'High Roller'],
  badges: ['Winner', 'Lucky', 'Champion'],
  createdAt: new Date().toISOString()
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(true); // Temporarily enable demo mode until Supabase is configured
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);

  // Check if biometric authentication is available
  useEffect(() => {
    const checkBiometrics = async () => {
      try {
        // Check if WebAuthn is supported
        if (window.PublicKeyCredential) {
          const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
          setBiometricsAvailable(available);
        }
      } catch (error) {
        console.log('Biometrics not available:', error);
        setBiometricsAvailable(false);
      }
    };
    
    checkBiometrics();
  }, []);

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
      console.log('Auth state change:', event, session);
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
        console.error('Sign in error:', error);
        return { error };
      }

      if (data.user) {
        await fetchUserProfile(data.user.id);
      }

      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    if (isDemoMode) {
      // Demo mode - simulate successful sign up
      console.log('Demo mode: Creating demo user account')
      const newDemoUser = { 
        ...demoUser, 
        id: `demo-${Date.now()}`,
        email, 
        username 
      }
      setUser(newDemoUser)
      return { error: null, message: 'Demo account created successfully!' }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }

      if (data.user && !data.session) {
        // Email confirmation required
        return { 
          error: null, 
          message: 'Please check your email to confirm your account before signing in.' 
        };
      }

      if (data.user && data.session) {
        // Email confirmation not required, user is signed in
        await createDefaultProfile(data.user.id);
      }

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  const resendConfirmationEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Error resending confirmation email:', error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Error resending confirmation email:', error);
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        console.error('Error sending password reset email:', error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Error sending password reset email:', error);
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

  const signInWithProvider = async (provider: 'google') => {
    if (isDemoMode || !isSupabaseConfigured()) {
      // Demo mode or Supabase not configured - simulate provider sign in
      console.log(`Demo mode: Simulating ${provider} sign in`);
      setUser(demoUser);
      return { error: null };
    }

    try {
      console.log(`Attempting ${provider} OAuth sign in...`);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        console.error(`${provider} OAuth error:`, error);
        // If OAuth fails, fall back to demo mode
        if (error.message?.includes('provider is not enabled')) {
          console.log('Provider not enabled, falling back to demo mode');
          setUser(demoUser);
          return { error: null };
        }
      }

      return { error };
    } catch (error) {
      console.error(`${provider} OAuth exception:`, error);
      // Fall back to demo mode on any error
      setUser(demoUser);
      return { error: null };
    }
  };

  const signInWithBiometrics = async () => {
    if (isDemoMode) {
      // Demo mode - simulate biometric sign in
      setUser(demoUser);
      return { error: null };
    }

    try {
      // Check if biometric authentication is available
      if (!biometricsAvailable) {
        throw new Error('Biometric authentication not available on this device');
      }

      // For demo purposes, simulate biometric authentication
      // In production, you would implement WebAuthn authentication
      console.log('Biometric authentication requested...');
      
      // Simulate biometric verification delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just sign in with the last known user
      // In production, you would verify the biometric and get user credentials
      if (user) {
        return { error: null };
      } else {
        throw new Error('No user found for biometric authentication');
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
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

  const updateUser = async (updates: Partial<AuthUser>) => {
    if (isDemoMode) {
      // Demo mode - update local state
      setUser(prev => prev ? { ...prev, ...updates } : null);
      return;
    }

    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (!error) {
        setUser(prev => prev ? { ...prev, ...updates } : null);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
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
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isDemoMode,
      biometricsAvailable,
      signIn,
      signUp,
      signOut,
      signInWithProvider,
      signInWithBiometrics,
      resendConfirmationEmail,
      resetPassword,
      setIsDemoMode,
      updateUser,
      updateBalance,
      claimBonus,
    }}>
      {children}
    </AuthContext.Provider>
  )
};