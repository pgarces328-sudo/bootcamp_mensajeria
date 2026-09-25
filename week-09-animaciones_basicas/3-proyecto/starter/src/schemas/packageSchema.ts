import { z } from 'zod';

export const packageSchema = z.object({
  customerName: z
    .string()
    .min(3, 'Mínimo 3 caracteres'),
  destination: z
    .string()
    .min(10, 'Mínimo 10 caracteres'),
  weightKg: z
    .string()
    .min(1, 'Requerido')
    .refine(
      (v) => !isNaN(Number(v)) && Number(v) > 0,
      {
        message: 'Debe ser mayor a 0',
      }
    ),
  serviceType: z
    .string()
    .min(1, 'Requerido'),
});

export type PackageFormData = z.infer<
  typeof packageSchema
>;