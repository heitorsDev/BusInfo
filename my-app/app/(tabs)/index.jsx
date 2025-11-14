import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useAppTheme } from '@/hooks/app-theme';
import acidente2 from '@/assets/images/acidente2.png';
import logo from '@/assets/images/logo.png';

export default function NoticiasScreen() {
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#151718' : '#ffffff' }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logoImage} resizeMode="contain" />
        </View>
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
          <Image source={acidente2} resizeMode="cover" style={styles.image} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  content: { padding: 16, gap: 12, alignItems: 'stretch', paddingBottom: 24 },
  logoContainer: { width: '100%', alignItems: 'center', marginBottom: 8 },
  logoImage: { width: 120, height: 120 },
  rightColumn: { width: '100%', gap: 8 },
  title: { fontSize: 18, fontWeight: '700', color: 'rgb(255, 115, 0)' },
  text: { fontSize: 16 },
  image: { width: '90vw', height: '50vh', aspectRatio: 16 / 9, borderRadius: 12 },
});
