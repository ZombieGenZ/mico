import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import UserServices from '../services/userServices';
import { UserType } from '../types/userTypes';
import Cookies from 'js-cookie';
import { RESPONSE_CODE } from '../constants/responseCode.constants';
//import toast from 'react-hot-toast';

const userServices = new UserServices();

interface AuthState {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: (accessToken: string, refresh_token: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: async (email: string, password: string) => {
        try {
          const tokenResponse = await userServices.login(email, password);
          if (tokenResponse.code == RESPONSE_CODE.LOGIN_SUCCESSFUL) {
            const user = await userServices.getUserInfo(tokenResponse.authenticate.access_token);
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
      
      logout: async () => {
        set({ user: null, isAuthenticated: false });
      },
      
      checkAuth: async (accessToken: string, refresh_token: string) => {
        const authenticate = await userServices.authenticAccessToken(accessToken || '', refresh_token)
        if(authenticate.code == RESPONSE_CODE.TOKEN_VERIFICATION_SUCCESSFUL) {
          set({ isAuthenticated: true })
          Cookies.set('refreshToken', authenticate.authenticate.refresh_token, { expires: 30 });
          Cookies.set('accessToken', authenticate.authenticate.access_token, { expires: 30 });
        } else {
          set({ isAuthenticated: false })
        }
        return get().isAuthenticated;
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);