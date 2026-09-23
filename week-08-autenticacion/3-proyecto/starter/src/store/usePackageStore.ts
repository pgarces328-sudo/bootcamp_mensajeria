import { create } from 'zustand';
interface PackageStore { trackedIds: string[]; toggleTracked: (id: string) => void; clearTracked: () => void; }
export const usePackageStore = create<PackageStore>((set) => ({
  trackedIds: [],
  toggleTracked: (id: string) => set((s) => ({ trackedIds: s.trackedIds.includes(id) ? s.trackedIds.filter((t) => t !== id) : [...s.trackedIds, id] })),
  clearTracked: () => set({ trackedIds: [] }),
}));