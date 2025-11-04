import '../style/Header.css';
import '../style/MenuOption.css';
import '../style/Logo.css';
import '../style/Configuracao.css'
import '../style/MenuOption2.css'
import tomaImg from '../assets/toma.png';
import logo from '../assets/logo.png';

function Header() {
    return (
        <>
        <button className='option2'
        style={{marginTop:'15px', marginRight: '150px'}}>
            login motorista
        </button>

        <button className='configuracao'>
        <img src={tomaImg} alt ="toma" width="100" height="100"/>
        </button>

        <div className="logo"><img src={logo} width="105" height="105"></img></div>

        <div className="header">

        <button
        style={{marginRight: '65px'}}
        className="option">HOME</button>

        <button 
        style={{marginRight: '65px'}}
        className="option">HORÁRIOS</button>

        <button 
        style={{marginRight: '65px'}}
        className="option">CONTATO</button>
        
        </div>
        </>
    );
}

export default Header;