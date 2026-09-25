import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CourierPackage } from '../types';
const KEY = '@courier_packages_cache_v1';
export async function savePackagesCache(p: CourierPackage[]): Promise<void> { try { await AsyncStorage.setItem(KEY, JSON.stringify(p)); } catch {} }
export async function loadPackagesCache(): Promise<CourierPackage[] | null> { try { const r = await AsyncStorage.getItem(KEY); if (!r) return null; return JSON.parse(r) as CourierPackage[]; } catch { return null; } }
export async function clearPackagesCache(): Promise<void> { try { await AsyncStorage.removeItem(KEY); } catch {} }