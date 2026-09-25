import React, {
  useEffect,
  useState,
} from 'react';
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  usePreferences,
  type SortOrder,
} from '../hooks/usePreferences';
import {
  clearPackagesCache,
  loadPackagesCache,
} from '../storage/packagesCache';
import {
  deleteCourierToken,
  getCourierToken,
  saveCourierToken,
} from '../storage/courierSession';
import {
  COLORS,
  RADIUS,
  SPACING,
} from '../theme';

const ORDERS: {
  key: SortOrder;
  label: string;
}[] = [
  {
    key: 'recientes',
    label: 'Recientes',
  },
  {
    key: 'peso',
    label: 'Por peso',
  },
  {
    key: 'az',
    label: 'Por nombre',
  },
];

export function SettingsScreen(): React.JSX.Element {
  const {
    compact,
    sortOrder,
    setCompact,
    setSortOrder,
  } = usePreferences();

  const [tokenInput, setTokenInput] = useState<string>(
    ''
  );

  const [savedToken, setSavedToken] = useState<string | null>(
    null
  );

  const [cacheCount, setCacheCount] = useState<number>(
    0
  );

  useEffect(() => {
    getCourierToken()
      .then(setSavedToken)
      .catch(() => {});
    loadPackagesCache()
      .then((c) => setCacheCount(c?.length ?? 0))
      .catch(() => {});
  }, []);

  async function handleSaveToken(): Promise<void> {
    if (!tokenInput.trim()) {
      return;
    }
    await saveCourierToken(
      tokenInput.trim()
    );
    setSavedToken(
      tokenInput.trim()
    );
    setTokenInput('');
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
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.c}
      >
        <View style={styles.head}>
          <Text style={styles.title}>
            Ajustes
          </Text>
          <Text style={styles.sub}>
            Configuración de la aplicación
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.top}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="options-outline"
                size={22}
                color={COLORS.accent}
              />
            </View>
            <View style={styles.flex}>
              <Text style={styles.sec}>
                Apariencia
              </Text>
              <Text style={styles.status}>
                Vista y orden
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.flex}>
              <Text style={styles.label}>
                Vista compacta
              </Text>
              <Text style={styles.hint}>
                {compact
                  ? 'Mostrar más envíos en pantalla'
                  : 'Mostrar tarjetas completas'}
              </Text>
            </View>
            <Switch
              value={compact}
              onValueChange={setCompact}
            />
          </View>
          <View style={styles.rowWrap}>
            {ORDERS.map((o) => (
              <Pressable
                key={o.key}
                onPress={() => setSortOrder(o.key)}
                style={[
                  styles.chip,
                  sortOrder === o.key && styles.chipA,
                ]}
              >
                <Text
                  style={[
                    styles.chipT,
                    sortOrder === o.key && styles.chipTA,
                  ]}
                >
                  {o.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.top}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={COLORS.accent}
              />
            </View>
            <View style={styles.flex}>
              <Text style={styles.sec}>
                Acceso
              </Text>
              <Text style={styles.status}>
                Sesión protegida
              </Text>
            </View>
          </View>
          <Text style={styles.hint}>
            {savedToken
              ? 'PIN activo en este dispositivo'
              : 'Sin PIN registrado'}
          </Text>
          <TextInput
            style={styles.input}
            value={tokenInput}
            onChangeText={setTokenInput}
            placeholder="PIN de acceso"
            placeholderTextColor={COLORS.textMuted}
            autoCapitalize="none"
          />
          <Pressable
            style={styles.btn}
            onPress={handleSaveToken}
          >
            <Text style={styles.btnT}>
              Guardar PIN
            </Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.danger]}
            onPress={handleDeleteToken}
          >
            <Text style={styles.btnT}>
              Eliminar PIN
            </Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <View style={styles.top}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="cloud-offline-outline"
                size={22}
                color={COLORS.accent}
              />
            </View>
            <View style={styles.flex}>
              <Text style={styles.sec}>
                Datos sin conexión
              </Text>
              <Text style={styles.status}>
                {cacheCount} disponibles
              </Text>
            </View>
          </View>
          <Pressable
            style={[styles.btn, styles.danger]}
            onPress={handleClearCache}
          >
            <Text style={styles.btnT}>
              Eliminar datos guardados
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  c: {
    padding: SPACING.lg,
    gap: 12,
    paddingBottom: 40,
    flexGrow: 1,
    backgroundColor: COLORS.background,
  },
  head: {
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
  },
  sub: {
    color: COLORS.textMuted,
    marginTop: 4,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    gap: 10,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surfaceMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  sec: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
  },
  status: {
    fontSize: 12,
    color: COLORS.successText,
    marginTop: 2,
  },
  label: {
    color: COLORS.text,
    fontWeight: '700',
  },
  hint: {
    color: COLORS.textMuted,
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  rowWrap: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.surfaceMuted,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipA: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  chipT: {
    color: COLORS.textMuted,
    fontWeight: '700',
    fontSize: 12,
  },
  chipTA: {
    color: '#fff',
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 12,
    color: COLORS.text,
  },
  btn: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  danger: {
    backgroundColor: '#7f1d1d',
  },
  btnT: {
    color: '#fff',
    fontWeight: '800',
  },
});