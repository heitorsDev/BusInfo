
import { useState } from "react"

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
    <input onInput={handleSetName} type="text" placeholder="name"/>
    <input onInput={handleSetCpf} type="text" placeholder="cpf"/>
    <input onInput={handleSetPassword} type="text" placeholder="password"/>
    <label>
        <input type="checkbox" checked={isAdmin} onChange={handleToggleAdmin}/>
        Register as Admin
    </label>
    {isAdmin && (
        <input onInput={handleSetAdminKey} type="text" placeholder="admin key"/>
    )}
    <div>{res}</div>
    <button onClick={handleRegister}>register</button>
    </>
}
export default Register
