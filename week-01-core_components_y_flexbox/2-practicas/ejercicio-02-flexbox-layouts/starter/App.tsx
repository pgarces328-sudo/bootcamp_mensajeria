// ============================================================
// EJERCICIO 02 — Flexbox Layouts
// ============================================================

import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.mainTitle}>Flexbox Layouts</Text>

        <View style={styles.demoSection}>
          <Text style={styles.sectionTitle}>Layout 1: Header</Text>

          <View style={styles.headerLayout}>
            <Text style={styles.headerTitle}>Inicio</Text>

            <Pressable
              style={({ pressed }) => [
                styles.headerButton,
                pressed ? styles.buttonPressed : null,
              ]}
              onPress={() => console.log('Nuevo elemento')}
            >
              <Text style={styles.headerButtonText}>+ Nuevo</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.demoSection}>
          <Text style={styles.sectionTitle}>Layout 2: Tarjetas resumen</Text>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>12</Text>
              <Text style={styles.summaryLabel}>Paquetes</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>4</Text>
              <Text style={styles.summaryLabel}>Rutas</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>6</Text>
              <Text style={styles.summaryLabel}>Drivers</Text>
            </View>
          </View>
        </View>

        <View style={styles.demoSection}>
          <Text style={styles.sectionTitle}>Layout 3: Tarjeta horizontal</Text>

          <View style={styles.horizontalCard}>
            <View style={styles.iconBox}>
              <Text style={styles.iconText}>🚚</Text>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Ruta Norte-A</Text>
              <Text style={styles.cardSubtitle}>8 entregas pendientes</Text>
            </View>

            <Text style={styles.cardStatus}>Activa</Text>
          </View>
        </View>

        <View style={styles.demoSection}>
          <Text style={styles.sectionTitle}>Layout 4: Navegación inferior</Text>

          <View style={styles.bottomNav}>
            <View style={styles.navItem}>
              <Text style={styles.navIcon}>🏠</Text>
              <Text style={styles.navLabel}>Inicio</Text>
            </View>

            <View style={styles.navItem}>
              <Text style={styles.navIcon}>📦</Text>
              <Text style={styles.navLabel}>Envíos</Text>
            </View>

            <View style={styles.navItem}>
              <Text style={styles.navIcon}>👤</Text>
              <Text style={styles.navLabel}>Perfil</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  content: {
    padding: 20,
    gap: 20,
  },

  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
  },

  demoSection: {
    backgroundColor: '#1e293b',
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#e2e8f0',
  },

  headerLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 14,
    padding: 14,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
  },

  headerButton: {
    backgroundColor: '#38bdf8',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  headerButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0f172a',
  },

  summaryRow: {
    flexDirection: 'row',
    gap: 10,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#334155',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  summaryValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#38bdf8',
  },

  summaryLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#cbd5e1',
    fontWeight: '700',
  },

  horizontalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 14,
    padding: 14,
    gap: 12,
  },

  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconText: {
    fontSize: 26,
  },

  cardInfo: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },

  cardSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#cbd5e1',
  },

  cardStatus: {
    fontSize: 12,
    fontWeight: '800',
    color: '#22c55e',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#334155',
    borderRadius: 14,
    paddingVertical: 14,
  },

  navItem: {
    alignItems: 'center',
    gap: 4,
  },

  navIcon: {
    fontSize: 22,
  },

  navLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#cbd5e1',
  },
});