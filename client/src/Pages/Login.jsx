import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = ()=>{
    const [cpf, setCpf] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const handleSetCpf = (e)=>{
        setCpf(e.target.value)
    }
    const handleSetPassword = (e)=>{
        setPassword(e.target.value)
    }
    const [res, setRes] = useState("")
    const url = 'http://localhost:4000/login'
    const handleLogin = async (e)=>{
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8', // Indicate that the body is JSON
            },
            credentials: 'include',
            body: JSON.stringify({
                CPF: cpf,
                Password: password
            }),
          });
          const data = await response.json()
          console.log(data)
          setRes(data.message)
          
          if (response.ok){
            console.log(data.user.admin)
            if (data.user.admin==false){
                navigate(`/dashboard/${data.user.id}`)
            }else{
                navigate(`/admindashboard/${data.user.id}`)
            }
          }
    }

    return <>
      <input onInput={handleSetCpf} type="text" placeholder="cpf"/>
      <input onInput={handleSetPassword} type="password" placeholder="password"/>
      <div>{res}</div>
      <button onClick={handleLogin}>login</button>
    </>
}
export default Login