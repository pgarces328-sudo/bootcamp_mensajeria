import { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ShipmentCard } from '../components/ShipmentCard';
import { packages } from '../data/mockData';
import type { ShipmentsStackParamList } from '../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';
import type { CourierPackage } from '../types';

type Props = NativeStackScreenProps<ShipmentsStackParamList, 'ShipmentsList'>;

export function ShipmentsScreen({ navigation }: Props) {
  const renderItem = useCallback(
    ({ item }: { item: CourierPackage }) => (
      <ShipmentCard
        item={item}
        onPress={() =>
          navigation.navigate('ShipmentDetail', {
            id: item.id
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
      data={packages}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.title}>Envíos activos</Text>
          <Text style={styles.subtitle}>
            Selecciona un paquete para ver su detalle operativo.
          </Text>
        </View>
      }
      contentContainerStyle={styles.content}
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
    color: COLORS.textMuted,
    lineHeight: TYPOGRAPHY.lineHeightBody
  },

  separator: {
    height: SPACING.lg
  }
});