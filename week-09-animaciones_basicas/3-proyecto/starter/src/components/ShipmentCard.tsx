import React, {
  useRef,
} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  drivers,
  routes,
} from '../data/mockData';
import { usePackageStore } from '../store/usePackageStore';
import {
  COLORS,
  RADIUS,
  SPACING,
} from '../theme';
import type {
  CourierPackage,
  PackageStatus,
} from '../types';

const STATUS_IMAGES: Record<
  PackageStatus,
  string
> = {
  Pendiente:
    'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=60&auto=format&fit=crop',
  'En tránsito':
    'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&q=60&auto=format&fit=crop',
  Entregado:
    'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=60&auto=format&fit=crop',
  Programado:
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=60&auto=format&fit=crop',
  Incidencia:
    'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800&q=60&auto=format&fit=crop',
};

export function ShipmentCard({
  item,
  onPress,
  compact,
}: {
  item: CourierPackage;
  onPress: () => void;
  compact?: boolean;
}): React.JSX.Element {
  const driver = drivers.find(
    (d) => d.id === item.driverId
  );
  const route = routes.find(
    (r) => r.id === item.routeId
  );
  const isTracked = usePackageStore(
    (s) => s.trackedIds.includes(item.id)
  );
  const toggle = usePackageStore(
    (s) => s.toggleTracked
  );

  const scale = useRef(
    new Animated.Value(1)
  ).current;

  const onIn = (): void => {
    Animated.spring(scale, {
      toValue: 0.96,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  const onOut = (): void => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onIn}
      onPressOut={onOut}
    >
      <Animated.View
        style={[
          styles.card,
          { transform: [{ scale }] },
        ]}
      >
        {!compact && (
          <View style={styles.imageWrap}>
            <Image
              source={{
                uri: STATUS_IMAGES[item.status],
              }}
              style={styles.image}
              resizeMode="cover"
            />
            <View
              style={[
                styles.badgeOver,
                getB(item.status),
              ]}
            >
              <Text
                style={[
                  styles.bt,
                  getT(item.status),
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.flex}>
              <Text style={styles.code}>
                {item.trackingCode}
              </Text>
              <Text style={styles.service}>
                {item.serviceType}
              </Text>
            </View>
            <Pressable
              hitSlop={10}
              onPress={() => toggle(item.id)}
            >
              <Text style={styles.star}>
                {isTracked ? '★' : '☆'}
              </Text>
            </Pressable>
          </View>
          <View style={styles.body}>
            <Text
              style={styles.line}
              numberOfLines={1}
            >
              <Text style={styles.label}>
                Cliente:{' '}
              </Text>
              {item.customerName}
            </Text>
            <Text
              style={styles.line}
              numberOfLines={1}
            >
              <Text style={styles.label}>
                Destino:{' '}
              </Text>
              {item.destination}
            </Text>
            <Text
              style={styles.line}
              numberOfLines={1}
            >
              <Text style={styles.label}>
                Conductor:{' '}
              </Text>
              {driver?.name ?? 'Sin asignar'}
            </Text>
            {!compact && (
              <Text
                style={styles.line}
                numberOfLines={1}
              >
                <Text style={styles.label}>
                  Ruta:{' '}
                </Text>
                {route?.name ?? 'Sin ruta'}
              </Text>
            )}
          </View>
          {!compact && (
            <View style={styles.metaRow}>
              <View style={styles.meta}>
                <Text style={styles.metaL}>
                  ETA
                </Text>
                <Text
                  style={styles.metaV}
                  numberOfLines={1}
                >
                  {item.estimatedDelivery}
                </Text>
              </View>
              <View style={styles.meta}>
                <Text style={styles.metaL}>
                  Peso
                </Text>
                <Text style={styles.metaV}>
                  {item.weightKg} kg
                </Text>
              </View>
              <View style={styles.meta}>
                <Text style={styles.metaL}>
                  Paradas
                </Text>
                <Text style={styles.metaV}>
                  {item.stops}
                </Text>
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

function getB(s: PackageStatus) {
  if (s === 'Entregado') {
    return styles.bD;
  }
  if (s === 'En tránsito') {
    return styles.bT;
  }
  if (s === 'Pendiente') {
    return styles.bP;
  }
  if (s === 'Incidencia') {
    return styles.bI;
  }
  return styles.bS;
}

function getT(s: PackageStatus) {
  if (s === 'Entregado') {
    return styles.tD;
  }
  if (s === 'En tránsito') {
    return styles.tT;
  }
  if (s === 'Pendiente') {
    return styles.tP;
  }
  if (s === 'Incidencia') {
    return styles.tI;
  }
  return styles.tS;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  imageWrap: {
    height: 130,
    backgroundColor: COLORS.surfaceMuted,
  },
  image: {
    width: '100%',
    height: 130,
  },
  badgeOver: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
  },
  content: {
    padding: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  flex: {
    flex: 1,
  },
  code: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
  },
  service: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
    marginTop: 2,
  },
  star: {
    fontSize: 24,
    color: '#F59E0B',
  },
  bt: {
    fontSize: 11,
    fontWeight: '800',
  },
  bD: {
    backgroundColor: COLORS.successBackground,
  },
  bT: {
    backgroundColor: COLORS.infoBackground,
  },
  bP: {
    backgroundColor: COLORS.warningBackground,
  },
  bS: {
    backgroundColor: COLORS.purpleBackground,
  },
  bI: {
    backgroundColor: COLORS.dangerBackground,
  },
  tD: {
    color: COLORS.successText,
  },
  tT: {
    color: COLORS.infoText,
  },
  tP: {
    color: COLORS.warningText,
  },
  tS: {
    color: COLORS.purpleText,
  },
  tI: {
    color: COLORS.dangerText,
  },
  body: {
    marginTop: 10,
    gap: 4,
  },
  line: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  label: {
    fontWeight: '800',
    color: COLORS.text,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  meta: {
    flex: 1,
    backgroundColor: COLORS.surfaceMuted,
    borderRadius: 10,
    padding: 10,
  },
  metaL: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
  },
  metaV: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 2,
  },
});