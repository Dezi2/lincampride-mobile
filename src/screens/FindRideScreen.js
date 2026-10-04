import React, { useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import Screen from '../components/Screen';
import { Card, PrimaryButton } from '../components/ui';
import { useApp } from '../context/AppContext';
import { colors, naira } from '../theme';

export default function FindRideScreen({ navigate, goBack, goMenu }) {
  const { shuttles, reserveSeat } = useApp();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return shuttles;
    return shuttles.filter((s) =>
      [s.driver, s.vehicle, s.from, s.to].join(' ').toLowerCase().includes(q)
    );
  }, [query, shuttles]);

  const onReserve = (id) => {
    const result = reserveSeat(id);
    if (result.ok) {
      Alert.alert('Booking Confirmed', result.message, [
        { text: 'View Dashboard', onPress: () => navigate('dashboard') },
        { text: 'Stay Here', style: 'cancel' },
      ]);
    } else {
      Alert.alert('Cannot Book Ride', result.message);
    }
  };

  const renderItem = ({ item }) => {
    const full = item.seats <= 0;
    return (
      <Card>
        <View style={styles.top}>
          <Text style={styles.driver}>{item.driver}</Text>
          <Text style={styles.fare}>{naira(item.fare)}</Text>
        </View>
        <Text style={styles.vehicle}>{item.vehicle}</Text>
        <Text style={styles.route}>{item.from} {'\u2192'} {item.to}</Text>
        <View style={styles.info}>
          <Text style={styles.muted}>
            Seats: <Text style={{ color: full ? colors.dangerText : colors.success }}>{full ? 'none' : item.seats + ' left'}</Text>
          </Text>
          <Text style={styles.muted}>ETA: {item.eta} mins</Text>
        </View>
        <PrimaryButton label={full ? 'Fully Booked' : 'Reserve Seat'} disabled={full} onPress={() => onReserve(item.id)} />
      </Card>
    );
  };

  return (
    <Screen title="Find a Ride" onBack={goBack} onMenu={goMenu} scroll={false}>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search destination, faculty or driver..."
        placeholderTextColor={colors.muted}
        style={styles.search}
        autoCorrect={false}
      />
      <Text style={styles.heading}>Available Campus Shuttles</Text>
      <FlatList
        data={results}
        keyExtractor={(s) => s.id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        ListEmptyComponent={
          <Text style={[styles.muted, { textAlign: 'center', marginTop: 30 }]}>
            No shuttles match "{query}". Try a different place or driver name.
          </Text>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 12,
    color: colors.text, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14,
  },
  heading: { color: colors.text, fontSize: 17, fontWeight: '700', marginTop: 18, marginBottom: 10 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  driver: { color: colors.text, fontSize: 16, fontWeight: '700' },
  fare: { color: colors.success, fontSize: 13, fontWeight: '700', backgroundColor: colors.bg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, overflow: 'hidden' },
  vehicle: { color: colors.muted, fontSize: 12, marginTop: 3 },
  route: { color: colors.accentText, fontSize: 14, fontWeight: '600', marginVertical: 8 },
  info: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  muted: { color: colors.muted, fontSize: 12 },
});
