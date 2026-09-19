export type PackageStatus =
  | 'Pendiente'
  | 'En tránsito'
  | 'Entregado'
  | 'Programado'
  | 'Incidencia';

export type ServiceType = 'Express' | 'Estándar' | 'Mismo día' | 'Internacional';

export interface CourierPackage {
  id: string;
  trackingCode: string;
  customerName: string;
  destination: string;
  driverName: string;
  routeName: string;
  status: PackageStatus;
  serviceType: ServiceType;
  estimatedDelivery: string;
  weightKg: number;
}