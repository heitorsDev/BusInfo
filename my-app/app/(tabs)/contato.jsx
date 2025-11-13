import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ContatoScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.block}> 
        <Text style={styles.blockTitle}>E-Mail</Text>
        <View style={styles.blockInner}>
          <Text style={styles.blockText}>BusInfoMensagem@gmail.com</Text>
        </View>
      </View>

      <View style={styles.block}> 
        <Text style={styles.blockTitle}>Telefone</Text>
        <View style={styles.blockInner}>
          <Text style={styles.blockText}>+55 48 77462-1649</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  block: { gap: 8 },
  blockTitle: { fontSize: 18, fontWeight: '700' },
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
