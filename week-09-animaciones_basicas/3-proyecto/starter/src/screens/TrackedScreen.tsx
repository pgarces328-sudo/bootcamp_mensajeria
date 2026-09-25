import React, {
  useCallback,
  useMemo,
} from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShipmentCard } from '../components/ShipmentCard';
import { usePackageStore } from '../store/usePackageStore';
import { usePackages } from '../hooks/usePackages';
import type { ShipmentsStackParamList } from '../navigation/types';
import {
  COLORS,
  RADIUS,
  SPACING,
} from '../theme';
import type { CourierPackage } from '../types';

export function TrackedScreen(): React.JSX.Element {
  const navigation = useNavigation<
    NativeStackNavigationProp<
      ShipmentsStackParamList,
      'ShipmentsList'
    >
  >();

  const { data: packages } = usePackages();

  const trackedIds = usePackageStore(
    (s) => s.trackedIds
  );

  const clear = usePackageStore(
    (s) => s.clearTracked
  );

  const list = useMemo(
    () =>
      (packages ?? []).filter((p) =>
        trackedIds.includes(p.id)
      ),
    [packages, trackedIds]
  );

  const renderItem: ListRenderItem<CourierPackage> = useCallback(
    ({ item }) => (
      <ShipmentCard
        item={item}
        onPress={() =>
          navigation.navigate(
            'ShipmentDetail',
            { id: item.id }
          )
        }
      />
    ),
    [navigation]
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={list}
        keyExtractor={(i) => i.id}
        style={styles.list}
        contentContainerStyle={styles.c}
        ItemSeparatorComponent={() => (
          <View style={styles.sep} />
        )}
        ListHeaderComponent={
          <View style={styles.head}>
            <View style={styles.top}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name="star-outline"
                  size={22}
                  color={COLORS.accent}
                />
              </View>
              <View style={styles.flex}>
                <Text style={styles.title}>
                  Seguimiento
                </Text>
                <Text style={styles.sub}>
                  Envíos en vigilancia
                </Text>
              </View>
              <Text style={styles.count}>
                {list.length}
              </Text>
            </View>
            {list.length > 0 && (
              <Pressable
                onPress={clear}
                style={styles.clear}
              >
                <Text style={styles.clearT}>
                  Vaciar ({list.length})
                </Text>
              </Pressable>
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons
              name="star-outline"
              size={40}
              color={COLORS.textMuted}
            />
            <Text style={styles.eT}>
              Sin seguimiento
            </Text>
            <Text style={styles.eS}>
              Los envíos marcados aparecerán aquí.
            </Text>
          </View>
        }
        renderItem={renderItem}
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
  flex: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },
  sub: {
    color: COLORS.textMuted,
    marginTop: 2,
    fontSize: 13,
  },
  count: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.accent,
  },
  clear: {
    marginTop: 12,
    alignSelf: 'flex-start',
    backgroundColor: COLORS.dangerBackground,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  clearT: {
    color: COLORS.dangerText,
    fontWeight: '800',
    fontSize: 12,
  },
  empty: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  eT: {
    fontSize: 17,
    fontWeight: '800',
    color: COLORS.text,
  },
  eS: {
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});