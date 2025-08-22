import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../lib/types';
import UserServices from '../services/userServices';

const userServices = new UserServices();

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        // Mock authentication - in real app, this would be an API call
        const isLogin = await userServices.login(email, password);
        if (isLogin) {
          // const user = await userServices.getUserInfo(isLogin._id);
          // set({ user, isAuthenticated: true });
          return true;
        }
        if (email === 'admin@xecongtrinhvn.com' && password === 'XeCoTr2024!') {
          const user: User = {
            id: 1,
            email: 'admin@xecongtrinhvn.com',
            name: 'Admin',
            role: 'admin',
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      checkAuth: () => {
        return get().isAuthenticated;
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);