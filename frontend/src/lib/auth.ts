// Mock authentication service for development
interface User {
  id: string;
  email: string;
  full_name: string;
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
  created_at: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  private readonly TOKEN_KEY = 'careerwise_token';
  private readonly USER_KEY = 'careerwise_user';

  async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user: User = {
      id: `user_${Date.now()}`,
      email,
      full_name: fullName,
      onboarding_completed: false,
      created_at: new Date().toISOString(),
    };

    const token = `token_${Date.now()}`;

    // Store in localStorage
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));

    return { user, token };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user: User = {
      id: `user_${Date.now()}`,
      email,
      full_name: email.split('@')[0],
      onboarding_completed: Math.random() > 0.5, // Random for demo
      created_at: new Date().toISOString(),
    };

    const token = `token_${Date.now()}`;

    // Store in localStorage
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));

    return { user, token };
  }

  async signOut(): Promise<void> {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem('careerwise_user_profile');
    localStorage.removeItem('careerwise_onboarding_completed');
    localStorage.removeItem('careerwise_needs_onboarding');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  async updateProfile(profileData: Partial<User>): Promise<User> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    const updatedUser = { ...currentUser, ...profileData };
    localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));

    return updatedUser;
  }

  async getProfile(): Promise<User | null> {
    return this.getCurrentUser();
  }
}

export const authService = new AuthService();