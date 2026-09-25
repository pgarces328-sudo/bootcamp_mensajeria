import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { drivers, routes } from '../data/mockData';
import { usePackageById } from '../hooks/usePackages';
import { usePackageStore } from '../store/usePackageStore';
import type { ShipmentsStackParamList } from '../navigation/types';
import { COLORS, RADIUS, SPACING } from '../theme';

type Props = NativeStackScreenProps<ShipmentsStackParamList, 'ShipmentDetail'>;

export function ShipmentDetailScreen({ navigation, route }: Props): React.JSX.Element {
  const { data: shipment, isLoading } = usePackageById(route.params.id);
  const isTracked = usePackageStore((s) => s.trackedIds.includes(route.params.id));
  const toggleTracked = usePackageStore((s) => s.toggleTracked);

  if (isLoading || !shipment) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.mut}>Cargando detalle...</Text>
      </View>
    );
  }

  const driver = drivers.find((d) => d.id === shipment.driverId);
  const r = routes.find((x) => x.id === shipment.routeId);

  return (
    <ScrollView contentContainerStyle={styles.c}>
      <View style={styles.card}>
        <View style={styles.head}>
          <View style={styles.flex}>
            <Text style={styles.code}>{shipment.trackingCode}</Text>
            <Text style={styles.service}>{shipment.serviceType} · {shipment.status}</Text>
          </View>
          <Pressable hitSlop={10} onPress={() => toggleTracked(shipment.id)}>
            <Text style={styles.star}>{isTracked ? '★' : '☆'}</Text>
          </Pressable>
        </View>

        <Text style={styles.sec}>CLIENTE</Text>
        <Text style={styles.val}>{shipment.customerName}</Text>
        <Text style={styles.mut}>Se actualizó la lista. Regrese a la pantalla anterior e inténtelo nuevamente.</Text>

        <Text style={styles.sec}>CONDUCTOR</Text>
        <Text style={styles.val}>{driver?.name ?? 'Sin asignar'}</Text>

        <Text style={styles.sec}>RUTA</Text>
        <Text style={styles.val}>{r?.name ?? 'Sin ruta'}</Text>

        <Pressable
          onPress={() => navigation.navigate('EditShipment', { id: shipment.id })}
          style={({ pressed }) => [styles.editBtn, pressed && styles.pressed]}
        >
          <Text style={styles.editText}>Editar envío</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backT}>← Volver</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  c: { padding: SPACING.lg, backgroundColor: COLORS.background },
  center: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', gap: 8 },
  mut: { color: COLORS.textMuted },
  card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  head: { flexDirection: 'row', gap: 12 },
  flex: { flex: 1 },
  code: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  service: { color: COLORS.accent, fontWeight: '700', marginTop: 4 },
  star: { fontSize: 30, color: '#F59E0B' },
  sec: { marginTop: 20, fontSize: 11, fontWeight: '800', color: COLORS.textMuted },
  val: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginTop: 4 },
  editBtn: { marginTop: 20, backgroundColor: COLORS.surfaceMuted, borderRadius: 10, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: COLORS.accent },
  pressed: { opacity: 0.7 },
  editText: { color: COLORS.accent, fontWeight: '800' },
  back: { marginTop: 12, backgroundColor: COLORS.accent, borderRadius: 10, padding: 12, alignItems: 'center' },
  backT: { color: '#fff', fontWeight: '800' },
});