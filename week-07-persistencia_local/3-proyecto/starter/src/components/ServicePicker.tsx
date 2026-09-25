import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Controller, type Control } from 'react-hook-form';
import { COLORS, RADIUS, SPACING } from '../theme';
import type { PackageFormData } from '../schemas/packageSchema';

const OPTIONS = ['Express', 'Estándar', 'Mismo día'] as const;

interface Props {
  control: Control<PackageFormData>;
}

export function ServicePicker({ control }: Props): React.JSX.Element {
  return (
    <View style={styles.block}>
      <Text style={styles.label}>Servicio *</Text>
      <Controller
        control={control}
        name="serviceType"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <View style={styles.row}>
              {OPTIONS.map((op) => {
                const active = value === op;
                return (
                  <Pressable
                    key={op}
                    onPress={() => onChange(op)}
                    style={[styles.chip, active && styles.chipActive]}
                  >
                    <Text style={[styles.chipT, active && styles.chipTA]}>{op}</Text>
                  </Pressable>
                );
              })}
            </View>
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { marginBottom: SPACING.md },
  label: { color: COLORS.textMuted, fontSize: 13, fontWeight: '700', marginBottom: 6 },
  row: { flexDirection: 'row', gap: 8 },
  chip: { flex: 1, paddingVertical: 12, borderRadius: RADIUS.md, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  chipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipT: { fontSize: 13, fontWeight: '700', color: COLORS.textMuted },
  chipTA: { color: '#fff' },
  error: { color: COLORS.dangerText, fontSize: 12, marginTop: 4 },
});