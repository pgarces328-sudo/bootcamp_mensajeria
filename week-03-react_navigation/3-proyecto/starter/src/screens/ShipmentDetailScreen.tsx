import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { drivers, packages, routes } from '../data/mockData';
import type { ShipmentsStackParamList } from '../navigation/types';
import {
  BORDER_WIDTH,
  COLORS,
  RADIUS,
  SPACING,
  TYPOGRAPHY
} from '../theme';

type Props = NativeStackScreenProps<ShipmentsStackParamList, 'ShipmentDetail'>;

export function ShipmentDetailScreen({ navigation, route }: Props) {
  const shipment = packages.find((item) => item.id === route.params.id);

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
        <Text style={styles.code}>{shipment.trackingCode}</Text>
        <Text style={styles.service}>{shipment.serviceType}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cliente</Text>
          <Text style={styles.value}>{shipment.customerName}</Text>
          <Text style={styles.muted}>{shipment.destination}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estado del envío</Text>
          <Text style={styles.value}>{shipment.status}</Text>
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
            pressed ? styles.backButtonPressed : null
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
    backgroundColor: COLORS.background
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: BORDER_WIDTH.thin,
    borderColor: COLORS.border
  },

  code: {
    fontSize: 26,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text
  },

  service: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.accent
  },

  section: {
    marginTop: SPACING.xl
  },

  sectionTitle: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.textMuted,
    textTransform: 'uppercase'
  },

  value: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.bodyLarge,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.text
  },

  muted: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textMuted,
    lineHeight: TYPOGRAPHY.lineHeightBody
  },

  metaRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xl
  },

  metaBox: {
    flex: 1,
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: RADIUS.md,
    padding: SPACING.md
  },

  metaLabel: {
    fontSize: TYPOGRAPHY.small,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.textMuted,
    textTransform: 'uppercase'
  },

  metaValue: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.bodyLarge,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text
  },

  backButton: {
    marginTop: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center'
  },

  backButtonPressed: {
    opacity: 0.85
  },

  backButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.weightExtraBold
  },

  notFoundContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl
  },

  notFoundTitle: {
    fontSize: TYPOGRAPHY.sectionTitle,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text
  }
});