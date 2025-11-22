import { create } from 'zustand';
import { apiClient } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    const data = await apiClient.login(email, password);
    apiClient.setToken(data.token);
    set({ user: data.user, token: data.token, isAuthenticated: true });
  },

  register: async (email: string, password: string, name?: string) => {
    const data = await apiClient.register(email, password, name);
    apiClient.setToken(data.token);
    set({ user: data.user, token: data.token, isAuthenticated: true });
  },

  logout: () => {
    apiClient.clearToken();
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    try {
      const user = await apiClient.getProfile();
      set({ user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));
