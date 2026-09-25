import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { drivers } from '../data/mockData';
import { COLORS, RADIUS, SPACING } from '../theme';

export function DriversScreen(): React.JSX.Element {
  return (
    <View style={styles.screen}>
      <FlatList
        data={drivers}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.n}>{item.name}</Text>
            <Text style={styles.m}>{item.vehicle}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  list: { flex: 1 },
  content: { padding: SPACING.lg, paddingBottom: 32, flexGrow: 1 },
  sep: { height: 12 },
  card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  n: { fontSize: 16, fontWeight: '800', color: COLORS.text },
  m: { color: COLORS.textMuted, marginTop: 4 },
});