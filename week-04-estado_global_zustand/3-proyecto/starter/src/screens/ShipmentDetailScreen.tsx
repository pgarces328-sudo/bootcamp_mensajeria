import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { drivers, routes } from '../data/mockData';
import type { ShipmentsStackParamList } from '../navigation/types';
import { usePackageStore } from '../store/usePackageStore';
import {
  BORDER_WIDTH,
  COLORS,
  INTERACTION,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '../theme';
import type { PackageStatus } from '../types';

type Props = NativeStackScreenProps<ShipmentsStackParamList, 'ShipmentDetail'>;

const STATUS_OPTIONS: PackageStatus[] = [
  'Pendiente',
  'En tránsito',
  'Entregado',
];

export function ShipmentDetailScreen({ navigation, route }: Props) {
  const shipment = usePackageStore((state) =>
    state.packages.find((item) => item.id === route.params.id)
  );
  const isTracked = usePackageStore((state) =>
    state.trackedIds.includes(route.params.id)
  );
  const toggleTracked = usePackageStore((state) => state.toggleTracked);
  const updateStatus = usePackageStore((state) => state.updateStatus);

  if (!shipment) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundTitle}>Envío no encontrado</Text>

        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Volver</Text>
        </Pressable>
      </View>
    );
  }

  const driver = drivers.find((item) => item.id === shipment.driverId);
  const routeInfo = routes.find((item) => item.id === shipment.routeId);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.titleBlock}>
            <Text style={styles.code}>{shipment.trackingCode}</Text>
            <Text style={styles.service}>{shipment.serviceType}</Text>
          </View>

          <Pressable
            hitSlop={10}
            onPress={() => toggleTracked(shipment.id)}
            style={({ pressed }) => [
              styles.trackButton,
              pressed ? styles.trackButtonPressed : null,
            ]}
          >
            <Text style={styles.trackIcon}>{isTracked ? '★' : '☆'}</Text>
            <Text style={styles.trackLabel}>
              {isTracked ? 'En seguimiento' : 'Seguir envío'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cliente</Text>
          <Text style={styles.value}>{shipment.customerName}</Text>
          <Text style={styles.muted}>{shipment.destination}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estado del envío</Text>
          <Text style={styles.value}>{shipment.status}</Text>

          <View style={styles.statusRow}>
            {STATUS_OPTIONS.map((option) => {
              const active = shipment.status === option;
              return (
                <Pressable
                  key={option}
                  onPress={() => updateStatus(shipment.id, option)}
                  style={[styles.statusChip, active && styles.statusChipActive]}
                >
                  <Text
                    style={[
                      styles.statusChipText,
                      active && styles.statusChipTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.muted}>ETA: {shipment.estimatedDelivery}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conductor</Text>
          <Text style={styles.value}>{driver?.name ?? 'Sin asignar'}</Text>
          <Text style={styles.muted}>{driver?.vehicle ?? 'Sin vehículo'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ruta</Text>
          <Text style={styles.value}>{routeInfo?.name ?? 'Sin ruta'}</Text>
          <Text style={styles.muted}>
            {routeInfo?.origin ?? 'Origen no disponible'} →{' '}
            {routeInfo?.destination ?? 'Destino no disponible'}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>Peso</Text>
            <Text style={styles.metaValue}>{shipment.weightKg} kg</Text>
          </View>

          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>Paradas</Text>
            <Text style={styles.metaValue}>{shipment.stops}</Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed ? styles.backButtonPressed : null,
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver a envíos</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
    backgroundColor: COLORS.background,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: BORDER_WIDTH.thin,
    borderColor: COLORS.border,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: SPACING.md,
  },

  titleBlock: {
    flex: 1,
  },

  code: {
    fontSize: 26,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text,
  },

  service: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.accent,
  },

  trackButton: {
    alignItems: 'center',
  },

  trackButtonPressed: {
    opacity: INTERACTION.pressedOpacity,
  },

  trackIcon: {
    fontSize: 30,
    color: '#F59E0B',
  },

  trackLabel: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.small,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.textMuted,
  },

  section: {
    marginTop: SPACING.xl,
  },

  sectionTitle: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },

  value: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.bodyLarge,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.text,
  },

  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
  },

  statusChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceMuted,
    borderWidth: BORDER_WIDTH.thin,
    borderColor: COLORS.border,
  },

  statusChipActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },

  statusChipText: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.textMuted,
  },

  statusChipTextActive: {
    color: COLORS.white,
  },

  muted: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textMuted,
    lineHeight: TYPOGRAPHY.lineHeightBody,
  },

  metaRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xl,
  },

  metaBox: {
    flex: 1,
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
  },

  metaLabel: {
    fontSize: TYPOGRAPHY.small,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
  },

  metaValue: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.bodyLarge,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text,
  },

  backButton: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },

  backButtonPressed: {
    opacity: INTERACTION.pressedOpacity,
  },

  backButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.weightExtraBold,
  },

  notFoundContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },

  notFoundTitle: {
    fontSize: TYPOGRAPHY.sectionTitle,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text,
  },
});