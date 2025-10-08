import { useState } from "react"

const Login = ()=>{
    const [cpf, setCpf] = useState("")
    const [password, setPassword] = useState("")
    const handleSetCpf = (e)=>{
        setCpf(e.target.value)
    }
    const handleSetPassword = (e)=>{
        setPassword(e.target.value)
    }
    const [res, setRes] = useState("")
    const url = ' http://localhost:4000/login'
    const handleLogin = async (e)=>{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8', // Indicate that the body is JSON
            },
            body: JSON.stringify({
                CPF: cpf,
                Password: password
            }),
          });
          const data = await response.json()
          console.log(data)
          setRes(data.message)
    }

    return <>
    <input onInput={handleSetCpf} type="text" placeholder="cpf"/>
    <input onInput={handleSetPassword} type="text" placeholder="password"/>
    <div>{res}</div>
    <button onClick={handleLogin}>login</button>
    </>
}
export default Login