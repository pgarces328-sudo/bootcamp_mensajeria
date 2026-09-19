import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { CourierPackage, PackageStatus } from '../types';
import {
  BORDER_WIDTH,
  COLORS,
  INTERACTION,
  RADIUS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY,
} from '../theme';

interface ItemCardProps {
  item: CourierPackage;
}

export function ItemCard({ item }: ItemCardProps) {
  const statusBadgeStyle = getStatusBadgeStyle(item.status);
  const statusTextStyle = getStatusTextStyle(item.status);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed ? styles.cardPressed : null,
      ]}
      onPress={() => console.log(`Paquete seleccionado: ${item.trackingCode}`)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleBlock}>
          <Text style={styles.trackingCode}>{item.trackingCode}</Text>
          <Text style={styles.serviceType}>{item.serviceType}</Text>
        </View>

        <View style={[styles.statusBadge, statusBadgeStyle]}>
          <Text style={[styles.statusText, statusTextStyle]}>
            {item.status}
          </Text>
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
          {item.driverName}
        </Text>

        <Text style={styles.infoText} numberOfLines={1}>
          <Text style={styles.label}>Ruta: </Text>
          {item.routeName}
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
    ...SHADOWS.card,
  },

  cardPressed: {
    opacity: INTERACTION.pressedOpacity,
    transform: [{ scale: INTERACTION.pressedScale }],
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

  trackingCode: {
    fontSize: TYPOGRAPHY.cardTitle,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text,
  },

  serviceType: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.accent,
  },

  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
  },

  statusText: {
    fontSize: TYPOGRAPHY.small,
    fontWeight: TYPOGRAPHY.weightExtraBold,
  },

  badgeDelivered: {
    backgroundColor: COLORS.successBackground,
  },

  badgeInTransit: {
    backgroundColor: COLORS.infoBackground,
  },

  badgePending: {
    backgroundColor: COLORS.warningBackground,
  },

  badgeScheduled: {
    backgroundColor: COLORS.purpleBackground,
  },

  badgeIncident: {
    backgroundColor: COLORS.dangerBackground,
  },

  textDelivered: {
    color: COLORS.successText,
  },

  textInTransit: {
    color: COLORS.infoText,
  },

  textPending: {
    color: COLORS.warningText,
  },

  textScheduled: {
    color: COLORS.purpleText,
  },

  textIncident: {
    color: COLORS.dangerText,
  },

  infoBlock: {
    marginTop: SPACING.lg,
    gap: SPACING.sm,
  },

  infoText: {
    fontSize: TYPOGRAPHY.body,
    lineHeight: TYPOGRAPHY.lineHeightBody,
    color: COLORS.textMuted,
  },

  label: {
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text,
  },

  metaRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.lg,
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
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text,
  },
});