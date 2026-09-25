import { create } from 'zustand';

import { packages as seedPackages } from '../data/mockData';
import type { CourierPackage, PackageStatus } from '../types';

interface PackageStore {
  packages: CourierPackage[];
  trackedIds: string[];
  toggleTracked: (id: string) => void;
  updateStatus: (id: string, status: PackageStatus) => void;
  clearTracked: () => void;
}

export const usePackageStore = create<PackageStore>((set) => ({
  packages: seedPackages,
  trackedIds: [],

  toggleTracked: (id) =>
    set((state) => ({
      trackedIds: state.trackedIds.includes(id)
        ? state.trackedIds.filter((trackedId) => trackedId !== id)
        : [...state.trackedIds, id],
    })),

  updateStatus: (id, status) =>
    set((state) => ({
      packages: state.packages.map((item) =>
        item.id === id ? { ...item, status } : item
      ),
    })),

  clearTracked: () => set({ trackedIds: [] }),
}));