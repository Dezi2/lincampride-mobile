import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export default function SplashScreen() {
  return (
    <View style={styles.root}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>LINCAMPRIDE</Text>
      </View>
      <Text style={styles.title}>Campus Logistics</Text>
      <Text style={styles.subtitle}>Smart Transportation & Services Network</Text>
      <ActivityIndicator color={colors.accentText} style={{ marginTop: 28 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center', padding: 24 },
  badge: { borderWidth: 1, borderColor: colors.accentText, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, marginBottom: 18 },
  badgeText: { color: colors.accentText, fontSize: 12, fontWeight: '700', letterSpacing: 1.5 },
  title: { color: colors.text, fontSize: 34, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 8, textAlign: 'center' },
});
