import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View, type ListRenderItem } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ShipmentCard } from '../components/ShipmentCard';
import { fetchPackages } from '../services/api';
import { usePackageStore } from '../store/usePackageStore';
import type { ShipmentsStackParamList } from '../navigation/types';
import { COLORS, RADIUS, SPACING } from '../theme';
import type { CourierPackage } from '../types';

export function TrackedScreen(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<ShipmentsStackParamList, 'ShipmentsList'>>();
  const { data: packages, isLoading } = useQuery({ queryKey: ['packages'], queryFn: fetchPackages });
  const trackedIds = usePackageStore((s) => s.trackedIds);
  const clearTracked = usePackageStore((s) => s.clearTracked);

  const list = useMemo(
    () => (packages ?? []).filter((p) => trackedIds.includes(p.id)),
    [packages, trackedIds]
  );

  const renderItem: ListRenderItem<CourierPackage> = useCallback(
    ({ item }) => (
      <ShipmentCard item={item} onPress={() => navigation.navigate('ShipmentDetail', { id: item.id })} />
    ),
    [navigation]
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return (
    <FlatList
      data={list}
      keyExtractor={(i: CourierPackage) => i.id}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.sep} />}
      ListHeaderComponent={
        <View style={styles.h}>
          <Text style={styles.t}>Seguimiento</Text>
          <Text style={styles.s}>Envíos marcados con ★.</Text>
          {list.length > 0 ? (
            <Pressable onPress={clearTracked} style={styles.clear}>
              <Text style={styles.clearT}>Vaciar seguimiento ({list.length})</Text>
            </Pressable>
          ) : null}
        </View>
      }
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.eIcon}>☆</Text>
          <Text style={styles.eT}>Sin envíos en seguimiento</Text>
          <Text style={styles.eS}>Los envíos marcados con ★ aparecerán en esta sección.</Text>
        </View>
      }
      contentContainerStyle={styles.c}
    />
  );
}

const styles = StyleSheet.create({
  c: { padding: SPACING.lg, backgroundColor: COLORS.background, flexGrow: 1, paddingBottom: 40 },
  center: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  h: { marginBottom: SPACING.lg },
  t: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  s: { color: COLORS.textMuted, marginTop: 4 },
  clear: { marginTop: 12, alignSelf: 'flex-start', backgroundColor: COLORS.dangerBackground, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999 },
  clearT: { color: COLORS.dangerText, fontWeight: '800', fontSize: 12 },
  sep: { height: 12 },
  empty: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: 32, alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  eIcon: { fontSize: 44, color: '#F59E0B' },
  eT: { fontSize: 17, fontWeight: '800', color: COLORS.text, marginTop: 8 },
  eS: { color: COLORS.textMuted, marginTop: 4, textAlign: 'center' },
});