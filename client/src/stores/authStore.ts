import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import UserServices from '../services/userServices';
import { UserType } from '../types/userTypes';
import Cookies from 'js-cookie';

const userServices = new UserServices();

interface AuthState {
  user: UserType | null;
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
        try {
          const tokenResponse = await userServices.login(email, password);
          if (tokenResponse) {
            const user = await userServices.getUserInfo(tokenResponse.authenticate.access_token);
            console.log(user)
            Cookies.set('refreshToken', tokenResponse.authenticate.refresh_token, { expires: 30 });
            Cookies.set('accessToken', tokenResponse.authenticate.access_token, { expires: 30 });
            set({ user: user, isAuthenticated: true });
            return true;
          } else {
            set({ user: null, isAuthenticated: false });
            return false;
          }
        } catch {
          set({ user: null, isAuthenticated: false });
          return false;
        }
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