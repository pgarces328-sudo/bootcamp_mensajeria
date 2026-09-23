import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type ListRenderItem,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShipmentCard } from '../components/ShipmentCard';
import { drivers } from '../data/mockData';
import { usePackages } from '../hooks/usePackages';
import type { ShipmentsStackParamList } from '../navigation/types';
import { COLORS, RADIUS, SPACING } from '../theme';
import type { CourierPackage, PackageStatus } from '../types';

type Props = NativeStackScreenProps<ShipmentsStackParamList, 'ShipmentsList'>;
type FilterOption = 'Todos' | PackageStatus;
const FILTERS: FilterOption[] = ['Todos', 'Pendiente', 'En tránsito', 'Entregado', 'Programado'];

export function ShipmentsScreen({ navigation }: Props): React.JSX.Element {
  const { data: packages, isLoading, isError, isFetching, refetch } = usePackages();
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<FilterOption>('Todos');

  const filtered = useMemo((): CourierPackage[] => {
    const list = packages ?? [];
    const q = search.trim().toLowerCase();
    return list.filter((p) => {
      if (filter !== 'Todos' && p.status !== filter) return false;
      if (q === '') return true;
      const driverName = drivers.find((d) => d.id === p.driverId)?.name.toLowerCase() ?? '';
      return (
        p.trackingCode.toLowerCase().includes(q) ||
        p.customerName.toLowerCase().includes(q) ||
        p.destination.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q) ||
        driverName.includes(q)
      );
    });
  }, [packages, search, filter]);

  const renderItem: ListRenderItem<CourierPackage> = useCallback(
    ({ item }) => (
      <ShipmentCard
        item={item}
        onPress={() => navigation.navigate('ShipmentDetail', { id: item.id })}
      />
    ),
    [navigation]
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.muted}>Cargando envíos...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Error al cargar envíos</Text>
        <Pressable style={styles.retryBtn} onPress={() => { void refetch(); }}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.topRow}>
        <Text style={styles.title}>Envíos activos</Text>
        <Pressable
          onPress={() => navigation.navigate('CreateShipment')}
          style={({ pressed }) => [styles.newBtn, pressed && styles.pressed]}
        >
          <Text style={styles.newBtnText}>+ Nuevo</Text>
        </Pressable>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por guía, cliente, conductor o destino..."
          placeholderTextColor={COLORS.textMuted}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <TouchableOpacity
              key={f}
              activeOpacity={0.7}
              onPress={() => setFilter(f)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{f}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.count}>{filtered.length} envíos</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item: CourierPackage) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📦</Text>
            <Text style={styles.emptyTitle}>Sin envíos</Text>
          </View>
        }
        contentContainerStyle={styles.list}
        onRefresh={() => { void refetch(); }}
        refreshing={isFetching && !isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', gap: 12 },
  muted: { color: COLORS.textMuted },
  errorTitle: { color: COLORS.dangerText, fontSize: 17, fontWeight: '800' },
  retryBtn: { backgroundColor: COLORS.accent, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  retryText: { color: COLORS.white, fontWeight: '800' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: SPACING.lg, marginTop: SPACING.lg },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  newBtn: { backgroundColor: COLORS.accent, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 },
  pressed: { opacity: 0.7 },
  newBtnText: { color: '#fff', fontWeight: '800' },
  searchBox: { marginHorizontal: SPACING.lg, marginTop: 12, backgroundColor: COLORS.surface, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 12, height: 46, justifyContent: 'center' },
  input: { flex: 1, color: COLORS.text, fontSize: 15 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginHorizontal: SPACING.lg, marginTop: 12 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  chipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipText: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },
  chipTextActive: { color: COLORS.background, fontWeight: '800' },
  count: { color: COLORS.textMuted, fontSize: 12, marginHorizontal: SPACING.lg, marginTop: 12, marginBottom: 8 },
  list: { paddingHorizontal: SPACING.lg, paddingBottom: 32, flexGrow: 1 },
  sep: { height: 12 },
  empty: { alignItems: 'center', padding: 32 },
  emptyIcon: { fontSize: 44 },
  emptyTitle: { color: COLORS.text, fontWeight: '800' },
});