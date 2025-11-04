import '../style/Header.css';
import '../style/MenuOption.css';
import '../style/Logo.css';
import '../style/Configuracao.css'
import '../style/MenuOption2.css'
import '../style/Form.css'
import '../style/Rota.css'
import onibusreceba from '../assets/onibusreceba.png';
import { useState } from 'react';

function RotaOnibus(props) {
    const handleClick = () => {
        props.onSelect({
            nome: props.nome,
            local: props.local,
            destino: props.destino,
            horario: props.horario,
            passageiros_min: props.passageiros_min,
            passageiros_max: props.passageiros_max
        });
    };
    
    return (
        <>
        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', marginRight: '175px' }}>
            <button className='rota' style={{ width: '525px', height: '135px', marginRight: '20px', marginBottom: '20px' }}
                onClick={handleClick}>
                <ol>
                    <b>{props.nome}</b>
                    <p>Destino: {props.destino}</p>
                </ol>
                <img src={onibusreceba} style={{ width: '90px', height: '100px' }} className='img' alt="ônibus" />
            </button>
        </div>
        </>
    );
}


export default RotaOnibus;