import type { CourierPackage, DeliveryRoute, Driver } from '../types';

export const drivers: Driver[] = [
  {
    id: 'drv-001',
    name: 'Carlos Pérez',
    vehicle: 'Van Renault Kangoo',
    rating: 4.8,
    activeShipments: 8
  },
  {
    id: 'drv-002',
    name: 'Ana Gómez',
    vehicle: 'Moto Honda Cargo',
    rating: 4.9,
    activeShipments: 5
  },
  {
    id: 'drv-003',
    name: 'Luis Torres',
    vehicle: 'Camioneta Chevrolet N300',
    rating: 4.6,
    activeShipments: 12
  },
  {
    id: 'drv-004',
    name: 'Valentina Rojas',
    vehicle: 'Van Nissan Urvan',
    rating: 4.7,
    activeShipments: 9
  }
];

export const routes: DeliveryRoute[] = [
  {
    id: 'route-001',
    name: 'Ruta Norte-A',
    origin: 'Centro logístico Bogotá',
    destination: 'Bogotá Norte',
    stops: 8,
    status: 'Activa'
  },
  {
    id: 'route-002',
    name: 'Ruta Centro-B',
    origin: 'Hub Chapinero',
    destination: 'Chicó',
    stops: 5,
    status: 'Finalizada'
  },
  {
    id: 'route-003',
    name: 'Ruta Occidente',
    origin: 'Bodega principal',
    destination: 'Suba',
    stops: 12,
    status: 'Activa'
  },
  {
    id: 'route-004',
    name: 'Ruta Sur-C',
    origin: 'Centro logístico Bogotá',
    destination: 'Kennedy',
    stops: 9,
    status: 'Programada'
  }
];

export const packages: CourierPackage[] = [
  {
    id: 'pkg-001',
    trackingCode: 'ENV-5019',
    customerName: 'Tecnología Andina S.A.S.',
    destination: 'Calle 100 # 15-20, Bogotá',
    driverId: 'drv-001',
    routeId: 'route-001',
    status: 'En tránsito',
    serviceType: 'Express',
    estimatedDelivery: 'Hoy 4:30 p.m.',
    weightKg: 2.4,
    stops: 8
  },
  {
    id: 'pkg-002',
    trackingCode: 'ENV-5020',
    customerName: 'María Alejandra López',
    destination: 'Carrera 11 # 82-71, Chicó',
    driverId: 'drv-002',
    routeId: 'route-002',
    status: 'Entregado',
    serviceType: 'Mismo día',
    estimatedDelivery: 'Entregado 11:20 a.m.',
    weightKg: 1.8,
    stops: 5
  },
  {
    id: 'pkg-003',
    trackingCode: 'ENV-5021',
    customerName: 'Comercializadora Global',
    destination: 'Avenida Suba # 127-45, Bogotá',
    driverId: 'drv-003',
    routeId: 'route-003',
    status: 'Pendiente',
    serviceType: 'Estándar',
    estimatedDelivery: 'Mañana 9:00 a.m.',
    weightKg: 5.1,
    stops: 12
  },
  {
    id: 'pkg-004',
    trackingCode: 'ENV-5022',
    customerName: 'Juan Sebastián Moreno',
    destination: 'Calle 26 # 68C-61, Bogotá',
    driverId: 'drv-004',
    routeId: 'route-004',
    status: 'Programado',
    serviceType: 'Express',
    estimatedDelivery: 'Viernes 2:00 p.m.',
    weightKg: 3.6,
    stops: 9
  },
  {
    id: 'pkg-005',
    trackingCode: 'ENV-5023',
    customerName: 'Inversiones La Sabana',
    destination: 'Autopista Norte # 170-45, Bogotá',
    driverId: 'drv-001',
    routeId: 'route-001',
    status: 'En tránsito',
    serviceType: 'Estándar',
    estimatedDelivery: 'Hoy 6:15 p.m.',
    weightKg: 4.2,
    stops: 8
  },
  {
    id: 'pkg-006',
    trackingCode: 'ENV-5024',
    customerName: 'Laura Gómez',
    destination: 'Carrera 7 # 45-10, Chapinero',
    driverId: 'drv-002',
    routeId: 'route-002',
    status: 'Entregado',
    serviceType: 'Mismo día',
    estimatedDelivery: 'Entregado 10:05 a.m.',
    weightKg: 0.9,
    stops: 5
  },
  {
    id: 'pkg-007',
    trackingCode: 'ENV-5025',
    customerName: 'Distribuidora El Roble',
    destination: 'Calle 13 # 68-30, Fontibón',
    driverId: 'drv-003',
    routeId: 'route-003',
    status: 'Incidencia',
    serviceType: 'Express',
    estimatedDelivery: 'En revisión',
    weightKg: 7.3,
    stops: 12
  },
  {
    id: 'pkg-008',
    trackingCode: 'ENV-5026',
    customerName: 'Natalia Cárdenas',
    destination: 'Diagonal 40A # 14-22, Teusaquillo',
    driverId: 'drv-004',
    routeId: 'route-004',
    status: 'Pendiente',
    serviceType: 'Estándar',
    estimatedDelivery: 'Mañana 11:30 a.m.',
    weightKg: 2.1,
    stops: 9
  }
];