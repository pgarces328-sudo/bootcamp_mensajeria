import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { drivers, routes } from '../data/mockData';
import { usePackageStore } from '../store/usePackageStore';
import { COLORS, RADIUS, SPACING } from '../theme';
import type { CourierPackage, PackageStatus } from '../types';

export function ShipmentCard({ item, onPress, compact }: { item: CourierPackage; onPress: () => void; compact?: boolean }): React.JSX.Element {
  const driver = drivers.find((d) => d.id === item.driverId);
  const route = routes.find((r) => r.id === item.routeId);
  const isTracked = usePackageStore((s) => s.trackedIds.includes(item.id));
  const toggle = usePackageStore((s) => s.toggleTracked);
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.header}>
        <View style={styles.flex}><Text style={styles.code}>{item.trackingCode}</Text><Text style={styles.service}>{item.serviceType}</Text></View>
        <View style={styles.actions}><View style={[styles.badge, getB(item.status)]}><Text style={[styles.bt, getT(item.status)]}>{item.status}</Text></View><Pressable hitSlop={10} onPress={() => toggle(item.id)}><Text style={styles.star}>{isTracked ? '★' : '☆'}</Text></Pressable></View>
      </View>
      <View style={styles.body}>
        <Text style={styles.line} numberOfLines={1}><Text style={styles.label}>Cliente: </Text>{item.customerName}</Text>
        <Text style={styles.line} numberOfLines={1}><Text style={styles.label}>Destino: </Text>{item.destination}</Text>
        <Text style={styles.line} numberOfLines={1}><Text style={styles.label}>Conductor: </Text>{driver?.name ?? 'Sin asignar'}</Text>
        {!compact && <Text style={styles.line} numberOfLines={1}><Text style={styles.label}>Ruta: </Text>{route?.name ?? 'Sin ruta'}</Text>}
      </View>
      {!compact && <View style={styles.metaRow}><View style={styles.meta}><Text style={styles.metaL}>ETA</Text><Text style={styles.metaV} numberOfLines={1}>{item.estimatedDelivery}</Text></View><View style={styles.meta}><Text style={styles.metaL}>Peso</Text><Text style={styles.metaV}>{item.weightKg} kg</Text></View><View style={styles.meta}><Text style={styles.metaL}>Paradas</Text><Text style={styles.metaV}>{item.stops}</Text></View></View>}
    </Pressable>
  );
}
function getB(s: PackageStatus) { if (s === 'Entregado') return styles.bD; if (s === 'En tránsito') return styles.bT; if (s === 'Pendiente') return styles.bP; if (s === 'Incidencia') return styles.bI; return styles.bS; }
function getT(s: PackageStatus) { if (s === 'Entregado') return styles.tD; if (s === 'En tránsito') return styles.tT; if (s === 'Pendiente') return styles.tP; if (s === 'Incidencia') return styles.tI; return styles.tS; }
const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  pressed: { opacity: 0.7 }, header: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 }, flex: { flex: 1 },
  code: { fontSize: 17, fontWeight: '800', color: COLORS.text }, service: { fontSize: 12, fontWeight: '700', color: COLORS.accent },
  actions: { alignItems: 'flex-end', gap: 4 }, star: { fontSize: 24, color: '#F59E0B' },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: RADIUS.pill }, bt: { fontSize: 11, fontWeight: '800' },
  bD: { backgroundColor: COLORS.successBackground }, bT: { backgroundColor: COLORS.infoBackground }, bP: { backgroundColor: COLORS.warningBackground }, bS: { backgroundColor: COLORS.purpleBackground }, bI: { backgroundColor: COLORS.dangerBackground },
  tD: { color: COLORS.successText }, tT: { color: COLORS.infoText }, tP: { color: COLORS.warningText }, tS: { color: COLORS.purpleText }, tI: { color: COLORS.dangerText },
  body: { marginTop: 12, gap: 4 }, line: { fontSize: 14, color: COLORS.textMuted }, label: { fontWeight: '800', color: COLORS.text },
  metaRow: { flexDirection: 'row', gap: 8, marginTop: 12 }, meta: { flex: 1, backgroundColor: COLORS.surfaceMuted, borderRadius: 10, padding: 10 },
  metaL: { fontSize: 10, fontWeight: '800', color: COLORS.textMuted }, metaV: { fontSize: 12, fontWeight: '800', color: COLORS.text },
});