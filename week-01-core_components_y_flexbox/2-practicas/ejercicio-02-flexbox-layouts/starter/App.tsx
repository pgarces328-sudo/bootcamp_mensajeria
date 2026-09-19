// ============================================================
// EJERCICIO 02 — Flexbox Layouts
// ============================================================

import React from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native';

export default function App(): React.JSX.Element {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.scroll}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      {/* LAYOUT 1 — Header / Body / Footer */}
      <Text style={styles.sectionTitle}>1. Header / Body / Footer</Text>
      <View style={styles.layout1}>
        <View style={styles.header}>
          <Text style={styles.boxText}>Header</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.boxText}>Body (flex: 1)</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.boxText}>Footer</Text>
        </View>
      </View>

      {/* LAYOUT 2 — Columnas iguales */}
      <Text style={styles.sectionTitle}>2. Columnas iguales</Text>
      <View style={styles.layout2}>
        <View style={styles.col}>
          <Text style={styles.boxText}>1</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.boxText}>2</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.boxText}>3</Text>
        </View>
      </View>

      {/* LAYOUT 3 — Sidebar + contenido */}
      <Text style={styles.sectionTitle}>3. Sidebar + contenido</Text>
      <View style={styles.layout3}>
        <View style={styles.sidebar}>
          <Text style={styles.boxText}>80</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.boxText}>flex: 1</Text>
        </View>
      </View>

      {/* LAYOUT 4 — Grid 2x2 */}
      <Text style={styles.sectionTitle}>4. Grid 2x2</Text>
      <View style={styles.layout4}>
        <View style={styles.gridItem}>
          <Text style={styles.boxText}>A</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.boxText}>B</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.boxText}>C</Text>
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.boxText}>D</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  scroll: {
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    color: '#61DAFB',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 12,
  },
  boxText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },

  // LAYOUT 1 — columna con body flexible
  layout1: {
    height: 220,
    borderWidth: 1,
    borderColor: '#30363d',
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    height: 50,
    backgroundColor: '#1f6feb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: '#161b22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: 50,
    backgroundColor: '#238636',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // LAYOUT 2 — tres columnas de igual ancho
  layout2: {
    flexDirection: 'row',
    height: 90,
    gap: 8,
  },
  col: {
    flex: 1,
    backgroundColor: '#161b22',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // LAYOUT 3 — ancho fijo + resto flexible
  layout3: {
    flexDirection: 'row',
    height: 120,
    gap: 8,
  },
  sidebar: {
    width: 80,
    backgroundColor: '#1f6feb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#161b22',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // LAYOUT 4 — grid 2x2 con flexWrap
  layout4: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  gridItem: {
    width: '48%',
    height: 80,
    backgroundColor: '#161b22',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});