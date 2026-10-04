import React from 'react';
import { Alert, BackHandler, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius } from '../theme';

const ITEMS = [
  { route: 'dashboard', title: 'Dashboard', note: 'Overview, active rides & balance' },
  { route: 'rides', title: 'Find a Ride', note: 'Search & book campus shuttles' },
  { route: 'weather', title: 'Nigeria Weather', note: '36 States, FCT & capitals forecast' },
  { route: 'profile', title: 'User Profile', note: 'Student ID, history & preferences' },
];

export default function MenuScreen({ navigate }) {
  const exitApp = () => {
    if (Platform.OS === 'android') {
      Alert.alert('Exit Lincampride', 'Do you want to close the app?', [
        { text: 'Stay', style: 'cancel' },
        { text: 'Exit', style: 'destructive', onPress: () => BackHandler.exitApp() },
      ]);
    } else {
      Alert.alert('Exit Lincampride', 'On iPhone, swipe up from the bottom to close the app.');
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Lincampride</Text>
      <Text style={styles.subtitle}>Campus Service Hub</Text>

      {ITEMS.map((item) => (
        <TouchableOpacity key={item.route} activeOpacity={0.8} style={styles.item} onPress={() => navigate(item.route)}>
          <View style={{ flex: 1 }}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemNote}>{item.note}</Text>
          </View>
          <Text style={styles.arrow}>{'\u2192'}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity activeOpacity={0.8} style={styles.exit} onPress={exitApp}>
        <Text style={styles.exitText}>Exit Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  title: { color: colors.text, fontSize: 32, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: colors.accentText, fontSize: 14, textAlign: 'center', marginBottom: 28, marginTop: 4 },
  item: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, padding: 16, marginBottom: 12,
  },
  itemTitle: { color: colors.text, fontSize: 16, fontWeight: '700' },
  itemNote: { color: colors.muted, fontSize: 12, marginTop: 3 },
  arrow: { color: colors.accentText, fontSize: 18 },
  exit: {
    marginTop: 10, borderWidth: 1, borderColor: colors.danger, backgroundColor: '#1a0f14',
    borderRadius: radius.card, paddingVertical: 15, alignItems: 'center',
  },
  exitText: { color: '#f87171', fontSize: 15, fontWeight: '700' },
});
