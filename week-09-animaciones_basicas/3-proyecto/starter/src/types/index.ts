export type PackageStatus =
  | 'Pendiente'
  | 'En tránsito'
  | 'Entregado'
  | 'Programado'
  | 'Incidencia';

export interface CourierPackage {
  id: string;
  trackingCode: string;
  customerName: string;
  destination: string;
  status: PackageStatus;
  serviceType: string;
  weightKg: number;
  estimatedDelivery: string;
  stops: number;
  driverId: string;
  routeId: string;
  phone: string;
  email: string;
}

export interface Driver {
  id: string;
  name: string;
  vehicle: string;
  rating?: number;
  activeShipments?: number;
}

export interface CourierRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  stops?: number;
  status?: string;
}