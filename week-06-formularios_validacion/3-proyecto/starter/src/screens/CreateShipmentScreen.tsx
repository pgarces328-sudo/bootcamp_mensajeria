import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormField } from '../components/FormField';
import { ServicePicker } from '../components/ServicePicker';
import { useCreatePackage } from '../hooks/usePackages';
import { packageSchema, type PackageFormData } from '../schemas/packageSchema';
import type { ShipmentsStackParamList } from '../navigation/types';
import { COLORS, SPACING } from '../theme';

type Props = NativeStackScreenProps<ShipmentsStackParamList, 'CreateShipment'>;

export function CreateShipmentScreen({ navigation }: Props): React.JSX.Element {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<PackageFormData>({
    resolver: zodResolver(packageSchema),
    defaultValues: { customerName: '', destination: '', weightKg: '', serviceType: 'Estándar' },
  });

  const createMutation = useCreatePackage();
  const busy = isSubmitting || createMutation.isPending;

  const onSubmit = (data: PackageFormData): void => {
    createMutation.mutate(data, { onSuccess: () => navigation.goBack() });
  };

  return (
    <ScrollView contentContainerStyle={styles.c} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Nuevo envío</Text>
      <Text style={styles.sub}>Completa los datos para registrar el envío</Text>
      <FormField control={control} name="customerName" label="Cliente *" placeholder="Ej: Tecnología Andina" />
      <FormField control={control} name="destination" label="Dirección *" placeholder="Ej: Calle 100 #15-20, Bogotá" />
      <FormField control={control} name="weightKg" label="Peso (kg) *" placeholder="2.4" keyboardType="numeric" />
      <ServicePicker control={control} />
      <Pressable onPress={handleSubmit(onSubmit)} disabled={busy} style={[styles.btn, busy && styles.disabled]}>
        {busy ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnT}>Crear envío</Text>}
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  c: { padding: SPACING.lg, backgroundColor: COLORS.background, flexGrow: 1 },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  sub: { color: COLORS.textMuted, marginTop: 4, marginBottom: 16 },
  btn: { backgroundColor: COLORS.accent, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 8 },
  disabled: { opacity: 0.6 },
  btnT: { color: '#fff', fontWeight: '800' },
});