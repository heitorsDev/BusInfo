import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useAppTheme } from '@/hooks/app-theme';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

export default function HorariosScreen() {
  const [rotas, setRotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedRota, setSelectedRota] = useState(null);
  const [stops, setStops] = useState([]);
  const [stopsLoading, setStopsLoading] = useState(false);
  const [stopsError, setStopsError] = useState(null);
  const { colorScheme } = useAppTheme();
  const isDark = colorScheme === 'dark';

  const [query, setQuery] = useState('');

  const filteredRotas = useMemo(() => {
    if (!query?.trim()) return rotas;
    const q = query.trim().toLowerCase();
    return rotas.filter((r) => {
      if (!r) return false;
      // Try to match by an explicit number field if present
      const explicitNumber = [r.Numero, r.numero, r.Numero_rota, r.numero_rota, r.NumeroRota]
        .find((n) => typeof n === 'string' || typeof n === 'number');
      if (explicitNumber && String(explicitNumber).toLowerCase().includes(q)) return true;
      // Fallback: extract digits from name and compare
      const name = typeof r.Name === 'string' ? r.Name : (typeof r.nome === 'string' ? r.nome : '');
      const digitsInName = (name.match(/\d+/g) || []).join(' ');
      if (digitsInName && digitsInName.toLowerCase().includes(q)) return true;
      // Also allow name substring as last resort (in case user types full text)
      return name.toLowerCase().includes(q);
    });
  }, [rotas, query]);

  useEffect(() => {
    let cancelled = false;
    async function loadRotas() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE}/getallrotas`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data?.message) ? data.message : [];
        if (!cancelled) setRotas(list);
      } catch (e) {
        if (!cancelled) setError('Falha ao carregar rotas.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadRotas();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function loadStops() {
      if (!selectedRota?.Id) {
        setStops([]);
        setStopsError(null);
        setStopsLoading(false);
        return;
      }
      try {
        setStopsLoading(true);
        setStopsError(null);
        const res = await fetch(`${API_BASE}/rota/${selectedRota.Id}/pontos`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list = Array.isArray(data?.message) ? data.message : [];
        if (!cancelled) setStops(list);
      } catch (e) {
        if (!cancelled) {
          setStopsError('Falha ao carregar paradas desta rota.');
          setStops([]);
        }
      } finally {
        if (!cancelled) setStopsLoading(false);
      }
    }
    loadStops();
    return () => { cancelled = true; };
  }, [selectedRota?.Id]);

  const renderRota = ({ item }) => {
    if (!item?.Ativa) return null;
    const explicitNumber = [item.Numero, item.numero, item.Numero_rota, item.numero_rota, item.NumeroRota]
      .find((n) => typeof n === 'string' || typeof n === 'number');
    const nameForDigits = typeof item.Name === 'string' ? item.Name : (typeof item.nome === 'string' ? item.nome : '');
    const digitsInName = (nameForDigits.match(/\d+/g) || []).join(' ').trim();
    const rotaNumber = explicitNumber ? String(explicitNumber) : digitsInName;
    return (
      <TouchableOpacity style={styles.rotaCard} onPress={() => setSelectedRota(item)}>
        <ThemedText style={styles.rotaTitle}>
          {rotaNumber ? `[${rotaNumber}] ` : ''}{item.Name}
          {typeof item.Numero_passageiros === 'number' && typeof item.Maximo_passageiros === 'number'
            ? ` - ${item.Numero_passageiros} / ${item.Maximo_passageiros}`
            : ''}
        </ThemedText>
        <View style={styles.rotaMetaRow}>
          {item.Horario_partida ? (
            <ThemedText style={styles.rotaMeta}>Partida: {item.Horario_partida}</ThemedText>
          ) : null}
          {typeof item.Numero_passageiros === 'number' ? (
            <ThemedText style={styles.rotaMeta}>Min: {item.Numero_passageiros}</ThemedText>
          ) : null}
          {typeof item.Maximo_passageiros === 'number' ? (
            <ThemedText style={styles.rotaMeta}>Max: {item.Maximo_passageiros}</ThemedText>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar pelo número da rota"
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          style={[
            styles.searchInput,
            { backgroundColor: isDark ? '#1e1e1e' : '#fff', color: isDark ? '#fff' : '#000' },
          ]}
          keyboardType="numeric"
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>
      {loading ? (
        <View style={styles.center}><ActivityIndicator /></View>
      ) : error ? (
        <ThemedText style={styles.error}>{error}</ThemedText>
      ) : rotas.length === 0 ? (
        <ThemedText style={styles.muted}>Nenhuma rota encontrada.</ThemedText>
      ) : (
        <FlatList
          data={filteredRotas}
          keyExtractor={(item, idx) => String(item?.Id ?? idx)}
          renderItem={renderRota}
          contentContainerStyle={styles.listContent}
        />
      )}

      {selectedRota ? (
        <View style={styles.stopsContainer}>
          <ThemedText style={styles.stopsTitle}>Paradas de {selectedRota?.Name ?? selectedRota?.nome}</ThemedText>
          {(
            typeof selectedRota?.Numero_passageiros === 'number' ||
            typeof selectedRota?.Maximo_passageiros === 'number'
          ) ? (
            <ThemedText style={styles.passengersInfo}>
              {`Passageiros: ${
                typeof selectedRota?.Numero_passageiros === 'number' ? selectedRota.Numero_passageiros : '—'
              }${
                typeof selectedRota?.Maximo_passageiros === 'number' ? ` / ${selectedRota.Maximo_passageiros}` : ''
              }`}
            </ThemedText>
          ) : null}
          {stopsLoading ? (
            <ActivityIndicator />
          ) : stopsError ? (
            <ThemedText style={styles.error}>{stopsError}</ThemedText>
          ) : stops.length === 0 ? (
            <ThemedText style={styles.muted}>Nenhuma parada encontrada.</ThemedText>
          ) : (
            <FlatList
              data={stops}
              keyExtractor={(item, idx) => String(item?.Id ?? idx)}
              renderItem={({ item }) => (
                <View
                  style={[
                    styles.stopRow,
                    { borderBottomColor: isDark ? '#eee' : '#000000' },
                  ]}
                >
                  <ThemedText
                    style={[styles.stopName, { color: isDark ? '#ffffff' : '#000000' }]}
                  >
                    {item.Localizacao}
                  </ThemedText>
                  {item.Horario ? (
                    <ThemedText
                      style={[styles.stopTime, { color: isDark ? '#ffffff' : '#000000' }]}
                    >
                      {item.Horario}
                    </ThemedText>
                  ) : null}
                </View>
              )}
            />
          )}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  listContent: { gap: 12, paddingBottom: 16 },
  searchRow: { flexDirection: 'row' },
  searchInput: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rotaCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  rotaTitle: { fontSize: 16, fontWeight: '600', marginBottom: 6, color: 'rgb(255, 115, 0)' },
  rotaMetaRow: { flexDirection: 'row', gap: 12 },
  rotaMeta: {},
  stopsContainer: { gap: 8, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#ddd', paddingTop: 8 },
  stopsTitle: { fontSize: 18, fontWeight: '700', color: 'rgb(255, 115, 0)' },
  passengersInfo: { fontSize: 14, marginBottom: 4 },
  stopRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#eee' },
  stopName: { flex: 1, fontSize: 16 },
  stopTime: { marginLeft: 8 },
  error: {},
  muted: { color: 'gray' },
});
