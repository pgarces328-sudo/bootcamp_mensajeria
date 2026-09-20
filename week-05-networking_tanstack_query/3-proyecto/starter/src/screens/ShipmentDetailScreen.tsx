import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { drivers, routes } from '../data/mockData';
import { deletePackageApi, fetchPackages, updatePackageStatusApi } from '../services/api';
import { usePackageStore } from '../store/usePackageStore';
import type { ShipmentsStackParamList } from '../navigation/types';
import { COLORS, RADIUS, SPACING } from '../theme';
import type { PackageStatus } from '../types';

type Props = NativeStackScreenProps<ShipmentsStackParamList, 'ShipmentDetail'>;

const OPTIONS: PackageStatus[] = ['Pendiente', 'En tránsito', 'Entregado'];

export function ShipmentDetailScreen({ navigation, route }: Props): React.JSX.Element {
  const queryClient = useQueryClient();

  const { data: packages, isLoading, isError } = useQuery({
    queryKey: ['packages'],
    queryFn: fetchPackages,
    staleTime: 0,
  });

  const isTracked = usePackageStore((s) => s.trackedIds.includes(route.params.id));
  const toggleTracked = usePackageStore((s) => s.toggleTracked);

  const updateMutation = useMutation({
    mutationFn: (status: PackageStatus) => updatePackageStatusApi(route.params.id, status),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['packages'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePackageApi(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['packages'] });
      navigation.goBack();
    },
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  if (isError || !packages) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>No se pudo cargar el detalle</Text>
      </View>
    );
  }

  const shipment = packages.find((p) => p.id === route.params.id);

  if (!shipment) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Envío no encontrado</Text>
        <Text style={styles.mut}>Se actualizó la lista, vuelve e intenta de nuevo.</Text>
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backT}>Volver</Text>
        </Pressable>
      </View>
    );
  }

  const isTestShipment = shipment.id.length > 4;
  const driver = drivers.find((d) => d.id === shipment.driverId);
  const r = routes.find((x) => x.id === shipment.routeId);

  return (
    <ScrollView contentContainerStyle={styles.c}>
      <View style={styles.card}>
        <View style={styles.head}>
          <View style={styles.flex}>
            <Text style={styles.code}>{shipment.trackingCode}</Text>
            <Text style={styles.service}>
              {shipment.serviceType} · {shipment.status}
            </Text>
          </View>
          <Pressable hitSlop={10} onPress={() => toggleTracked(shipment.id)}>
            <Text style={styles.star}>{isTracked ? '★' : '☆'}</Text>
          </Pressable>
        </View>

        <Text style={styles.sec}>CLIENTE</Text>
        <Text style={styles.val}>{shipment.customerName}</Text>
        <Text style={styles.mut}>{shipment.destination}</Text>

        <Text style={styles.sec}>CAMBIAR ESTADO (SERVIDOR)</Text>
        <View style={styles.row}>
          {OPTIONS.map((o) => (
            <Pressable
              key={o}
              disabled={updateMutation.isPending}
              onPress={() => updateMutation.mutate(o)}
              style={[styles.chip, shipment.status === o && styles.chipA]}
            >
              <Text style={[styles.chipT, shipment.status === o && styles.chipTA]}>{o}</Text>
            </Pressable>
          ))}
        </View>
        {updateMutation.isPending ? <Text style={styles.mut}>Actualizando en servidor...</Text> : null}

        <Text style={styles.sec}>CONDUCTOR</Text>
        <Text style={styles.val}>{driver?.name ?? 'Sin asignar'}</Text>
        <Text style={styles.mut}>{driver?.vehicle ?? ''}</Text>

        <Text style={styles.sec}>RUTA</Text>
        <Text style={styles.val}>{r?.name ?? 'Sin ruta'}</Text>
        <Text style={styles.mut}>
          {r?.origin} → {r?.destination}
        </Text>

        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <Text style={styles.backT}>← Volver a envíos</Text>
        </Pressable>

        {isTestShipment ? (
          <Pressable
            disabled={deleteMutation.isPending}
            onPress={() => deleteMutation.mutate(shipment.id)}
            style={[styles.deleteBtn, deleteMutation.isPending && styles.disabled]}
          >
            <Text style={styles.deleteText}>
              {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar envío de prueba'}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  c: { padding: SPACING.lg, backgroundColor: COLORS.background },
  center: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', gap: 8, padding: 24 },
  error: { color: COLORS.dangerText, fontWeight: '800' },
  card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  head: { flexDirection: 'row', gap: 12 },
  flex: { flex: 1 },
  code: { fontSize: 24, fontWeight: '800', color: COLORS.text },
  service: { color: COLORS.accent, fontWeight: '700', marginTop: 4 },
  star: { fontSize: 30, color: '#F59E0B' },
  sec: { marginTop: 20, fontSize: 11, fontWeight: '800', color: COLORS.textMuted },
  val: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginTop: 4 },
  mut: { fontSize: 14, color: COLORS.textMuted, marginTop: 2 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: COLORS.surfaceMuted, borderWidth: 1, borderColor: COLORS.border },
  chipA: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipT: { fontSize: 12, fontWeight: '700', color: COLORS.textMuted },
  chipTA: { color: COLORS.white },
  back: { marginTop: 20, backgroundColor: COLORS.accent, borderRadius: 10, padding: 12, alignItems: 'center' },
  backT: { color: COLORS.white, fontWeight: '800' },
  deleteBtn: { marginTop: 12, backgroundColor: COLORS.dangerBackground, borderRadius: 10, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: COLORS.dangerText },
  disabled: { opacity: 0.5 },
  deleteText: { color: COLORS.dangerText, fontWeight: '800' },
});