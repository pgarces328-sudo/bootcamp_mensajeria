import { Pressable, StyleSheet, Text, View } from 'react-native';

import { drivers, routes } from '../data/mockData';
import {
  BORDER_WIDTH,
  COLORS,
  INTERACTION,
  RADIUS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY
} from '../theme';
import type { CourierPackage, PackageStatus } from '../types';

interface ShipmentCardProps {
  item: CourierPackage;
  onPress: () => void;
}

export function ShipmentCard({ item, onPress }: ShipmentCardProps) {
  const driver = drivers.find((driverItem) => driverItem.id === item.driverId);
  const route = routes.find((routeItem) => routeItem.id === item.routeId);

  const badgeStyle = getStatusBadgeStyle(item.status);
  const textStyle = getStatusTextStyle(item.status);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed ? styles.cardPressed : null
      ]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.code}>{item.trackingCode}</Text>
          <Text style={styles.service}>{item.serviceType}</Text>
        </View>

        <View style={[styles.badge, badgeStyle]}>
          <Text style={[styles.badgeText, textStyle]}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.infoBlock}>
        <Text style={styles.infoText} numberOfLines={1}>
          <Text style={styles.label}>Cliente: </Text>
          {item.customerName}
        </Text>

        <Text style={styles.infoText} numberOfLines={2}>
          <Text style={styles.label}>Destino: </Text>
          {item.destination}
        </Text>

        <Text style={styles.infoText} numberOfLines={1}>
          <Text style={styles.label}>Conductor: </Text>
          {driver?.name ?? 'Sin asignar'}
        </Text>

        <Text style={styles.infoText} numberOfLines={1}>
          <Text style={styles.label}>Ruta: </Text>
          {route?.name ?? 'Sin ruta'}
        </Text>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>ETA</Text>
          <Text style={styles.metaValue} numberOfLines={1}>
            {item.estimatedDelivery}
          </Text>
        </View>

        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Peso</Text>
          <Text style={styles.metaValue}>{item.weightKg} kg</Text>
        </View>
      </View>
    </Pressable>
  );
}

function getStatusBadgeStyle(status: PackageStatus) {
  if (status === 'Entregado') {
    return styles.badgeDelivered;
  }

  if (status === 'En tránsito') {
    return styles.badgeInTransit;
  }

  if (status === 'Pendiente') {
    return styles.badgePending;
  }

  if (status === 'Incidencia') {
    return styles.badgeIncident;
  }

  return styles.badgeScheduled;
}

function getStatusTextStyle(status: PackageStatus) {
  if (status === 'Entregado') {
    return styles.textDelivered;
  }

  if (status === 'En tránsito') {
    return styles.textInTransit;
  }

  if (status === 'Pendiente') {
    return styles.textPending;
  }

  if (status === 'Incidencia') {
    return styles.textIncident;
  }

  return styles.textScheduled;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: BORDER_WIDTH.thin,
    borderColor: COLORS.border,
    ...SHADOWS.card
  },

  cardPressed: {
    opacity: INTERACTION.pressedOpacity,
    transform: [{ scale: INTERACTION.pressedScale }]
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: SPACING.md
  },

  titleBlock: {
    flex: 1
  },

  code: {
    fontSize: TYPOGRAPHY.cardTitle,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text
  },

  service: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.accent
  },

  badge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill
  },

  badgeText: {
    fontSize: TYPOGRAPHY.small,
    fontWeight: TYPOGRAPHY.weightExtraBold
  },

  badgeDelivered: {
    backgroundColor: COLORS.successBackground
  },

  badgeInTransit: {
    backgroundColor: COLORS.infoBackground
  },

  badgePending: {
    backgroundColor: COLORS.warningBackground
  },

  badgeScheduled: {
    backgroundColor: COLORS.purpleBackground
  },

  badgeIncident: {
    backgroundColor: COLORS.dangerBackground
  },

  textDelivered: {
    color: COLORS.successText
  },

  textInTransit: {
    color: COLORS.infoText
  },

  textPending: {
    color: COLORS.warningText
  },

  textScheduled: {
    color: COLORS.purpleText
  },

  textIncident: {
    color: COLORS.dangerText
  },

  infoBlock: {
    marginTop: SPACING.lg,
    gap: SPACING.sm
  },

  infoText: {
    fontSize: TYPOGRAPHY.body,
    lineHeight: TYPOGRAPHY.lineHeightBody,
    color: COLORS.textMuted
  },

  label: {
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text
  },

  metaRow: {
    marginTop: SPACING.lg,
    flexDirection: 'row',
    gap: SPACING.md
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
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text
  }
});