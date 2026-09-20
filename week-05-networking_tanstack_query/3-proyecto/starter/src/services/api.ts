import axios from 'axios';
import type { CourierPackage, PackageStatus } from '../types';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    return Promise.reject(error);
  }
);

interface JsonPlaceholderUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const STATUSES: PackageStatus[] = ['Pendiente', 'En tránsito', 'Entregado', 'Programado'];
const SERVICES: string[] = ['Express', 'Estándar', 'Mismo día'];

// Memoria local porque JSONPlaceholder no guarda de verdad
const localCreated: CourierPackage[] = [];
const statusOverrides = new Map<string, PackageStatus>();
const deletedIds = new Set<string>();

function mapUserToPackage(user: JsonPlaceholderUser): CourierPackage {
  const status: PackageStatus = STATUSES[user.id % STATUSES.length];
  const serviceType: string = SERVICES[user.id % SERVICES.length];
  return {
    id: String(user.id),
    trackingCode: `ENV-${5000 + user.id}`,
    customerName: user.name,
    destination: `${user.address.street} ${user.address.suite}, ${user.address.city}`,
    status: status,
    serviceType: serviceType,
    weightKg: Math.round((0.5 + ((user.id * 0.7) % 10)) * 10) / 10,
    estimatedDelivery: user.id % 2 === 0 ? 'Hoy 4:30 pm' : 'Mañana 9:00 am',
    stops: 3 + (user.id % 10),
    driverId: `d${(user.id % 3) + 1}`,
    routeId: `r${(user.id % 3) + 1}`,
    phone: user.phone,
    email: user.email,
  };
}

export async function fetchPackages(): Promise<CourierPackage[]> {
  const response = await api.get<JsonPlaceholderUser[]>('/users');
  const server = response.data.map(mapUserToPackage);
  const filtered = server.filter((p) => !deletedIds.has(p.id));
  const withStatus = filtered.map((p) => {
    const override = statusOverrides.get(p.id);
    if (override) return { ...p, status: override };
    return p;
  });
  return [...localCreated, ...withStatus];
}

export async function createPackage(input: {
  customerName: string;
  destination: string;
}): Promise<CourierPackage> {
  console.log('POST crear envio:', input.customerName);
  try {
    await api.post('/users', {
      name: input.customerName,
      address: { street: input.destination, suite: '', city: 'Bogotá' },
    });
  } catch (e) {
    console.log('POST fallo, igual creo local:', e);
  }
  const uniqueId = Date.now().toString();
  const created: CourierPackage = {
    id: uniqueId,
    trackingCode: `ENV-${5100 + Math.floor(Math.random() * 800)}`,
    customerName: input.customerName,
    destination: input.destination,
    status: 'Pendiente',
    serviceType: 'Estándar',
    weightKg: 1.5,
    estimatedDelivery: 'Hoy 6:00 pm',
    stops: 5,
    driverId: 'd1',
    routeId: 'r1',
    phone: '300 000 0000',
    email: 'nuevo@courier.com',
  };
  // Solo se agrega aquí UNA vez. En pantalla ya NO hacemos setQueryData
  // para no duplicar. El refetch lo trae desde aquí.
  if (!localCreated.some((p) => p.id === uniqueId)) {
    localCreated.unshift(created);
  }
  return created;
}

export async function updatePackageStatusApi(
  id: string,
  status: PackageStatus
): Promise<void> {
  try {
    await api.patch(`/users/${id}`, { id: id });
  } catch (e) {
    console.log('PATCH fallo, igual guardo local:', e);
  }
  const local = localCreated.find((p) => p.id === id);
  if (local) {
    local.status = status;
  } else {
    statusOverrides.set(id, status);
  }
}

export async function deletePackageApi(id: string): Promise<void> {
  try {
    await api.delete(`/users/${id}`);
  } catch (e) {
    console.log('DELETE fallo, igual borro local:', e);
  }
  const idx = localCreated.findIndex((p) => p.id === id);
  if (idx >= 0) {
    localCreated.splice(idx, 1);
  } else {
    deletedIds.add(id);
  }
  statusOverrides.delete(id);
}