import React, { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '../store/useAuthStore';
import { COLORS, RADIUS, SPACING } from '../theme';

const schema = z.object({
  username: z.string().min(3, 'Mínimo 3 caracteres'),
  password: z.string().min(4, 'Mínimo 4 caracteres'),
});
type FormData = z.infer<typeof schema>;

export function LoginScreen(): React.JSX.Element {
  const login = useAuthStore((s) => s.login);
  const [serverError, setServerError] = useState<string | null>(null);
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { username: 'emilys', password: 'emilyspass' },
  });

  const onSubmit = async (data: FormData): Promise<void> => {
    setServerError(null);
    try {
      await login(data.username, data.password);
    } catch {
      setServerError('Credenciales inválidas. Verifique e inténtelo nuevamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.c} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Mensajería Courier</Text>
      <Text style={styles.sub}>Ingrese sus credenciales para continuar</Text>
      <Text style={styles.label}>Usuario *</Text>
      <Controller control={control} name="username"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput style={[styles.input, error && styles.err]} value={value} onChangeText={onChange} onBlur={onBlur} placeholder="emilys" placeholderTextColor={COLORS.textMuted} autoCapitalize="none" />
            {error && <Text style={styles.e}>{error.message}</Text>}
          </>
        )}
      />
      <Text style={styles.label}>Contraseña *</Text>
      <Controller control={control} name="password"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput style={[styles.input, error && styles.err]} value={value} onChangeText={onChange} onBlur={onBlur} placeholder="••••" placeholderTextColor={COLORS.textMuted} secureTextEntry />
            {error && <Text style={styles.e}>{error.message}</Text>}
          </>
        )}
      />
      {serverError && <Text style={styles.e}>{serverError}</Text>}
      <Pressable onPress={handleSubmit(onSubmit)} disabled={isSubmitting} style={[styles.btn, isSubmitting && styles.dis]}>
        {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnT}>Iniciar sesión</Text>}
      </Pressable>
      <Text style={styles.hint}>Credenciales de demostración: emilys / emilyspass.</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  c: { padding: SPACING.lg, backgroundColor: COLORS.background, flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: COLORS.text, textAlign: 'center' },
  sub: { color: COLORS.textMuted, textAlign: 'center', marginTop: 6, marginBottom: 20 },
  label: { color: COLORS.text, fontWeight: '700', marginTop: 12, marginBottom: 6 },
  input: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, padding: 12, color: COLORS.text },
  err: { borderColor: COLORS.dangerText },
  e: { color: COLORS.dangerText, fontSize: 12, marginTop: 4 },
  btn: { backgroundColor: COLORS.accent, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 20 },
  dis: { opacity: 0.6 },
  btnT: { color: '#fff', fontWeight: '800' },
  hint: { color: COLORS.textMuted, fontSize: 12, textAlign: 'center', marginTop: 12 },
});