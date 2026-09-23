import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, type ListRenderItem } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { ShipmentCard } from '../components/ShipmentCard';
import { drivers } from '../data/mockData';
import { usePackages } from '../hooks/usePackages';
import { usePreferences } from '../hooks/usePreferences';
import { loadPackagesCache, savePackagesCache } from '../storage/packagesCache';
import type { ShipmentsStackParamList } from '../navigation/types';
import { COLORS, SPACING } from '../theme';
import type { CourierPackage, PackageStatus } from '../types';

type Props = NativeStackScreenProps<ShipmentsStackParamList, 'ShipmentsList'>;
type FilterOption = 'Todos' | PackageStatus;
const FILTERS: FilterOption[] = ['Todos', 'Pendiente', 'En tránsito', 'Entregado', 'Programado'];

export function ShipmentsScreen({ navigation }: Props): React.JSX.Element {
  const { data: packages, isLoading, isError, isFetching, refetch } = usePackages();
  const { compact, sortOrder } = usePreferences();
  const netInfo = useNetInfo();
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<FilterOption>('Todos');
  const [cachedList, setCachedList] = useState<CourierPackage[]>([]);

  useEffect(() => {
    if (packages && packages.length > 0) {
      savePackagesCache(packages);
    }
  }, [packages]);

  useEffect(() => {
    loadPackagesCache().then((c) => { if (c) setCachedList(c); });
  }, []);

  const displayList = packages && packages.length > 0 ? packages : cachedList;
  const isOffline = netInfo.isConnected === false || (isError && displayList.length > 0);

  const filtered = useMemo((): CourierPackage[] => {
    const q = search.trim().toLowerCase();
    const base = displayList.filter((p) => {
      if (filter !== 'Todos' && p.status !== filter) return false;
      if (q === '') return true;
      const d = drivers.find((x) => x.id === p.driverId)?.name.toLowerCase() ?? '';
      return p.trackingCode.toLowerCase().includes(q) || p.customerName.toLowerCase().includes(q) || p.destination.toLowerCase().includes(q) || p.status.toLowerCase().includes(q) || d.includes(q);
    });
    const sorted = [...base];
    if (sortOrder === 'peso') sorted.sort((a, b) => b.weightKg - a.weightKg);
    else if (sortOrder === 'az') sorted.sort((a, b) => a.customerName.localeCompare(b.customerName));
    return sorted;
  }, [displayList, search, filter, sortOrder]);

  const renderItem: ListRenderItem<CourierPackage> = useCallback(({ item }) => (
    <ShipmentCard item={item} compact={compact} onPress={() => navigation.navigate('ShipmentDetail', { id: item.id })} />
  ), [navigation, compact]);

  if (isLoading && displayList.length === 0) {
    return (<View style={styles.center}><ActivityIndicator size="large" color={COLORS.accent} /><Text style={styles.muted}>Cargando envíos...</Text></View>);
  }

  if (isError && displayList.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Sin conexión y sin caché</Text>
        <Text style={styles.muted}>Conéctese e inténtelo nuevamente.</Text>
        <Pressable style={styles.retry} onPress={() => { void refetch(); }}><Text style={styles.retryT}>Reintentar</Text></Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {isOffline ? (<View style={styles.offlineBanner}><Text style={styles.offlineText}>Sin conexión — mostrando lista guardada</Text></View>) : null}
      <View style={styles.topRow}>
        <Text style={styles.title}>Envíos activos</Text>
        <Pressable onPress={() => navigation.navigate('CreateShipment')} style={styles.newBtn}><Text style={styles.newT}>+ Nuevo</Text></Pressable>
      </View>
      <View style={styles.searchBox}>
        <TextInput style={styles.input} value={search} onChangeText={setSearch} placeholder="Buscar por guía, cliente, conductor..." placeholderTextColor={COLORS.textMuted} autoCorrect={false} autoCapitalize="none" />
      </View>
      <View style={styles.filterRow}>
        {FILTERS.map((f) => { const a = filter === f; return (<TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.chip, a && styles.chipA]}><Text style={[styles.chipT, a && styles.chipTA]}>{f}</Text></TouchableOpacity>); })}
      </View>
      <Text style={styles.count}>{filtered.length} envíos</Text>
      <FlatList data={filtered} keyExtractor={(i) => i.id} renderItem={renderItem} ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListEmptyComponent={<View style={styles.empty}><Text style={styles.eIcon}>📦</Text><Text style={styles.eT}>Sin envíos</Text></View>}
        contentContainerStyle={styles.list} onRefresh={() => { void refetch(); }} refreshing={isFetching && !isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', gap: 12 },
  muted: { color: COLORS.textMuted },
  error: { color: COLORS.dangerText, fontWeight: '800' },
  retry: { backgroundColor: COLORS.accent, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  retryT: { color: '#fff', fontWeight: '800' },
  offlineBanner: { backgroundColor: '#7c2d12', padding: 10, alignItems: 'center' },
  offlineText: { color: '#fed7aa', fontWeight: '800', fontSize: 12 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: SPACING.lg, marginTop: SPACING.lg },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  newBtn: { backgroundColor: COLORS.accent, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 },
  newT: { color: '#fff', fontWeight: '800' },
  searchBox: { marginHorizontal: SPACING.lg, marginTop: 12, backgroundColor: COLORS.surface, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 12, height: 46, justifyContent: 'center' },
  input: { flex: 1, color: COLORS.text },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginHorizontal: SPACING.lg, marginTop: 12 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  chipA: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipT: { fontSize: 12, color: COLORS.textMuted }, chipTA: { color: '#111', fontWeight: '800' },
  count: { color: COLORS.textMuted, fontSize: 12, marginHorizontal: SPACING.lg, marginTop: 12, marginBottom: 8 },
  list: { paddingHorizontal: SPACING.lg, paddingBottom: 32, flexGrow: 1 },
  sep: { height: 12 },
  empty: { alignItems: 'center', padding: 32 }, eIcon: { fontSize: 44 }, eT: { color: COLORS.text, fontWeight: '800' },
});