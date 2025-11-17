
import { useState } from "react"
import "../style/Button2.css"

const Register = ()=>{
    const [name, setName] = useState("")
    const [cpf, setCpf] = useState("")
    const [password, setPassword] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [adminKey, setAdminKey] = useState("")
    
    const handleSetName = (e)=>{
        setName(e.target.value)
    }
    const handleSetCpf = (e)=>{
        setCpf(e.target.value)
    }
    const handleSetPassword = (e)=>{
        setPassword(e.target.value)
    }
    const handleSetAdminKey = (e)=>{
        setAdminKey(e.target.value)
    }
    const handleToggleAdmin = (e)=>{
        setIsAdmin(e.target.checked)
    }
    
    const [res, setRes] = useState("")
    const baseUrl = 'http://localhost:4000'
    
    const handleRegister = async (e)=>{
        const endpoint = isAdmin ? '/adminRegister' : '/register'
        const url = baseUrl + endpoint
        
        const body = isAdmin 
            ? {
                Name: name,
                Password: password,
                CPF: cpf,
                key: adminKey
              }
            : {
                Name: name,
                Password: password,
                CPF: cpf
              }
        
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(body),
          });
          const data = await response.json()
          setRes(data.message || "Registration completed")
    }

    return <>
    <input className="rectangle" onInput={handleSetName} type="text" placeholder="Nome"/>
    <input className="rectangle" onInput={handleSetCpf} type="text" placeholder="CPF"/>
    <input className="rectangle" onInput={handleSetPassword} type="text" placeholder="Senha"/>
    <label className="custom-checkbox-container">
        <input 
            type="checkbox" 
            checked={isAdmin} 
            onChange={handleToggleAdmin}
            className="custom-checkbox"
        />
        <span className="checkmark" style={{marginTop: '2vh', marginLeft: '0.2vw'}}></span>
        <span className="checkmark-label"><p style={{fontFamily: 'Segoe UI'}}>Registrar como administrador</p></span>
    </label>
    {isAdmin && (
        <input className="rectangle" onInput={handleSetAdminKey} type="text" placeholder="Chave Admin"/>
    )}
    <div>{res}</div>
    <button className="button" onClick={handleRegister} style={{fontSize: '2.5vh'}}>Registrar</button>
    </>
}
export default Register
