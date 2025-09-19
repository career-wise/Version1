// Mock authentication service that works without backend
// This will be replaced with real Supabase integration later
import { apiClient } from './api';

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

interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'careerwise_token';
  private readonly USER_KEY = 'careerwise_user';
  private readonly PROFILE_KEY = 'careerwise_user_profile';

  // Mock sign up
  async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.signUp(email, password, fullName);
      
      // Store in localStorage
      localStorage.setItem(this.TOKEN_KEY, response.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
      localStorage.setItem('careerwise_needs_onboarding', 'true');
      
      // Set token in API client
      apiClient.setToken(response.token);

      return { user: response.user, token: response.token };
    } catch (error) {
      // Fallback to mock for demo
      console.warn('API signup failed, using mock:', error);
      
      const user: User = {
        id: `user_${Date.now()}`,
        email,
        full_name: fullName,
        created_at: new Date().toISOString(),
        onboarding_completed: false
      };

      const token = `token_${Date.now()}`;

      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem('careerwise_needs_onboarding', 'true');

      return { user, token };
    }
  }

  // Mock sign in
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await apiClient.signIn(email, password);
      
      // Store in localStorage
      localStorage.setItem(this.TOKEN_KEY, response.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
      localStorage.setItem('careerwise_needs_onboarding', 'true');
      
      // Set token in API client
      apiClient.setToken(response.token);

      return { user: response.user, token: response.token };
    } catch (error) {
      // Fallback to mock for demo
      console.warn('API signin failed, using mock:', error);
      
      const user: User = {
        id: `user_${Date.now()}`,
        email,
        full_name: email.split('@')[0],
        created_at: new Date().toISOString(),
        onboarding_completed: false
      };

      const token = `token_${Date.now()}`;

      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem('careerwise_needs_onboarding', 'true');

      return { user, token };
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await apiClient.signOut();
    } catch (error) {
      console.warn('API signout failed:', error);
    }
    
    // Clear local storage
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.PROFILE_KEY);
    localStorage.removeItem('careerwise_needs_onboarding');
    localStorage.removeItem('careerwise_onboarding_completed');
    
    // Clear API client token
    apiClient.clearToken();
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token;
  }

  // Get current user
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  }

  // Get user profile
  async getProfile(): Promise<UserProfile | null> {
    try {
      const response = await apiClient.getProfile();
      return response.profile || response;
    } catch (error) {
      console.warn('API getProfile failed, using local storage:', error);
      
      const profileStr = localStorage.getItem(this.PROFILE_KEY);
      if (profileStr) {
        try {
          return JSON.parse(profileStr);
        } catch (error) {
          console.error('Error parsing profile data:', error);
          return null;
        }
      }
      return null;
    }
  }

  // Update user profile
  async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const response = await apiClient.updateProfile(profileData);
      const updatedProfile = response.profile;
      
      // Store updated profile locally
      localStorage.setItem(this.PROFILE_KEY, JSON.stringify(updatedProfile));
      
      // If onboarding is completed, update user as well
      if (profileData.onboarding_completed) {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            onboarding_completed: true,
            user_type: profileData.user_type as any
          };
          localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
        }
      }
      
      return updatedProfile;
    } catch (error) {
      console.warn('API updateProfile failed, using local storage:', error);
      
      // Fallback to local storage
      const currentUser = this.getCurrentUser();
      if (!currentUser) {
        throw new Error('No authenticated user');
      }

      const existingProfile = await this.getProfile();

      const updatedProfile: UserProfile = {
        id: currentUser.id,
        full_name: currentUser.full_name,
        email: currentUser.email,
        ...existingProfile,
        ...profileData
      };

      localStorage.setItem(this.PROFILE_KEY, JSON.stringify(updatedProfile));

      if (profileData.onboarding_completed) {
        const updatedUser = {
          ...currentUser,
          onboarding_completed: true,
          user_type: profileData.user_type as any
        };
        localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
      }

      return updatedProfile;
    }
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  // Initialize API client token
  initializeApiClient() {
    const token = this.getToken();
    if (token) {
      apiClient.setToken(token);
    }
  }
}

export const authService = new AuthService();

// Initialize API client with stored token
authService.initializeApiClient();