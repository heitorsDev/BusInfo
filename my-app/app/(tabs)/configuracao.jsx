import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function ConfiguracaoScreen() {
  const [dark, setDark] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Modo Escuro</Text>
        <Switch value={dark} onValueChange={setDark} />
        <Text style={styles.hint}>
          Esta alternância é local ao app. O tema real segue as configurações do sistema.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    gap: 8,
  },
  title: { fontSize: 18, fontWeight: '700', color: 'rgb(255,115,0)' },
  hint: { color: 'gray' },
});
