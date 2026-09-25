import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { drivers } from '../data/mockData';
import {
  COLORS,
  RADIUS,
  SPACING,
} from '../theme';

function getVehicleIcon(
  vehicle: string
): keyof typeof Ionicons.glyphMap {
  const v = vehicle.toLowerCase();
  if (v.includes('moto')) {
    return 'bicycle-outline';
  }
  if (v.includes('furg')) {
    return 'bus-outline';
  }
  return 'car-outline';
}

export function DriversScreen(): React.JSX.Element {
  return (
    <View style={styles.screen}>
      <FlatList
        data={drivers}
        keyExtractor={(i) => i.id}
        style={styles.list}
        contentContainerStyle={styles.c}
        ItemSeparatorComponent={() => (
          <View style={styles.sep} />
        )}
        ListHeaderComponent={
          <View style={styles.head}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="people-outline"
                size={22}
                color={COLORS.accent}
              />
            </View>
            <View style={styles.flex}>
              <Text style={styles.title}>
                Conductores
              </Text>
              <Text style={styles.sub}>
                Repartidores en operación
              </Text>
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: `https://i.pravatar.cc/100?img=${
                  12 + index * 15
                }`,
              }}
              style={styles.avatar}
            />
            <View style={styles.flex}>
              <Text style={styles.n}>
                {item.name}
              </Text>
              <View style={styles.vehicleRow}>
                <Ionicons
                  name={getVehicleIcon(
                    item.vehicle
                  )}
                  size={14}
                  color={COLORS.textMuted}
                />
                <Text style={styles.m}>
                  {item.vehicle}
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.badge}>
                  <Ionicons
                    name="star"
                    size={12}
                    color="#F59E0B"
                  />
                  <Text style={styles.badgeT}>
                    {item.rating ?? '4.8'}
                  </Text>
                </View>
                <View style={styles.badge2}>
                  <Text style={styles.badge2T}>
                    {item.activeShipments ?? 3} envíos
                  </Text>
                </View>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={COLORS.textMuted}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    flex: 1,
  },
  c: {
    padding: SPACING.lg,
    paddingBottom: 32,
    flexGrow: 1,
  },
  sep: {
    height: 12,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  sub: {
    color: COLORS.textMuted,
    marginTop: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.surfaceMuted,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  n: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  m: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceMuted,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeT: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
  },
  badge2: {
    backgroundColor: COLORS.warningBackground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badge2T: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accent,
  },
});