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
            id: props.id,
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
        <div style={{marginTop: '2vh'}}>
            <button className='rota' style={{ width: '525px', height: '165px', marginRight: '7vw'}}
                onClick={handleClick}>
                <div>
                    <p>{props.nome}</p>
                    <p>Quantidade estimada:<h2>{props.passageiros_min}/{props.passageiros_max}</h2></p>
                    <p>Horário de partida: {props.horario}</p>
                </div>
                <img src={onibusreceba} style={{ width: '90px', height: '100px' }} className='img' alt="ônibus" />
            </button>
        </div>
        </>
    );
}


export default RotaOnibus;