import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useAppTheme } from '@/hooks/app-theme';
import acidente2 from '@/assets/images/acidente2.png';

export default function NoticiasScreen() {
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#151718' : '#ffffff' }]}>
      <View style={styles.rightColumn}>
        <ThemedText style={styles.title}>ACIDENTE</ThemedText>
        <ThemedText style={[styles.text, { color: isDark ? '#ffffff' : '#000000' }]}>
          Uma colisão entre dois carros na BR-101 está atualmente atrapalhando a passagem de
          veículos na BR-101.
        </ThemedText>
        <ThemedText style={styles.title}>TRÂNSITO</ThemedText>
        <ThemedText style={[styles.text, { color: isDark ? '#ffffff' : '#000000' }]}>
          Estimativa de trânsito lento na região até 3 horas da tarde.
        </ThemedText>
      </View>
      <Image
        source={acidente2}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightColumn: { flex: 1, gap: 8 },
  title: { fontSize: 18, fontWeight: '700', color: 'rgb(255, 115, 0)' },
  text: { fontSize: 16 },
  image: { width: '45%', aspectRatio: 16 / 9, borderRadius: 12 },
});
