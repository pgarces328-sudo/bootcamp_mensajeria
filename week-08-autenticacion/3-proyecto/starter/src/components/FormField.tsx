import React from 'react';
import { StyleSheet, Text, TextInput, View, type KeyboardTypeOptions } from 'react-native';
import { Controller, type Control } from 'react-hook-form';
import { COLORS, RADIUS, SPACING } from '../theme';
import type { PackageFormData } from '../schemas/packageSchema';

interface Props {
  control: Control<PackageFormData>;
  name: keyof PackageFormData;
  label: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}

export function FormField({ control, name, label, placeholder, keyboardType }: Props): React.JSX.Element {
  return (
    <View style={styles.block}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              value={value ?? ''}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={COLORS.textMuted}
              keyboardType={keyboardType}
            />
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
  input: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADIUS.md, padding: 12, color: COLORS.text, fontSize: 15 },
  inputError: { borderColor: COLORS.dangerText },
  error: { color: COLORS.dangerText, fontSize: 12, marginTop: 4 },
});