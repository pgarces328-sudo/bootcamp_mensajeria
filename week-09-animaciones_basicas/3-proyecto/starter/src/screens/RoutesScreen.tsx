import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { routes } from '../data/mockData';
import {
  COLORS,
  RADIUS,
  SPACING,
} from '../theme';

export function RoutesScreen(): React.JSX.Element {
  return (
    <View style={styles.screen}>
      <FlatList
        data={routes}
        keyExtractor={(i) => i.id}
        style={styles.list}
        contentContainerStyle={styles.c}
        ItemSeparatorComponent={() => (
          <View style={styles.sep} />
        )}
        ListHeaderComponent={
          <View style={styles.head}>
            <Text style={styles.title}>
              Rutas de reparto
            </Text>
            <Text style={styles.sub}>
              recorridos del día
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.top}>
              <View style={styles.iconCircle}>
                <Text style={styles.icon}>
                  🗺️
                </Text>
              </View>
              <View style={styles.flex}>
                <Text style={styles.n}>
                  {item.name}
                </Text>
                <Text style={styles.status}>
                  ● {item.status ?? 'Activa'}
                </Text>
              </View>
              <Text style={styles.stops}>
                {item.stops ?? 8} paradas
              </Text>
            </View>
            <View style={styles.route}>
              <Text style={styles.city}>
                {item.origin}
              </Text>
              <Text style={styles.arrow}>
                ───▶
              </Text>
              <Text style={styles.city}>
                {item.destination}
              </Text>
            </View>
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
    marginBottom: 12,
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
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 22,
  },
  flex: {
    flex: 1,
  },
  n: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  status: {
    fontSize: 12,
    color: COLORS.successText,
    marginTop: 2,
  },
  stops: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.accent,
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 12,
  },
  city: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
    flex: 1,
  },
  arrow: {
    color: COLORS.accent,
    fontWeight: '800',
    marginHorizontal: 8,
  },
});