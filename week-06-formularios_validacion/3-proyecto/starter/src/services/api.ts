import axios from 'axios';
import type { CourierPackage, PackageStatus } from '../types';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
});

api.interceptors.request.use((c) => c);
api.interceptors.response.use((r) => r, (e: unknown) => Promise.reject(e));

interface JsonUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: { street: string; suite: string; city: string; zipcode: string };
}

const STATUSES: PackageStatus[] = ['Pendiente', 'En tránsito', 'Entregado', 'Programado'];
const SERVICES: string[] = ['Express', 'Estándar', 'Mismo día'];

const localCreated: CourierPackage[] = [];
const statusOverrides = new Map<string, PackageStatus>();
const deletedIds = new Set<string>();

// 10 iguales que la semana 5, para que se vea igual
const FALLBACK: CourierPackage[] = [
  { id: '1', trackingCode: 'ENV-5001', customerName: 'Tecnología Andina', destination: 'Calle 100 #15-20, Bogotá', status: 'En tránsito', serviceType: 'Express', weightKg: 2.4, estimatedDelivery: 'Hoy 4:30 pm', stops: 8, driverId: 'd1', routeId: 'r1', phone: '601 745 2210', email: 'a@a.com' },
  { id: '2', trackingCode: 'ENV-5002', customerName: 'María López', destination: 'Cra 15 #93-12, Bogotá', status: 'Entregado', serviceType: 'Estándar', weightKg: 1.2, estimatedDelivery: 'Ayer 11:00 am', stops: 5, driverId: 'd2', routeId: 'r2', phone: '310 442 8891', email: 'b@b.com' },
  { id: '3', trackingCode: 'ENV-5003', customerName: 'Comercializadora Global', destination: 'Av Suba #116-20, Bogotá', status: 'Pendiente', serviceType: 'Express', weightKg: 5, estimatedDelivery: 'Mañana 9:00 am', stops: 12, driverId: 'd1', routeId: 'r1', phone: '601 388 4402', email: 'c@c.com' },
  { id: '4', trackingCode: 'ENV-5004', customerName: 'Juan Ríos', destination: 'Calle 26 #68-40, Bogotá', status: 'En tránsito', serviceType: 'Estándar', weightKg: 0.8, estimatedDelivery: 'Hoy 6:00 pm', stops: 6, driverId: 'd3', routeId: 'r3', phone: '320 776 1104', email: 'd@d.com' },
  { id: '5', trackingCode: 'ENV-5005', customerName: 'Farmacia Central', destination: 'Cra 7 #45-10, Bogotá', status: 'Pendiente', serviceType: 'Express', weightKg: 3.1, estimatedDelivery: 'Hoy 5:00 pm', stops: 4, driverId: 'd2', routeId: 'r2', phone: '601 330 5567', email: 'e@e.com' },
  { id: '6', trackingCode: 'ENV-5006', customerName: 'Librería Nacional', destination: 'Calle 85 #12-30, Bogotá', status: 'Programado', serviceType: 'Estándar', weightKg: 4.5, estimatedDelivery: 'Mañana 2:00 pm', stops: 7, driverId: 'd3', routeId: 'r3', phone: '601 902 4418', email: 'f@f.com' },
  { id: '7', trackingCode: 'ENV-5007', customerName: 'Paula Ríos', destination: 'Av 68 #24-05, Bogotá', status: 'Entregado', serviceType: 'Express', weightKg: 0.9, estimatedDelivery: 'Hoy 11:42 am', stops: 3, driverId: 'd1', routeId: 'r2', phone: '300 123 4567', email: 'g@g.com' },
  { id: '8', trackingCode: 'ENV-5008', customerName: 'Julián Prada', destination: 'Km 4 vía La Calera', status: 'Programado', serviceType: 'Estándar', weightKg: 6.2, estimatedDelivery: 'Lunes 8:00 am', stops: 10, driverId: 'd2', routeId: 'r1', phone: '300 765 4321', email: 'h@h.com' },
  { id: '9', trackingCode: 'ENV-5009', customerName: 'Papelería Escolar', destination: 'Calle 13 #42-70, Bogotá', status: 'Pendiente', serviceType: 'Express', weightKg: 9.5, estimatedDelivery: 'Mañana 10:00 am', stops: 6, driverId: 'd2', routeId: 'r2', phone: '601 411 9982', email: 'i@i.com' },
  { id: '10', trackingCode: 'ENV-5010', customerName: 'Muebles Diseño', destination: 'Calle 170 #8-32, Bogotá', status: 'En tránsito', serviceType: 'Estándar', weightKg: 4.2, estimatedDelivery: 'Hoy 7:00 pm', stops: 9, driverId: 'd1', routeId: 'r1', phone: '601 677 3390', email: 'j@j.com' },
];

function mapUser(u: JsonUser): CourierPackage {
  return {
    id: String(u.id),
    trackingCode: `ENV-${5000 + u.id}`,
    customerName: u.name,
    destination: `${u.address.street} ${u.address.suite}, ${u.address.city}`,
    status: STATUSES[u.id % STATUSES.length],
    serviceType: SERVICES[u.id % SERVICES.length],
    weightKg: Math.round((0.5 + ((u.id * 0.7) % 10)) * 10) / 10,
    estimatedDelivery: u.id % 2 === 0 ? 'Hoy 4:30 pm' : 'Mañana 9:00 am',
    stops: 3 + (u.id % 10),
    driverId: `d${(u.id % 3) + 1}`,
    routeId: `r${(u.id % 3) + 1}`,
    phone: u.phone,
    email: u.email,
  };
}

export async function fetchPackages(): Promise<CourierPackage[]> {
  console.log('[api] inicio fetch');
  try {
    const res = await api.get<JsonUser[]>('/users');
    console.log('[api] red OK', res.data.length);
    const server = res.data.map(mapUser).filter((p) => !deletedIds.has(p.id));
    const withStatus = server.map((p) => {
      const o = statusOverrides.get(p.id);
      return o ? { ...p, status: o } : p;
    });
    return [...localCreated, ...withStatus];
  } catch (e) {
    console.log('[api] red FALLO, uso fallback', e);
    return [...localCreated, ...FALLBACK];
  }
}

export async function createPackage(input: { customerName: string; destination: string; weightKg?: number; serviceType?: string }): Promise<CourierPackage> {
  try { await api.post('/users', { name: input.customerName }); } catch (e) { console.log(e); }
  const created: CourierPackage = {
    id: Date.now().toString(),
    trackingCode: `ENV-${5100 + Math.floor(Math.random() * 800)}`,
    customerName: input.customerName,
    destination: input.destination,
    status: 'Pendiente',
    serviceType: input.serviceType ?? 'Estándar',
    weightKg: input.weightKg ?? 1.5,
    estimatedDelivery: 'Hoy 6:00 pm',
    stops: 5,
    driverId: 'd1',
    routeId: 'r1',
    phone: '300 000 0000',
    email: 'nuevo@courier.com',
  };
  localCreated.unshift(created);
  return created;
}

export async function updatePackageApi(id: string, data: { customerName: string; destination: string; weightKg: number; serviceType: string }): Promise<void> {
  try { await api.patch(`/users/${id}`, { id }); } catch (e) { console.log(e); }
  const local = localCreated.find((p) => p.id === id);
  if (local) {
    local.customerName = data.customerName;
    local.destination = data.destination;
    local.weightKg = data.weightKg;
    local.serviceType = data.serviceType;
  }
  const fb = FALLBACK.find((p) => p.id === id);
  if (fb) {
    fb.customerName = data.customerName;
    fb.destination = data.destination;
    fb.weightKg = data.weightKg;
    fb.serviceType = data.serviceType;
  }
}

export async function updatePackageStatusApi(id: string, status: PackageStatus): Promise<void> {
  try { await api.patch(`/users/${id}`, { id }); } catch (e) { console.log(e); }
  const local = localCreated.find((p) => p.id === id);
  if (local) local.status = status;
  else statusOverrides.set(id, status);
}

export async function deletePackageApi(id: string): Promise<void> {
  try { await api.delete(`/users/${id}`); } catch (e) { console.log(e); }
  const idx = localCreated.findIndex((p) => p.id === id);
  if (idx >= 0) localCreated.splice(idx, 1);
  else deletedIds.add(id);
}