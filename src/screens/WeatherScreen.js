import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Screen from '../components/Screen';
import { DEFAULT_STATE, STATES, labelFor } from '../data/states';
import { fetchWeather } from '../services/weather';
import { colors } from '../theme';

export default function WeatherScreen({ goBack, goMenu }) {
  const [selected, setSelected] = useState(DEFAULT_STATE);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setWeather(null);
    fetchWeather(selected.lat, selected.lon, controller.signal)
      .then((w) => setWeather(w))
      .catch((e) => {
        if (e.name !== 'AbortError') setError('Could not load weather. Check your internet connection and try again.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [selected, attempt]);

  const header = (
    <View>
      <View style={styles.card}>
        <Text style={styles.state}>{labelFor(selected)}</Text>
        <Text style={styles.capital}>Capital: {selected.capital}, Nigeria</Text>

        {loading && <ActivityIndicator color={colors.accentText} size="large" style={{ marginVertical: 30 }} />}

        {!loading && error ? (
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <Text style={styles.error}>{error}</Text>
            <TouchableOpacity onPress={() => setAttempt((n) => n + 1)} style={styles.retry}>
              <Text style={styles.retryText}>Try again</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {!loading && weather ? (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.temp}>{weather.temperature}{'\u00B0'}C</Text>
            <Text style={styles.condition}>{weather.condition}</Text>
            <View style={styles.divider} />
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Wind Speed</Text>
                <Text style={styles.statValue}>{weather.windSpeed} km/h</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Humidity</Text>
                <Text style={styles.statValue}>{weather.humidity}%</Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>
      <Text style={styles.listTitle}>SELECT STATE / CAPITAL</Text>
    </View>
  );

  return (
    <Screen title="Nigeria Weather" onBack={goBack} onMenu={goMenu} scroll={false}>
      <FlatList
        data={STATES}
        keyExtractor={(s) => s.state}
        ListHeaderComponent={header}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => {
          const active = item.state === selected.state;
          return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => setSelected(item)} style={[styles.item, active && styles.itemActive]}>
              <Text style={styles.itemName}>{labelFor(item)}</Text>
              <Text style={[styles.itemCap, active && { color: '#d7f3f9' }]}>Capital: {item.capital}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 20, alignItems: 'center', minHeight: 190 },
  state: { color: colors.text, fontSize: 24, fontWeight: '800' },
  capital: { color: colors.muted, fontSize: 12, marginTop: 4 },
  temp: { color: colors.accentText, fontSize: 52, fontWeight: '800', marginTop: 14 },
  condition: { color: colors.text, fontSize: 16, fontWeight: '600', marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.border, alignSelf: 'stretch', marginVertical: 16 },
  statsRow: { flexDirection: 'row', alignSelf: 'stretch' },
  statBox: { flex: 1, alignItems: 'center' },
  statLabel: { color: colors.muted, fontSize: 11 },
  statValue: { color: colors.text, fontSize: 16, fontWeight: '700', marginTop: 4 },
  error: { color: colors.dangerText, fontSize: 13, textAlign: 'center' },
  retry: { marginTop: 12, borderWidth: 1, borderColor: colors.accentText, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 18 },
  retryText: { color: colors.accentText, fontWeight: '700' },
  listTitle: { color: colors.muted, fontSize: 12, fontWeight: '700', letterSpacing: 1, marginTop: 20, marginBottom: 10 },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingVertical: 14, paddingHorizontal: 14, marginBottom: 8 },
  itemActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  itemName: { color: colors.text, fontSize: 14, fontWeight: '700' },
  itemCap: { color: colors.muted, fontSize: 12 },
});
