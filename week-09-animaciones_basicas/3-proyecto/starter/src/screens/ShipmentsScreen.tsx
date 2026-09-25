import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
  type ListRenderItem,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AnimatedListItem } from '../components/AnimatedListItem';
import { ShipmentCard } from '../components/ShipmentCard';
import { drivers } from '../data/mockData';
import { usePackages } from '../hooks/usePackages';
import { usePreferences } from '../hooks/usePreferences';
import {
  loadPackagesCache,
  savePackagesCache,
} from '../storage/packagesCache';
import type { ShipmentsStackParamList } from '../navigation/types';
import {
  COLORS,
  SPACING,
} from '../theme';
import type {
  CourierPackage,
  PackageStatus,
} from '../types';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(
    true
  );
}

type Props = NativeStackScreenProps<
  ShipmentsStackParamList,
  'ShipmentsList'
>;

type FilterOption =
  | 'Todos'
  | PackageStatus;

const FILTERS: FilterOption[] = [
  'Todos',
  'Pendiente',
  'En tránsito',
  'Entregado',
  'Programado',
];

export function ShipmentsScreen({
  navigation,
}: Props): React.JSX.Element {
  const {
    data: packages,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = usePackages();

  const {
    compact,
    sortOrder,
    refresh,
  } = usePreferences();

  const [search, setSearch] = useState<string>(
    ''
  );
  const [filter, setFilter] = useState<FilterOption>(
    'Todos'
  );

  const heroOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const heroY = useRef(
    new Animated.Value(-12)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heroOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(heroY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  useEffect(() => {
    if (packages && packages.length > 0) {
      savePackagesCache(packages);
    }
  }, [packages]);

  useEffect(() => {
    loadPackagesCache().then(() => {});
  }, []);

  const filtered = useMemo((): CourierPackage[] => {
    const list = packages ?? [];
    const q = search.trim().toLowerCase();
    const base = list.filter((p) => {
      if (
        filter !== 'Todos' &&
        p.status !== filter
      ) {
        return false;
      }
      if (q === '') {
        return true;
      }
      const d = drivers
        .find((x) => x.id === p.driverId)
        ?.name.toLowerCase() ?? '';
      return (
        p.trackingCode.toLowerCase().includes(q) ||
        p.customerName.toLowerCase().includes(q) ||
        p.destination.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q) ||
        d.includes(q)
      );
    });
    const sorted = [...base];
    if (sortOrder === 'peso') {
      sorted.sort(
        (a, b) => b.weightKg - a.weightKg
      );
    }
    if (sortOrder === 'az') {
      sorted.sort((a, b) =>
        a.customerName.localeCompare(
          b.customerName
        )
      );
    }
    return sorted;
  }, [packages, search, filter, sortOrder]);

  const handleFilter = (
    f: FilterOption
  ): void => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );
    setFilter(f);
  };

  const renderItem: ListRenderItem<CourierPackage> = useCallback(
    ({ item, index }) => (
      <AnimatedListItem index={index}>
        <ShipmentCard
          item={item}
          compact={compact}
          onPress={() =>
            navigation.navigate(
              'ShipmentDetail',
              { id: item.id }
            )
          }
        />
      </AnimatedListItem>
    ),
    [navigation, compact]
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color={COLORS.accent}
        />
        <Text style={styles.muted}>
          Cargando envíos...
        </Text>
      </View>
    );
  }

  if (isError && (!packages || packages.length === 0)) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          Sin conexión y sin caché
        </Text>
        <Pressable
          style={styles.retry}
          onPress={() => {
            void refetch();
          }}
        >
          <Text style={styles.retryT}>
            Reintentar
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.brandRow}>
        <View style={styles.logoCircle}>
          <Text style={styles.logo}>
            📦
          </Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.brandTitle}>
            Courier Mensajería
          </Text>
          <Text style={styles.brandSub}>
            Control operativo de envíos
          </Text>
        </View>
      </View>

      <Animated.View
        style={[
          styles.hero,
          {
            opacity: heroOpacity,
            transform: [{ translateY: heroY }],
          },
        ]}
      >
        <View style={styles.flex}>
          <Text style={styles.heroTitle}>
            Envíos activos
          </Text>
          <Text style={styles.heroSub}>
            {filtered.length} paquetes en operación
          </Text>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate(
              'CreateShipment'
            )
          }
          style={styles.newBtn}
        >
          <Text style={styles.newT}>
            + Nuevo
          </Text>
        </Pressable>
      </Animated.View>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por guía, cliente, conductor o destino..."
          placeholderTextColor={
            COLORS.textMuted
          }
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((f) => {
          const a = filter === f;
          return (
            <TouchableOpacity
              key={f}
              onPress={() => handleFilter(f)}
              style={[
                styles.chip,
                a && styles.chipA,
              ]}
            >
              <Text
                style={[
                  styles.chipT,
                  a && styles.chipTA,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => (
          <View style={styles.sep} />
        )}
        contentContainerStyle={styles.list}
        onRefresh={() => {
          void refetch();
        }}
        refreshing={isFetching && !isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  muted: {
    color: COLORS.textMuted,
  },
  error: {
    color: COLORS.dangerText,
    fontWeight: '800',
  },
  retry: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryT: {
    color: '#fff',
    fontWeight: '800',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
  },
  flex: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: COLORS.text,
  },
  brandSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
  },
  heroSub: {
    color: COLORS.textMuted,
    marginTop: 4,
    fontSize: 13,
  },
  newBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  newT: {
    color: '#fff',
    fontWeight: '800',
  },
  searchBox: {
    marginHorizontal: SPACING.lg,
    marginTop: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    height: 46,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    color: COLORS.text,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginHorizontal: SPACING.lg,
    marginTop: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipA: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  chipT: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  chipTA: {
    color: '#111',
    fontWeight: '800',
  },
  list: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 32,
    paddingTop: 12,
    flexGrow: 1,
  },
  sep: {
    height: 12,
  },
});