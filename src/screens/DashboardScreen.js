import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../components/Screen';
import { Card, PrimaryButton, SectionTitle } from '../components/ui';
import { useApp } from '../context/AppContext';
import { DEFAULT_STATE } from '../data/states';
import { fetchWeather } from '../services/weather';
import { colors, naira } from '../theme';

export default function DashboardScreen({ navigate, goBack, goMenu }) {
  const { user, balance, shuttles, activeTrip, ridesCompleted, cancelTrip } = useApp();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadWeather = async () => {
    setLoading(true);
    setError('');
    try {
      setWeather(await fetchWeather(DEFAULT_STATE.lat, DEFAULT_STATE.lon));
    } catch (e) {
      setError('Could not load weather. Check your internet connection and tap to retry.');
    } finally {
      setLoading(false);
    }
  };

  const confirmCancel = () =>
    Alert.alert('Cancel booking', 'Your fare will be refunded to your wallet.', [
      { text: 'Keep booking', style: 'cancel' },
      { text: 'Cancel ride', style: 'destructive', onPress: cancelTrip },
    ]);

  return (
    <Screen title="Dashboard" onBack={goBack} onMenu={goMenu}>
      <Card style={styles.welcome}>
        <View style={{ flex: 1 }}>
          <Text style={styles.muted}>Welcome back,</Text>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.meta}>{user.department} {'\u2022'} {user.studentId}</Text>
        </View>
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balance}>{naira(balance)}</Text>
        </View>
      </Card>

      <SectionTitle>Active Trip Status</SectionTitle>
      <Card>
        {activeTrip ? (
          <View>
            <Text style={styles.tripDriver}>{activeTrip.driver} {'\u2022'} {activeTrip.ref}</Text>
            <Text style={styles.tripRoute}>{activeTrip.from} {'\u2192'} {activeTrip.to}</Text>
            <Text style={styles.muted}>{activeTrip.vehicle} {'\u2022'} Arrives in about {activeTrip.eta} mins {'\u2022'} {naira(activeTrip.fare)}</Text>
            <View style={{ height: 14 }} />
            <PrimaryButton label="Cancel Booking" variant="danger" onPress={confirmCancel} />
          </View>
        ) : (
          <View>
            <Text style={styles.emptyTitle}>No Active Booking</Text>
            <Text style={styles.emptyNote}>You currently have no scheduled rides on campus.</Text>
            <PrimaryButton label="Book Campus Ride" onPress={() => navigate('rides')} />
          </View>
        )}
      </Card>

      <SectionTitle>Campus Services Overview</SectionTitle>
      <View style={styles.row}>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{shuttles.length}</Text>
          <Text style={styles.statLabel}>Active Drivers</Text>
        </Card>
        <Card style={styles.stat}>
          <Text style={styles.statValue}>{ridesCompleted}</Text>
          <Text style={styles.statLabel}>Total Rides Taken</Text>
        </Card>
      </View>

      <Card>
        <View style={styles.weatherHead}>
          <Text style={styles.weatherTitle}>Campus Location Weather</Text>
          <TouchableOpacity onPress={() => navigate('weather')} hitSlop={8}>
            <Text style={styles.viewAll}>View All {'\u2192'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={loadWeather} disabled={loading}>
          <Text style={styles.weatherPlace}>Lagos State (Ikeja)</Text>
          {loading ? (
            <ActivityIndicator color={colors.accentText} style={{ alignSelf: 'flex-start', marginTop: 8 }} />
          ) : error ? (
            <Text style={[styles.muted, { color: colors.dangerText, marginTop: 4 }]}>{error}</Text>
          ) : weather ? (
            <Text style={styles.weatherNow}>{weather.temperature}{'\u00B0'}C {'\u2022'} {weather.condition} {'\u2022'} Humidity {weather.humidity}%</Text>
          ) : (
            <Text style={styles.muted}>Tap to fetch live weather details</Text>
          )}
        </TouchableOpacity>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  welcome: { flexDirection: 'row', alignItems: 'center' },
  muted: { color: colors.muted, fontSize: 12 },
  name: { color: colors.text, fontSize: 18, fontWeight: '800', marginTop: 2 },
  meta: { color: colors.accentText, fontSize: 11, marginTop: 4 },
  balanceBox: { backgroundColor: colors.bg, borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12, alignItems: 'center', marginLeft: 10 },
  balanceLabel: { color: colors.muted, fontSize: 10 },
  balance: { color: colors.success, fontSize: 16, fontWeight: '800', marginTop: 2 },
  emptyTitle: { color: colors.text, fontSize: 17, fontWeight: '700', textAlign: 'center' },
  emptyNote: { color: colors.muted, fontSize: 12, textAlign: 'center', marginTop: 4, marginBottom: 14 },
  tripDriver: { color: colors.text, fontSize: 16, fontWeight: '700' },
  tripRoute: { color: colors.accentText, fontSize: 14, fontWeight: '600', marginVertical: 6 },
  row: { flexDirection: 'row', gap: 12 },
  stat: { flex: 1, marginBottom: 14 },
  statValue: { color: colors.accentText, fontSize: 26, fontWeight: '800' },
  statLabel: { color: colors.muted, fontSize: 12, marginTop: 2 },
  weatherHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  weatherTitle: { color: colors.text, fontSize: 15, fontWeight: '700' },
  viewAll: { color: colors.accentText, fontSize: 13, fontWeight: '600' },
  weatherPlace: { color: colors.text, fontSize: 14, fontWeight: '600', marginBottom: 3 },
  weatherNow: { color: colors.accentText, fontSize: 13, marginTop: 4 },
});
