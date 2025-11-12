import '../style/Header.css';
import '../style/MenuOption.css';
import '../style/Logo.css';
import '../style/Configuracao.css';
import '../style/MenuOption2.css';
import '../style/Quadrado.css';
import '../style/Case.css';
import '../style/CaseText.css'

function Contato() {
    return (
        <>
        <div style={{width:'100vw'}}>
        <div style={{float: 'left'}}>
        <div className='case'>
            <h2 className='caseText'>E-Mail</h2>
        </div>
        <div className='case' style={{backgroundColor: 'rgb(247, 247, 247)', borderRadius: '0px', boxShadow: '0px 4px 0px rgb(190, 190, 190)'}}>
            <h3 className='caseText' style={{color: 'rgb(44, 44, 44)'}}>BusInfoMensagem@gmail.com</h3>
        </div>
        </div>

        <div style={{float: 'right', marginRight: '25vw'}}>
        <div className='case'>
            <h2 className='caseText'>Telefone</h2>
        </div>
        <div className='case' style={{backgroundColor: 'rgb(247, 247, 247)', borderRadius: '0px', boxShadow: '0px 4px 0px rgb(190, 190, 190)'}}>
            <h3 className='caseText' style={{color: 'rgb(44, 44, 44)'}}>+55 48 77462-1649</h3>
        </div>
        </div>
        </div>
        </>
    );
}

export default Contato;