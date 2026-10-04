import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import { Card, PrimaryButton, SectionTitle } from '../components/ui';
import { useApp } from '../context/AppContext';
import { colors, naira } from '../theme';

const formatTime = (d) => d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' });

export default function ProfileScreen({ goBack, goMenu, signOut }) {
  const { user, balance, ridesCompleted, history } = useApp();
  const initial = user.name.trim().charAt(0).toUpperCase();

  return (
    <Screen title="User Profile" onBack={goBack} onMenu={goMenu}>
      <Card style={{ alignItems: 'center', paddingVertical: 24 }}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.id}>{user.studentId}</Text>
        <Text style={styles.dept}>{user.department}</Text>
      </Card>

      <Card>
        <Text style={styles.cardTitle}>Account Statistics</Text>
        <View style={styles.divider} />
        <Row label="Wallet Balance" value={naira(balance)} />
        <Row label="Rides Completed" value={String(ridesCompleted)} />
        <Row label="Account Status" value={user.status} valueColor={colors.success} />
      </Card>

      <SectionTitle>Recent Ride History</SectionTitle>
      {history.length === 0 ? (
        <Card>
          <Text style={styles.empty}>No rides booked yet. Reserve a seat on the Find a Ride screen and it will show up here.</Text>
        </Card>
      ) : (
        history.map((t) => (
          <Card key={t.ref}>
            <View style={styles.histTop}>
              <Text style={styles.histDriver}>{t.driver}</Text>
              <Text style={styles.histFare}>{naira(t.fare)}</Text>
            </View>
            <Text style={styles.histRoute}>{t.from} {'\u2192'} {t.to}</Text>
            <Text style={styles.histMeta}>{formatTime(t.bookedAt)} {'\u2022'} {t.ref}</Text>
          </Card>
        ))
      )}

      <View style={{ height: 6 }} />
            <PrimaryButton label="Sign Out" variant="danger" onPress={signOut} />
    </Screen>
  );
}

function Row({ label, value, valueColor }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, valueColor && { color: valueColor }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { width: 76, height: 76, borderRadius: 38, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  avatarText: { color: '#fff', fontSize: 30, fontWeight: '800' },
  name: { color: colors.text, fontSize: 20, fontWeight: '800', textAlign: 'center' },
  id: { color: colors.accentText, fontSize: 14, fontWeight: '700', marginTop: 4 },
  dept: { color: colors.muted, fontSize: 13, marginTop: 3, textAlign: 'center' },
  cardTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7 },
  rowLabel: { color: colors.muted, fontSize: 14 },
  rowValue: { color: colors.text, fontSize: 14, fontWeight: '700' },
  empty: { color: colors.muted, fontSize: 13, lineHeight: 19 },
  histTop: { flexDirection: 'row', justifyContent: 'space-between' },
  histDriver: { color: colors.text, fontSize: 15, fontWeight: '700' },
  histFare: { color: colors.success, fontSize: 14, fontWeight: '700' },
  histRoute: { color: colors.accentText, fontSize: 13, marginTop: 5 },
  histMeta: { color: colors.muted, fontSize: 11, marginTop: 5 },
});
