import type {
  Driver,
  CourierRoute,
} from '../types';

export const drivers: Driver[] = [
  {
    id: 'd1',
    name: 'Carlos Pérez',
    vehicle: 'Moto - ABC123',
    rating: 4.8,
    activeShipments: 3,
  },
  {
    id: 'd2',
    name: 'Ana Gómez',
    vehicle: 'Furgón - XYZ789',
    rating: 4.9,
    activeShipments: 2,
  },
  {
    id: 'd3',
    name: 'Luis Torres',
    vehicle: 'Camioneta - JKL456',
    rating: 4.7,
    activeShipments: 4,
  },
];

export const routes: CourierRoute[] = [
  {
    id: 'r1',
    name: 'Ruta Norte',
    origin: 'Bodega Norte',
    destination: 'Zona Norte',
    stops: 8,
    status: 'Activa',
  },
  {
    id: 'r2',
    name: 'Ruta Centro',
    origin: 'Bodega Centro',
    destination: 'Zona Centro',
    stops: 6,
    status: 'Activa',
  },
  {
    id: 'r3',
    name: 'Ruta Sur',
    origin: 'Bodega Sur',
    destination: 'Zona Sur',
    stops: 10,
    status: 'Activa',
  },
];