import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PrimaryButton } from '../components/ui';
import { USER } from '../data/user';
import { colors, radius } from '../theme';

export default function LoginScreen({ onLogin }) {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const submit = () => {
    if (!studentId.trim() || !password) {
      setError('Enter your student ID and password.');
      return;
    }
    const idOk = studentId.trim().toUpperCase() === USER.studentId.toUpperCase();
    if (!idOk || password !== USER.password) {
      setError('Student ID or password is incorrect. Check both and try again.');
      return;
    }
    setError('');
    onLogin();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>LINCAMPRIDE</Text>
        </View>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in with your student account to book rides and check campus weather.</Text>

        <Text style={styles.label}>Student ID</Text>
        <TextInput
          value={studentId}
          onChangeText={(t) => {
            setStudentId(t);
            setError('');
          }}
          placeholder="LCP-2026-0000"
          placeholderTextColor={colors.muted}
          autoCapitalize="characters"
          autoCorrect={false}
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordRow}>
          <TextInput
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              setError('');
            }}
            placeholder="Enter your password"
            placeholderTextColor={colors.muted}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={submit}
            style={[styles.input, { flex: 1, borderWidth: 0 }]}
          />
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)} hitSlop={10}>
            <Text style={styles.toggle}>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={{ height: 18 }} />
        <PrimaryButton label="Log In" onPress={submit} />

        <View style={styles.hint}>
          <Text style={styles.hintTitle}>Demo account</Text>
          <Text style={styles.hintText}>Student ID: {USER.studentId}</Text>
          <Text style={styles.hintText}>Password: {USER.password}</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.accentText,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 5,
    marginBottom: 18,
  },
  badgeText: { color: colors.accentText, fontSize: 12, fontWeight: '700', letterSpacing: 1.5 },
  title: { color: colors.text, fontSize: 30, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 6, marginBottom: 26 },
  label: { color: colors.text, fontSize: 13, fontWeight: '600', marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.button,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.button,
    paddingRight: 14,
  },
  toggle: { color: colors.accentText, fontSize: 13, fontWeight: '700' },
  error: { color: colors.dangerText, fontSize: 13, marginTop: 12 },
  hint: {
    marginTop: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.card,
    padding: 14,
  },
  hintTitle: { color: colors.text, fontSize: 13, fontWeight: '700', marginBottom: 4 },
  hintText: { color: colors.muted, fontSize: 12, marginTop: 2 },
});