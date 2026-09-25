import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  getPrefBoolean,
  setPrefBoolean,
  getPrefSort,
  setPrefSort,
  hydratePrefsFromAsync,
} from '../storage/preferencesStorage';
import type {
  SortOrder,
} from '../storage/preferencesStorage';

export function usePreferences() {
  const [compact, setC] = useState<boolean>(
    () => getPrefBoolean()
  );
  const [sortOrder, setS] = useState<SortOrder>(
    () => getPrefSort()
  );

  useEffect(() => {
    hydratePrefsFromAsync().then(() => {
      setC(getPrefBoolean());
      setS(getPrefSort());
    });
  }, []);

  const setCompact = useCallback(
    (v: boolean) => {
      setPrefBoolean(v);
      setC(v);
    },
    []
  );

  const setSortOrder = useCallback(
    (v: SortOrder) => {
      setPrefSort(v);
      setS(v);
    },
    []
  );

  const refresh = useCallback(
    () => {
      setC(getPrefBoolean());
      setS(getPrefSort());
    },
    []
  );

  return {
    compact,
    sortOrder,
    setCompact,
    setSortOrder,
    refresh,
  };
}

export type {
  SortOrder,
};