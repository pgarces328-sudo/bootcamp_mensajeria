import { useCallback, useEffect, useState } from 'react';
import {
  getPrefBoolean,
  setPrefBoolean,
  getPrefSort,
  setPrefSort,
  hydratePrefsFromAsync,
  subscribePrefs,
  type SortOrder,
} from '../storage/preferencesStorage';

export function usePreferences() {
  const [compact, setCompactState] = useState<boolean>(() => getPrefBoolean());
  const [sortOrder, setSortOrderState] = useState<SortOrder>(() => getPrefSort());

  useEffect(() => {
    hydratePrefsFromAsync().then(() => {
      setCompactState(getPrefBoolean());
      setSortOrderState(getPrefSort());
    });
    const unsub = subscribePrefs(() => {
      setCompactState(getPrefBoolean());
      setSortOrderState(getPrefSort());
    });
    return unsub;
  }, []);

  const setCompact = useCallback((v: boolean) => {
    setPrefBoolean(v);
    setCompactState(v);
  }, []);

  const setSortOrder = useCallback((v: SortOrder) => {
    setPrefSort(v);
    setSortOrderState(v);
  }, []);

  const refresh = useCallback(() => {
    setCompactState(getPrefBoolean());
    setSortOrderState(getPrefSort());
  }, []);

  return { compact, sortOrder, setCompact, setSortOrder, refresh };
}
export type { SortOrder };