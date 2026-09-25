import { useCallback, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ShipmentCard } from '../components/ShipmentCard';
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
import type { CourierPackage } from '../types';

type TrackedNavigationProp = NativeStackNavigationProp<
  ShipmentsStackParamList,
  'ShipmentsList'
>;

export function TrackedScreen() {
  const navigation = useNavigation<TrackedNavigationProp>();

  const packages = usePackageStore((state) => state.packages);
  const trackedIds = usePackageStore((state) => state.trackedIds);
  const clearTracked = usePackageStore((state) => state.clearTracked);

  const trackedPackages = useMemo(
    () => packages.filter((item) => trackedIds.includes(item.id)),
    [packages, trackedIds]
  );

  const renderItem = useCallback(
    ({ item }: { item: CourierPackage }) => (
      <ShipmentCard
        item={item}
        onPress={() =>
          navigation.navigate('ShipmentDetail', {
            id: item.id,
          })
        }
      />
    ),
    [navigation]
  );

  const keyExtractor = useCallback((item: CourierPackage) => item.id, []);

  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    []
  );

  return (
    <FlatList
      data={trackedPackages}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Seguimiento</Text>
          <Text style={styles.subtitle}>
            Envíos marcados con ★ para vigilancia prioritaria.
          </Text>

          {trackedPackages.length > 0 ? (
            <Pressable
              onPress={clearTracked}
              style={({ pressed }) => [
                styles.clearButton,
                pressed ? styles.clearButtonPressed : null,
              ]}
            >
              <Text style={styles.clearButtonText}>
                Vaciar seguimiento ({trackedPackages.length})
              </Text>
            </Pressable>
          ) : null}
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>☆</Text>
          <Text style={styles.emptyTitle}>Sin envíos en seguimiento</Text>
          <Text style={styles.emptyText}>
            Ve a la tab Envíos y toca la estrella ★ de un paquete para
            agregarlo aquí.
          </Text>
        </View>
      }
      contentContainerStyle={[
        styles.content,
        trackedPackages.length === 0 ? styles.contentEmpty : null,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
    backgroundColor: COLORS.background,
  },

  contentEmpty: {
    flexGrow: 1,
  },

  header: {
    marginBottom: SPACING.lg,
  },

  title: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text,
  },

  subtitle: {
    marginTop: SPACING.xs,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textMuted,
    lineHeight: TYPOGRAPHY.lineHeightBody,
  },

  clearButton: {
    marginTop: SPACING.md,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.dangerBackground,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },

  clearButtonPressed: {
    opacity: INTERACTION.pressedOpacity,
  },

  clearButtonText: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.dangerText,
  },

  separator: {
    height: SPACING.lg,
  },

  emptyState: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xxl,
    alignItems: 'center',
    borderWidth: BORDER_WIDTH.thin,
    borderColor: COLORS.border,
  },

  emptyIcon: {
    fontSize: 44,
    color: '#F59E0B',
    marginBottom: SPACING.md,
  },

  emptyTitle: {
    fontSize: TYPOGRAPHY.sectionTitle,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text,
    textAlign: 'center',
  },

  emptyText: {
    marginTop: SPACING.sm,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeightBody,
  },
});