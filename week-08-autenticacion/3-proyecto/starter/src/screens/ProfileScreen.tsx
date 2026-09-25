import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';
import { COLORS, RADIUS, SPACING } from '../theme';

export function ProfileScreen(): React.JSX.Element {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  return (
    <View style={styles.c}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.sub}>Sesión conservada sin necesidad de ingresar nuevamente</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Coordinador</Text>
        <Text style={styles.val}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.mut}>{user?.email}</Text>
        <Text style={styles.mut}>Usuario: {user?.username}</Text>
      </View>
      <Pressable onPress={() => { void logout(); }} style={styles.btn}>
        <Text style={styles.btnT}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  c: { flex: 1, padding: SPACING.lg, backgroundColor: COLORS.background, gap: 12 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  sub: { color: COLORS.textMuted, fontSize: 13 },
  card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.border },
  label: { color: COLORS.textMuted, fontSize: 12, fontWeight: '800' },
  val: { color: COLORS.text, fontSize: 18, fontWeight: '800', marginTop: 4 },
  mut: { color: COLORS.textMuted, marginTop: 2 },
  btn: { backgroundColor: '#7f1d1d', borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 8 },
  btnT: { color: '#fff', fontWeight: '800' },
});