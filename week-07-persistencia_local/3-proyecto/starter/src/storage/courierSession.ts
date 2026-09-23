import * as SecureStore from 'expo-secure-store';

const KEY = 'courier_access_token';

export async function saveCourierToken(t: string): Promise<void> {
  console.log('[token] guardando:', t);
  await SecureStore.setItemAsync(KEY, t);
  console.log('[token] guardado ok');
}

export async function getCourierToken(): Promise<string | null> {
  const v = await SecureStore.getItemAsync(KEY);
  console.log('[token] leído:', v ? 'sí hay' : 'vacío');
  return v;
}

export async function deleteCourierToken(): Promise<void> {
  await SecureStore.deleteItemAsync(KEY);
  console.log('[token] borrado');
}