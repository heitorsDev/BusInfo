import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

export default function HorariosScreen() {
  const [rotas, setRotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedRota, setSelectedRota] = useState(null);
  const [stops, setStops] = useState([]);
  const [stopsLoading, setStopsLoading] = useState(false);
  const [stopsError, setStopsError] = useState(null);

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
    return (
      <TouchableOpacity style={styles.rotaCard} onPress={() => setSelectedRota(item)}>
        <Text style={styles.rotaTitle}>{`${item.Numero} - ${item.Name}`}</Text>
        <View style={styles.rotaMetaRow}>
          {item.Horario_partida ? (
            <Text style={styles.rotaMeta}>Partida: {item.Horario_partida}</Text>
          ) : null}
          {typeof item.Numero_passageiros === 'number' ? (
            <Text style={styles.rotaMeta}>Min: {item.Numero_passageiros}</Text>
          ) : null}
          {typeof item.Maximo_passageiros === 'number' ? (
            <Text style={styles.rotaMeta}>Max: {item.Maximo_passageiros}</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.center}><ActivityIndicator /></View>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : rotas.length === 0 ? (
        <Text style={styles.muted}>Nenhuma rota encontrada.</Text>
      ) : (
        <FlatList
          data={rotas}
          keyExtractor={(item, idx) => String(item?.Id ?? idx)}
          renderItem={renderRota}
          contentContainerStyle={styles.listContent}
        />
      )}

      {selectedRota ? (
        <View style={styles.stopsContainer}>
          <Text style={styles.stopsTitle}>Paradas de {selectedRota?.Name ?? selectedRota?.nome}</Text>
          {stopsLoading ? (
            <ActivityIndicator />
          ) : stopsError ? (
            <Text style={styles.error}>{stopsError}</Text>
          ) : stops.length === 0 ? (
            <Text style={styles.muted}>Nenhuma parada encontrada.</Text>
          ) : (
            <FlatList
              data={stops}
              keyExtractor={(item, idx) => String(item?.Id ?? idx)}
              renderItem={({ item }) => (
                <View style={styles.stopRow}>
                  <Text style={styles.stopName}>{item.Localizacao}</Text>
                  {item.Horario ? <Text style={styles.stopTime}>{item.Horario}</Text> : null}
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
  rotaCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  rotaTitle: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  rotaMetaRow: { flexDirection: 'row', gap: 12 },
  rotaMeta: { color: '#555' },
  stopsContainer: { gap: 8, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#ddd', paddingTop: 8 },
  stopsTitle: { fontSize: 18, fontWeight: '700' },
  stopRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#eee' },
  stopName: { flex: 1, fontSize: 16 },
  stopTime: { marginLeft: 8, color: '#333' },
  error: { color: 'red' },
  muted: { color: 'gray' },
});
