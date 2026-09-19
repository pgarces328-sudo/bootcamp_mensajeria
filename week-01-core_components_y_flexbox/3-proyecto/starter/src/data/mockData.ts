import type { CourierPackage } from '../types';

export const packages: CourierPackage[] = [
  {
    id: '1',
    code: 'ENV-5019',
    serviceType: 'Express',
    status: 'En tránsito',
    eta: 'Hoy 4:30 p.m.',
    weight: '2.4 kg',
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=900&auto=format&fit=crop',
    customer: {
      id: 'CUST-001',
      name: 'Tecnología Andina S.A.S.',
      address: 'Calle 100 # 15-20, Bogotá',
      phone: '+57 300 123 4567',
    },
    driver: {
      id: 'DRV-001',
      name: 'Carlos Pérez',
      vehicle: 'Van Renault Kangoo',
      rating: 4.8,
    },
    route: {
      id: 'RUT-001',
      name: 'Ruta Norte-A',
      origin: 'Centro logístico Bogotá',
      destination: 'Bogotá Norte',
      stops: 8,
    },
  },
  {
    id: '2',
    code: 'ENV-5020',
    serviceType: 'Same Day',
    status: 'Entregado',
    eta: 'Entregado 11:20 a.m.',
    weight: '1.8 kg',
    imageUrl:
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=900&auto=format&fit=crop',
    customer: {
      id: 'CUST-002',
      name: 'María Alejandra López',
      address: 'Carrera 11 # 82-71, Chicó',
      phone: '+57 310 987 6543',
    },
    driver: {
      id: 'DRV-002',
      name: 'Ana Gómez',
      vehicle: 'Moto Honda Cargo',
      rating: 4.9,
    },
    route: {
      id: 'RUT-002',
      name: 'Ruta Centro-B',
      origin: 'Hub Chapinero',
      destination: 'Chicó',
      stops: 5,
    },
  },
  {
    id: '3',
    code: 'ENV-5021',
    serviceType: 'Estándar',
    status: 'Pendiente',
    eta: 'Mañana 9:00 a.m.',
    weight: '5.1 kg',
    imageUrl:
      'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?q=80&w=900&auto=format&fit=crop',
    customer: {
      id: 'CUST-003',
      name: 'Comercializadora Global',
      address: 'Avenida Suba # 127-45, Bogotá',
      phone: '+57 315 222 3344',
    },
    driver: {
      id: 'DRV-003',
      name: 'Luis Torres',
      vehicle: 'Camioneta Chevrolet N300',
      rating: 4.6,
    },
    route: {
      id: 'RUT-003',
      name: 'Ruta Occidente',
      origin: 'Bodega principal',
      destination: 'Suba',
      stops: 12,
    },
  },
  {
    id: '4',
    code: 'ENV-5022',
    serviceType: 'Express',
    status: 'Programado',
    eta: 'Viernes 2:00 p.m.',
    weight: '3.6 kg',
    imageUrl:
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=900&auto=format&fit=crop',
    customer: {
      id: 'CUST-004',
      name: 'Juan Sebastián Moreno',
      address: 'Calle 26 # 68C-61, Bogotá',
      phone: '+57 301 555 7788',
    },
    driver: {
      id: 'DRV-004',
      name: 'Valentina Rojas',
      vehicle: 'Van Nissan Urvan',
      rating: 4.7,
    },
    route: {
      id: 'RUT-004',
      name: 'Ruta Sur-C',
      origin: 'Centro logístico Bogotá',
      destination: 'Kennedy',
      stops: 9,
    },
  },
];