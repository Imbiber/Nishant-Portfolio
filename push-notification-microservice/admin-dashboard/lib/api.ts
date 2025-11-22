const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = API_URL;

    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  // Auth
  async login(email: string, password: string) {
    return this.request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name?: string) {
    return this.request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async getProfile() {
    return this.request('/api/v1/auth/profile');
  }

  // Projects
  async getProjects() {
    return this.request('/api/v1/projects');
  }

  async createProject(data: { name: string; domain?: string }) {
    return this.request('/api/v1/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(projectId: string, data: any) {
    return this.request(`/api/v1/projects/${projectId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(projectId: string) {
    return this.request(`/api/v1/projects/${projectId}`, {
      method: 'DELETE',
    });
  }

  // Subscriptions
  async getSubscriptions(projectId: string, params?: any) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/v1/admin/${projectId}/subscriptions?${query}`);
  }

  // Notifications
  async sendNotification(projectId: string, data: any) {
    return this.request(`/api/v1/${projectId}/notifications/send`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getNotifications(projectId: string, params?: any) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/api/v1/${projectId}/notifications?${query}`);
  }

  async getNotificationStats(projectId: string, notificationId: string) {
    return this.request(`/api/v1/${projectId}/notifications/${notificationId}/stats`);
  }

  async getAnalytics(projectId: string) {
    return this.request(`/api/v1/${projectId}/analytics`);
  }
}

export const apiClient = new ApiClient();
