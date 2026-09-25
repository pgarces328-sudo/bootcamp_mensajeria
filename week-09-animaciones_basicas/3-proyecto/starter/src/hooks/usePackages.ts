import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createPackage,
  fetchPackages,
  updatePackageApi,
} from '../services/api';
import type { CourierPackage } from '../types';
import type { PackageFormData } from '../schemas/packageSchema';

export function usePackages() {
  return useQuery<CourierPackage[], Error>({
    queryKey: ['packages'],
    queryFn: fetchPackages,
    staleTime: 0,
    retry: 1,
  });
}

export function usePackageById(id: string) {
  return useQuery({
    queryKey: ['packages'],
    queryFn: fetchPackages,
    select: (l: CourierPackage[]) =>
      l.find((p) => p.id === id),
  });
}

export function useCreatePackage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (d: PackageFormData) =>
      createPackage({
        customerName: d.customerName,
        destination: d.destination,
        weightKg: Number(d.weightKg),
        serviceType: d.serviceType,
      }),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ['packages'],
      });
    },
  });
}

export function useUpdatePackage(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (d: PackageFormData) =>
      updatePackageApi(id, {
        customerName: d.customerName,
        destination: d.destination,
        weightKg: Number(d.weightKg),
        serviceType: d.serviceType,
      }),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ['packages'],
      });
    },
  });
}