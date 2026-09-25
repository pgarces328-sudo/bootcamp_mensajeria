import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { drivers, routes } from '../data/mockData';
import { usePackageStore } from '../store/usePackageStore';
import { COLORS, RADIUS, SPACING } from '../theme';
import type { CourierPackage, PackageStatus } from '../types';

interface Props {
  item: CourierPackage;
  onPress: () => void;
}

export function ShipmentCard({ item, onPress }: Props): React.JSX.Element {
  const driver = drivers.find((d) => d.id === item.driverId);
  const route = routes.find((r) => r.id === item.routeId);
  const isTracked = usePackageStore((s) => s.trackedIds.includes(item.id));
  const toggleTracked = usePackageStore((s) => s.toggleTracked);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.code}>{item.trackingCode}</Text>
          <Text style={styles.service}>{item.serviceType}</Text>
        </View>
        <View style={styles.actions}>
          <View style={[styles.badge, getBadge(item.status)]}>
            <Text style={[styles.badgeText, getText(item.status)]}>{item.status}</Text>
          </View>
          <Pressable hitSlop={10} onPress={() => toggleTracked(item.id)}>
            <Text style={styles.star}>{isTracked ? '★' : '☆'}</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.line} numberOfLines={1}>
          <Text style={styles.label}>Cliente: </Text>
          {item.customerName}
        </Text>
        <Text style={styles.line} numberOfLines={1}>
          <Text style={styles.label}>Destino: </Text>
          {item.destination}
        </Text>
        <Text style={styles.line} numberOfLines={1}>
          <Text style={styles.label}>Conductor: </Text>
          {driver?.name ?? 'Sin asignar'}
        </Text>
        <Text style={styles.line} numberOfLines={1}>
          <Text style={styles.label}>Ruta: </Text>
          {route?.name ?? 'Sin ruta'}
        </Text>
      </View>
      <View style={styles.metaRow}>
        <View style={styles.meta}>
          <Text style={styles.metaL}>ETA</Text>
          <Text style={styles.metaV} numberOfLines={1}>{item.estimatedDelivery}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.metaL}>Peso</Text>
          <Text style={styles.metaV}>{item.weightKg} kg</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.metaL}>Paradas</Text>
          <Text style={styles.metaV}>{item.stops}</Text>
        </View>
      </View>
    </Pressable>
  );
}

function getBadge(s: PackageStatus) {
  if (s === 'Entregado') return styles.bDelivered;
  if (s === 'En tránsito') return styles.bTransit;
  if (s === 'Pendiente') return styles.bPending;
  if (s === 'Incidencia') return styles.bIncident;
  return styles.bScheduled;
}

function getText(s: PackageStatus) {
  if (s === 'Entregado') return styles.tDelivered;
  if (s === 'En tránsito') return styles.tTransit;
  if (s === 'Pendiente') return styles.tPending;
  if (s === 'Incidencia') return styles.tIncident;
  return styles.tScheduled;
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  pressed: { opacity: 0.7 },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: SPACING.md },
  titleBlock: { flex: 1 },
  code: { fontSize: 17, fontWeight: '800', color: COLORS.text },
  service: { fontSize: 12, fontWeight: '700', color: COLORS.accent, marginTop: 2 },
  actions: { alignItems: 'flex-end', gap: 4 },
  star: { fontSize: 24, color: '#F59E0B' },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: RADIUS.pill },
  badgeText: { fontSize: 11, fontWeight: '800' },
  bDelivered: { backgroundColor: COLORS.successBackground },
  bTransit: { backgroundColor: COLORS.infoBackground },
  bPending: { backgroundColor: COLORS.warningBackground },
  bScheduled: { backgroundColor: COLORS.purpleBackground },
  bIncident: { backgroundColor: COLORS.dangerBackground },
  tDelivered: { color: COLORS.successText },
  tTransit: { color: COLORS.infoText },
  tPending: { color: COLORS.warningText },
  tScheduled: { color: COLORS.purpleText },
  tIncident: { color: COLORS.dangerText },
  body: { marginTop: 12, gap: 4 },
  line: { fontSize: 14, color: COLORS.textMuted },
  label: { fontWeight: '800', color: COLORS.text },
  metaRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  meta: { flex: 1, backgroundColor: COLORS.surfaceMuted, borderRadius: 10, padding: 10 },
  metaL: { fontSize: 10, fontWeight: '800', color: COLORS.textMuted },
  metaV: { fontSize: 12, fontWeight: '800', color: COLORS.text, marginTop: 2 },
});