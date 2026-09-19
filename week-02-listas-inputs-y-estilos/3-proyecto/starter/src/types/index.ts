export type PackageStatus =
  | 'Pendiente'
  | 'En tránsito'
  | 'Entregado'
  | 'Programado';

export type FilterStatus = 'Todos' | PackageStatus;

export type ServiceType = 'Express' | 'Estándar' | 'Same Day';

export interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface Driver {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
}

export interface DeliveryRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  stops: number;
}

export interface CourierPackage {
  id: string;
  code: string;
  serviceType: ServiceType;
  status: PackageStatus;
  eta: string;
  weight: string;
  imageUrl: string;
  customer: Customer;
  driver: Driver;
  route: DeliveryRoute;
}