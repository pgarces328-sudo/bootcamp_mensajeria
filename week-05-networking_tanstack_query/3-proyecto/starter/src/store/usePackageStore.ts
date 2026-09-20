import { create } from 'zustand';

interface PackageStore {
  trackedIds: string[];
  toggleTracked: (id: string) => void;
  clearTracked: () => void;
}

export const usePackageStore = create<PackageStore>((set) => ({
  trackedIds: [],
  toggleTracked: (id: string) =>
    set((state) => ({
      trackedIds: state.trackedIds.includes(id)
        ? state.trackedIds.filter((t) => t !== id)
        : [...state.trackedIds, id],
    })),
  clearTracked: () => set({ trackedIds: [] }),
}));