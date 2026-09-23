import AsyncStorage from '@react-native-async-storage/async-storage';

type MmkvLike = {
  getBoolean: (k: string) => boolean | undefined;
  getString: (k: string) => string | undefined;
  set: (k: string, v: string | boolean) => void;
};

let mmkv: MmkvLike | null = null;
try {
  const mod = require('react-native-mmkv') as {
    MMKV?: new (opts: { id: string }) => MmkvLike;
  };
  if (mod.MMKV) {
    mmkv = new mod.MMKV({ id: 'courier-prefs' });
  }
} catch {
  mmkv = null;
}

const mem = new Map<string, string | boolean>();
const listeners = new Set<() => void>();

function notify(): void {
  listeners.forEach((l) => l());
}

export function subscribePrefs(cb: () => void): () => void {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

export type SortOrder = 'recientes' | 'peso' | 'az';

export function getPrefBoolean(): boolean {
  try {
    const v = mmkv?.getBoolean('compact');
    if (typeof v === 'boolean') return v;
  } catch {}
  const m = mem.get('compact');
  if (typeof m === 'boolean') return m;
  return false;
}

export function setPrefBoolean(v: boolean): void {
  mem.set('compact', v);
  try { mmkv?.set('compact', v); } catch {}
  AsyncStorage.setItem('@courier_pref_compact', JSON.stringify(v)).catch(() => {});
  notify();
}

export function getPrefSort(): SortOrder {
  try {
    const v = mmkv?.getString('sortOrder');
    if (v === 'recientes' || v === 'peso' || v === 'az') return v;
  } catch {}
  const m = mem.get('sortOrder');
  if (m === 'recientes' || m === 'peso' || m === 'az') return m;
  return 'recientes';
}

export function setPrefSort(v: SortOrder): void {
  mem.set('sortOrder', v);
  try { mmkv?.set('sortOrder', v); } catch {}
  AsyncStorage.setItem('@courier_pref_sort', v).catch(() => {});
  notify();
}

export async function hydratePrefsFromAsync(): Promise<void> {
  try {
    const [c, s] = await Promise.all([
      AsyncStorage.getItem('@courier_pref_compact'),
      AsyncStorage.getItem('@courier_pref_sort'),
    ]);
    if (c) {
      const b = JSON.parse(c) as boolean;
      mem.set('compact', b);
      try { mmkv?.set('compact', b); } catch {}
    }
    if (s === 'recientes' || s === 'peso' || s === 'az') {
      mem.set('sortOrder', s);
      try { mmkv?.set('sortOrder', s); } catch {}
    }
    notify();
  } catch {}
}

export function isMmkvAvailable(): boolean {
  return mmkv !== null;
}