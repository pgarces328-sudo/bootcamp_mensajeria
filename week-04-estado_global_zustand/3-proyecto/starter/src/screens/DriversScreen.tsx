import { FlatList, StyleSheet, Text, View } from 'react-native';

import { drivers } from '../data/mockData';
import {
  BORDER_WIDTH,
  COLORS,
  RADIUS,
  SHADOWS,
  SPACING,
  TYPOGRAPHY
} from '../theme';
import type { Driver } from '../types';

export function DriversScreen() {
  return (
    <FlatList
      data={drivers}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Conductores</Text>
          <Text style={styles.subtitle}>
            Equipo asignado a la operación de entregas.
          </Text>
        </View>
      }
      renderItem={({ item }: { item: Driver }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.vehicle}>{item.vehicle}</Text>

          <View style={styles.row}>
            <Text style={styles.meta}>⭐ {item.rating}</Text>
            <Text style={styles.meta}>{item.activeShipments} envíos activos</Text>
          </View>
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

  name: {
    fontSize: TYPOGRAPHY.cardTitle,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text
  },

  vehicle: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textMuted
  },

  row: {
    marginTop: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  meta: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightBold,
    color: COLORS.accent
  },

  separator: {
    height: SPACING.lg
  }
});