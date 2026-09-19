// ============================================================
// EJERCICIO 01 — FlatList Básica
// ============================================================

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  type ListRenderItem,
} from 'react-native';

interface Item {
  id: string;
  title: string;
  subtitle: string;
}

const INITIAL_ITEMS: Item[] = [
  { id: '1', title: 'Ada Lovelace', subtitle: 'Primera programadora' },
  { id: '2', title: 'Alan Turing', subtitle: 'Padre de la computación' },
  { id: '3', title: 'Grace Hopper', subtitle: 'Creadora del primer compilador' },
  { id: '4', title: 'Dennis Ritchie', subtitle: 'Creador del lenguaje C' },
  { id: '5', title: 'Margaret Hamilton', subtitle: 'Software del Apollo 11' },
  { id: '6', title: 'Linus Torvalds', subtitle: 'Creador de Linux y Git' },
  { id: '7', title: 'Barbara Liskov', subtitle: 'Principio de sustitución' },
  { id: '8', title: 'Tim Berners-Lee', subtitle: 'Inventor de la World Wide Web' },
  { id: '9', title: 'Katherine Johnson', subtitle: 'Cálculos orbitales NASA' },
  { id: '10', title: 'Brendan Eich', subtitle: 'Creador de JavaScript' },
  { id: '11', title: 'Guido van Rossum', subtitle: 'Creador de Python' },
  { id: '12', title: 'Radia Perlman', subtitle: 'Protocolo Spanning Tree' },
];

export default function App(): React.JSX.Element {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // PASO 6 — Pull to refresh
  const handleRefresh = useCallback((): void => {
    setRefreshing(true);
    setTimeout(() => {
      setItems(INITIAL_ITEMS);
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleClear = useCallback((): void => {
    setItems([]);
  }, []);

  // PASO 1 — renderItem
  const renderItem: ListRenderItem<Item> = useCallback(
    ({ item }) => (
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.title.charAt(0)}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.cardSubtitle} numberOfLines={1}>
            {item.subtitle}
          </Text>
        </View>
      </View>
    ),
    []
  );

  // PASO 3 — Separador
  const renderSeparator = useCallback(
    (): React.JSX.Element => <View style={styles.separator} />,
    []
  );

  // PASO 4 — Encabezado
  const renderHeader = useCallback(
    (): React.JSX.Element => (
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Referentes de la informática</Text>
        <Text style={styles.listCount}>{items.length} elementos</Text>
      </View>
    ),
    [items.length]
  );

  // PASO 5 — Estado vacío
  const renderEmpty = useCallback(
    (): React.JSX.Element => (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>📋</Text>
        <Text style={styles.emptyTitle}>La lista está vacía</Text>
        <Text style={styles.emptyText}>
          Desliza hacia abajo para recargar los elementos.
        </Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Ejercicio 01 — FlatList</Text>
        <Pressable
          style={({ pressed }) => [
            styles.clearBtn,
            pressed && styles.clearBtnPressed,
          ]}
          onPress={handleClear}
        >
          <Text style={styles.clearBtnText}>Vaciar lista</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0d1117',
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  topBarTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearBtn: {
    backgroundColor: '#21262d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  clearBtnPressed: {
    opacity: 0.6,
  },
  clearBtnText: {
    color: '#f85149',
    fontSize: 12,
    fontWeight: '600',
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },

  listHeader: {
    paddingVertical: 16,
  },
  listTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listCount: {
    color: '#8b949e',
    fontSize: 13,
    marginTop: 2,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1f6feb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: '#8b949e',
    fontSize: 13,
    marginTop: 2,
  },

  separator: {
    height: 1,
    backgroundColor: '#21262d',
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    gap: 6,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#8b949e',
    fontSize: 13,
    textAlign: 'center',
  },
});