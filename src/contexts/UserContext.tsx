// src/contexts/UserContext.tsx - FIXED VERSION
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../lib/auth';

export type UserType = 'student' | 'graduate' | 'professional' | 'entrepreneur';

interface UserContextType {
  userType: UserType | null;
  userProfile: any;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  userType: null,
  userProfile: null,
  loading: true,
  refreshProfile: async () => {},
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching user profile...');

      const user = await authService.getCurrentUser();
      if (user) {
        console.log('✅ User profile fetched:', user.user_type);
        setUserType(user.user_type as UserType);
        setUserProfile(user);
      } else {
        console.log('❌ No user found');
        setUserType(null);
        setUserProfile(null);
      }
    } catch (error) {
      console.error('❌ Error fetching user profile:', error);
      setUserType(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array - this function doesn't depend on any state

  // Only run once on mount
  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();

    if (isAuthenticated) {
      console.log('🔑 User is authenticated, fetching profile...');
      refreshProfile();
    } else {
      console.log('🚫 User not authenticated');
      setLoading(false);
    }
  }, []); // Empty dependency array - only run on mount

  return (
    <UserContext.Provider value={{
      userType,
      userProfile,
      loading,
      refreshProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};