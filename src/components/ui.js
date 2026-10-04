import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius } from '../theme';

export function Card({ children, style }) {
  return <View style={[ui.card, style]}>{children}</View>;
}

export function SectionTitle({ children }) {
  return <Text style={ui.sectionTitle}>{children}</Text>;
}

export function PrimaryButton({ label, onPress, disabled, variant = 'primary' }) {
  const bg = variant === 'danger' ? colors.danger : colors.accent;
  const fg = variant === 'danger' ? colors.dangerText : '#ffffff';
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[ui.button, { backgroundColor: bg }, disabled && ui.buttonDisabled]}
    >
      <Text style={[ui.buttonText, { color: fg }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const ui = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 14,
  },
  sectionTitle: { color: colors.text, fontSize: 17, fontWeight: '700', marginTop: 6, marginBottom: 10 },
  button: { borderRadius: radius.button, paddingVertical: 13, alignItems: 'center' },
  buttonDisabled: { opacity: 0.35 },
  buttonText: { fontSize: 15, fontWeight: '700' },
});
