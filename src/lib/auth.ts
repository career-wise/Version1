export interface AuthUser {
  id: string;
  email: string;
  full_name?: string;
  user_type?: 'student' | 'graduate' | 'professional' | 'entrepreneur';
  career_stage?: string;
  experience_level?: string;
  primary_goals?: string[];
  industry_interests?: string[];
  skills?: string[];
  location?: string;
  bio?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  onboarding_completed?: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export interface ProfileUpdateData {
  full_name?: string;
  user_type?: string;
  career_stage?: string;
  experience_level?: string;
  primary_goals?: string[];
  industry_interests?: string[];
  skills?: string[];
  location?: string;
  bio?: string;
  linkedin_url?: string;
  portfolio_url?: string;
}

class AuthService {
  private baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

  // Development mode - set this to false to use real API
  private isDevelopmentMode = import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_AUTH === 'true';

  // Mock data for development
  private mockAuthResponse = (email: string, fullName?: string): AuthResponse => ({
    access_token: 'mock_token_' + Date.now(),
    token_type: 'Bearer',
    user: {
      id: 'mock_user_id_' + Date.now(),
      email,
      full_name: fullName || 'Mock User',
      user_type: 'professional',
      experience_level: 'mid',
      primary_goals: ['Senior Developer', 'Team Lead'],
      skills: ['JavaScript', 'React', 'Node.js'],
      industry_interests: ['Technology', 'AI/ML'],
      onboarding_completed: false
    }
  });

  async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    // Development bypass
    if (this.isDevelopmentMode) {
      console.log('🔧 Development mode: Bypassing signup API call');

      await new Promise(resolve => setTimeout(resolve, 500));

      const mockResponse = this.mockAuthResponse(email, fullName);

      localStorage.setItem('careerwise_token', mockResponse.access_token);
      localStorage.setItem('careerwise_user', JSON.stringify(mockResponse.user));
      console.log('✅ Mock sign up successful, token stored');

      return mockResponse;
    }

    try {
      console.log('🔄 Making signup request to:', `${this.baseUrl}/api/v1/auth/signup`);

      const response = await fetch(`${this.baseUrl}/api/v1/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          full_name: fullName,
        }),
      });

      console.log('📡 Signup response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(errorData.detail || `HTTP ${response.status}: Failed to sign up`);
      }

      const data = await response.json();

      // Store token and user data
      if (data.access_token) {
        localStorage.setItem('careerwise_token', data.access_token);
        localStorage.setItem('careerwise_user', JSON.stringify(data.user));
        console.log('✅ Sign up successful, token stored');
      }

      return data;
    } catch (error) {
      console.error('❌ Sign up error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    // Development bypass
    if (this.isDevelopmentMode) {
      console.log('🔧 Development mode: Bypassing signin API call');

      await new Promise(resolve => setTimeout(resolve, 500));

      const mockResponse = this.mockAuthResponse(email);

      localStorage.setItem('careerwise_token', mockResponse.access_token);
      localStorage.setItem('careerwise_user', JSON.stringify(mockResponse.user));
      console.log('✅ Mock sign in successful, token stored');

      return mockResponse;
    }

    try {
      console.log('🔄 Making signin request to:', `${this.baseUrl}/api/v1/auth/signin`);

      const response = await fetch(`${this.baseUrl}/api/v1/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log('📡 Signin response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(errorData.detail || `HTTP ${response.status}: Invalid credentials`);
      }

      const data = await response.json();

      // Store token and user data
      if (data.access_token) {
        localStorage.setItem('careerwise_token', data.access_token);
        localStorage.setItem('careerwise_user', JSON.stringify(data.user));
        console.log('✅ Sign in successful, token stored');
      }

      return data;
    } catch (error) {
      console.error('❌ Sign in error:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    const token = this.getToken();

    // In development mode, skip server signout
    if (!this.isDevelopmentMode && token) {
      try {
        const response = await fetch(`${this.baseUrl}/api/v1/auth/signout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('✅ Server sign out response:', response.status);
      } catch (error) {
        console.error('⚠️ Error signing out from server:', error);
        // Don't throw error here, still clear local storage
      }
    }

    // Clear local storage
    localStorage.removeItem('careerwise_token');
    localStorage.removeItem('careerwise_user');
    localStorage.removeItem('careerwise_onboarding_completed');
    localStorage.removeItem('careerwise_user_profile');
    localStorage.removeItem('careerwise_needs_onboarding');
    console.log('✅ Local storage cleared');
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    const token = this.getToken();

    if (!token) {
      console.log('❌ No token found');
      return null;
    }

    // Development bypass - return stored user
    if (this.isDevelopmentMode) {
      const storedUser = this.getStoredUser();
      if (storedUser) {
        console.log('🔧 Development mode: Returning stored user');
        return storedUser;
      }
      console.log('❌ No stored user in development mode');
      return null;
    }

    try {
      console.log('🔍 Fetching current user with token');

      const response = await fetch(`${this.baseUrl}/api/v1/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Auth/me response status:', response.status);

      if (!response.ok) {
        console.log('❌ Auth failed, clearing token');
        this.clearAuthData();
        return null;
      }

      const user = await response.json();
      localStorage.setItem('careerwise_user', JSON.stringify(user));
      console.log('✅ Current user fetched:', user.email);
      return user;
    } catch (error) {
      console.error('❌ Error getting current user:', error);
      this.clearAuthData();
      return null;
    }
  }

  async updateProfile(profileData: ProfileUpdateData): Promise<AuthUser> {
    const token = this.getToken();

    if (!token) {
      throw new Error('Not authenticated');
    }

    // Development bypass
    if (this.isDevelopmentMode) {
      console.log('🔧 Development mode: Bypassing profile update API call');

      await new Promise(resolve => setTimeout(resolve, 300));

      const currentUser = this.getStoredUser();
      if (!currentUser) {
        throw new Error('No current user found');
      }

      const updatedUser = { ...currentUser, ...profileData };
      localStorage.setItem('careerwise_user', JSON.stringify(updatedUser));
      console.log('✅ Mock profile update successful');

      return updatedUser;
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/v1/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(errorData.detail || 'Failed to update profile');
      }

      const updatedUser = await response.json();
      localStorage.setItem('careerwise_user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('❌ Profile update error:', error);
      throw error;
    }
  }

  getToken(): string | null {
    const token = localStorage.getItem('careerwise_token');
    return token;
  }

  getStoredUser(): AuthUser | null {
    const userStr = localStorage.getItem('careerwise_user');
    if (!userStr) {
      return null;
    }

    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private clearAuthData(): void {
    localStorage.removeItem('careerwise_token');
    localStorage.removeItem('careerwise_user');
    console.log('🧹 Auth data cleared');
  }

  async refreshToken(): Promise<string | null> {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    // Development bypass
    if (this.isDevelopmentMode) {
      console.log('🔧 Development mode: Mock token refresh');
      const newToken = 'mock_refreshed_token_' + Date.now();
      localStorage.setItem('careerwise_token', newToken);
      return newToken;
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/v1/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        this.clearAuthData();
        return null;
      }

      const data = await response.json();
      localStorage.setItem('careerwise_token', data.access_token);
      return data.access_token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      this.clearAuthData();
      return null;
    }
  }

  // Helper to enable/disable development mode
  setDevelopmentMode(enabled: boolean): void {
    this.isDevelopmentMode = enabled;
    console.log(`🔧 Development mode ${enabled ? 'enabled' : 'disabled'}`);
  }

  isDevelopment(): boolean {
    return this.isDevelopmentMode;
  }
}

export const authService = new AuthService();