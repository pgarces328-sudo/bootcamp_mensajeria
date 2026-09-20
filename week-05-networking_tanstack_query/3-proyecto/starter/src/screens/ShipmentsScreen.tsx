import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type ListRenderItem,
} from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShipmentCard } from '../components/ShipmentCard';
import { drivers } from '../data/mockData';
import { createPackage, fetchPackages } from '../services/api';
import type { ShipmentsStackParamList } from '../navigation/types';
import { COLORS, RADIUS, SPACING } from '../theme';
import type { CourierPackage, PackageStatus } from '../types';

type Props = NativeStackScreenProps<ShipmentsStackParamList, 'ShipmentsList'>;
type FilterOption = 'Todos' | PackageStatus;
const FILTERS: FilterOption[] = ['Todos', 'Pendiente', 'En tránsito', 'Entregado', 'Programado'];

export function ShipmentsScreen({ navigation }: Props): React.JSX.Element {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<FilterOption>('Todos');

  const {
    data: packages,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useQuery<CourierPackage[], Error>({
    queryKey: ['packages'],
    queryFn: fetchPackages,
    staleTime: 0,
  });

  const createMutation = useMutation({
    mutationFn: createPackage,
    onSuccess: async (created) => {
      // Solo invalida. El nuevo ya viene desde localCreated en el refetch.
      // No hacemos setQueryData aquí para no duplicar.
      await queryClient.invalidateQueries({ queryKey: ['packages'] });
      Alert.alert('Envío creado', `${created.trackingCode} - ${created.customerName}`);
    },
    onError: () => {
      Alert.alert('Error', 'No se pudo crear. Revisa tu conexión.');
    },
  });

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

  const renderEmpty = useCallback(() => {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>📦</Text>
        <Text style={styles.emptyTitle}>Sin envíos</Text>
        <Text style={styles.emptyText}>No hay paquetes para esta búsqueda o filtro.</Text>
      </View>
    );
  }, []);

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
        <Text style={styles.muted}>Revisa tu conexión e intenta de nuevo.</Text>
        <Pressable style={styles.retryBtn} onPress={() => { void refetch(); }}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
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
      <View style={styles.createRow}>
        <Pressable
          disabled={createMutation.isPending}
          onPress={() => {
            if (createMutation.isPending) return;
            createMutation.mutate({
              customerName: `Cliente nuevo ${Date.now().toString().slice(-4)}`,
              destination: 'Calle 100 #15-20, Bogotá',
            });
          }}
          style={[styles.createBtn, createMutation.isPending && styles.disabled]}
        >
          <Text style={styles.createText}>
            {createMutation.isPending ? 'Creando...' : '+ Crear envío de prueba'}
          </Text>
        </Pressable>
      </View>
      <Text style={styles.count}>
        {filtered.length} {filtered.length === 1 ? 'envío' : 'envíos'}
      </Text>
      <FlatList
        data={filtered}
        keyExtractor={(item: CourierPackage) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.list}
        onRefresh={() => { void refetch(); }}
        refreshing={isFetching && !isLoading}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', gap: 12, padding: 24 },
  muted: { color: COLORS.textMuted, fontSize: 14 },
  errorTitle: { color: COLORS.dangerText, fontSize: 17, fontWeight: '800' },
  retryBtn: { backgroundColor: COLORS.accent, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginTop: 8 },
  retryText: { color: COLORS.white, fontWeight: '800' },
  searchBox: { marginHorizontal: SPACING.lg, marginTop: SPACING.lg, backgroundColor: COLORS.surface, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, paddingHorizontal: 12, height: 46, justifyContent: 'center' },
  input: { flex: 1, color: COLORS.text, fontSize: 15 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginHorizontal: SPACING.lg, marginTop: 12 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  chipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipText: { fontSize: 12, fontWeight: '600', color: COLORS.textMuted },
  chipTextActive: { color: COLORS.background, fontWeight: '800' },
  createRow: { marginHorizontal: SPACING.lg, marginTop: 12 },
  createBtn: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, alignItems: 'center' },
  disabled: { opacity: 0.5 },
  createText: { color: COLORS.accent, fontWeight: '800', fontSize: 13 },
  count: { color: COLORS.textMuted, fontSize: 12, marginHorizontal: SPACING.lg, marginTop: 12, marginBottom: 8 },
  list: { paddingHorizontal: SPACING.lg, paddingBottom: 32, flexGrow: 1 },
  sep: { height: 12 },
  empty: { alignItems: 'center', padding: 32, gap: 8 },
  emptyIcon: { fontSize: 44 },
  emptyTitle: { color: COLORS.text, fontSize: 16, fontWeight: '800' },
  emptyText: { color: COLORS.textMuted, textAlign: 'center' },
});