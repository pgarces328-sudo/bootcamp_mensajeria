import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import {
  COLORS,
  RADIUS,
  SPACING,
} from '../theme';

export function ProfileScreen(): React.JSX.Element {
  const user = useAuthStore(
    (s) => s.user
  );
  const logout = useAuthStore(
    (s) => s.logout
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.c}
    >
      <View style={styles.headerCard}>
        <Image
          source={{
            uri: 'https://i.pravatar.cc/150?img=32',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>
          {user?.firstName ?? 'Coordinador'} {user?.lastName ?? ''}
        </Text>
        <Text style={styles.email}>
          {user?.email ?? 'courier@empresa.com'}
        </Text>
        <View style={styles.pill}>
          <Text style={styles.pillT}>
            ● Sesión activa
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.row}>
          Usuario: {user?.username ?? 'courier'}
        </Text>
      </View>

      <Pressable
        style={styles.btn}
        onPress={() => {
          void logout();
        }}
      >
        <Text style={styles.btnT}>
          Cerrar sesión
        </Text>
      </Pressable>
    </ScrollView>
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
    paddingBottom: 32,
    flexGrow: 1,
  },
  headerCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 3,
    borderColor: COLORS.accent,
    backgroundColor: COLORS.surfaceMuted,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
    marginTop: 12,
  },
  email: {
    color: COLORS.textMuted,
    marginTop: 4,
  },
  pill: {
    marginTop: 10,
    backgroundColor: COLORS.successBackground,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillT: {
    color: COLORS.successText,
    fontWeight: '800',
    fontSize: 12,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  row: {
    color: COLORS.text,
  },
  btn: {
    backgroundColor: '#7f1d1d',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  btnT: {
    color: '#fff',
    fontWeight: '800',
  },
});