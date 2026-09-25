import { create } from 'zustand';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRequest } from '../services/authApi';

const AKEY = 'courier_access_token';
const RKEY = 'courier_refresh_token';
const UKEY = 'courier_auth_user';

async function sGet(
  k: string
): Promise<string | null> {
  try {
    if (Platform.OS === 'web') {
      return await AsyncStorage.getItem(k);
    }
    return await SecureStore.getItemAsync(k);
  } catch {
    return null;
  }
}

async function sSet(
  k: string,
  v: string
): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(k, v);
      return;
    }
    await SecureStore.setItemAsync(k, v);
  } catch {
    await AsyncStorage.setItem(k, v);
  }
}

async function sDel(k: string): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(k);
      return;
    }
    await SecureStore.deleteItemAsync(k);
  } catch {}
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
  login: (u: string, p: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>(
  (set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isHydrated: false,
    login: async (username, password) => {
      const d = await loginRequest(
        username,
        password
      );
      await sSet(AKEY, d.accessToken);
      await sSet(RKEY, d.refreshToken);
      const user = {
        id: d.id,
        username: d.username,
        email: d.email,
        firstName: d.firstName,
        lastName: d.lastName,
      };
      await sSet(UKEY, JSON.stringify(user));
      set({
        user,
        accessToken: d.accessToken,
        isAuthenticated: true,
      });
    },
    logout: async () => {
      await sDel(AKEY);
      await sDel(RKEY);
      await sDel(UKEY);
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      });
    },
    hydrate: async () => {
      const [a, u] = await Promise.all([
        sGet(AKEY),
        sGet(UKEY),
      ]);
      if (a && u) {
        try {
          const user = JSON.parse(u) as AuthUser;
          set({
            user,
            accessToken: a,
            isAuthenticated: true,
            isHydrated: true,
          });
          return;
        } catch {}
      }
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isHydrated: true,
      });
    },
  })
);