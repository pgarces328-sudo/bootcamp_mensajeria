import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, TextInput, View, ScrollView } from 'react-native';
import { usePreferences, type SortOrder } from '../hooks/usePreferences';
import { clearPackagesCache, loadPackagesCache } from '../storage/packagesCache';
import { deleteCourierToken, getCourierToken, saveCourierToken } from '../storage/courierSession';
import { COLORS, RADIUS, SPACING } from '../theme';

const ORDERS: { key: SortOrder; label: string }[] = [
  { key: 'recientes', label: 'Recientes' },
  { key: 'peso', label: 'Por peso' },
  { key: 'az', label: 'Por nombre' },
];

export function SettingsScreen(): React.JSX.Element {
  const { compact, sortOrder, setCompact, setSortOrder } = usePreferences();
  const [tokenInput, setTokenInput] = useState<string>('');
  const [savedToken, setSavedToken] = useState<string | null>(null);
  const [cacheCount, setCacheCount] = useState<number>(0);

  useEffect(() => {
    getCourierToken().then((v) => setSavedToken(v)).catch(() => {});
    loadPackagesCache().then((c) => setCacheCount(c?.length ?? 0)).catch(() => {});
  }, []);

  async function handleSaveToken(): Promise<void> {
    if (!tokenInput.trim()) {
      Alert.alert('Vacío', 'Escriba un PIN primero');
      return;
    }
    try {
      await saveCourierToken(tokenInput.trim());
      setSavedToken(tokenInput.trim());
      setTokenInput('');
      Alert.alert('Guardado', 'PIN activo en este dispositivo');
    } catch (e) {
      console.log('[token] error al guardar', e);
      Alert.alert('Error', 'No se pudo guardar el PIN');
    }
  }

  async function handleDeleteToken(): Promise<void> {
    await deleteCourierToken();
    setSavedToken(null);
  }

  async function handleClearCache(): Promise<void> {
    await clearPackagesCache();
    setCacheCount(0);
  }

  return (
    <ScrollView contentContainerStyle={styles.c}>
      <Text style={styles.title}>Ajustes</Text>
      <Text style={styles.sub}>Configuración de la aplicación</Text>

      <View style={styles.card}>
        <Text style={styles.sec}>Vista de la lista</Text>
        <View style={styles.row}>
          <View style={styles.flex}>
            <Text style={styles.label}>Vista compacta</Text>
            <Text style={styles.hint}>{compact ? 'Mostrar más envíos en pantalla' : 'Mostrar tarjetas completas'}</Text>
          </View>
          <Switch value={compact} onValueChange={setCompact} />
        </View>
        <Text style={[styles.label, styles.mt]}>Ordenar por</Text>
        <View style={styles.rowWrap}>
          {ORDERS.map((o) => (
            <Pressable key={o.key} onPress={() => setSortOrder(o.key)} style={[styles.chip, sortOrder === o.key && styles.chipA]}>
              <Text style={[styles.chipT, sortOrder === o.key && styles.chipTA]}>{o.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sec}>Acceso</Text>
        <Text style={styles.hint}>{savedToken ? 'PIN activo en este dispositivo' : 'Sin PIN registrado'}</Text>
        <TextInput style={styles.input} value={tokenInput} onChangeText={setTokenInput} placeholder="PIN de acceso" placeholderTextColor={COLORS.textMuted} autoCapitalize="none" />
        <Pressable style={styles.btn} onPress={handleSaveToken}><Text style={styles.btnT}>Guardar PIN</Text></Pressable>
        <Pressable style={[styles.btn, styles.danger]} onPress={handleDeleteToken}><Text style={styles.btnT}>Eliminar PIN</Text></Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.sec}>Datos sin conexión</Text>
        <Text style={styles.hint}>{cacheCount} envíos disponibles sin conexión</Text>
        <Pressable style={[styles.btn, styles.danger]} onPress={handleClearCache}><Text style={styles.btnT}>Eliminar datos guardados</Text></Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  c: { padding: SPACING.lg, backgroundColor: COLORS.background, gap: 12, paddingBottom: 32 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  sub: { color: COLORS.textMuted, fontSize: 13 },
  card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border, gap: 10 },
  sec: { fontSize: 14, fontWeight: '800', color: COLORS.text },
  label: { color: COLORS.text, fontWeight: '700' },
  hint: { color: COLORS.textMuted, fontSize: 12 },
  mt: { marginTop: 8 },
  flex: { flex: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 12 },
  rowWrap: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, backgroundColor: COLORS.surfaceMuted, borderWidth: 1, borderColor: COLORS.border },
  chipA: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipT: { color: COLORS.textMuted, fontWeight: '700', fontSize: 12 },
  chipTA: { color: '#fff' },
  input: { backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, color: COLORS.text },
  btn: { backgroundColor: COLORS.accent, borderRadius: 10, padding: 12, alignItems: 'center' },
  danger: { backgroundColor: '#7f1d1d' },
  btnT: { color: '#fff', fontWeight: '800' },
});