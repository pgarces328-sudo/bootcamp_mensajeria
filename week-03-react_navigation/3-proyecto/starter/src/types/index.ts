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
  driverId: string;
  routeId: string;
  status: PackageStatus;
  serviceType: ServiceType;
  estimatedDelivery: string;
  weightKg: number;
  stops: number;
}

export interface Driver {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  activeShipments: number;
}

export interface DeliveryRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  stops: number;
  status: 'Activa' | 'Programada' | 'Finalizada';
}