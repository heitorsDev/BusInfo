import '../style/Header.css';
import '../style/MenuOption.css';
import '../style/Logo.css';
import '../style/Configuracao.css'
import '../style/MenuOption2.css'
import '../style/Form.css'

function Login() {
    return (
        <>
        <div className='form-div2'>
            <form className='form'>
                <div 
                className='form-div'>
                <label 
                className='form-label'
                >Usuario
                </label>
                <input 
                type="text" 
                placeholder='MotoristaOnibus123' 
                className='form-input'
                ></input>
                </div>

                <div
                className='form-div'>
                <label className='form-label'>Senha</label>
                <input 
                type="password" 
                placeholder='123456' 
                className='form-input'
                ></input>
                </div>

                <button type="submit" className='form-submit'>submit</button>
            </form>

            <button
            style={{float: 'right', marginRight: '35px'}} 
            className="option">CADASTRAR
            </button>

            <button
            style={{marginLeft: '35px'}} 
            className="option">LOGIN
            </button>

        </div>
        </>
    );
}

export default Login;