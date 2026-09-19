// ============================================================
// EJERCICIO 02 — Búsqueda con TextInput
// ============================================================

import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  Keyboard,
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  type ListRenderItem,
} from 'react-native';

interface Item {
  id: string;
  title: string;
  subtitle: string;
}

const ITEMS: Item[] = [
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
  const [query, setQuery] = useState<string>('');

  // PASO 2 — Filtrado con useMemo, insensible a mayúsculas
  const filteredItems = useMemo((): Item[] => {
    const q = query.trim().toLowerCase();
    if (q === '') {
      return ITEMS;
    }
    return ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
    );
  }, [query]);

  // PASO 4 — Limpiar búsqueda
  const handleClear = useCallback((): void => {
    setQuery('');
    Keyboard.dismiss();
  }, []);

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

  const renderSeparator = useCallback(
    (): React.JSX.Element => <View style={styles.separator} />,
    []
  );

  // PASO 3 — Estado vacío
  const renderEmpty = useCallback(
    (): React.JSX.Element => (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyTitle}>Sin resultados</Text>
        <Text style={styles.emptyText}>
          No se encontraron coincidencias para "{query}".
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.emptyBtn,
            pressed && styles.emptyBtnPressed,
          ]}
          onPress={handleClear}
        >
          <Text style={styles.emptyBtnText}>Limpiar búsqueda</Text>
        </Pressable>
      </View>
    ),
    [query, handleClear]
  );

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      {/* PASO 5 — Gestión del teclado */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.flex}>
            <View style={styles.topBar}>
              <Text style={styles.topBarTitle}>Ejercicio 02 — Búsqueda</Text>
            </View>

            {/* PASO 1 — TextInput controlado */}
            <View style={styles.searchWrapper}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                value={query}
                onChangeText={setQuery}
                placeholder="Buscar por nombre o especialidad..."
                placeholderTextColor="#6e7681"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="search"
                clearButtonMode="never"
              />
              {query.length > 0 ? (
                <Pressable
                  onPress={handleClear}
                  hitSlop={10}
                  style={({ pressed }) => [
                    styles.clearIcon,
                    pressed && styles.clearIconPressed,
                  ]}
                >
                  <Text style={styles.clearIconText}>✕</Text>
                </Pressable>
              ) : null}
            </View>

            <Text style={styles.resultCount}>
              {filteredItems.length}{' '}
              {filteredItems.length === 1 ? 'resultado' : 'resultados'}
            </Text>

            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={renderSeparator}
              ListEmptyComponent={renderEmpty}
              contentContainerStyle={styles.listContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  screen: {
    flex: 1,
    backgroundColor: '#0d1117',
  },

  topBar: {
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

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    height: 44,
    backgroundColor: '#161b22',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  searchIcon: {
    fontSize: 15,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 15,
    padding: 0,
  },
  clearIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#30363d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearIconPressed: {
    opacity: 0.6,
  },
  clearIconText: {
    color: '#8b949e',
    fontSize: 12,
    fontWeight: 'bold',
  },

  resultCount: {
    color: '#8b949e',
    fontSize: 12,
    marginHorizontal: 16,
    marginTop: 12,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    flexGrow: 1,
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
    paddingVertical: 60,
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
    paddingHorizontal: 32,
  },
  emptyBtn: {
    marginTop: 12,
    backgroundColor: '#21262d',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  emptyBtnPressed: {
    opacity: 0.6,
  },
  emptyBtnText: {
    color: '#58a6ff',
    fontSize: 13,
    fontWeight: '600',
  },
});