import React from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme';

const TOP_PAD = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 50;

// Shared page shell: top bar with Back / title / Menu, then the content.
export default function Screen({ title, onBack, onMenu, scroll = true, children }) {
  const Body = scroll ? ScrollView : View;
  const bodyProps = scroll
    ? { contentContainerStyle: styles.content, showsVerticalScrollIndicator: false }
    : { style: [styles.content, { flex: 1 }] };

  return (
    <View style={styles.root}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} hitSlop={10} style={styles.side}>
          <Text style={styles.link}>{'\u2190 Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <TouchableOpacity onPress={onMenu} hitSlop={10} style={[styles.side, { alignItems: 'flex-end' }]}>
          <Text style={styles.link}>Menu</Text>
        </TouchableOpacity>
      </View>
      <Body {...bodyProps}>{children}</Body>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    paddingTop: TOP_PAD + 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  side: { width: 70 },
  title: { flex: 1, textAlign: 'center', color: colors.text, fontSize: 16, fontWeight: '700' },
  link: { color: colors.accentText, fontSize: 14, fontWeight: '600' },
  content: { padding: 16, paddingBottom: 40 },
});
