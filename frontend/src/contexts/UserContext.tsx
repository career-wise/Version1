import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  user_type?: 'student' | 'graduate' | 'professional' | 'entrepreneur';
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
  created_at: string;
}

interface UserContextType {
  user: UserProfile | null;
  userProfile: UserProfile | null;
  userType: string | null;
  loading: boolean;
  setUser: (user: UserProfile | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const userType = userProfile?.user_type || null;

  const refreshUser = async () => {
    try {
      setLoading(true);

      // Check localStorage for user data
      const storedUser = localStorage.getItem('careerwise_user');
      const storedProfile = localStorage.getItem('careerwise_user_profile');

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setUserProfile(userData);
      }

      if (storedProfile) {
        const profileData = JSON.parse(storedProfile);
        setUserProfile(profileData);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
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
    refreshUser,
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