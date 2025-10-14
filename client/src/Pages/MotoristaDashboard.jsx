import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Dashboard = ()=>{
    const [res, setRes] = useState("")
    const { id } = useParams()
    const handleGetUserRotas = async (e)=>{
        const url = `http://localhost:4000/getmotoristarotas/${id}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            credentials: 'include',
          });
          const data = await response.json()
          console.log(data)
          setRes(data.message)
    }
    useEffect(()=>{
        handleGetUserRotas()
    }, [])

    return <>
    <div>{res}</div>
    </>
}
export default Dashboard