import { FlatList, StyleSheet, Text, View } from 'react-native';

import { routes } from '../data/mockData';
import {
  BORDER_WIDTH,
  COLORS,
  RADIUS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY
} from '../theme';
import type { DeliveryRoute } from '../types';

export function RoutesScreen() {
  return (
    <FlatList
      data={routes}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Rutas</Text>
          <Text style={styles.subtitle}>
            Rutas operativas para distribución de paquetes.
          </Text>
        </View>
      }
      renderItem={({ item }: { item: DeliveryRoute }) => (
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>

          <Text style={styles.path}>
            {item.origin} → {item.destination}
          </Text>

          <Text style={styles.stops}>{item.stops} paradas</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
    backgroundColor: COLORS.background
  },

  header: {
    marginBottom: SPACING.lg
  },

  title: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text
  },

  subtitle: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textMuted
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: BORDER_WIDTH.thin,
    borderColor: COLORS.border,
    ...SHADOWS.card
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md
  },

  name: {
    flex: 1,
    fontSize: TYPOGRAPHY.cardTitle,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text
  },

  status: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.accent
  },

  path: {
    marginTop: SPACING.sm,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textMuted,
    lineHeight: TYPOGRAPHY.lineHeightBody
  },

  stops: {
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.text
  },

  separator: {
    height: SPACING.lg
  }
});