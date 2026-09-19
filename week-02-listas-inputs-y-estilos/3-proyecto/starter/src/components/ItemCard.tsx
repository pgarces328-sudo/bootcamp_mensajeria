import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { CourierPackage, PackageStatus } from '../types';

interface ItemCardProps {
  item: CourierPackage;
}

export function ItemCard({ item }: ItemCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const statusBadgeStyle = getStatusBadgeStyle(item.status);
  const statusTextStyle = getStatusTextStyle(item.status);

  const handleToggleDetails = (): void => {
    setShowDetails((currentValue) => !currentValue);
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.cardHeader}>
          <View style={styles.titleBlock}>
            <Text style={styles.packageCode}>{item.code}</Text>
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
            {item.customer.name}
          </Text>

          <Text style={styles.infoText} numberOfLines={2}>
            <Text style={styles.label}>Dirección: </Text>
            {item.customer.address}
          </Text>

          <Text style={styles.infoText} numberOfLines={1}>
            <Text style={styles.label}>Conductor: </Text>
            {item.driver.name}
          </Text>

          <Text style={styles.infoText} numberOfLines={1}>
            <Text style={styles.label}>Vehículo: </Text>
            {item.driver.vehicle}
          </Text>

          <Text style={styles.infoText} numberOfLines={1}>
            <Text style={styles.label}>Ruta: </Text>
            {item.route.name}
          </Text>

          <Text style={styles.infoText} numberOfLines={1}>
            <Text style={styles.label}>Trayecto: </Text>
            {item.route.origin} → {item.route.destination}
          </Text>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>ETA</Text>
            <Text style={styles.metaValue} numberOfLines={1}>
              {item.eta}
            </Text>
          </View>

          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>Peso</Text>
            <Text style={styles.metaValue}>{item.weight}</Text>
          </View>

          <View style={styles.metaBox}>
            <Text style={styles.metaLabel}>Paradas</Text>
            <Text style={styles.metaValue}>{item.route.stops}</Text>
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.actionButton,
            pressed ? styles.actionButtonPressed : null,
          ]}
          onPress={handleToggleDetails}
        >
          <Text style={styles.actionButtonText}>
            {showDetails ? 'Ocultar detalle del envío' : 'Ver detalle del envío'}
          </Text>
        </Pressable>

        {showDetails ? (
          <View style={styles.detailsPanel}>
            <Text style={styles.detailsTitle}>Detalle operativo</Text>

            <Text style={styles.detailText}>
              <Text style={styles.label}>Código del paquete: </Text>
              {item.code}
            </Text>

            <Text style={styles.detailText}>
              <Text style={styles.label}>Servicio: </Text>
              {item.serviceType}
            </Text>

            <Text style={styles.detailText}>
              <Text style={styles.label}>Estado actual: </Text>
              {item.status}
            </Text>

            <Text style={styles.detailText}>
              <Text style={styles.label}>Cliente: </Text>
              {item.customer.name}
            </Text>

            <Text style={styles.detailText}>
              <Text style={styles.label}>Dirección de entrega: </Text>
              {item.customer.address}
            </Text>

            <Text style={styles.detailText}>
              <Text style={styles.label}>Conductor asignado: </Text>
              {item.driver.name}
            </Text>

            <Text style={styles.detailText}>
              <Text style={styles.label}>Ruta: </Text>
              {item.route.name}
            </Text>

            <Text style={styles.detailText}>
              <Text style={styles.label}>ETA: </Text>
              {item.eta}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
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

  return styles.textScheduled;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#cbd5e1',
  },

  content: {
    padding: 16,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },

  titleBlock: {
    flex: 1,
  },

  packageCode: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
  },

  serviceType: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: '700',
    color: '#2563eb',
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '800',
  },

  badgeDelivered: {
    backgroundColor: '#dcfce7',
  },

  badgeInTransit: {
    backgroundColor: '#dbeafe',
  },

  badgePending: {
    backgroundColor: '#fef3c7',
  },

  badgeScheduled: {
    backgroundColor: '#ede9fe',
  },

  textDelivered: {
    color: '#166534',
  },

  textInTransit: {
    color: '#1d4ed8',
  },

  textPending: {
    color: '#92400e',
  },

  textScheduled: {
    color: '#6d28d9',
  },

  infoBlock: {
    marginTop: 14,
    gap: 6,
  },

  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
  },

  label: {
    fontWeight: '800',
    color: '#0f172a',
  },

  metaRow: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 10,
  },

  metaBox: {
    flex: 1,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },

  metaLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748b',
    textTransform: 'uppercase',
  },

  metaValue: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
  },

  actionButton: {
    marginTop: 16,
    backgroundColor: '#1e293b',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  actionButtonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.99 }],
  },

  actionButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },

  detailsPanel: {
    marginTop: 14,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 6,
  },

  detailsTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },

  detailText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#334155',
  },
});