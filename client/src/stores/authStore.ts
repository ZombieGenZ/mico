import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import UserServices from '../services/userServices';
import { UserType } from '../types/userTypes';
import Cookies from 'js-cookie';
import { RESPONSE_CODE } from '../constants/responseCode.constants';
import toast from 'react-hot-toast';

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
        const logouts = await userServices.logout(Cookies.get('refreshToken') || '')
        if(logouts.code == RESPONSE_CODE.LOGOUT_SUCCESSFUL) {
          set({ user: null, isAuthenticated: false });
          Cookies.remove('refreshToken')
          Cookies.remove('accessToken')
          toast.success(`${logouts.message}!`);
        } else {
          toast.error(`Đăng xuất thất bại, ${logouts.message}!`);
        }
      },
      
      checkAuth: async (accessToken: string, refresh_token: string) => {
        const user = await userServices.getUserInfo(accessToken || '');
        const authenticate = await userServices.authenticAccessToken(accessToken || '', refresh_token)
        if(authenticate.code == RESPONSE_CODE.TOKEN_VERIFICATION_SUCCESSFUL) {
          set({ user: user, isAuthenticated: true})
        } else {
          set({ user: user, isAuthenticated: false})
        }
        return get().isAuthenticated;
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);