import '../style/Header.css';
import '../style/MenuOption.css';
import '../style/Logo.css';
import '../style/Configuracao.css'
import '../style/MenuOption2.css'
import '../style/Quadrado.css'
import '../style/Quadrado2.css'
import '../style/NoticiaTitle.css'
import '../style/NoticiaText.css'
import acidente from '../assets/acidente2.png'

function Noticias() {
    return (
        <>
        <div style={{float: 'right', marginTop: '31vh', marginLeft: '2vw'}}>
        <h2 className='NoticiaTitle'>ACIDENTE</h2>
        <h3 className='NoticiaText'>Uma colisão entre dois carros na BR-101 está atualmente atrapalhando
            a passagem de vehículos na BR-101.
        </h3>
        <h3 className='NoticiaTitle'>TRÂNSITO</h3>
        <h3 className='NoticiaText'>Estimativa de trânsito lento na região até 3 horas da tarde.</h3> 
        </div>
            <img src={acidente} alt="toma" style={{width: "43vw", height: "53vh", 
                borderRadius: "20px", marginTop: "32vh", marginLeft: "1vw"}} />
        </>
    );
}

export default Noticias;