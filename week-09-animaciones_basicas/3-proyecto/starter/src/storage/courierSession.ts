import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const KEY = 'courier_access_token';

const WEB_KEY = '@courier_access_token_web';

export async function saveCourierToken(
  t: string
): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.setItem(
        WEB_KEY,
        t
      );
      return;
    }
    await SecureStore.setItemAsync(
      KEY,
      t
    );
  } catch {
    await AsyncStorage.setItem(
      WEB_KEY,
      t
    );
  }
}

export async function getCourierToken(): Promise<
  string | null
> {
  try {
    if (Platform.OS === 'web') {
      return await AsyncStorage.getItem(
        WEB_KEY
      );
    }
    return await SecureStore.getItemAsync(
      KEY
    );
  } catch {
    return await AsyncStorage.getItem(
      WEB_KEY
    );
  }
}

export async function deleteCourierToken(): Promise<
  void
> {
  try {
    if (Platform.OS === 'web') {
      await AsyncStorage.removeItem(
        WEB_KEY
      );
      return;
    }
    await SecureStore.deleteItemAsync(
      KEY
    );
  } catch {
    await AsyncStorage.removeItem(
      WEB_KEY
    );
  }
}