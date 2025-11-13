import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function NoticiasScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.rightColumn}>
        <Text style={styles.title}>ACIDENTE</Text>
        <Text style={styles.text}>
          Uma colisão entre dois carros na BR-101 está atualmente atrapalhando a passagem de
          veículos na BR-101.
        </Text>
        <Text style={styles.title}>TRÂNSITO</Text>
        <Text style={styles.text}>Estimativa de trânsito lento na região até 3 horas da tarde.</Text>
      </View>
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', padding: 16, gap: 12 },
  rightColumn: { flex: 1, gap: 8 },
  title: { fontSize: 18, fontWeight: '700' },
  text: { fontSize: 16 },
  image: { width: '45%', aspectRatio: 16 / 9, borderRadius: 12, backgroundColor: '#eee' },
});
