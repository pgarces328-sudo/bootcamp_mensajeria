import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { ItemCard } from '../components/ItemCard';
import { packages } from '../data/mockData';
import {
  BORDER_WIDTH,
  COLORS,
  INTERACTION,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from '../theme';
import type { CourierPackage } from '../types';

export function HomeScreen() {
  const [searchText, setSearchText] = useState('');

  const filteredPackages = useMemo(() => {
    const normalizedSearch = searchText.trim().toLowerCase();

    if (normalizedSearch.length === 0) {
      return packages;
    }

    return packages.filter((item) => {
      const searchableText = [
        item.trackingCode,
        item.customerName,
        item.destination,
        item.driverName,
        item.routeName,
        item.status,
        item.serviceType,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [searchText]);

  const renderItem = useCallback(
    ({ item }: { item: CourierPackage }) => <ItemCard item={item} />,
    []
  );

  const keyExtractor = useCallback((item: CourierPackage) => item.id, []);

  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    []
  );

  const renderEmptyState = useCallback(
    () => (
      <View style={styles.emptyState}>
        <Text style={styles.emptyIcon}>🔎</Text>
        <Text style={styles.emptyTitle}>No se encontraron envíos</Text>
        <Text style={styles.emptyText}>
          Intenta buscar por código, cliente, conductor, ruta, destino o estado.
        </Text>
      </View>
    ),
    []
  );

  const handleClearSearch = useCallback(() => {
    setSearchText('');
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mensajería Courier</Text>
          <Text style={styles.headerSubtitle}>
            Lista de paquetes con búsqueda en tiempo real
          </Text>
        </View>

        <View style={styles.searchSection}>
          <Text style={styles.searchLabel}>Buscar envío</Text>

          <TextInput
            style={styles.searchInput}
            placeholder="Código, cliente, conductor, ruta o estado"
            placeholderTextColor={COLORS.textMuted}
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />

          <View style={styles.searchFooter}>
            <Text style={styles.resultText}>
              {filteredPackages.length} de {packages.length} envíos encontrados
            </Text>

            {searchText.length > 0 ? (
              <Pressable
                style={({ pressed }) => [
                  styles.clearButton,
                  pressed ? styles.clearButtonPressed : null,
                ]}
                onPress={handleClearSearch}
              >
                <Text style={styles.clearButtonText}>Limpiar</Text>
              </Pressable>
            ) : null}
          </View>
        </View>

        <FlatList
          data={filteredPackages}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          ListEmptyComponent={renderEmptyState}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.listContent,
            filteredPackages.length === 0 ? styles.listContentEmpty : null,
          ]}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },

  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    backgroundColor: COLORS.primary,
    paddingTop: SPACING.xxxl,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xxl,
  },

  headerTitle: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.title,
    fontWeight: TYPOGRAPHY.weightExtraBold,
  },

  headerSubtitle: {
    color: COLORS.border,
    fontSize: TYPOGRAPHY.body,
    lineHeight: TYPOGRAPHY.lineHeightSubtitle,
    marginTop: SPACING.xs,
  },

  searchSection: {
    backgroundColor: COLORS.surface,
    padding: SPACING.lg,
    borderBottomWidth: BORDER_WIDTH.thin,
    borderBottomColor: COLORS.border,
  },

  searchLabel: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
  },

  searchInput: {
    backgroundColor: COLORS.surfaceMuted,
    borderWidth: BORDER_WIDTH.thin,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.text,
  },

  searchFooter: {
    marginTop: SPACING.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.md,
  },

  resultText: {
    flex: 1,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightSemiBold,
    color: COLORS.textMuted,
  },

  clearButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
  },

  clearButtonPressed: {
    opacity: INTERACTION.pressedOpacity,
  },

  clearButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.weightExtraBold,
  },

  listContent: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxxl,
  },

  listContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  separator: {
    height: SPACING.lg,
  },

  emptyState: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.xxl,
    alignItems: 'center',
    borderWidth: BORDER_WIDTH.thin,
    borderColor: COLORS.border,
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: SPACING.md,
  },

  emptyTitle: {
    fontSize: TYPOGRAPHY.sectionTitle,
    fontWeight: TYPOGRAPHY.weightExtraBold,
    color: COLORS.text,
    textAlign: 'center',
  },

  emptyText: {
    marginTop: SPACING.sm,
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeightBody,
  },
});