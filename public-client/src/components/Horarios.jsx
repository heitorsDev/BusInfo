import '../style/Header.css';
import '../style/MenuOption.css';
import '../style/Logo.css';
import '../style/Configuracao.css'
import '../style/MenuOption2.css'
import '../style/Form.css'
import '../style/Rota.css'
import RotaOnibus from './RotaOnibus.jsx'
import { useState, useEffect } from 'react';
import tempo from '../assets/tempo.png'
import caneta from '../assets/caneta.png'
import ponto from '../assets/ponto.png'
import pessoa from '../assets/pessoa.png'
import '../style/rotainfo.css'; 

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

function Horarios() {
    const [selectedRota, setSelectedRota] = useState(null);
    const [rotas, setRotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stops, setStops] = useState([]);
    const [stopsLoading, setStopsLoading] = useState(false);
    const [stopsError, setStopsError] = useState(null);

    useEffect(() => {
        async function loadRotas() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${API_BASE}/getallrotas`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                const list = Array.isArray(data?.message) ? data.message : [];
                setRotas(list);
            } catch (e) {
                setError('Falha ao carregar rotas.');
            } finally {
                setLoading(false);
            }
        }
        loadRotas();
    }, []);

    useEffect(() => {
        async function loadStops() {
            if (!selectedRota?.id) {
                setStops([]);
                setStopsError(null);
                setStopsLoading(false);
                return;
            }
            try {
                setStopsLoading(true);
                setStopsError(null);
                const res = await fetch(`${API_BASE}/rota/${selectedRota.id}/pontos`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                const list = Array.isArray(data?.message) ? data.message : [];
                setStops(list);
            } catch (e) {
                setStopsError('Falha ao carregar paradas desta rota.');
                setStops([]);
            } finally {
                setStopsLoading(false);
            }
        }
        loadStops();
    }, [selectedRota?.id]);

    return (
        <>
        <div style={{width: '60vw', float: 'left'}}>
        {loading && (<p style={{color: 'gray'}}>Carregando rotas...</p>)}
        {error && (<p style={{color: 'red'}}>{error}</p>)}
        {!loading && !error && (
            <div className="rotas-container" style={{marginTop: '30vh'}}>
                {rotas.filter((r) => r.Ativa).map((rota) => (
                    <RotaOnibus
                        key={rota.Id}
                        id={rota.Id}
                        nome={`${rota.Numero} - ${rota.Name}`}
                        horario={rota.Horario_partida}
                        passageiros_min={rota.Numero_passageiros}
                        passageiros_max={rota.Maximo_passageiros}
                        onSelect={setSelectedRota}
                    />
                ))}
            </div>
        )}

        {(!loading && !error && rotas.length === 0) && (
            <p style={{color: 'gray'}}>Nenhuma rota encontrada.</p>
        )}
        </div>

        {selectedRota && (
            <div style={{ marginTop: '30vh', marginLeft: '2vw', float: 'right' }}>
                <h3 style={{ marginBottom: '0.5vh' }}>Paradas de {selectedRota.nome}</h3>
                {stopsLoading && (<p style={{color: 'gray'}}>Carregando paradas...</p>)}
                {stopsError && (<p style={{color: 'red'}}>{stopsError}</p>)}
                {!stopsLoading && !stopsError && stops.length === 0 && (
                    <p style={{color: 'gray'}}>Nenhuma parada encontrada.</p>
                )}
                {!stopsLoading && !stopsError && stops.length > 0 && (
                    <ul className="stops-list">
                        {stops.map((p) => (
                            <li key={p.Id} className="stop-item">
                                <span>{p.Localizacao}</span>
                                {p.Horario ? <span style={{ marginLeft: 'auto' }}>{p.Horario}</span> : null}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )}
        </>
    );
}

export default Horarios;