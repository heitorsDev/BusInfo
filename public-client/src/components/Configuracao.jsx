import '../style/Header.css';
import '../style/MenuOption.css';
import '../style/Logo.css';
import '../style/Configuracao.css'
import '../style/MenuOption2.css'
import '../style/ConfigOption.css'
import tomaImg from '../assets/toma.png';
import logo from '../assets/logo.png';

function Header() {
    return (
        <>
        <div>
        <button
        style={{marginRight: '65px'}}
        className="configOption">CONTATO</button>
        
        </div>
        </>
    );
}

export default Header;