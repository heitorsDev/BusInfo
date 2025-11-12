import { Link } from 'react-router-dom';
import '../style/Header.css';
import '../style/MenuOption.css';
import '../style/Logo.css';
import '../style/Configuracao.css';
import '../style/MenuOption2.css';
import tomaImg from '../assets/toma.png';
import logo from '../assets/logo.png';

function Header() {
  return (
    <>
    <div style={{backgroundColor: 'rgb(255, 115, 0)', position: 'fixed', top: '0vh', width: '100vw'}}>
      <Link to="/configuracao" className="configuracao">
        <img src={tomaImg} alt="toma" width="85vw" height="85vh" />
      </Link>

      <div className="logo">
        <img src={logo} width="110vw" height="100vh" alt="logo" />
      </div>
      

      <div className="header">
        <Link to="/" style={{ marginRight: '14vw', borderRadius: '10px' }} className="option">HOME</Link>
        <Link to="/horarios" style={{ marginRight: '14vw', borderRadius: '10px' }} className="option">HORÁRIOS</Link>
        <Link to="/contato" style={{ marginRight: '0vw', borderRadius: '10px' }} className="option">CONTATO</Link>
      </div>
      </div>
    </>
  );
}

export default Header;
