import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../lib/auth';

interface User {
  id: string;
  email: string;
  full_name: string;
  user_type?: 'student' | 'graduate' | 'professional' | 'entrepreneur';
  onboarding_completed?: boolean;
  created_at: string;
}

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  user_type?: string;
  career_stage?: string;
  experience_level?: string;
  primary_goals?: string[];
  industry_interests?: string[];
  skills?: string[];
  linkedin_url?: string;
  portfolio_url?: string;
  bio?: string;
  location?: string;
  onboarding_completed?: boolean;
}

interface UserContextType {
  user: User | null;
  userProfile: UserProfile | null;
  userType: string | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const userType = userProfile?.user_type || null;

  const refreshUser = async () => {
    try {
      setLoading(true);
      const currentUser = authService.getCurrentUser();

      if (currentUser) {
        setUser(currentUser);

        // Try to get profile from localStorage first
        const storedProfile = localStorage.getItem('careerwise_user_profile');
        if (storedProfile) {
          try {
            const profile = JSON.parse(storedProfile);
            setUserProfile(profile);
          } catch (error) {
            console.error('Error parsing stored profile:', error);
          }
        }

        // Try to fetch fresh profile from API
        try {
          const profile = await authService.getProfile();
          if (profile) {
            setUserProfile(profile);
            localStorage.setItem('careerwise_user_profile', JSON.stringify(profile));
          }
        } catch (error) {
          console.log('Could not fetch profile from API, using stored data');
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
      setUser(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value: UserContextType = {
    user,
    userProfile,
    userType,
    loading,
    setUser,
    setUserProfile,
    refreshUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};