import AsyncStorage from '@react-native-async-storage/async-storage';

const mem = new Map<string, string | boolean>();

export type SortOrder =
  | 'recientes'
  | 'peso'
  | 'az';

export function getPrefBoolean(): boolean {
  const m = mem.get('compact');
  if (typeof m === 'boolean') {
    return m;
  }
  return false;
}

export function setPrefBoolean(
  v: boolean
): void {
  mem.set('compact', v);
  AsyncStorage.setItem(
    '@courier_pref_compact',
    JSON.stringify(v)
  ).catch(() => {});
}

export function getPrefSort(): SortOrder {
  const m = mem.get('sortOrder');
  if (
    m === 'recientes' ||
    m === 'peso' ||
    m === 'az'
  ) {
    return m;
  }
  return 'recientes';
}

export function setPrefSort(v: SortOrder): void {
  mem.set('sortOrder', v);
  AsyncStorage.setItem(
    '@courier_pref_sort',
    v
  ).catch(() => {});
}

export async function hydratePrefsFromAsync(): Promise<void> {
  try {
    const c = await AsyncStorage.getItem(
      '@courier_pref_compact'
    );
    const s = await AsyncStorage.getItem(
      '@courier_pref_sort'
    );
    if (c) {
      mem.set(
        'compact',
        JSON.parse(c) as boolean
      );
    }
    if (
      s === 'recientes' ||
      s === 'peso' ||
      s === 'az'
    ) {
      mem.set('sortOrder', s);
    }
  } catch {}
}