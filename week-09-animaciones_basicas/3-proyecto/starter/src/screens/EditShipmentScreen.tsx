import React, { useEffect } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FormField } from '../components/FormField';
import { ServicePicker } from '../components/ServicePicker';
import { usePackageById, useUpdatePackage } from '../hooks/usePackages';
import { packageSchema, type PackageFormData } from '../schemas/packageSchema';
import type { ShipmentsStackParamList } from '../navigation/types';
import { COLORS, SPACING } from '../theme';

type Props = NativeStackScreenProps<ShipmentsStackParamList, 'EditShipment'>;

export function EditShipmentScreen({ navigation, route }: Props): React.JSX.Element {
  const { data: item, isLoading } = usePackageById(route.params.id);
  const updateMutation = useUpdatePackage(route.params.id);

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<PackageFormData>({
    resolver: zodResolver(packageSchema),
    defaultValues: { customerName: '', destination: '', weightKg: '', serviceType: 'Estándar' },
  });

  useEffect(() => {
    if (item) {
      reset({
        customerName: item.customerName,
        destination: item.destination,
        weightKg: String(item.weightKg),
        serviceType: (['Express', 'Estándar', 'Mismo día'].includes(item.serviceType) ? item.serviceType : 'Estándar') as 'Express' | 'Estándar' | 'Mismo día',
      });
    }
  }, [item, reset]);

  const busy = isSubmitting;

  const onSubmit = (data: PackageFormData): void => {
    // No esperamos al servidor, volvemos ya. El fondo se actualiza solo.
    updateMutation.mutate(data);
    navigation.goBack();
  };

  if (isLoading || !item) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.mut}>Cargando envío...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.c} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Editar {item.trackingCode}</Text>
      <Text style={styles.sub}>Modifique la información del envío</Text>
      <FormField control={control} name="customerName" label="Cliente *" />
      <FormField control={control} name="destination" label="Dirección *" />
      <FormField control={control} name="weightKg" label="Peso (kg) *" keyboardType="numeric" />
      <ServicePicker control={control} />
      <Pressable onPress={handleSubmit(onSubmit)} disabled={busy} style={[styles.btn, busy && styles.disabled]}>
        {busy ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnT}>Guardar cambios</Text>}
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  c: { padding: SPACING.lg, backgroundColor: COLORS.background, flexGrow: 1 },
  center: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center', gap: 8 },
  mut: { color: COLORS.textMuted },
  title: { fontSize: 22, fontWeight: '800', color: COLORS.text },
  sub: { color: COLORS.textMuted, marginTop: 4, marginBottom: 16 },
  btn: { backgroundColor: COLORS.accent, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 8 },
  disabled: { opacity: 0.6 },
  btnT: { color: '#fff', fontWeight: '800' },
});