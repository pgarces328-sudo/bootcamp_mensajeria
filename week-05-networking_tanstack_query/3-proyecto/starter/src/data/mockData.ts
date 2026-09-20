import type { CourierPackage, Driver, CourierRoute } from '../types';

export const drivers: Driver[] = [
  { id: 'd1', name: 'Carlos Pérez', vehicle: 'Moto - ABC123', rating: 4.8, activeShipments: 3 },
  { id: 'd2', name: 'Ana Gómez', vehicle: 'Furgón - XYZ789', rating: 4.9, activeShipments: 2 },
  { id: 'd3', name: 'Luis Torres', vehicle: 'Camioneta - JKL456', rating: 4.7, activeShipments: 4 },
];

export const routes: CourierRoute[] = [
  { id: 'r1', name: 'Ruta Norte', origin: 'Bodega Norte', destination: 'Zona Norte', stops: 8, status: 'Activa' },
  { id: 'r2', name: 'Ruta Centro', origin: 'Bodega Centro', destination: 'Zona Centro', stops: 6, status: 'Activa' },
  { id: 'r3', name: 'Ruta Sur', origin: 'Bodega Sur', destination: 'Zona Sur', stops: 10, status: 'Activa' },
];

export const packages: CourierPackage[] = [
  { id: '1', trackingCode: 'ENV-5001', customerName: 'Tecnología Andina', destination: 'Calle 100 #15-20, Bogotá', status: 'En tránsito', serviceType: 'Express', weightKg: 2.4, estimatedDelivery: 'Hoy 4:30 pm', stops: 8, driverId: 'd1', routeId: 'r1', phone: '601 745 2210', email: 'a@a.com' },
  { id: '2', trackingCode: 'ENV-5002', customerName: 'María López', destination: 'Cra 15 #93-12, Bogotá', status: 'Entregado', serviceType: 'Estándar', weightKg: 1.2, estimatedDelivery: 'Ayer', stops: 5, driverId: 'd2', routeId: 'r2', phone: '310 442 8891', email: 'b@b.com' },
];