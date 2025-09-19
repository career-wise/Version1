// API Client for Backend Communication

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('careerwise_token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Authentication
  async signUp(email: string, password: string, fullName: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        full_name: fullName,
      }),
    });
  }

  async signIn(email: string, password: string) {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  async signOut() {
    return this.request('/auth/signout', {
      method: 'POST',
    });
  }

  // Profile
  async getProfile() {
    return this.request('/profile/');
  }

  async updateProfile(profileData: any) {
    return this.request('/profile/', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  // Chat
  async sendChatMessage(message: string, conversationId?: string) {
    return this.request('/chat/send', {
      method: 'POST',
      body: JSON.stringify({
        message,
        conversation_id: conversationId,
      }),
    });
  }

  async getChatConversations() {
    return this.request('/chat/conversations');
  }

  // Student APIs
  async getSubjects() {
    return this.request('/student/academics/subjects');
  }

  async getStudyGoals() {
    return this.request('/student/academics/goals');
  }

  async createStudyGoal(goalData: any) {
    return this.request('/student/academics/goals', {
      method: 'POST',
      body: JSON.stringify(goalData),
    });
  }

  async getCareers(category?: string, search?: string) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    
    return this.request(`/student/exploration/careers?${params.toString()}`);
  }

  async getColleges(search?: string) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    
    return this.request(`/student/exploration/colleges?${params.toString()}`);
  }

  async getOnlineCourses() {
    return this.request('/student/learning/courses');
  }

  async getProjectIdeas() {
    return this.request('/student/learning/projects');
  }

  async getInterviewQuestions(type: string = 'job', count: number = 5) {
    return this.request(`/student/learning/interview-questions?interview_type=${type}&count=${count}`);
  }

  // ML Interview Analysis
  async startInterviewSession(sessionData: any) {
    return this.request('/ml/interview/session/start', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  }

  async endInterviewSession(sessionId: string) {
    return this.request(`/ml/interview/session/${sessionId}/end`, {
      method: 'POST',
    });
  }

  async getSessionMetrics(sessionId: string) {
    return this.request(`/ml/interview/session/${sessionId}/metrics`);
  }

  // Document Management
  async getDocuments() {
    return this.request('/student/resources/documents');
  }

  async uploadDocument(file: File, category: string = 'general') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    return this.request('/student/resources/documents/upload', {
      method: 'POST',
      headers: this.token ? { 'Authorization': `Bearer ${this.token}` } : {},
      body: formData,
    });
  }

  // Assessments
  async getInterestAssessment() {
    return this.request('/student/assessments/interest-assessment');
  }

  async submitInterestAssessment(responses: any[]) {
    return this.request('/student/assessments/interest-assessment/submit', {
      method: 'POST',
      body: JSON.stringify(responses),
    });
  }

  // Notifications
  async getNotifications() {
    return this.request('/notifications/');
  }

  async markNotificationRead(notificationId: string) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  // Utility methods
  setToken(token: string) {
    this.token = token;
    localStorage.setItem('careerwise_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('careerwise_token');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);