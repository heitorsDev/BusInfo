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
    return (
        <>
        <div style={{overflowY: 'scroll', height: '400px', width: '800px', float: 'left'}}>
        {loading && (<p style={{color: 'gray'}}>Carregando rotas...</p>)}
        {error && (<p style={{color: 'red'}}>{error}</p>)}
        {!loading && !error && rotas.map((rota) => (
            <RotaOnibus
                key={rota.Id}
                nome={`${rota.Numero} - ${rota.Name}`}
                local={''}
                destino={''}
                horario={rota.Horario_partida}
                passageiros_min={rota.Numero_passageiros}
                passageiros_max={rota.Maximo_passageiros}
                onSelect={setSelectedRota}
            />
        ))}
        {(!loading && !error && rotas.length === 0) && (
            <p style={{color: 'gray'}}>Nenhuma rota encontrada.</p>
        )}
        </div>
        <h3>Detalhes da Rota</h3>
        <div className='rotainfo'style={{float: 'left'}}>
        {selectedRota ? (
            <p><strong>Rota: </strong>{selectedRota.nome}</p>
        ) : (
            <p style={{color: 'gray'}}>Nome da rota...</p>
        )}
        <img src={caneta} style={{height: '65px', width: '65px', marginLeft: 'auto'}}></img>
        </div>

        <div className='rotainfo'style={{float: 'left'}}>
        {selectedRota ? (
            <p><strong>Partida: </strong>{selectedRota.local || '-'}</p>
        ) : (
            <p style={{color: 'gray'}}>Local de partida...</p>
        )}
        <img src={ponto} style={{height: '65px', width: '65px', marginLeft: 'auto'}}></img>
        </div>

        <div className='rotainfo'style={{float: 'left'}}>
        {selectedRota ? (
            <p><strong>Destino: </strong>{selectedRota.destino || '-'}</p>
        ) : (
            <p style={{color: 'gray'}}>Destino da rota...</p>
        )}
        <img src={ponto} style={{height: '65px', width: '65px', marginLeft: 'auto'}}></img>
        </div>
        
        <div className='rotainfo'style={{float: 'left'}}>
        {selectedRota ? (
            <p><strong>Horário: </strong>{selectedRota.horario}</p>
        ) : (
            <p style={{color: 'gray'}}>Horário de partida...</p>
        )}
        <img src={tempo} style={{height: '65px', width: '65px', marginLeft: 'auto'}}></img>
        </div>

        <div className='rotainfo'style={{float:'left'}}>
        {selectedRota  ? (
            <p><strong>Passageiros: </strong>{selectedRota.passageiros_min}<strong> à </strong>{selectedRota.passageiros_max}</p>
        ) : (
            <p style={{color: 'gray'}}>Estimativa de passageiros...</p>
        )}
        <img src={pessoa} style={{height: '65px', width: '65px', marginLeft: 'auto'}}></img>
        </div>
        </>
    );
}

export default Horarios;