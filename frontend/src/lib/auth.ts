// Mock authentication service that works without backend
// This will be replaced with real Supabase integration later

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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user: User = {
      id: `user_${Date.now()}`,
      email,
      full_name: fullName,
      created_at: new Date().toISOString(),
      onboarding_completed: false
    };

    const token = `token_${Date.now()}`;

    // Store in localStorage
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem('careerwise_needs_onboarding', 'true');

    return { user, token };
  }

  // Mock sign in
  async signIn(email: string, password: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user: User = {
      id: `user_${Date.now()}`,
      email,
      full_name: email.split('@')[0], // Use email prefix as name
      created_at: new Date().toISOString(),
      onboarding_completed: false
    };

    const token = `token_${Date.now()}`;

    // Store in localStorage
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    localStorage.setItem('careerwise_needs_onboarding', 'true');

    return { user, token };
  }

  // Sign out
  async signOut(): Promise<void> {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.PROFILE_KEY);
    localStorage.removeItem('careerwise_needs_onboarding');
    localStorage.removeItem('careerwise_onboarding_completed');
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

  // Update user profile
  async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

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

    // Store updated profile
    localStorage.setItem(this.PROFILE_KEY, JSON.stringify(updatedProfile));

    // If onboarding is completed, update user as well
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

  // Get token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}

export const authService = new AuthService();