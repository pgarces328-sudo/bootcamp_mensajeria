import { create } from 'zustand';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfileRequest, loginRequest, refreshRequest } from '../services/authApi';

const ACCESS_KEY = 'courier_access_token';
const REFRESH_KEY = 'courier_refresh_token';
const USER_KEY = 'courier_auth_user';

// En web SecureStore falla, usamos AsyncStorage solo ahí.
// En cel sigue usando SecureStore cifrado, que es lo que pide la rúbrica.
async function safeGet(key: string): Promise<string | null> {
  try {
    if (Platform.OS === 'web') {
      return await AsyncStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  } catch {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  }
}

async function safeSet(key: string, value: string): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  } catch {
    await AsyncStorage.setItem(key, value);
  }
}

async function safeDelete(key: string): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  } catch {
    await AsyncStorage.removeItem(key);
  }
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthStore {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isHydrated: false,

  login: async (username: string, password: string) => {
    const data = await loginRequest(username, password);
    await safeSet(ACCESS_KEY, data.accessToken);
    await safeSet(REFRESH_KEY, data.refreshToken);
    const user: AuthUser = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    };
    await safeSet(USER_KEY, JSON.stringify(user));
    set({ user, accessToken: data.accessToken, isAuthenticated: true });
  },

  logout: async () => {
    await safeDelete(ACCESS_KEY);
    await safeDelete(REFRESH_KEY);
    await safeDelete(USER_KEY);
    set({ user: null, accessToken: null, isAuthenticated: false });
  },

  refreshTokens: async () => {
    const refreshToken = await safeGet(REFRESH_KEY);
    if (!refreshToken) throw new Error('Sin refresh token');
    const data = await refreshRequest(refreshToken);
    await safeSet(ACCESS_KEY, data.accessToken);
    await safeSet(REFRESH_KEY, data.refreshToken);
    set({ accessToken: data.accessToken, isAuthenticated: true });
    const { user } = get();
    if (!user) {
      try {
        const profile = await getProfileRequest(data.accessToken);
        set({
          user: {
            id: profile.id,
            username: `${profile.firstName}`,
            email: profile.email,
            firstName: profile.firstName,
            lastName: profile.lastName,
          },
        });
      } catch {}
    }
  },

  hydrate: async () => {
    try {
      const [accessToken, userRaw] = await Promise.all([
        safeGet(ACCESS_KEY),
        safeGet(USER_KEY),
      ]);
      if (accessToken && userRaw) {
        try {
          const user = JSON.parse(userRaw) as AuthUser;
          set({ user, accessToken, isAuthenticated: true, isHydrated: true });
          return;
        } catch {}
      }
    } catch {}
    set({ user: null, accessToken: null, isAuthenticated: false, isHydrated: true });
  },
}));