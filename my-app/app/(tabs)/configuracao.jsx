import React from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useAppTheme } from '@/hooks/app-theme';

export default function ConfiguracaoScreen() {
  const { colorScheme, setColorScheme } = useAppTheme();
  const dark = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ThemedText style={styles.title}>Modo Escuro</ThemedText>
        <Switch
          value={dark}
          onValueChange={(value) => setColorScheme(value ? 'dark' : 'light')}
        />
        <ThemedText style={styles.hint}>
          Troca entre os temas branco e escuro.
        </ThemedText>
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
  title: { fontSize: 18, fontWeight: '700', color: 'rgb(255, 115, 0)' },
  hint: { color: 'gray' },
});
