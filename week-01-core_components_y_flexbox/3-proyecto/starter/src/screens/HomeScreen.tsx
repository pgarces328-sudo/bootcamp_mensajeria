import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ItemCard } from '../components/ItemCard';
import { packages } from '../data/mockData';
import type { FilterStatus } from '../types';

const filters: FilterStatus[] = [
  'Todos',
  'Pendiente',
  'En tránsito',
  'Entregado',
  'Programado',
];

export function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>('Todos');

  const filteredPackages =
    selectedFilter === 'Todos'
      ? packages
      : packages.filter((item) => item.status === selectedFilter);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mensajería Courier</Text>
        <Text style={styles.headerSubtitle}>
          Control operativo de paquetes, rutas, conductores y clientes
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{packages.length}</Text>
            <Text style={styles.summaryLabel}>Paquetes</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>4</Text>
            <Text style={styles.summaryLabel}>Rutas</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>4</Text>
            <Text style={styles.summaryLabel}>Drivers</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Envíos activos</Text>
          <Text style={styles.sectionCounter}>
            {filteredPackages.length} resultados
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter) => {
            const isActive = selectedFilter === filter;

            return (
              <TouchableOpacity
                key={filter}
                activeOpacity={0.75}
                style={[
                  styles.filterButton,
                  isActive ? styles.filterButtonActive : null,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    isActive ? styles.filterTextActive : null,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {filteredPackages.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#dae3eb',
  },

  header: {
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 22,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },

  headerTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '800',
  },

  headerSubtitle: {
    color: '#cbd5e1',
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 22,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  summaryValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
  },

  summaryLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#334155',
  },

  sectionCounter: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
  },

  filtersContent: {
    gap: 8,
    paddingBottom: 16,
  },

  filterButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  filterButtonActive: {
    backgroundColor: '#1e293b',
    borderColor: '#1e293b',
  },

  filterText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
  },

  filterTextActive: {
    color: '#ffffff',
  },
});