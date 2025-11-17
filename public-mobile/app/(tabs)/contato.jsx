import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';

export default function ContatoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.block}> 
        <ThemedText style={styles.blockTitle}>E-Mail</ThemedText>
        <View style={styles.blockInner}>
          <ThemedText style={styles.blockText}>BusInfoMensagem@gmail.com</ThemedText>
        </View>
      </View>

      <View style={styles.block}> 
        <ThemedText style={styles.blockTitle}>Telefone</ThemedText>
        <View style={styles.blockInner}>
          <ThemedText style={styles.blockText}>+55 48 77462-1649</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  block: { gap: 8 },
  blockTitle: { fontSize: 18, fontWeight: '700', color: 'rgb(255, 115, 0)' },
  blockInner: {
    backgroundColor: 'rgb(247,247,247)',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  blockText: { color: 'rgb(44,44,44)', fontSize: 16 },
});
