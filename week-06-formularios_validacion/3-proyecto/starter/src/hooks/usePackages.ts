import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPackage, fetchPackages, updatePackageApi } from '../services/api';
import type { CourierPackage } from '../types';
import type { PackageFormData } from '../schemas/packageSchema';

export function usePackages() {
  return useQuery<CourierPackage[], Error>({
    queryKey: ['packages'],
    queryFn: fetchPackages,
    staleTime: 0,
  });
}

export function usePackageById(id: string) {
  return useQuery({
    queryKey: ['packages'],
    queryFn: fetchPackages,
    select: (list: CourierPackage[]) => list.find((p) => p.id === id),
  });
}

export function useCreatePackage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: PackageFormData) =>
      createPackage({
        customerName: data.customerName,
        destination: data.destination,
        weightKg: Number(data.weightKg),
        serviceType: data.serviceType,
      }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['packages'] });
    },
  });
}

export function useUpdatePackage(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: PackageFormData) =>
      updatePackageApi(id, {
        customerName: data.customerName,
        destination: data.destination,
        weightKg: Number(data.weightKg),
        serviceType: data.serviceType,
      }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['packages'] });
    },
  });
}